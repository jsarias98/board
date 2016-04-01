'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:PlansCtrl
 * @description # PlansCtrl Controller of dashyAngular
 */
angular.module('dashyAngular').controller(
		'PlansCtrl',
		function($scope, ApiExodo, $stateParams, $state) {
			var index = 0;
			$scope.invalidNotification = false;
			$scope.notifications = {};
			$scope.showList = true;
			if ($stateParams.planId) {
				$scope.showList = false;
				var data = {
					idplan : parseInt($stateParams.planId)
				}
				console.log(data);
				ApiExodo.getResource('plans', 'listar', data).success(
						function(response) {
							$scope.plan = response.planes[0];
							$scope.plan.amount = parseInt($scope.plan.amount);
							if ($scope.plan.enabled === '1') {
								$scope.plan.enabled = true;
							} else {
								$scope.plan.enabled = false;
							}
						}).error(function(error) {
					console.info(error);
				});
			} else {
				ApiExodo.getResource('plans', 'listar', null).success(
						function(response) {
							$scope.planes = response.planes;
						}).error(function(error) {
					console.info(error);
				});
			}

			$scope.editar = function(id) {
				$state.go('plans-detail', {
					planId : id
				});
			}

			$scope.planSave = function() {
				if ($stateParams.planId) {
					var data = $scope.plan;
					ApiExodo.getResource('plans', 'salvar', data).success(
							function(response) {
								$scope.advise = {
									title : 'Plan',
									message : 'Plan Actualizado',
									style : 'growl-primary fading'
								}
								$scope.addNotify($scope.advise);
							}).error(function(error) {
						console.info(error);
						$scope.advise = {
							title : 'Plan',
							message : 'Error al actualizar',
							style : 'growl-error fading'
						}
						$scope.addNotify($scope.advise);
					});
				} else {
					var data = $scope.plan;
					ApiExodo.getResource('plans', 'crear', data).success(
							function(response) {
								$scope.planes.push($scope.plan);
								$scope.plan={};
								$scope.advise = {
									title : 'Plan',
									message : 'Plan Creado',
									style : 'growl-primary fading'
								}
								$scope.addNotify($scope.advise);
							}).error(function(error) {
						console.info(error);
						$scope.advise = {
							title : 'Plan',
							message : 'Error al crear',
							style : 'growl-error fading'
						}
						$scope.addNotify($scope.advise);
					});
				}
			};

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
