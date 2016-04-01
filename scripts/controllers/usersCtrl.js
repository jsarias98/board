'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:PlansCtrl
 * @description # PlansCtrl Controller of dashyAngular
 */
angular.module('dashyAngular').controller(
		'UsersCtrl',
		function($scope, ApiExodo, $stateParams, $state) {
			var index = 0;
			$scope.invalidNotification = false;
			$scope.notifications = {};
			$scope.showList = true;
			$scope.selectPlans=[];
			ApiExodo.getResource('plans', 'listar', null).success(
					function(response) {
						$scope.planes = response.planes;
					}).error(function(error) {
				console.info(error);
			});
			if ($stateParams.userId) {
				$scope.showList = false;
				var data = {
					iduser : $stateParams.userId
				}
				ApiExodo.getResource('users', 'listar', data).success(
						function(response) {
							$scope.user = response.usuarios[0];
							$scope.user.phone = parseInt($scope.user.phone);
							if ($scope.user.enabled === '1') {
								$scope.user.enabled = true;
							} else {
								$scope.user.enabled = false;
							}
						}).error(function(error) {
					console.info(error);
				});
			} else {
				ApiExodo.getResource('users', 'listar', null).success(
						function(response) {
							$scope.users = response.usuarios;
						}).error(function(error) {
					console.info(error);
				});
			}

			$scope.editar = function(id) {
				$state.go('users-detail', {
					userId : id
				});
			}
			
			$scope.activeUser= function(){
				var data = {
						iduser : $scope.user.id_users,
						enabled : $scope.user.enabled,
						email : $scope.user.mail
					}
				ApiExodo.getResource('users', 'activar', data).success(
						function(response) {
							if(response=='1'){
								$scope.advise = {
										title : 'Usuario',
										message : 'Usuario Activado',
										style : 'growl-primary fading'
									}
							}else{
								$scope.advise = {
										title : 'Usuario',
										message : 'Usuario Desactivado',
										style : 'growl-primary fading'
									}
							}
							$scope.addNotify($scope.advise);
						}).error(function(error) {
					console.info(error);
				});
			}
			
			$scope.suscribe= function(plan){
				var data = {
						iduser : $scope.user.id_users,
						plan : plan,
						correo: $scope.user.mail
					}
				ApiExodo.getResource('voucher', 'inscribir', data).success(
						function(response) {
							if(response.estado=='1'){
								$scope.advise = {
										title : 'Usuario',
										message : 'Usuario Inscrito',
										style : 'growl-primary fading'
									}
							}
							$scope.addNotify($scope.advise);
						}).error(function(error) {
					console.info(error);
				});
			}

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
