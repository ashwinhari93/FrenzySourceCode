/*	Service(s)
===================================*/
// API URL


angular.module('App').factory('InviteFriendService', function( $http, $q ,appInfo) {
		return {
    	InviteFriendS : function(reqData){
			var deferred = $q.defer();
			$http.post(appInfo.serviceUrl+'build_network/send_native_invitations',reqData).success(function (data) {
				deferred.resolve(data);
			}).error(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
    	}
    }
});