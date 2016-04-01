/**
 * http://usejsdoc.org/
 */
angular.module('dashyAngular').controller(
		'TicketCtrl',
		function($scope, ApiExodo, $stateParams, $state) {
			var index = 0;
			$scope.invalidNotification = false;
			$scope.notifications = {};
			$scope.showList = true;
			
			$scope.addNotify = function(notification) {

				var i;

				if (!notification) {
					$scope.invalidNotification = true;
					return;
				}

				i = index++;
				$scope.invalidNotification = false;
				$scope.notifications[i] = notification;
			};

		});
