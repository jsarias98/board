/**
 * @ngdoc function
 * @name dashyAngular.controller:PlansCtrl
 * @description # PlansCtrl Controller of dashyAngular
 */

angular.module('dashyAngular').controller(
		'EnlistCtrl',
		function($scope, AuthEG, ApiExodo, $modal) {
			$scope.userId = AuthEG.GetUser();
			$scope.userToken = AuthEG.GetToken();
			$scope.userVoucher = {};
			$scope.plansUsers = {};
			$scope.data = {};
			$scope.enlist={};
			$scope.items = {
					title : 'Registro usuarios',
					message : ''
				}
			$scope.invitar = function() {
				var datag = {
					mail : $scope.enlist.mail,
					name : $scope.enlist.name,
					userRef : AuthEG.GetUserName(),
					userId : $scope.userId,
					link : $scope.userToken
				};
				console.log(datag);
				ApiExodo.getResource('guest', 'invitar', datag).success(
						function(response) {
							console.log(response);
							$scope.items.message = response.mensaje;
							$scope.open('sm');
						}).error(function(error) {
					console.info(error);
				});
			}
			var datap = {
				userId : $scope.userId
			};
			ApiExodo.getResource('voucher', 'consultar', datap).success(
					function(response) {
						$scope.planUsers = response.vouchers;
					}).error(function(error) {
				console.info(error);
			});			
			$scope.consultar = function() {
				var data = {
					voucherId : $scope.data.selectedPlan.id_voucher,
					plan : $scope.data.selectedPlan.id_plans
				};
				ApiExodo.getResource('crew', 'listar', data).success(
						function(response) {
							$scope.userVoucher = response.users;
						}).error(function(error) {
					console.info(error);
				});
			}
			
			$scope.getAvatar=function(gender, generation){
				switch (gender) {
				case '0':
					switch (generation) {
					case 1:
						return 'images/CoPilot-woman.png';
						break;
					case 2:
						return 'images/Stewardess-woman.png';
						break;
					case 3:
						return 'images/passenger-woman1.png';
						break;
					case 4:
						return 'images/passenger-woman2.png';
						break;
					case 5:
						return 'images/passenger-woman3.png';
						break;
					default:
						break;
					}
					break;
				case '1':
					switch (generation) {
					case 1:
						return 'images/CoPilot-man.png';
						break;
					case 2:
						return 'images/Stewardess-man.png';
						break;
					case 3:
						return 'images/passenger-man1.png';
						break;
					case 4:
						return 'images/passenger-man2.png';
						break;
					case 5:
						return 'images/passenger-man3.png';
						break;
					default:
						break;
					}
					
					break;
				default:
					return 'images/exodo-logo.png';
					break;
				}				
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
		});
