'use strict';

angular.module('mean.questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Global', 'Questions',
  function($scope, $stateParams, $location, Global, Questions) {
    $scope.global = Global;
    
    $scope.create = function(isValid) {
    	if(isValid) {
    		var question = new Questions({
    			content: this.content,
    			questionType: this.questionType,
    			choices: this.choices,
    			tags: this.tags
    		});

    		question.$save(function(response){
    			$location.path('question/'+response._id);
    		});

    	} else {
    		$scope.submitted = true;
    	}
    };

    $scope.remove = function(question){
		if(question) {
			question.$remove(function(response){
				for (var i in $scope.questions) {
					if ($scope.questions[i] === question) {
						$scope.questions.splice(i, 1);
					}
				}
				$location.path('questions');
			});
    	} else {
    		$scope.question.$remove(function(response){
    			$location.path('questions');
    		});
    	}
    };

    $scope.update = function(isValid){
		if(isValid){
			var question = $scope.question;
			if(!question.updated) {
				question.updatd = [];
			}
			question.updated.push(new Date().getTime());

			question.$update(function(){
				$location.path('question/'+question._id);
			});
		} else {
			$scope.submitted = true;
		}
    };

    $scope.find = function(){
    	Questions.query(function(questions){
    		$scope.questions = questions;
    	});
    };

    $scope.findOne = function(){
    	Questions.get({
    		questionId: $stateParams.questionId
    	}, function(question){
    		$scope.question = question;
    	});
    };
  }
]);
