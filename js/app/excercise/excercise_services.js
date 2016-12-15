/*	Service(s)
===================================*/
// API URL
app.factory('appInfo', function () {
return{serviceUrl: base_url}
});

app.factory('DrawGraphService', function( $http, $q ,appInfo) {
		 // Return public API.
		 return {
    	DrawGraphServiceFunction:function(reqData){
			var deferred = $q.defer();
				$http.post(base_url + 'api_excercise/GraphData',reqData).success(function (data) {
				    deferred.resolve(data);
				}).error(function (data) {
				    deferred.reject(data);
				});
				return deferred.promise;
    	},
		
		GetPeopleExercisingService:function(reqData){
			var d = $q.defer();
			$http.post(base_url + 'api_excercise/GetPeopleExercising.json',reqData).success(function (data) {
				d.resolve(data);
			}).error(function(data){
				d.reject(data);
			});
			return d.promise;			
		},
		
		
    }
});