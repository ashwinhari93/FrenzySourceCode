// JavaScript Document
//Wall controller 
angular.module('App')
    .controller('WallPostCtrl', function($scope, $timeout, GroupwallService, setFormatDate,$rootScope) {
$scope.showItem = false;
        $scope.listData = [];
        $scope.busy = false;
        $scope.circleLoader = false;
        $scope.Comments = [];
        $scope.isViewAllClicked = 0;
        wallScroll = 0;
        $scope.TotalComments = 0;

        $scope.SubmitWallpost = function() {
            if ($('#post_type').val()) {
                var posttypeid = $('#post_type').val();
                $('#post_type_id').val(posttypeid);

            }
            if ($('#PostContent').val() == '') {
                $('#posterror').text('Please enter text.');
                return false;
            }
            var jsonData = {};
            var formData = $("#wallpostform").serializeArray();
            console.log(formData);
            $.each(formData, function() {
                if (jsonData[this.name]) {
                    if (!jsonData[this.name].push) {
                        jsonData[this.name] = [jsonData[this.name]];
                    }
                    jsonData[this.name].push(this.value || '');
                } else {
                    jsonData[this.name] = this.value || '';
                }

                var PContent = $('.textntags-beautifier div').html();
                jQuery('strong').each(function(e){
                    var userid = $('.textntags-beautifier div strong:eq('+e+') span').attr('class');
                    userid = userid.split('-')[1];
                    PContent = PContent.replace('<strong><span class="user-'+userid+'">'+$('strong:eq('+e+') span').text()+'</span></strong>', '{{'+userid+'}}');
                });
                jsonData['PostContent'] = PContent;

            });
            GroupwallService.Wallpost(jsonData).then(function(response) {
                $('#PostContent').val('');
                $('#posterror').text('');
                $('#noOfCharPostContent').text('0');
                $('#wallphotocontainer ul').html('');
                $('.textntags-beautifier div').html('');
                response.Data[0]['append'] = 1;
                $scope.activityData.unshift(items = response.Data[0]);
                $timeout(function (argument) {
                    //wallPostActivity();
                },1000);

                //angular.element(document.getElementById('WallPostCtrl')).scope().wallslider();
            })
        }

        $scope.submitComment = function(ActivityGuID,ActivityType) {
            var Comment = $("#project_comment").val();
            Comment = Comment.trim();
            if(Comment!==''){
                $('.loader-signup').show();
                var LoginSessionKey = $('#LoginSessionKey').val();
                //console.log(ActivityType);
                jsonData = {LoginSessionKey:LoginSessionKey,Comment:Comment,ActivityType:ActivityType,ActivityGuID:ActivityGuID};
                GroupwallService.submitPostComment(jsonData).then(function(response) {
                    $scope.SeeAllPostComments(ActivityGuID,ActivityType,4)
                    //$scope.Comments.push(response.Data);
                    $scope.TotalComments = parseInt($scope.TotalComments + 1);
                    
                    var idName = '#'+ActivityType+'NoOfComments';
                    $(idName).html($scope.TotalComments);
                    //console.log($scope.Comments);
                    $("#project_comment").val('');
                    $("#project_comment").height(62);
                    $('.loader-signup').hide();
                    

                });
            }
        }

        $scope.stopExecution=0;
        $scope.activityData=new Array();


        // $scope.$on('GetwallPostEvent', function (event, data) {
        //     console.log(data)
        //     $scope.GetwallPost(data)
        // });

        $scope.GetwallPost = function(typ) {
            // if ($scope.busy) return;
            // $scope.busy = true;
            // $scope.circleLoader = !$scope.circleLoader
            wallScroll = 0;
            stopScroll1 = 0;
            $scope.GroupId = '';
            $scope.LoginSessionKey = 'be910687110585d6ae28a06bbc82ed8b';
            if ($('#hdn_entity_id').val()) {
                $scope.EntityID = $('#hdn_entity_id').val();
            }
            if ($('#LoginSessionKey').val()) {
                $scope.LoginSessionKey = $('#LoginSessionKey').val();
            }
            var offset = $('.offsetc').length;
            if ($('#post_type').val()) {
                $scope.PostTypeID = $('#post_type').val();
            }

            var WallType = $('#wall_type').val();

            $scope.PageNo = $('#WallPageNo').val();
            if($scope.PageNo == '1'){
                $scope.activityData = [];
                $scope.stopExecution = 0;
            }
            var UserID = $('#UserID').val();

            var ActivityGuID = $('#ActivityGuID').val();

            var reqData = {
                Offset: offset,
                EntityID: $scope.EntityID,
                LoginSessionKey: $scope.LoginSessionKey,
                PostType: $scope.PostTypeID,
                EntityID: $scope.EntityID,
                PageNo: $scope.PageNo,
                WallType: WallType,
                EntityType: 'Post',
                UserID: UserID,
                ActivityGuID: ActivityGuID
            };

            //{"LoginSessionKey":"be910687110585d6ae28a06bbc82ed8b","PageNo":"1"}
            if($scope.stopExecution==0){
                $(window).scrollTop(parseInt($(window).scrollTop())-20);
                GroupwallService.GetWallpostService(reqData,typ).then(function(response) {
                    if(response.ResponseCode == 200){
                        $('.spinner').hide();
                        // $scope.busy = false;
                        newData = response.Data;
                        console.log(response.Data);
                        for(var nData in newData){
                            if(newData[nData].ExtraParams.Entity!==null){
                                $scope.activityData.push(newData[nData]);
                            } else {
                                $scope.stopExecution=1;
                                stopScroll1 = 1;
                            }
                        }

                        // $scope.circleLoader = false;

                        var pNo = Math.ceil(response.TotalRecords/response.PageSize);
                        
                        if(pNo>$('#WallPageNo').val()){
                            
                        } else {
                            $scope.stopExecution=1;
                            stopScroll1 = 1;
                        }
                        newPageNo = parseInt(response.PageNo)+1;
                        $('#WallPageNo').val(newPageNo);

                    $timeout(function() {
                    if(stopScroll1 == 0)
                    wallScroll = 1;
                }, 500);
                    } else {
                        // Error 
                    }
                }, function(error){
                    // Error
                })

            }

           
        }

        $(document).ready(function(){
            $(window).scroll(function() {
                var pScroll = $(window).scrollTop();
                var pageBottomScroll1 = parseInt($(document).height()) - parseInt($(window).height())-1;
                var pageBottomScroll2 = parseInt($(document).height()) - parseInt($(window).height());
                var pageBottomScroll3 = parseInt($(document).height()) - parseInt($(window).height())+1;
                
               //  if(pScroll == pageBottomScroll1 || pScroll == pageBottomScroll2 || pScroll == pageBottomScroll3) {
               //     setTimeout(function(){
               //      if(pScroll == pageBottomScroll1 || pScroll == pageBottomScroll2 || pScroll == pageBottomScroll3){
               //          $scope.GetwallPost();
               //      }
               //     },200);
               // }
            });
        });

        $scope.loadMore = function() {
            angular.element(document.getElementById('WallPostCtrl')).scope().GetwallPost();

        }

        $scope.SeeAllPostComments = function(ActivityGuID, ActivityType, PageSize) {
           
            $('.loader-signup').show();
            var LoginSessionKey = $('#LoginSessionKey').val();
            var reqData = {LoginSessionKey:LoginSessionKey,ActivityGuID:ActivityGuID,ActivityType:ActivityType,PageSize:PageSize};
            //var tempComntData = {};
            $scope.Comments = [];
            
            GroupwallService.SeeAllPostComments(reqData).then(function(response) {
                
                if(response.ResponseCode == 200){
                    var tempComntData = response.Data;
                    $scope.TotalComments = response.TotalRecords;
                    for (j in tempComntData) {
                        $scope.Comments.push(tempComntData[j]);
                    }
                    $scope.isViewAllClicked = 1;
                    
                if(PageSize == 0){
                    setTimeout(function(){
                        $('html, body').animate({scrollTop:$(document).height()}, 'slow');
                    }, 500);
                }
                $('.loader-signup').hide();
                }//console.log($scope.Comments);
               
            });

        }
        
        $scope.confirmDeleteComment = function (CommentGuID,ActivityGuID,ActivityType) {
            $scope.CommentGuIDToRemove = CommentGuID;
            $scope.ActivityGuIDToRemove = ActivityGuID;
            $scope.ActivityTypeToRemove = ActivityType;
            openPopDiv('removecomment');
        }
        
        
        $scope.deleteComment = function (CommentGuID,ActivityGuID,ActivityType) {
            $scope.CommentGuIDToRemove = '';
            $scope.ActivityGuIDToRemove = '';
            $scope.ActivityTypeToRemove = '';
            
            $('.loader-signup').show();
            var LoginSessionKey = $('#LoginSessionKey').val();
            jsonData = {LoginSessionKey:LoginSessionKey,CommentGuID:CommentGuID,ActivityGuID:ActivityGuID,ActivityType:ActivityType};
            
            GroupwallService.deleteActivityComment(jsonData).then(function(response){
                var aid = '';
                var cid = '';
                if(response.ResponseCode==200){
                    var page_size = 4;
                    if($scope.isViewAllClicked == 1)
                        var page_size = 0;
                    $scope.SeeAllPostComments(ActivityGuID,ActivityType,page_size);
                    
                    $scope.TotalComments = parseInt($scope.TotalComments - 1);
                    var idName = '#'+ActivityType+'NoOfComments';
                    $(idName).html($scope.TotalComments);
                    
                    alertify.success('Comment Removed Successfully.');
                    //console.log(response);
                }
                closePopDiv('removecomment');
                $('.loader-signup').hide();
            });

        }

        $scope.$on('deleteCommentEmit', function (obj,CommentGuID,ActivityGuID) {
            var LoginSessionKey = $('#LoginSessionKey').val();
            jsonData = {LoginSessionKey:LoginSessionKey,CommentGuID:CommentGuID,ActivityGuID:ActivityGuID};
            alertify.confirm("Are you sure, You want to delete this comment", function (e) {
                if (e) { 
                    GroupwallService.deleteActivityComment(jsonData).then(function(response){
                        var aid = '';
                        var cid = '';
                        if(response.ResponseCode==200){
                            $($scope.activityData).each(function(key,value){
                                if($scope.activityData[key].ActivityGuID==ActivityGuID){
                                aid = key;
                                    $($scope.activityData[aid].Comments).each(function(ckey,cvalue){
                                        if($scope.activityData[aid].Comments[ckey].CommentGuID==CommentGuID){
                                            cid = ckey;
                                            $scope.activityData[aid].Comments.splice(cid,1); 
                                            $scope.activityData[aid].NoOfComments = parseInt($scope.activityData[aid].NoOfComments)-1;
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });

        $scope.$on('reportMediaEmit', function(obj,ActivityID){
            var LoginSessionKey = $('#LoginSessionKey').val();
            var Description = $('#reportAbuseDesc'+ActivityID).val();
            jsonData = {LoginSessionKey:LoginSessionKey,ActivityID:ActivityID,Type:'Activity',Description:Description};
            GroupwallService.reportMedia(jsonData).then(function(response){
                if(response.ResponseCode==200){
                    alertify.success('Media Reported');
                }
            });
        });

        $scope.$on('privacyEmit', function (event,ActivityGuID,privacy) {
            var LoginSessionKey = $('#LoginSessionKey').val();
            jsonData = {LoginSessionKey:LoginSessionKey,ActivityGuID:ActivityGuID,VisibleFor:privacy};
            GroupwallService.privacyChange(jsonData).then(function(response) {
                if(response.ResponseCode==200){
                    $($scope.activityData).each(function(key,value){
                        if($scope.activityData[key].ActivityGuID==ActivityGuID){
                            $scope.activityData[key].VisibleFor = privacy;
                        }
                    });
                }
            });
        });

        $scope.$on('commentEmit', function (obj,event,ActivityGuID) {
            if(event.which==13){
                var Comment = $('#cmt-'+ActivityGuID).val();
                if(Comment!==''){
                    var LoginSessionKey = $('#LoginSessionKey').val();
                    jsonData = {LoginSessionKey:LoginSessionKey,Comment:Comment,ActivityType:'Activity',ActivityGuID:ActivityGuID};
                    GroupwallService.submitPostComment(jsonData).then(function(response) {
                        $($scope.activityData).each(function(key,value){
                            if($scope.activityData[key].ActivityGuID==ActivityGuID){
                               // $scope.activityData[key].Comments[0] = response.Data[0];
                               console.log($scope.activityData[key].Comments);
                                var newArr = new Array();
                                $($scope.activityData[key].Comments).each(function(k,value){
                                    newArr.push($scope.activityData[key].Comments[k]);
                                });
                                newArr.push(response.Data[0]);
                                $scope.activityData[key].Comments = newArr.reduce(function(o, v, i) {o[i] = v;return o;}, {});
                                $scope.activityData[key].Comments = newArr;
                               // $scope.activityData[key].Comments = $scope.activityData[key].Comments[0];
                                $scope.activityData[key].NoOfComments = parseInt($scope.activityData[key].NoOfComments)+1;
                                $scope.activityData[key].comntData = $scope.$broadcast('appendComntEmit', $scope.activityData[key].Comments); //getPostComments($scope.activityData[key].Comments);
                                $('#cmt-'+ActivityGuID).val('');
                            }
                        });
                    });
                }
            }
        });
        
        // Post Like 
        $scope.$on('likeEmit', function (event,ActivityGuID) {
            var LoginSessionKey = $('#LoginSessionKey').val();

            var reqData = {
                ActivityGuID: ActivityGuID,
                LoginSessionKey: LoginSessionKey,
                ActivityType: 'Activity'
            };

            //{"LoginSessionKey":"be910687110585d6ae28a06bbc82ed8b","PageNo":"1"}
            GroupwallService.DoLike(reqData).then(function(response) {
                if(response.ResponseCode == 200){
                    $($scope.activityData).each(function(key,value){
                        if($scope.activityData[key].ActivityGuID==ActivityGuID){
                            if($scope.activityData[key].IsLike==1){
                                $scope.activityData[key].IsLike=0;
                                $scope.activityData[key].NoOfLikes--;
                            } else {
                                $scope.activityData[key].IsLike=1;
                                $scope.activityData[key].NoOfLikes++;
                            }
                        }
                    });
                } else {
                    // Error 
                }
            }, function(error){
                // Error
            });
        });
        // Post Flag
        $scope.$on('flagEmit', function (event,id) {
            var LoginSessionKey = $('#LoginSessionKey').val();
            reqData = {'TypeID':id,'Type':'Activity','LoginSessionKey':LoginSessionKey};
            GroupwallService.FlagActivity(reqData).then(function(response){
                if(response.ResponseCode == 200){                       
                    for(i in  $scope.activityData){
                        if($scope.activityData[i].ActivityID == id){
                            if($scope.activityData[i].ExtraParams.Entity.IsFlagged==1){
                                $scope.activityData[i].ExtraParams.Entity.IsFlagged = 0;
                            } else {
                                $scope.activityData[i].ExtraParams.Entity.IsFlagged = 1;
                            }
                        }
                    }
                }
            });
        });
        // Post Delete
        $scope.$on('deleteEmit', function (event, id) {
            console.log("Call above webservice here for Delete"); // Call above webservice here for Delete
            var myid = '';
            for(i in $scope.activityData) {
                    if($scope.activityData[i].ActivityID == id) {
                            myid = i;
                            alertify.confirm("Are you sure, You want to delete this post", function (e) {
                                if (e) { 

                                    var LoginSessionKey = $('#LoginSessionKey').val();

                                    var reqData = {
                                        ActivityID: id,
                                        LoginSessionKey: LoginSessionKey
                                    };
                                    GroupwallService.RemoveActivity(reqData).then(function(response) {
                                        if(response.ResponseCode == 200){
                                            
                                            $scope.activityData.splice(myid,1); 
                                        }
                                    });
                                    
                                    
                                    }
                            });
                    }
                }
        });


        // View All Comments
        $scope.$on('viewAllComntEmit', function (event, i,ActivityGuID) {
        //    console.log("Call above webservice here for View All Comments"); // Call above webservice here for View All Comments
            var LoginSessionKey = $('#LoginSessionKey').val();
            var reqData = {LoginSessionKey:LoginSessionKey,ActivityGuID:ActivityGuID};
            //var tempComntData = {};
            GroupwallService.SeeAllPostComments(reqData).then(function(response) {
                if(response.ResponseCode == 200){
                    var tempComntData = response.Data;
                    $scope.activityData[i].Comments = [];

                    for (j in tempComntData) {
                        $scope.activityData[i].Comments.push(tempComntData[j]);
                    }
                    returnObj = $scope.activityData[i].Comments
                    $scope.$broadcast('updateComntEmit', returnObj);
                }
            });
            
        });

        

        $scope.likepost = function(ActivityGuID) {
            
            var LoginSessionKey = $('#LoginSessionKey').val();

            var reqData = {
                ActivityGuID: ActivityGuID,
                LoginSessionKey: LoginSessionKey,
            };

            //{"LoginSessionKey":"be910687110585d6ae28a06bbc82ed8b","PageNo":"1"}
            GroupwallService.DoLike(reqData).then(function(response) {
                if(response.ResponseCode == 200){
                    $($scope.activityData).each(function(key,value){
                        if($scope.activityData[key].ActivityGuID==ActivityGuID){
                            if($scope.activityData[key].IsLike==1){
                                $scope.activityData[key].IsLike=0;
                            } else {
                                $scope.activityData[key].IsLike=1;
                            }
                        }
                    });
                } else {
                    // Error 
                }
            }, function(error){
                // Error
            });
        }

        $scope.SubmitWallCommentpost = function() {

                var jsonData = {};
                var formid = $('#formid').val();
                var formData = $("#innercommentarea" + formid).serializeArray();
                $.each(formData, function() {
                    if (jsonData[this.name]) {
                        if (!jsonData[this.name].push) {
                            jsonData[this.name] = [jsonData[this.name]];
                        }
                        jsonData[this.name].push(this.value || '');
                    } else {
                        jsonData[this.name] = this.value || '';
                    }

                });
                // console.log(jsonData);
                GroupwallService.Submitwall(jsonData).then(function(response) {

                    //$scope.GetwallPost() ; 
                })
            },

            $scope.DeleteWallPost = function(PostGuID) {
                $scope.LoginSessionKey = '';
                if ($('#LoginSessionKey').val()) {
                    $scope.LoginSessionKey = $('#LoginSessionKey').val();
                }
                $scope.postguid = '';
                if ($('#postGuid').val()) {
                    $scope.postguid = $('#postGuid').val();
                }
                if ($('#post_type').val()) {
                    $scope.posttypeid = $('#post_type').val();
                }
                if ($('#hdn_entity_id').val()) {
                    $scope.hdn_entity_id = $('#hdn_entity_id').val();
                }
                reqData = {
                    EntityID: $scope.hdn_entity_id,
                    LoginSessionKey: $scope.LoginSessionKey,
                    PostGuID: $scope.postguid,
                    PostType: $scope.posttypeid
                };
                GroupwallService.delete_wall_post(reqData).then(function(response) {
                    //$scope.message = response.DeleteWallPost.Message;
                    $('.close').trigger('click');
                    //$('#postuserpost'+PostGuID).remove();					
                    //alertify.success('Message Deleted Successfully.');
                    //$scope.GetwallPost() ;
                    $('#' + $scope.postguid).remove();
                });
            }

        $scope.DeleteWallcomment = function() {
            $scope.LoginSessionKey = '';
            if ($('#LoginSessionKey').val()) {
                $scope.LoginSessionKey = $('#LoginSessionKey').val();
            }
            $scope.postguid = '';
            if ($('#postGuid').val()) {
                $scope.postguid = $('#postGuid').val();
            }
            if ($('#post_type').val()) {
                $scope.posttypeid = $('#post_type').val();
            }
            if ($('#hdn_entity_id').val()) {
                $scope.hdn_entity_id = $('#hdn_entity_id').val();
            }
            var pid = $('#postParent').val();

            reqData = {
                EntityID: $scope.hdn_entity_id,
                LoginSessionKey: $scope.LoginSessionKey,
                PostGuID: $scope.postguid,
                PostType: $scope.posttypeid
            };
            GroupwallService.delete_wall_comment(reqData).then(function(response) {

                $('#commentid' + pid).text(response.Data.PostCommentCount);
                $('#commentwrapper' + $scope.postguid).remove();
                $('.close').trigger('click');

                for (var i = 0; i < $scope.listData.length; i++) {
                    if ($scope.listData[i].PostGuID == pid) {
                        for (var j = 0; j < $scope.listData[i].Comment.length; j++) {
                            if ($scope.listData[i].Comment[j].PostCommentGuID == $scope.postguid) {
                                $scope.listData[i].Comment.splice(j, 1);
                                return;
                            }
                        }
                        return;
                    }
                }
                //$scope.GetwallPost() ; 


            });
        }

        $scope.Count_LikeMember = function() {
            if ($('#postGuid').val()) {
                $scope.postguid = $('#postGuid').val();
            }
            reqData = {
                PostGuID: $scope.postguid
            };
            GroupwallService.Count_Like_Member(reqData).then(function(response) {
                if (response.ResponseCode == 200) {
                    var totalreords = response.totalrecords;
                    if (totalreords > 0) {
                        $scope.LikeCountOfUsers = totalreords;
                        $scope.listDataUser = [];
                        $scope.listDataUser.push(response.Data);
                        console.log($scope.listDataUser);
                    }
                } else {
                    alert(response.Message);
                }
                // alertify.success('Message Deleted Successfully.');
                //$scope.GetwallPost() ; 
            });
        }


        $scope.set_Compliment = function() {

            $scope.LoginSessionKey = '';
            if ($('#LoginSessionKey').val()) {
                $scope.LoginSessionKey = $('#LoginSessionKey').val();
            }
            $scope.postguid = '';
            if ($('#postGuid').val()) {
                $scope.postguid = $('#postGuid').val();
            }
            $scope.complimenttype = '';
            if ($('#compliment').val()) {
                $scope.complimenttype = $('#compliment').val();
            }


            reqData = {
                LoginSessionKey: $scope.LoginSessionKey,
                PostGuID: $scope.postguid,
                ComplimentType: $scope.complimenttype
            };
            GroupwallService.setting_compliment(reqData).then(function(response) {
                console.log(response);
                $('.close').trigger('click');
                // alertify.success('Message Deleted Successfully.');
                //$scope.GetwallPost() ; 


            });
        }

        $scope.Count_compliment = function() {
            if ($('#postGuid').val()) {
                $scope.postguid = $('#postGuid').val();
            }
            reqData = {
                PostGuID: $scope.postguid
            };
            GroupwallService.NoOfCompliment(reqData).then(function(response) {
                console.log(response)

                // alertify.success('Message Deleted Successfully.');
                //$scope.GetwallPost() ; 


            });
        }

        $scope.wallslider = function() {
            setTimeout(function() {
                $(".slider").bxSlider({
                    slideWidth: 210,
                    minSlides: 2,
                    maxSlides: 3,
                    slideMargin: 10,
                    pager: false,
                    moveSlides: 1,
                    infiniteLoop: false,
                    auto: false,
                });
                $(".slider").show();
            });
        }


        /*Composer Box*/
        $scope.composerOnFocus = function(){
        	$('#PostContent').height(50);
        	$('#composerCtrl').show()
        }
        
        
        
        
        
        
        
        
        
        $scope.makeFavouriteAction = true;
	$scope.makeFavourite = function(StatusID, EntityGuID, index){
		var check = 'single';
		if(index !== ''){
			check = 'array';
            //console.log(index);
		}	
        reqData={LoginSessionKey:$scope.LoginSessionKey,EntityGuID:EntityGuID,StatusID:StatusID,EntityType:'Article'};
        GroupwallService.makeFavourite(reqData).then(function(response){
        //console.log($scope.activityData[index].ExtraParams.Entity.NoOfFavourites);
        if(check == 'array'){
        //$scope.projectlist[0].ObjUsers[index].NoOfFavourites = response.NoOfFavourites;
     	//$scope.projectlist[0].ObjUsers[index].Favourite = response.Favourite;
        $scope.activityData[index].ExtraParams.Entity.NoOfFavourites = response.NoOfFavourites;
        $scope.activityData[index].ExtraParams.Entity.Favourite = response.Favourite;
     	}else{
	        $scope.NoOfFavourites = response.NoOfFavourites;
	        $scope.Favourite = response.Favourite;
        }
        });
        
        $timeout(function(){
			$scope.makeFavouriteAction = false;
		}, 1000)
    }
    
    $scope.getDateFormate = function (date){
                return setFormatDate.getRelativeTime(date)
            }

    $scope.postLikeAction = true;
	$scope.postLike = function(EntityGuID, LikeIndex){
		var check = 'single';
		if(LikeIndex !== ''){
			check = 'array';
		}	
        reqData={LoginSessionKey:$scope.LoginSessionKey,ActivityGuID:EntityGuID,ActivityType:'Article'};
        GroupwallService.postLike(reqData).then(function(response){
    	//console.log(response);
		//console.log('LikeCount If', scope.projectlist[0].ObjUsers[LikeIndex])
		if(check == 'array'){
        $scope.activityData[LikeIndex].ExtraParams.Entity.NoOfLikes = response.NoOfLikes;
        $scope.activityData[LikeIndex].ExtraParams.Entity.Like = response.Like;
			//$scope.projectlist[0].ObjUsers[LikeIndex].NoOfLikes = response.NoOfLikes;
	        //$scope.projectlist[0].ObjUsers[LikeIndex].Like = response.Like;			
		}else{
	        $scope.NoOfLikes = response.NoOfLikes;
	        $scope.Like = response.Like;
        }
        });
        
        $timeout(function(){
			$scope.postLikeAction = false;
		}, 1000)
    }
    
    // Like and Favourite Emit function :: Start
    $scope.$on('projectlistLikeEmit', function(ev, ArticleGuID, index){
        if(true){
           $scope.postLike(ArticleGuID, index);
        } else {
           signIn();
        }
    })
    
    $scope.$on('projectlistFavouriteEmit', function(ev, FavouriteID, ArticleGuID, index){
        if(true){
           $scope.makeFavourite(FavouriteID, ArticleGuID, index);
        } else {
           signIn();
        }
    })
    // Like and Favourite Emit function :: End
              
        
        
    });


function like(postguid) {
    $('#postGuid').val(postguid);
    angular.element(document.getElementById('WallPostCtrl')).scope().likepost();
}

function deleteComment(postguid) {
    $('#postGuid').val(postguid);
    $('#systemDicisionAlert').attr('lang', 'DeleteWallPost');
    //angular.element(document.getElementById('WallPostCtrl')).scope().DeleteWallPost();	
}

function activeuserform(ids) {
    $('#comenntformid').val(ids);

    if ($('#PostComment' + ids).val() == '' || $('#PostComment' + ids).val() == 'Post a comment') {
        $('#posterror' + ids).text('Please enter comment.');
        return;
    }
    if ($('#post_type').val()) {
        var posttype = $('#post_type').val();
        $('#postytype_insideform').val(posttype);
    }
    angular.element(document.getElementById('WallPostCtrl')).scope().submitComment();
}

function deleteUserComment(postguid, pid) {
    $('#postParent').val(pid);
    $('#postGuid').val(postguid);
    $('#systemDicisionAlert').attr('lang', 'deleteUserComment');
    //angular.element(document.getElementById('WallPostCtrl')).scope().DeleteWallcomment();	
}

function dodelete() {
    var alertid = $('#systemDicisionAlert').attr('lang');
    if (alertid == 'DeleteWallPost') {
        angular.element(document.getElementById('WallPostCtrl')).scope().DeleteWallPost();
    } else {
        angular.element(document.getElementById('WallPostCtrl')).scope().DeleteWallcomment();
    }
}

function donothing() {
    $('.close').trigger('click');
}

function likecount(id) {

    $('#postGuid').val(id);
    angular.element(document.getElementById('WallPostCtrl')).scope().Count_LikeMember();
}

function setCompliment(data, str) {
    $('#compliment').val(str);
    $('#postGuid').val(data.lang);
    angular.element(document.getElementById('WallPostCtrl')).scope().set_Compliment();
}

function complimentcount(postid) {

    $('#postGuid').val(postid.lang);
    angular.element(document.getElementById('WallPostCtrl')).scope().Count_compliment();
    $("#ShowComplimentStats").trigger("click");
}


$(function() {
    function removeThisMedia(ths) {
        $(ths).parent('li').remove();

    }
    var errorHandler = function(event, id, fileName, reason) {
        //alert(reason);
        //qq.log("id: " + id + ", fileName: " + fileName + ", reason: " + reason);
    };


    new qq.FineUploaderBasic({
        multiple: true,
        autoUpload: true,
        button: $("#addMedia")[0],
        request: {
            endpoint: site_url + "uploadimage/uploadFile",
            params: {
                type: 'wall',
                unique_id: function() {
                    return '';
                }
            }
        },

        validation: {
            allowedExtensions: ['jpeg', 'jpg', 'gif', 'png', 'JPEG', 'JPG', 'GIF', 'PNG'],
            sizeLimit: 4194304 // 4mb
        },
        callbacks: {
            onError: errorHandler,
            onUpload: function(id, fileName) {
                $('#loader').show();


                //$("#wall_share_thought").attr("disabled", "disabled");

                // alert('success');
            },
            onProgress: function(id, fileName, loaded, total) {

            },
            onComplete: function(id, fileName, responseJSON) {

                if (responseJSON.result == 'success') {
                    $('#wallphotocontainer ul').prepend('<li><a href="javascript:void(0);" class="close-pic color-red" onclick="$(this).parent(\'li\').remove();"><i class="fa fa-close font18"></i></a> <img src="' + responseJSON.thumb + '" alt="" class="superbox-img"><input type="hidden" name="WallMedia[]" value="' + responseJSON.file_name + '"/><input type="hidden" name="MediaSize[]" value="' + responseJSON.size + '"/></li>');
                }
                $('#wallphotocontainer').show();
                $('#loader').hide();


            },

            onValidate: function(b) {
                var validExtensions = ['jpeg', 'jpg', 'gif', 'png', 'JPEG', 'JPG', 'GIF', 'PNG']; //array of valid extensions
                var fileName = b.name;
                var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
                if ($.inArray(fileNameExt, validExtensions) == -1) {
                    alertify.error("Allowed file type only jpeg,jpg,gif and png .");
                    $(".alertify-message").css('padding-bottom', '10px');
                    $(".alertify-buttons").css('float', 'none');
                    return false;
                }
                if (b.size > 4194304) {
                    alertify.error('Files must be less than 4 MB.');
                    $(".alertify-message").css('padding-bottom', '10px');
                    $(".alertify-buttons").css('float', 'none');
                }

            }
        }
    });

    //Add Video
    new qq.FineUploaderBasic({
        multiple: true,
        autoUpload: true,
        button: $("#addVideo")[0],
        request: {
            endpoint: site_url + "uploadimage/uploadFile",
            params: {
                type: 'wall',
                unique_id: function() {
                    return '';
                }
            }
        },

        validation: {
            allowedExtensions: ['mp4', '3gp', 'avi', 'MP4', '3GP', 'AVI'],
            sizeLimit: 4194304 // 4mb
        },
        callbacks: {
            onError: errorHandler,
            onUpload: function(id, fileName) {
                $('#loader').show();


                //$("#wall_share_thought").attr("disabled", "disabled");

                // alert('success');
            },
            onProgress: function(id, fileName, loaded, total) {

            },
            onComplete: function(id, fileName, responseJSON) {

                if (responseJSON.result == 'success') {
                    $('#wallphotocontainer ul').prepend('<li><a href="javascript:void(0);" class="close-pic color-red" onclick="$(this).parent(\'li\').remove();"><i class="fa fa-close font18"></i></a> <img src="' + responseJSON.thumb + '" alt="" class="superbox-img"><input type="hidden" name="WallMedia[]" value="' + responseJSON.file_name + '"/><input type="hidden" name="MediaSize[]" value="' + responseJSON.size + '"/></li>');
                }
                $('#wallphotocontainer').show();
                $('#loader').hide();


            },

            onValidate: function(b) {
                var validExtensions = ['mp4', '3gp', 'avi', 'MP4', '3GP', 'AVI']; //array of valid extensions
                var fileName = b.name;
                var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
                if ($.inArray(fileNameExt, validExtensions) == -1) {
                    alertify.error("Allowed file type only mp4,3gp and avi .");
                    $(".alertify-message").css('padding-bottom', '10px');
                    $(".alertify-buttons").css('float', 'none');
                    return false;
                }
                if (b.size > 4194304) {
                    alertify.error('Files must be less than 4 MB.');
                    $(".alertify-message").css('padding-bottom', '10px');
                    $(".alertify-buttons").css('float', 'none');
                }

            }
        }
    });
});

angular.module('App')
.directive('activityItem', function(setFormatDate) {
    var partialURL = base_url+'assets/partials/wall/',
     linker = function(scope, element, attrs){         
         var data = scope.data;
             scope.mediaData = scope.data.ExtraParams.Entity.Media;
             scope.extraParams = scope.data.ExtraParams;
            // Get Dynamic Template
            scope.getTemplateUrl = function() {
              return partialURL+'AlbumUpdated.html'
            };

            // Date Formate
            scope.getDateFormate = function (date){
                return setFormatDate.getRelativeTime(date)
            }

            // Get post Title message 
            scope.getTitleMessage  = function (data){
                var msz = data.Message;
                    entity = data.ExtraParams.Entity;
                    user = data.ExtraParams.User;
                    
                    str = msz.replace("{{User}}", '<a href="'+data.ExtraParams.User.profileLink+'"><span class="color-green">'+user.Name+'</span></a>')

                    // Entity
                    switch(data.ActivityType){
                        case 'AlbumUpdated':
                        case 'AlbumAdded':

                          str = str.replace("{{Entity}}", '<a>'+entity.AlbumName+'</a>');
                          if(data.IsOwner==1){
                            scope.postCtrl = true;   // Post Control
                          } else {
                            scope.postCtrl = false;
                          }
                        break;
                        case 'GroupJoined':
                          str = str.replace("{{Entity}}", '<a>'+entity.GroupName+'</a>')
                          scope.postCtrl = false;   // Post Control
                        break;
                        case 'Follow': 
                        case 'FriendAdded':
                          str = str.replace("{{Entity}}", '<a>'+entity.Name+'</a>');
                          scope.postCtrl = false;   // Post Control
                        break;
                        default:
                          if(data.IsOwner==1){
                            scope.postCtrl = true;   // Post Control
                          } else {
                            scope.postCtrl = false;
                          }
                        break;
                    }



                    if(data.Params != null){
                        var params = data.Params;
                        // Params
                        paramsKey = Object.keys(params)
                        for(var i = 0; i < paramsKey.length; i++){
                            str = str.replace("{{"+paramsKey[i]+"}}", params[paramsKey[i]])
                        }
                    }

                    return str;
            }

            // Media layout Class
            scope.layoutClass = function(className){
                var  strClass;
                switch(className.length){
                    case 0:
                      strClass = "hide";
                    break;
                    case 1:
                      strClass = "";
                    break;
                    case 2:
                      strClass = "twoimgs";
                    break;
                    case 3:
                      strClass = "threeimgs";
                    break;
                    case 4:
                      strClass = "fourimgs";
                    break;
                    case 5:
                      strClass = "fiveimgs";
                    break;
                    default:
                    strClass = "fiveimgs";
                    break;
                }
                element.wallPostActivity();
                return strClass;
            }

            // Comments
            scope.getPostComments = function(response){
                scope.comntData = response;
                scope.data['viewStat'] = true;

                // View All Comments
                scope.$on('updateComntEmit', function (event) {
                     scope.comntData = scope.data.Comments
                     //scope.viewStat = false;
                });
                scope.$on('appendComntEmit', function (event) {
                    scope.comntData = scope.data.Comments
                });
            };
            
            // Add comment
            scope.addComment = function(keyEvent) {
                 if (keyEvent.which == 13 && keyEvent.shiftKey) {
                    // TextArea Text 
                 } else if (keyEvent.which == 13)  {
                    console.log('Submit Data here')
                 }
            }
            
            



    };
    return {
        restrict: 'E',
        template : '<div class="inner-wall-post" ng-include="getTemplateUrl()" ></div>',
        transclude: true,
        scope: {
          data: '=',
          index: '@',
          alldata:'='
        },
        link: linker
    }

    
    
    
})
/*.directive('repeatDone', function() {
        return function(scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    })*/

 $(document).ready(function(){
    $(window).scroll(function() {
        var wallScroll = 0;
        var pScroll = $(window).scrollTop();
        var pageBottomScroll1 = parseInt($(document).height()) - parseInt($(window).height())-1;
        var pageBottomScroll2 = parseInt($(document).height()) - parseInt($(window).height());
        var pageBottomScroll3 = parseInt($(document).height()) - parseInt($(window).height())+1;
        
         if(pScroll == pageBottomScroll1 || pScroll == pageBottomScroll2 || pScroll == pageBottomScroll3) {
            setTimeout(function(){
             if(pScroll == pageBottomScroll1 || pScroll == pageBottomScroll2 || pScroll == pageBottomScroll3){
                if(wallScroll == 1){
                    if($('#page_name').val() == 'artist_bustle') {
                        $('.spinner').show();
                        angular.element(document.getElementById('artistBustle')).scope().GetwallPost('activity/activityfeed');
                    }
                    else if($('#page_name').val() == 'user_bustle') {
                        $('.spinner').show();
                        angular.element(document.getElementById('bustle')).scope().GetwallPost('activity');
                    }
                }    
             }
            },500);
        }
    });
});