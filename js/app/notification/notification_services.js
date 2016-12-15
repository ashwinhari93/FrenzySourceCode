/*	Service(s)
===================================*/
// API URL
angular.module('App').factory('appInfo', function () {
	return{serviceUrl: base_url+'api/'}
});

angular.module('App').factory('NotificationService', function( $http, $q ,appInfo) {
		return {
    	GetNotification : function(reqData){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl+'notifications/getNotifications',reqData).success(function (data) {
				deferred.resolve(data);
			}).error(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
    	},

    	UpdateReadNotification : function(reqData){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl+'notifications/updateAllUserNotification',reqData).success(function (data) {
				deferred.resolve(data);
			}).error(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
    	},

    	LoadMoreNotification : function(reqData){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl+'notifications/LoadMoreNotification',reqData).success(function (data) {
				deferred.resolve(data);
			}).error(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
    	},

    	deleteNotifications : function(reqData){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl+'notifications/changeNotificationsStatus',reqData).success(function (data) {
				deferred.resolve(data);
			}).error(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
    	},


    	


    }
});