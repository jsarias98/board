angular.module('dashyAngular').factory('ApiExodo', function($http) {
	return{
		getResource: function(resource, procedure, data) {
			var URL = "http://apiexodo.exodogroup.com/v1/"+resource+'/'+procedure;
			var req = {
					method : 'POST',
					url : URL,
					headers : {
						'Content-Type' : undefined
					},
					data : data
				}
				return $http(req);
		}
    }; // Note the full endpoint address
});