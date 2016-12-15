
/*	Service(s)
===================================*/

// API URL
app.factory('appInfo', function () {
    return{
        serviceUrl: base_url
    }
});
//// for group 

app.factory('WalleService', function( $http, $q ,appInfo) {
									 return {
		
		get_userwall: function(reqData){
			var d = $q.defer();
			
			$http.post(base_url + 'api_wallpost/GetWallPostList.json',reqData).success(function (data) {
				d.resolve(data);
				//console.log("Success: "+data);
			}).error(function(data){
				d.reject(data);
				//console.log("Error: "+data);
			});
			return d.promise;			
		},
		
		Wallpost : function(reqData){

			var deferred = $q.defer();

				$http.post(base_url + 'api_wallpost/AddWallPostComment.json',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
		DoLike : function(reqData){

			var deferred = $q.defer();

				$http.post(base_url + 'api_wallpost/LikeWallPost.json',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	}, 
		 
		
		delete_wall_post : function(reqData){

			var deferred = $q.defer();

				$http.post(base_url + 'api_wallpost/DeleteWallPost.json',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
		delete_wall_comment : function(reqData){

			var deferred = $q.defer();

				$http.post(base_url + 'api_wallpost/DeleteWallcomment.json',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
			  
		UserPostwallpost : function(reqData){

			var deferred = $q.defer();

				$http.post(base_url + 'api_wallpost/CreateUserWallPost.json',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
		
	};
		 
});