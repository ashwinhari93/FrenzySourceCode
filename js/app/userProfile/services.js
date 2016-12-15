/*	Service(s)
===================================*/

angular.module('App')
.factory('UserProfileService', function( $http, $q ,appInfo, tmpJson) {
	return {
                updatePrivacySettings : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'users/updatePrivacySettings',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		getFollowerFollowing : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'users/getFollowerFollowing',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
        getFollowing : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'users/followingList',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
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
    	removeProfileCover : function(reqData){
    		var deferred = $q.defer();

			$http.post(appInfo.serviceUrl + 'users/removeProfileCover',reqData).success(function(data){
				deferred.resolve(data);
			}).error(function(data){
				deferred.reject(data);
			});

			return deferred.promise;
    	},

    	removeProfilePicture : function(reqData){
    		var deferred = $q.defer();

			$http.post(appInfo.serviceUrl + 'users/removeProfilePicture',reqData).success(function(data){
				deferred.resolve(data);
			}).error(function(data){
				deferred.reject(data);
			});

			return deferred.promise;
    	},

    	updateProfilePicture : function(reqData){
    		var deferred = $q.defer();

			$http.post(appInfo.serviceUrl + 'users/updateProfilePicture',reqData).success(function(data){
				deferred.resolve(data);
			}).error(function(data){
				deferred.reject(data);
			});

			return deferred.promise;
    	},

    	reportMedia : function(reqData){
			var deferred = $q.defer();

			$http.post(appInfo.serviceUrl + 'users/reportMedia',reqData).success(function(data){
				deferred.resolve(data);
			}).error(function(data){
				deferred.reject(data);
			});

			return deferred.promise;
		},

    	getFollowers : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'users/followersList',reqData).success(function (data) {
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

				//$http.post(appInfo.serviceUrl + 'users/getUserInterest',reqData).success(function (data) {
				$http.post(tmpJson.serviceUrl + 'getUserInterest.js',reqData).success(function (data) {
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

				//$http.post(appInfo.serviceUrl + 'expertise/userExpertise', reqData).success(function (data) {
				$http.post(appInfo.serviceUrl + 'expertise/userExpertise', reqData).success(function (data) {
					deferred.resolve(data);
				    //console.log("success" + data) ; return ; 
				}).error(function (data) {
					deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
			},

			FetchExpertise : function(reqData){
				var deferred = $q.defer();
				//$http.post(appInfo.serviceUrl + 'expertise/listExpertise',reqData).success(function (data) {
				$http.post(tmpJson.serviceUrl + 'listExpertise.js',reqData).success(function (data) {
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

			saveuserdetail : function(reqData){
				var deferred = $q.defer();
				$http.post(appInfo.serviceUrl + 'expertise/userTakeExpertise',reqData).success(function (data) {
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
                        
                        closeUserAccount : function(reqData){
                            var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'users/closeUserAccount',reqData).success(function (data) {
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