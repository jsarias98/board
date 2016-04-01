'use strict';

angular
		.module('dashyAngular')
		.directive(
				'menu',
				function(AuthEG) {
					return {
						templateUrl : function() {
							var EGprofile = AuthEG.GetProfile();
							switch (EGprofile) {
							case 'Pilot':
								return 'scripts/directives/sidenav/menu/menuAdmin.html?v='
										+ window.app_version;
								break;
							case 'Traveler':
								return 'scripts/directives/sidenav/menu/menuUser.html?v='
										+ window.app_version;
								break;
							default:
								break;
							}
						},
						restrict : 'E',
						replace : true,

						controller : function($scope, AuthEG) {

							$scope.selectedMenu = 'dashboard';
							$scope.showingSubNav = 0;

							$scope.showSubNav = function(x) {

								if (x == $scope.showingSubNav)
									$scope.showingSubNav = 0;
								else
									$scope.showingSubNav = x;

							};
							$scope.username=AuthEG.GetUserName();
							
							$scope.getAvatar=function(){
								switch (AuthEG.GetGender()) {
								case '0':
									return 'images/Pilot-women.png';
									break;
								case '1':
									return 'images/Pilot-man.png';
									break;
								default:
									return 'images/exodo-logo.png';
									break;
								}				
							}
							
							$scope.logOut = function() {
								AuthEG.ExpirePassport();
							}

						},
					}
				});