// JavaScript Document
//services.js

//Wall Services 
angular.module('App')
.factory('GroupwallService', function( $http, $q ,appInfo) {
		 // Return public API.
		 return {


    	Wallpost : function(reqData){
			var deferred = $q.defer();
            $.ajax({
              type: "POST",
              url: appInfo.serviceUrl + 'wallpost/createWallPost',
              data: reqData,
              success: function(response){
                  deferred.resolve(response);
                    }
            });

				return deferred.promise;
    	},
		
		deleteActivityComment : function(reqData){
			var deferred = $q.defer();

			$http.post(appInfo.serviceUrl + 'activity/deleteComment',reqData).success(function (data) {
			    deferred.resolve(data);
			    //alert("success" + data)
			}).error(function (data) {
			    deferred.reject(data);
			    //alert("error")
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

		privacyChange : function(reqData){
			var deferred = $q.defer();

			$http.post(appInfo.serviceUrl + 'activity/privacyChange',reqData).success(function (data) {
			    deferred.resolve(data);
			    //alert("success" + data)
			}).error(function (data) {
			    deferred.reject(data);
			    //alert("error")
			});

			return deferred.promise;
		},
			
		FlagActivity : function(reqData){
			var deferred = $q.defer();

			$http.post(appInfo.serviceUrl + 'flag',reqData).success(function (data) {
			    deferred.resolve(data);
			    //alert("success" + data)
			}).error(function (data) {
			    deferred.reject(data);
			    //alert("error")
			});

			return deferred.promise;
		},

    	GetWallpostService : function(reqData,typ){
			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + typ,reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
		GetWallpostcommentService : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'wallpost/GetWallPostDetail.json',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
		submitPostComment : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'activity/addComment',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
        SeeAllPostComments : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'activity/getAllComments',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
		RemoveActivity : function(reqData){
			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'activity/removeActivity',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
			},

		getGroupMembers : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'wallpost/GetMemberWallPost.json',reqData).success(function (data) {
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

				$http.post(appInfo.serviceUrl + 'activity/like',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
		Submitwall : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'wallpost/addWallPostComment',reqData).success(function (data) {
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

				$http.post(appInfo.serviceUrl + 'wallpost/deleteWallPost',reqData).success(function (data) {
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

				$http.post(appInfo.serviceUrl + 'wallpost/deleteWallComment',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
		Count_Like_Member : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'wallpost/CountLikeMember.json',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
		setting_compliment : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'wallpost/Set_Compliment.json',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
			NoOfCompliment : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'wallpost/count_compliment.json',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
        
        
        makeFavourite: function(reqData){
                var deferred = $q.defer();
                        $http.post(appInfo.serviceUrl + 'favourites/createUpdateFavourite',reqData).success(function (data) {
                            deferred.resolve(data);
                        }).error(function (data) {
                            deferred.reject(data);
                        });
                        return deferred.promise;

        },

        postLike: function(reqData){
                var deferred = $q.defer();
                        $http.post(appInfo.serviceUrl + 'activity/like',reqData).success(function (data) {
                            deferred.resolve(data);
                        }).error(function (data) {
                            deferred.reject(data);
                        });
                        return deferred.promise;

        },
    }
});



// DATE Format
angular.module('App')
.factory('setFormatDate', function () {
    return {
        getRelativeTime: function (date) {
           var str = date.split(" ")
           str = moment(date).startOf('second').fromNow();
            return str;
        }
    }
});