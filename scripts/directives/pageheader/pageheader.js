'use strict';

/**
 * @ngdoc directive
 * @name DashdashyAngular.directive:pageHeader
 * @description
 * # pageHeader
 */
angular.module('dashyAngular')
	.directive('pageheader',function(AuthEG){
		return {
        templateUrl:'scripts/directives/pageheader/pageheader.html?v='+window.app_version,
        restrict: 'E',
        replace: true,
        controller : function($scope, AuthEG) {
			$scope.username = AuthEG.GetUserName();
			$scope.usercode = AuthEG.GetUser();
		},
        scope: {
	        'pagename': '@',
	        'subtitle': '@'
  		}
    	}
	});


