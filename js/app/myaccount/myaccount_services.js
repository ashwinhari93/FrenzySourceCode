/*	Service(s)
===================================*/
// API URL
angular.module('App')

.factory('appInfo', function () {
	return{serviceUrl: base_url+'api/'}
})
.factory('ResetPasswordService', function( $http, $q ,appInfo) {
		 // Return public API.
		 return {
    	ChangePassword : function(reqData){
			var deferred = $q.defer();
				$http.post(appInfo.serviceUrl + 'changepassword',reqData).success(function (data) {
				    deferred.resolve(data);
				}).error(function (data) {
				    deferred.reject(data);
				});
				return deferred.promise;
    	}
    }
})
.factory('SetPasswordService', function( $http, $q ,appInfo) {
		 // Return public API.
		 return {
    	ChangePassword : function(reqData){
			var deferred = $q.defer();
				$http.post(appInfo.serviceUrl + 'changepassword/set',reqData).success(function (data) {
				    deferred.resolve(data);
				}).error(function (data) {
				    deferred.reject(data);
				});
				return deferred.promise;
    	}
    }
})
.factory('MyAccountSettingService', function( $http, $q ,appInfo) {
		 return {
    	ChangePersonalSetting : function(reqData){
		console.log(reqData);
			var deferred = $q.defer();
				$http.post(appInfo.serviceUrl + 'users/updateUserInfo',reqData).success(function (data) {
				    deferred.resolve(data);
				}).error(function (data) {
				    deferred.reject(data);
				});
				return deferred.promise;
    	},
    	updateUserProfile : function(reqData){
    		var deferred = $q.defer();

			$http.post(appInfo.serviceUrl + 'users/updateUserProfile',reqData).success(function(data){
				deferred.resolve(data);
			}).error(function(data){
				deferred.reject(data);
			});

			return deferred.promise;
    	},
    	checkSocialAccounts : function(reqData){
    		var deferred = $q.defer();

			$http.post(appInfo.serviceUrl + 'users/checkSocialAccounts',reqData).success(function(data){
				deferred.resolve(data);
			}).error(function(data){
				deferred.reject(data);
			});

			return deferred.promise;
    	},
    	FetchExpertise : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'expertise/listExpertise',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},

    	getUserProfile : function(reqData){
    		var deferred = $q.defer();

			$http.post(appInfo.serviceUrl + 'users/getUserProfile',reqData).success(function(data){
				deferred.resolve(data);
			}).error(function(data){
				deferred.reject(data);
			});

			return deferred.promise;
    	},

    	InitData : function(reqData){
			var deferred = $q.defer();
				$http.post(appInfo.serviceUrl + 'timezone/getTimezone',reqData).success(function (data) {
				    deferred.resolve(data);
				}).error(function (data) {
				    deferred.reject(data);
				});
				return deferred.promise;
    	},

			GetUserData: function(reqData){
			var deferred = $q.defer();
				$http.post(appInfo.serviceUrl + 'users/getUserData',reqData).success(function (data) {
				    deferred.resolve(data);
				}).error(function (data) {
				    deferred.reject(data);
				});
				return deferred.promise;
    	},

		DeleteAccount : function(reqData){
			var deferred = $q.defer();
			console.log(reqData);
				$http.post(base_url + 'api_users/DeleteAccout',reqData).success(function (data) {
				    deferred.resolve(data);
				}).error(function (data) {
				    deferred.reject(data);
				});
				return deferred.promise;
    	}

	}
})