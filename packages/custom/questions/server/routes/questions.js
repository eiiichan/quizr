'use strict';

var questions = require('../controllers/questions');

// The Package is past automatically as first parameter
module.exports = function(Questions, app, auth, database) {

	app.route('/questions')
		.get(auth.requiresLogin, questions.all)
		.post(auth.requiresLogin, questions.create);

	app.route('/questions/:questionId')
		.get(questions.show)
		.put(auth.requiresLogin, questions.update)
		.delete(auth.requiresLogin, questions.destroy);

	app.param('questionId', questions.question);
	
};
