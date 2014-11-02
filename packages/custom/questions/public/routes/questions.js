'use strict';

angular.module('mean.questions').config(['$stateProvider',
	function($stateProvider) {

		// Check if the user is connected
		var checkLoggedin = function($q, $timeout, $http, $location) {
		  // Initialize a new promise
			var deferred = $q.defer();

		  // Make an AJAX call to check if the user is logged in
			$http.get('/loggedin').success(function(user) {
			// Authenticated
			if (user !== '0') $timeout(deferred.resolve);

			// Not Authenticated
			else {
				$timeout(deferred.reject);
				$location.url('/login');
			}
		});
			return deferred.promise;
		};

		$stateProvider
			.state('all questions', {
				url: '/questions',
				templateUrl: 'questions/views/list.html',
				resolve: {
					loggedin: checkLoggedin
				}
			})
			.state('create question', {
				url: '/questions/create',
				templateUrl: 'questions/views/create.html',
				resolve: {
					loggedin: checkLoggedin
				}
			})
			.state('edit question', {
				url: '/questions/:questionId/edit',
				templateUrl: 'questions/views/edit.html',
				resolve: {
					loggedin: checkLoggedin
				}
			})
			.state('question by id', {
				url: '/questions/:questionId',
				templateUrl: 'questions/views/view.html',
				resolve: {
					loggedin: checkLoggedin
				}
			});
	}
]);
