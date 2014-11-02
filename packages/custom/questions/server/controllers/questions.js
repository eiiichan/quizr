'use strict';

var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var _ = require('lodash');

exports.question = function(req, res, next, id){
	Question.load(id, function(err, question){
		if(err) return next(err);
		if(!question) return next(new Error('Failed to load question ' + id));
		r
		eq.question = question;
		next();
	})
};

exports.create = function(req, res){
	var question = new Question(req.body);
	question.user = req.user;

	question.save(function(err){
		if(err) {
			return res.json(500, {
				error: 'Cannot save the question'
			})
		}

		res.json(question);
	});
}

exports.update = function(req, res) {
	var question = req.question;

	question = _.extend(question, req.body);

	question.save(function(err) {
		if (err) {
			return res.json(500, {
				error: 'Cannot update the question'
			});
		}
		res.json(question);
	});
};

exports.destroy = function(req, res) {
	var question = req.question;

	question.remove(function(err){
		if(err){
			return res.json(500, {
				error: 'Cannot delete the question'
			});
		}
		res.json(question);
	});
};

exports.show = function(req, res) {
	res.json(req.question);
};

exports.all = function(req, res) {
	Question.find().exec(function(err, questions){
		if(err) {
			return res.json(500, {
				error: 'Cannot list the questions'
			});
		}
		res.json(questions);
	});
};