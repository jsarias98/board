'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description # MainCtrl Controller of dashyAngular
 */
angular
		.module('dashyAngular')
		.controller(
				'LoginCtrl',
				function($scope, $location, ApiExodo, $state, AuthEG, $modal, $stateParams) {
					$scope.sign = {};
					$scope.controlHost = false;
					$scope.passIcon = 'fa-eye';
					$scope.passType = 'password';
					$scope.items = {
						title : 'Registro usuarios',
						message : ''
					}
					$scope.open = function(size) {

						var modalInstance = $modal.open({
							templateUrl : 'myModalContent.html',
							controller : 'ModalInstanceCtrl',
							size : size,
							resolve : {
								items : function() {
									return $scope.items;
								}
							}
						});

						modalInstance.result.then(function(selectedItem) {
							$scope.selected = selectedItem;
						}, function() {
							console.log('Modal dismissed at: ' + new Date());
						});
					};
					if ($stateParams.userId) {
						var data = {
							tokenUser: $stateParams.userId
						}
						ApiExodo
								.getResource('users', 'validarTok', data)
								.success(
										function(response) {
											switch (response.estado) {
											case 1:
												$scope.sign.host = response.usuario;
												$scope.hostView = true;
												$scope.controlHost = true;
												break;
											case 8:
												$scope.items.message = response.mensaje;
												$scope.open('sm');
												$state.go('home');
												break;
											default:
												$state.go('404-page');
											}
										}).error(function(error) {
									console.log(error);
								});
					} else {
						$scope.hostView = false;
						$scope.sign.host ='';
					}

					$scope.togglePass = function() {
						if ($scope.passType == 'password') {
							$scope.passType = 'text';
							$scope.passIcon = 'fa-eye-slash';
						} else {
							$scope.passType = 'password';
							$scope.passIcon = 'fa-eye';
						}
					};

					$scope.toggleHost = function() {
						if ($scope.hostView == false)
							$scope.sign.host ='';
							
					};
					$scope.userLogin = function() {
						var data = {
							correo : $scope.login.email,
							password : $scope.login.password
						}
						ApiExodo
								.getResource('users', 'login', data)
								.success(
										function(response) {
											switch (response.estado) {
											case 1:
												AuthEG
														.setPassport(response.usuario);
												switch (response.usuario.status) {
												case "Traveler":
													$state.go('gate');
													break;
												case "Pilot":
													$state.go('home');
													break;
												default:
													$state.go('404-page');
												}
												break;
											case 5:
											case 8:
												$scope.items.message = response.mensaje;
												$scope.open('sm');
												break;
											default:
												$state.go('404-page');
											}
										}).error(function(error) {
									console.log(error);
								});

					}
					$scope.userSign = function() {
						var data = {
							keyUser : $scope.sign.host
						}
						ApiExodo
								.getResource('users', 'validarRef', data)
								.success(
										function(response) {
											switch (response.estado) {
											case 1:
												var miliseg = new Date()
														.getMilliseconds();
												var data = {
													anfitrion : $scope.sign.host,
													username : $scope.sign.name,
													telefono : $scope.sign.phone,
													correo : $scope.sign.email,
													password : $scope.sign.password,
													cod : miliseg
												};
												ApiExodo
														.getResource('users',
																'registro',
																data)
														.success(
																function(
																		response) {
																	$scope.items.message = response.mensaje;
																	$scope
																			.open('sm');
																	if (response.estado === 1) {
																		$state
																				.go('login');
																	}
																})
														.error(function(error) {
															console.log(error);
														});
												break;
											case 8:
												$scope.items.message = response.mensaje;
												$scope.open('sm');
												break;
											default:
												$state.go('404-page');
											}
										}).error(function(error) {
									console.log(error);
								});
					}
					$scope.userForgot = function() {
						var data = {
							email : $scope.forgot.email,
							forgot : Date.now().toString()
						}
						console.info(data.forgot);
						ApiExodo.getResource('users', 'recuperar', data)
								.success(function(response) {
									$scope.items.message = response.mensaje;
									$scope.open('sm');
								}).error(function(error) {
									console.info(error);
								});
					}
				});

angular.module('dashyAngular').controller('ModalInstanceCtrl',
		function($scope, $modalInstance, items) {

			$scope.items = items;

			$scope.ok = function() {
				$modalInstance.close($scope.selected.item);
			};
		});
