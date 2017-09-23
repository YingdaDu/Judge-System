var redisClient = require('../modules/redisClient');

const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(io){
	//collaboration sessions
	var collaborations = [];
	var socketIDtoSessionID = [];

	var sessionPath = '/oj_server/';

	io.on('connection', (socket)=>{
		var sessionID = socket.handshake.query['sessionID'];
		//console.log(sessionID);
		//io.to(socket.id).emit('message', 'hello client '+socket.id);
		socketIDtoSessionID[socket.id] = sessionID;

		//add socket.id to corresponding collaboration sessions
		// if(!(sessionID in collaborations)){
		// 	collaborations[sessionID] = {
		// 		'participants' : []

		// 	};
		// }
		// collaborations[sessionID]['participants'].push(socket.id);

		if(sessionID in collaborations){
			collaborations[sessionID]['participants'].push(socket.id);
		}else{
			redisClient.get(sessionPath + sessionID, function(data){
				if(data){
					console.log('session terminated previously, pulling back...');
					collaborations[sessionID] = {
						'cachedInstructions' : JSON.parse(data),
						'participants' : []
					}
				}else{
					console.log('Nobody did this before, creating new session');
					collaborations[sessionID] = {
						'cachedInstructions' : [],
						'participants' : []
					}
				}
				collaborations[sessionID]['participants'].push(socket.id);
			});
		}

		//add change event listener
		socket.on('change', (changeInEditor) => {
			// let sessionID = socketIDtoSessionID[socket.id];
			// console.log('sessionID: ' + sessionID + ', change: ' + changeInEditor);
			let sessionID = socketIDtoSessionID[socket.id];
			if(sessionID in collaborations){
				collaborations[sessionID]['cachedInstructions'].push(
					['change', changeInEditor, Date.now()]
				);
			}else{
				console.log('sessionID is not in collaborations');
			}

			forwardEvent(socket.id, 'change', changeInEditor);	

		});

		//add cursor move event listener
		socket.on('cursorMove', (cursor) => {
			let sessionID = socketIDtoSessionID[socket.id];
			//console.log('sessionID: ' + sessionID + ', socketID: ' + socket.id + ', cursor move: ' + cursor);
			cursor = JSON.parse(cursor);
			cursor["socketID"] = socket.id;
			cursor = JSON.stringify(cursor);

			forwardEvent(socket.id, 'cursorMove', cursor);
			
		});

		socket.on('restoreBuffer', () => {
			var sessionID = socketIDtoSessionID[socket.id];
			console.log('restore buffer to session:' + sessionID);

			if(sessionID in collaborations){
				let cachedInstructions = collaborations[sessionID]['cachedInstructions'];
				for(let i = 0; i < cachedInstructions.length; i++){
					socket.emit(cachedInstructions[i][0], cachedInstructions[i][1]);
				}
			}
		});

		socket.on('disconnect', () => {
			var sessionID = socketIDtoSessionID[socket.id];
			console.log('socket '+ socket.id + ' disconnected from session ' + sessionID);
			var foundAndRemoved = false;
			if(sessionID in collaborations){
				var participants = collaborations[sessionID]['participants'];
				var index = participants.indexOf(socket.id);
				if(index >= 0){
					participants.splice(index, 1);
					foundAndRemoved = true;

					if(participants.length===0){
						console.log('last participant left, saving to Redis');
						let key = sessionPath + sessionID;
						let value = JSON.stringify(collaborations[sessionID]['cachedInstructions']);

						redisClient.set(key, value, redisClient.redisPrint);
						redisClient.expire(key, TIMEOUT_IN_SECONDS);
						delete collaborations[sessionID];
					}
				}
			}
			if(!foundAndRemoved){
				console.log('cannot find and remove participant in participants');
			}
		});


	});

	var forwardEvent = function(socketID, eventName, dataString){
		let sessionID = socketIDtoSessionID[socketID];

		if(sessionID in collaborations){
			let participants = collaborations[sessionID]['participants'];
			for(let i=0; i<participants.length; i++){
				if(participants[i] != socketID){
					io.to(participants[i]).emit(eventName, dataString);
				}
			}
		}else{
			console.log('sessionID is not in the collaborations');
		}
	};
}