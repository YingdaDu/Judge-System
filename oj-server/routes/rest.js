var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var problemService = require('../services/problemService');

var nodeRestClient = require('node-rest-client').Client;
var restCleint = new nodeRestClient();
/*
	TODO:
	get /api/v1/problems  =>  get all problems
	get /api/v1/problems/:id  =>  get one problem
	post /api/v1/problems  =>  post new problem
	post /api/v1/build_and_run => submit(post) code and run
*/

EXECUTOR_SERVER_URL = 'http://executor/build_and_run';

//register remote methods
restCleint.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST'); //method, url, get/post


router.get('/problems', function(req, res){
	problemService.getProblems()
		.then(problems => res.json(problems));
});

router.get('/problems/:id', function(req, res){
	var id = req.params.id;
	//use '+' transforms id from string to number
	problemService.getProblem(+id)
		.then(problem => res.json(problem));
});

router.post('/problems', jsonParser, function(req, res){
	problemService.addProblem(req.body)
		.then(problem => {
			res.json(problem);
		}, 
		error => {
			res.status(400).send('Problem name already exists');
		});
});

router.post('/build_and_run', jsonParser, function(req, res){
	const submitCode = req.body.userCode;
	const language = req.body.language;
	console.log('language: ' + language + ', code: ' + submitCode);

	// res.json({'text':'rest js, node js'});
	restCleint.methods.build_and_run(
		{
			data:{
				code: submitCode,
				language: language
			},
			headers: { 'Content-Type': 'application/json'}
		},
		(data, response) => {
			console.log('Received from execution server: ' + data);
			const text = `Build output: ${data['build']} 
						  Execute output: ${data['run']}`;
			data['text'] = text;
			res.json(data);
		}
	);
});

module.exports = router;