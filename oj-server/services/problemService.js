var problemModel = require("../models/problemModel");

var getProblems = function(){
  // return new Promise((resolve, reject) => {
  //   resolve(problems);
  // });
  return new Promise((resolve, reject) => {
    problemModel.find({}, function(err, problems){
      if(err){
        reject(err);
      }else{
        resolve(problems);
      }
    });
  });
};

var getProblem = function(inputID){
  // return new Promise((resolve, reject) => {
  //   resolve(problems.find(problem => problem.id === id));
  // });
  return new Promise((resolve, reject) => {
    problemModel.findOne({id: inputID}, function(err, problem){
      if(err){
        reject(err);
      }else{
        resolve(problem);
      }
    });
  });
};

var addProblem = function(newProblem){
  return new Promise((resolve, reject) => {
    // if(problems.find(problem => problem.name === newProblem.name)){
    //   reject('Problem name already exists');
    // }else{
    //   newProblem.id = problems.length + 1;
    //   problems.push(newProblem);
    //   resolve(newProblem);
    // }
    problemModel.findOne({name: newProblem.name}, function(err, data){
      if(data){
        reject('Problem name already exists');
      }else{
        // save to DB
        problemModel.count({}, function(err, number){
          newProblem.id = number + 1;
          var mongoProblem = new problemModel(newProblem);
          mongoProblem.save();
          resolve(mongoProblem);
        });
      }
    });
  });
};

module.exports = {
  getProblems: getProblems,
  getProblem: getProblem,
  addProblem: addProblem
};