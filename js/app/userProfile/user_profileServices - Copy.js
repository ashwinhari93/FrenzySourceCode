
/*	Service(s)
===================================*/
// for group 


angular.module('App')
.factory('UserProfileService', function( $http, $q ,appInfo) {
	return {
		getFollowers : function(reqData){

			var deferred = $q.defer();

			$http.post(appInfo.serviceUrl + 'users/following_list.json',reqData).success(function (data) {
				deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
					deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
			},
			
			getLevelList: function(reqData){
				var deferred = $q.defer();
				$http.post(appInfo.serviceUrl + 'users/GetLevelList.json',reqData).success(function (data) {
					deferred.resolve(data);
				}).error(function (data) {
					deferred.reject(data);
				});

				return deferred.promise;
				
			},

			points : function(reqData){

				var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'users/user_earned_points.json',reqData).success(function (data) {
					deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
					deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
			},
			
			FetchInterest_profile : function(reqData){

				var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'users/getuserinterest.json',reqData).success(function (data) {
					deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
					deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
			},
			
			
			saveinterest_profile : function(reqData){

				var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'users/InterestedMeditation.json',reqData).success(function (data) {
					deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
					deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
			},
			
			
			saveinterest_profile_student : function(reqData){

				var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'users/profile_for_student.json',reqData).success(function (data) {
					deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
					deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
			},
			
			
			
			
			GetUserStatusDetail : function(reqData){
				var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'expertise/user_expertise', reqData).success(function (data) {
					
					deferred.resolve(data);
				    //console.log("success" + data) ; return ; 
				}).error(function (data) {
					deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
			},
			
			saveuserdetail : function(reqData){
				var deferred = $q.defer();
				$http.post(appInfo.serviceUrl + 'expertise/user_take_expertise',reqData).success(function (data) {
					console.log(data);
					deferred.resolve(data);
				    //console.log("success" + data) ; return ; 
				}).error(function (data) {
					deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
			},
			
			UserPostwallpost : function(reqData){

				var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'wallpost/CreateUserWallPost.json',reqData).success(function (data) {
					deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
					deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
			},
			
			FetchExpertise : function(reqData){

				var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'expertise/listexpertise.json',reqData).success(function (data) {
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