/*	Service(s)
===================================*/
angular.module('App')
	.factory('appInfo', appInfo)
	.factory('messagingService', messagingService);

function appInfo() {
		return{serviceUrl: base_url+'api/'}
	}


function messagingService($http, $q, tmpJson, appInfo) {
	return {
		GetMessage : function(req){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl+'messages/getMessages',req)
			.success(function(res) {
			    deferred.resolve(res)
			  })
			.error(function(err) {
			    deferred.reject(err);
			  });
			return deferred.promise;
		},

		GetMsgDetails : function(req) {
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl+'messages/messageDetails',req)
			.success(function(res) {
			    deferred.resolve(res)
			  })
			.error(function(err) {
			    deferred.reject(err);
			  });
			return deferred.promise;
		},

		MessageFlagStatus : function(req){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl+'messages/changeMessageFlagStatus',req)
			.success(function(res) {
			    deferred.resolve(res)
			  })
			.error(function(err) {
			    deferred.reject(err);
			  });
			return deferred.promise;
		},

		ChangeMessageStatus : function(req){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl+'messages/changeMessageStatus',req)
			.success(function(res) {
			    deferred.resolve(res)
			  })
			.error(function(err) {
			    deferred.reject(err);
			  });
			return deferred.promise;
		},

		SendMessage : function(req){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl+'messages/sendMessage',req)
			.success(function(res) {
			    deferred.resolve(res)
			  })
			.error(function(err) {
			    deferred.reject(err);
			  });
			return deferred.promise;
		}

	}
}
			// $http.get(tmpJson.serviceUrl+'messaging.js').success(function (res) {
			//     deferred.resolve(res);
			    
			// }).error(function (err) {
			//     deferred.reject(err);
			// });
			// return deferred.promise;
