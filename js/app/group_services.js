
/*	Service(s)
===================================*/

// API URL

//// for group 

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

angular.module('App').factory('groupService', function( $http, $q ,appInfo) {
									 return {
		
		get_groupList: function(reqData){
			var d = $q.defer();
			
			$http.post(appInfo.serviceUrl + 'group/groups',reqData).success(function (data) {
				d.resolve(data);
				//console.log("Success: "+data);
			}).error(function(data){
				d.reject(data);
				//console.log("Error: "+data);
			});
			return d.promise;			
		},
		
		addGroupMember: function(reqData){
			var d = $q.defer();
			
			$http.post(appInfo.serviceUrl + 'group/addMemberToGroup',reqData).success(function (data) {
				d.resolve(data);
				//console.log("Success:"+data);
			}).error(function(data){
				d.reject(data);
				//console.log("Error:"+data);
			});
			return d.promise;			
		},
		
		join_drop_group : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'group/addMemberToGroup',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
    	get_groupMembersCount : function(reqData){
    		var deferred = $q.defer();

			$http.post(appInfo.serviceUrl + 'group/getGroupMembersCount',reqData).success(function (data) {
			    deferred.resolve(data);
			    //alert("success" + data)
			}).error(function (data) {
			    deferred.reject(data);
			    //alert("error")
			});

			return deferred.promise;
    	}
	};
		 
});

angular.module('App').factory('groupeditservice', function( $http, $q ,appInfo) {
		 // Return public API.
		 return {


    	get_groupdata : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'group/groupDetail',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	}
    }
});


angular.module('App').factory('createGroupService', function( $http, $q ,appInfo) {
		 // Return public API.
		 return {


    	createGroup : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'group/createUpdateGroup',reqData).success(function (data) {
				    deferred.resolve(data);
				   // alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
		GroupFormDetail : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'group/groupDetail',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
		UpdateGroupData : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'group/createUpdateGroup',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	}
		
		
    }
});


angular.module('App').factory('Group_member_service', function( $http, $q ,appInfo) {
		 // Return public API.
		 return {


    	getmember : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'group/groupMembers',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
		remove_member : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'group/removeMembersGroup',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	}	
    }
});

angular.module('App').factory('GroupwallService', function( $http, $q ,appInfo) {
		 // Return public API.
		 return {


    	Wallpost : function(reqData){

			var deferred = $q.defer();

				$http.post(base_url + 'api_wallpost/createWallPost.json',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
		
    	GetWallpostService : function(reqData){

			var deferred = $q.defer();

				$http.post(base_url + 'api_wallpost/getWallPostList.json',reqData).success(function (data) {
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

				$http.post(base_url + 'api_wallpost/getWallPostDetail.json',reqData).success(function (data) {
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

				$http.post(appInfo.serviceUrl + 'wallpost/addWallPostComment',reqData).success(function (data) {
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

				$http.post(base_url + 'api_wallpost/getMemberWallPost.json',reqData).success(function (data) {
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

				$http.post(base_url + 'api_wallpost/likeWallPost.json',reqData).success(function (data) {
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

				$http.post(base_url + 'api_wallpost/addWallPostComment.json',reqData).success(function (data) {
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

				$http.post(base_url + 'api_wallpost/deleteWallPost.json',reqData).success(function (data) {
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

				$http.post(base_url + 'api_wallpost/deleteWallcomment.json',reqData).success(function (data) {
				    deferred.resolve(data);
				    //alert("success" + data)
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
    }
});

angular.module('App').factory('InviteMemberservice', function( $http, $q ,appInfo) {
									 return {
		
		get_groupName: function(reqData){
			var d = $q.defer();
			
			$http.post(appInfo.serviceUrl + 'group/groups',reqData).success(function (data) {
				d.resolve(data);
				//console.log("Success: "+data);
			}).error(function(data){
				d.reject(data);
				//console.log("Error: "+data);
			});
			return d.promise;			
		},
		
		get_userlist : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'group/allMembers',reqData).success(function (data) {
				    deferred.resolve(data);
				   // alert("success" + data) return ; 
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	},
		
		add_to_group : function(reqData){

			var deferred = $q.defer();

				$http.post(appInfo.serviceUrl + 'group/addMemberToGroup',reqData).success(function (data) {
				    deferred.resolve(data);
				   // alert("success" + data) return ; 
				}).error(function (data) {
				    deferred.reject(data);
				    //alert("error")
				});

				return deferred.promise;
    	}
	};
		 
});

