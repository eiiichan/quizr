'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var questionTypes = 'multiple-choice conditional single-blank multiple-blank true/false calculation'.split(' ');

var QuestionSchema = new Schema({
	
	question: {
		type: String,
		required: true,
		trim: true
	},
	questionType: {
		type: String,
		enum: questionTypes,
		required: true,
		trim: true
	},
	choices: [{
		choice: {
			type: String,
			required: true,
			trim: true
		},
		isAnswer: {
			type: Boolean,
			default: false
		}
	}],

	active: {
		type: Boolean,
		default: true
	},
	tags: [{
		type: String,
		trim: true
	}],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}

});

QuestionSchema.statics.QUESTION_TYPES = questionTypes;
QuestionSchema.statics.load = function(id, cb){
	this.findOne({
		_id: id
	}).populate('user', 'name username').exec(cb);
};

mongoose.model('Question', QuestionSchema);