
/*	Service(s)
===================================*/

// API URL

//// for group 

angular.module('App').factory('Users', function( $http, $q ,appInfo) {
		return {
    	getUsers : function(reqData){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl + 'users/allUsers',reqData).success(function (data) {
			    deferred.resolve(data);
			   // alert("success" + data) return ; 
			}).error(function (data) {
			    deferred.reject(data);
			    //alert("error")
			});
			return deferred.promise;
    	},

    	getProfileUser : function(reqData){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl + 'users/getProfileUser',reqData).success(function (data) {
			    deferred.resolve(data);
			   // alert("success" + data) return ; 
			}).error(function (data) {
			    deferred.reject(data);
			    //alert("error")
			});
			return deferred.promise;
    	},

    	getFriends : function(reqData){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl + 'users/allUsers',reqData).success(function (data) {
			    deferred.resolve(data);
			   // alert("success" + data) return ; 
			}).error(function (data) {
			    deferred.reject(data);
			    //alert("error")
			});
			return deferred.promise;
    	},

    	removeFriend : function(reqData){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl + 'friends/deleteFriend',reqData).success(function (data) {
			    deferred.resolve(data);
			   // alert("success" + data) return ; 
			}).error(function (data) {
			    deferred.reject(data);
			    //alert("error")
			});
			return deferred.promise;
    	},

    	rejectRequest : function(reqData){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl + 'friends/rejectFriend',reqData).success(function (data) {
			    deferred.resolve(data);
			   // alert("success" + data) return ; 
			}).error(function (data) {
			    deferred.reject(data);
			    //alert("error")
			});
			return deferred.promise;
    	},

    	denyRequest : function(reqData){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl + 'friends/denyFriend',reqData).success(function (data) {
			    deferred.resolve(data);
			   // alert("success" + data) return ; 
			}).error(function (data) {
			    deferred.reject(data);
			    //alert("error")
			});
			return deferred.promise;
    	},

    	acceptRequest : function(reqData){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl + 'friends/acceptFriend',reqData).success(function (data) {
			    deferred.resolve(data);
			   // alert("success" + data) return ; 
			}).error(function (data) {
			    deferred.reject(data);
			    //alert("error")
			});
			return deferred.promise;
    	},

    	sendRequest : function(reqData){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl + 'friends/addFriend',reqData).success(function (data) {
			    deferred.resolve(data);
			   // alert("success" + data) return ; 
			}).error(function (data) {
			    deferred.reject(data);
			    //alert("error")
			});
			return deferred.promise;
    	},

    	followUser : function(reqData){
    		var deferred = $q.defer();
			$http.post(appInfo.serviceUrl + 'users/follow',reqData).success(function (data) {
			    deferred.resolve(data);
			   // alert("success" + data) return ; 
			}).error(function (data) {
			    deferred.reject(data);
			    //alert("error")
			});
			return deferred.promise;
    	}
    }
});

