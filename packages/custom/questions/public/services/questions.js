'use strict';

angular.module('mean.questions').factory('Questions', ['$resource',
  function($resource) {
    return $resource('questions/:questionId', {
    	articleId:'@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
  }
]);
