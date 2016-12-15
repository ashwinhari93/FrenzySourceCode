angular.module('App').controller('UserListCtrl', function($scope,Users,$timeout,$rootScope){

    $scope.buttonDisabled = false;
    $rootScope.disableFollowFollowingPagination = true;
    $scope.paginationbusyFollowFollowing = false;
	$scope.LoginSessionKey = '';
	$scope.allmembers = [];
	$scope.allmember = [];
	$scope.totalRecords = 0;

	$scope.FollowingPageNo = 1;
	$scope.FollowerPageNo = 1;
	$scope.FollowType = '';
	
	$scope.skey = '';
	if($('#LoginSessionKey').val()){
		$scope.LoginSessionKey=$('#LoginSessionKey').val();	
	}

	$scope.stopExecution = 0;
        
    $rootScope.getFollowFollowingUsers = function(term,event){      	
        if($scope.paginationbusyFollowFollowing)
            return;
        $rootScope.disablegetWardrobesPagination = true;
        $rootScope.disableActivityPagination = true;
        $rootScope.disableArticlePagination = true;
        $rootScope.disableFollowFollowingPagination = false;
        
        $scope.currentterm = term;

        $('.user-wall-pagecontent').hide();
        $('#user-wall-followers-following').show();
        
        $(".FollowFollowingUsers").removeClass("active");
        $(event.currentTarget).addClass("active");
        //$('#FollowersPageNo').val('1');
        //$('#FollowingPageNo').val('1');   
        $scope.FollowingPageNo=1;
        $scope.FollowerPageNo=1;
        $scope.allmembers=[];
        $scope.allmember=[];
        $scope.FollowType = term;
        $scope.getMemberFollow();
        
    }

    $scope.getMemberFollow = function()
	{

        $scope.userNotFoundFlag = false;
        $scope.paginationbusyFollowFollowing = true;

		var UID = '';
		if($('#UID').length>0){
			UID = $('#UID').val();
		}
		if($scope.FollowType=='Following'){
			PageNo = $scope.FollowingPageNo;
		}else if($scope.FollowType=='Followers'){
			PageNo = $scope.FollowerPageNo;
		}
		var reqData = {
			LoginSessionKey:$scope.LoginSessionKey,
			SearchKey:'',
			Type:$scope.FollowType,
			PageNo:PageNo,
			PageSize:10,
			UID:UID
		}

		Users.getUsers(reqData).then(function(response){
			if(response.ResponseCode==200){
				$scope.totalRecords = response.TotalRecords;
				if(response.TotalRecords>0)
				{
					var addElement = true;
                    $scope.QueryType = response.Type;
                    $scope.isSelf = response.Self;

	               for(var key in response.Data.Members){
						$scope.allmembers[key] = response.Data.Members[key];
					}
					$scope.allmember = $scope.allmembers.reduce(function(o, v, i) {o[i] = v;return o;}, {});

					if($scope.FollowType=='Following'){
						$scope.FollowingPageNo++;
					}else if($scope.FollowType=='Followers'){
						$scope.FollowerPageNo++;
					}
                    
					$('#showmember').css('display','block');
					$('#grpHasNoMember').css('display','none');
				
                    /*set total count in follow/followers head*/
                    if($scope.FollowType=='Followers'){
                        $('#followerUserCount').html(response.TotalRecords);
                    } else if($scope.FollowType=='Following'){
                        $('#followingUserCount').html(response.TotalRecords);
                    }
                    /*end set total count in follow/followers head*/
                    $scope.paginationbusyFollowFollowing = false;
				}
				else
				{	
					$scope.userNotFoundFlag = true;
					$('#showmember').css('display','none');
					$('#grpHasNoMember').css('display','block');
					$scope.paginationbusyFollowFollowing = false;
				}
                
                if(response.TotalRecords < (response.PageNo * response.PageSize)){
                    $rootScope.disableFollowFollowingPagination = true;
                    $scope.paginationbusyFollowFollowing = false;
                }                                                      
			} else {
				//Show Error Message
                $scope.paginationbusyFollowFollowing = false;
			}
		});		
	}

	$scope.searchmember = function(Type)
	{
        $scope.userNotFoundFlag = false;
        $scope.paginationbusyFollowFollowing = true;
        var Types = Type;
		setTimeout(function(){
			var SearchKey = $('#searchformember').val();
                        var Type = Types;
                        if(Type=='Undefined')
                            var Type = $('#Type').val();

			var pgid = '';
			if(Type=='Users'){
				pgid = 'UserPageNo';
			} else if(Type=='Friends'){
				pgid = 'FriendPageNo';
			} else if(Type=='Request'){
				pgid = 'PendingPageNo';
			} else if(Type=='Followers'){
				pgid = 'FollowersPageNo';
                $scope.stopExecution=0;
                $('.loader-signup').show();
			} else if(Type=='Following'){
				pgid = 'FollowingPageNo';
                $scope.stopExecution=0;
                $('.loader-signup').show();
			}
            $scope.allmembers = new Array();
            $scope.allmember = new Array();
                        
			if(Type=='Users' && SearchKey.length<2){
				$scope.allmember = new Array();
				$scope.stopExecution = 0;
				$('#'+pgid).val(1);
				PageNo = 1;
				return;
			}

			var PageNo = $('#'+pgid).val();
			if($scope.skey!==SearchKey){
				PageNo = 1;
				$('#'+pgid).val(1);
				$scope.allmembers = new Array();
				$scope.stopExecution = 0;
			}
			$scope.skey = SearchKey;
			var PageSize = '';
			if($('#wall_type').length>0){
				PageSize=8;
			}

			var UID = '';
			if($('#UID').length>0){
				UID = $('#UID').val();
			}

			var reqData = {
				LoginSessionKey:$scope.LoginSessionKey,
				SearchKey:SearchKey,
				Type:Type,
				PageNo:PageNo,
				PageSize:PageSize,
				UID:UID
			}

			//$(window).scrollTop(parseInt($(window).scrollTop())-10);
			if($scope.stopExecution==0){
				Users.getUsers(reqData).then(function(response){
					if(response.ResponseCode==200){
						$scope.totalRecords = response.TotalRecords;
						if(response.TotalRecords>0)
						{
							var addElement = true;
	                        $scope.QueryType = response.Type;
	                        $scope.isSelf = response.Self;
							for(var key in response.Data.Members){
								$scope.allmembers[key] = response.Data.Members[key];
								/*addElement = true;
								for(var arrKey in $scope.allmember){
									if($scope.allmember[arrKey].UserID==response.Data.Members[key].UserID){
										addElement = false;
									}	
								}
								if(addElement){
									$scope.allmembers.push(response.Data.Members[key]);	
								}*/
							}
							$scope.allmember = $scope.allmembers.reduce(function(o, v, i) {o[i] = v;return o;}, {});
	                                                            
	                        if(Type == $scope.previousPage && (Type=='Followers' || Type=='Following')){
	                            
	                            $scope.allmember = angular.extend($scope.allmember, $scope.oldValue);
	                        }
	                        
	                        $scope.oldValue = $scope.allmember; 
	                        //console.log(Type + ' '+$scope.previousPage );
	                        $scope.previousPage=Type;
	                        
							$('#showmember').css('display','block');
							$('#grpHasNoMember').css('display','none');
							var pNo = Math.ceil(response.TotalRecords/response.PageSize);
							if(pNo>$('#'+pgid).val()){
								newPageNo = parseInt(response.PageNo)+1;
				    			$('#'+pgid).val(newPageNo);
							} else {
								$scope.stopExecution=1;
							}
	                                                            
	                        /*set total count in follow/followers head*/
	                        if(Type=='Followers'){
	                            $('#followerUserCount').html(response.TotalRecords);    
	                                
	                        } else if(Type=='Following'){
	                            $('#followingUserCount').html(response.TotalRecords);   
	                        }
	                        /*end set total count in follow/followers head*/

						}
						else
						{	
							$scope.userNotFoundFlag = true;
							$('#showmember').css('display','none');
							$('#grpHasNoMember').css('display','block');
						}
                        
                        $('.loader-signup').hide();

                        if(response.TotalRecords < (response.PageNo * response.PageSize)){
                            $rootScope.disableFollowFollowingPagination = true;
                        }
                                                                
                                                               
					} else {
						//Show Error Message
                        $('.loader-signup').hide();
					}
					/*$scope.GroupName = response.Data.results[0].GroupName;
					$scope.Member = response.Data.results[0].count*/
				});
			}
		},500);
		$('.loader-signup').hide();
		$scope.paginationbusyFollowFollowing = false;
		$scope.stopExecution=1;
	}


	$scope.showProfileAction = true;
	$scope.getProfileUser = function(){
		var UserID = $('#UserID').val();
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,UserID:UserID}
		Users.getProfileUser(reqData).then(function(response){
			if(response.ResponseCode==200){
				$scope.profileUser = response.Data;
			}
		});
		/*$timeout(function(){
			$scope.showProfileAction = false;
		}, 1000)*/
	}


	$scope.getFriends = function(limit,UID){
		var UserID = '';
		if($('#UserID').length>0){
			UserID = $('#UserID').val();
		}
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,SearchKey:'',Type:'Friends',Limit:limit,UserID:UserID,UID:UID}
		Users.getFriends(reqData).then(function(response){
			if(response.ResponseCode==200){
				$scope.friends = response.Data.Members;
				$scope.noOfObj = response.TotalRecords;
				$scope.showFriendBox = response.Data.showFriendBox;

				if(!response.TotalRecords > 0){
					angular.element(document.getElementById('WallPostCtrl')).scope().isGetFriendsObj(true);
				}
			}
		});
	}

	$scope.removeFriend = function(friendid){
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,FriendID:friendid}
		Users.removeFriend(reqData).then(function(response){
			if(response.ResponseCode==200){
				if($('#UserWall').length>0){
					$scope.profileUser.FriendStatus=4;
				} else {
					$.each($scope.allmember,function(k,v){
						if($scope.allmember[k].UserID==friendid){
							$scope.allmember[k].FriendStatus=4;
						}
					});
				}
			}
		});
	}

	$scope.rejectRequest = function(friendid){
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,FriendID:friendid}
		Users.rejectRequest(reqData).then(function(response){
			if(response.ResponseCode==200){
				if($('#UserWall').length>0){
					$scope.profileUser.FriendStatus=4;
				} else {
					$.each($scope.allmember,function(k,v){
						if($scope.allmember[k].UserID==friendid){
							$scope.allmember[k].FriendStatus=4;
						}
					});
				}
			}
		});
	}

	$scope.denyRequest = function(friendid){
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,FriendID:friendid}
		Users.denyRequest(reqData).then(function(response){
			if(response.ResponseCode==200){
				if($('#UserWall').length>0){
					$scope.profileUser.FriendStatus=4;
				} else {
					$.each($scope.allmember,function(k,v){
						if($scope.allmember[k].UserID==friendid){
							$scope.allmember[k].FriendStatus=4;
						}
					});
				}
			}
		});
	}

	$scope.acceptRequest = function(friendid){
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,FriendID:friendid}
		Users.acceptRequest(reqData).then(function(response){
			if(response.ResponseCode==200){
				if($('#UserWall').length>0){
					$scope.profileUser.FriendStatus=1;
				} else {
					$.each($scope.allmember,function(k,v){
						if($scope.allmember[k].UserID==friendid){
							$scope.allmember[k].FriendStatus=1;
						}
					});
				}
			}
		});
	}

	$scope.sendRequest = function(friendid){
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,FriendID:friendid}
		Users.sendRequest(reqData).then(function(response){
			if(response.ResponseCode==200){
				if($('#UserWall').length>0){
					if(response.Data.Status==5){
						$scope.profileUser.FriendStatus=1;
					} else {
						$scope.profileUser.FriendStatus=2;
					}
				} else {
					$.each($scope.allmember,function(k,v){
						if($scope.allmember[k].UserID==friendid){
							if(response.Data.Status==5){
								$scope.allmember[k].FriendStatus=1;
							} else {
								$scope.allmember[k].FriendStatus=2;
							}
						}
					});
				}
			}
		});
	}

	$scope.follow = function(memberid,event)
	{       
        $('.loader-signup').show();
        $scope.buttonDisabled = true;
        var reqData = {LoginSessionKey:$scope.LoginSessionKey,MemberID:memberid,Type:'user'}
		Users.followUser(reqData).then(function(response){
			if(response.ResponseCode==200){
                            
                if(typeof event=="undefined"){
                    var buttonId = '#followmem'+memberid;
                    if($(buttonId).children('span').html().trim()=='Follow'){
                        $('#followmem'+memberid).find('span').text('Following');
                        $('#followmem'+memberid).find('span').addClass('following');
                        $('#followmem'+memberid).find('i').addClass('icon-check');
                        
                        var followingUserCount = $('#followingUserCount').html();
                        followingUserCount++;
                        $('#followingUserCount').html(followingUserCount);
					} else {
	                    $('#followmem'+memberid).find('span').text('Follow');
	                    $('#followmem'+memberid).find('span').removeClass('following');
	                    $('#followmem'+memberid).find('i').removeClass('icon-check');
	                    
	                    var followingUserCount = $('#followingUserCount').html();
	                    followingUserCount--;
	                    $('#followingUserCount').html(followingUserCount);
					}
                                
                }else{
                    if($('#followmem'+memberid).text().trim()=='Follow'){
                            $('#followmem'+memberid).children('span').html('Following');
                            $('#followmem'+memberid).find('span').addClass('following');
                            $('#followmem'+memberid).find('i').addClass('icon-check');
                            currentFollowCount = parseInt($('#user'+memberid).find('.grid-footer .folCount').html());
                            $('#user'+memberid).find('.grid-footer .folCount').html(currentFollowCount+1);
                            if(currentFollowCount+1==1){
                            	$('#user'+memberid).find('.grid-footer .folText').html('Follower');
                            }else{
                            	$('#user'+memberid).find('.grid-footer .folText').html('Followers');	
                            }
                            

                            
                        if($scope.isSelf == 1){
                            var followingUserCount = $('#followingUserCount').html();
                            followingUserCount++;
                            $('#followingUserCount').html(followingUserCount);
                        }
		
					} else {
	                                    
	                    $('#followmem'+memberid).children('span').html('Follow');
	                    $('#followmem'+memberid).find('span').removeClass('following');
	                    $('#followmem'+memberid).find('i').removeClass('icon-check');
	                    
	                    currentFollowCount = parseInt($('#user'+memberid).find('.grid-footer .folCount').html());
                        $('#user'+memberid).find('.grid-footer .folCount').html(currentFollowCount-1);
                        if(currentFollowCount-1==1){
                        	$('#user'+memberid).find('.grid-footer .folText').html('Follower');
                        }else{
                        	$('#user'+memberid).find('.grid-footer .folText').html('Followers');	
                        }


	                    if($scope.isSelf == 1){
	                        var followingUserCount = $('#followingUserCount').html();
	                        followingUserCount--;
	                        $('#followingUserCount').html(followingUserCount);
	                        
	                        if($scope.QueryType == 'Following'){
	                            delete $scope.allmember[memberid];
	                            
	                            if(Object.keys($scope.allmember).length==0){
	                                $('#FollowingPageNo').val('1');
	                                $scope.searchmember($scope.currentterm);
	                            }
	                            
	                            $(event.currentTarget).closest('li').remove();
	                        }
	                        
	                    }
						
					}
                    
                }
			}
		});
        $('.loader-signup').hide();
        $scope.buttonDisabled = false;
	}


    $scope.followUserOnOtherPage = function(memberid)
	{       
                $('.loader-signup').show();
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,MemberID:memberid,Type:'user'}
		Users.followUser(reqData).then(function(response){
			if(response.ResponseCode==200){
                            var memId = '#followmem'+memberid;
                            if($(memId).text().trim()=='Follow'){
                                    $('#followmem'+memberid).find('span').text('Following');
                                    $('#followmem'+memberid).find('span').addClass('following');
                                    $('#followmem'+memberid).find('i').addClass('icon-check');
                                    
                                    ////For following activity
                                    $('.followmemb'+memberid).children('span').html('Following');
                                    $('.followmemb'+memberid).find('i').addClass('icon-check');
                                    $('.followmemb'+memberid).addClass('following');

                                    var followingUserCount = $('#followerUserCount').html();
                                    followingUserCount++;
                                    //$('#followerUserCount').html(followingUserCount);
                                    $rootScope.follow.fnoOfObj += 1;
                                    

                            } else {
                                    $('#followmem'+memberid).find('span').text('Follow');
                                    $('#followmem'+memberid).find('span').removeClass('following');
                                    $('#followmem'+memberid).find('i').removeClass('icon-check');
                                    
                                    //for following activity 
                                    $('.followmemb'+memberid).children('span').html('Follow');
                                    $('.followmemb'+memberid).find('i').removeClass('icon-check');
                                    $('.followmemb'+memberid).removeClass('following');
                                    
                                    var followingUserCount = $('#followerUserCount').html();
                                    followingUserCount--;
                                    //$('#followerUserCount').html(followingUserCount);
                                    $rootScope.follow.fnoOfObj -= 1;
                                   
                            }
                            
                            
                            /*if(followingUserCount > 1){
                                $('#followerCountText').hide();
                                $('#followersCountText').show();
                            }else{
                                $('#followerCountText').show();
                                $('#followersCountText').hide();
                            }*/

			}
		});
                $('.loader-signup').hide();
	}

	if($('#UserPageNo').length>0 || $('#PendingPageNo').length>0 || $('#FriendPageNo').length>0 || $('#FollowingPageNo').length>0 || $('#FollowersPageNo').length>0){
		$(document).ready(function(){
			$(window).scroll(function() {
				var pScroll = $(window).scrollTop();
				var pageBottomScroll1 = parseInt($(document).height()) - parseInt($(window).height())-1;
				var pageBottomScroll2 = parseInt($(document).height()) - parseInt($(window).height());
				var pageBottomScroll3 = parseInt($(document).height()) - parseInt($(window).height())+1;
			   	if(pScroll == pageBottomScroll1 || pScroll == pageBottomScroll2 || pScroll == pageBottomScroll3) {
			       setTimeout(function(){
			       	if(pScroll == pageBottomScroll1 || pScroll == pageBottomScroll2 || pScroll == pageBottomScroll3){
					    $scope.searchmember();
			       	}
			       },200);
			   }
			});
		});
	}
});
