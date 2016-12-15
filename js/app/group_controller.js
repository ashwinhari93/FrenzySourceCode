/**** Groupu Controller ***/
angular.module('App').controller('InviteFriendCtrl', function($scope,InviteFriendService){
	$scope.fnSendInvitation=function(){
	var friendsemail=$("#Idfriendsemail").val();
	var personalmessage=$("#personalmessage").val();
	var LoginSessionKey=$("#LoginSessionKey").val();
	var groupid=$("#groupid").val();
	var EntityType=2;
	emails=friendsemail.split(',');
	if(emails.length>0)
	{
		emailarray=new Array();
		for(i=0; i<emails.length; i++)
		{
			emailarray.push(emails[i]);
		}
	}
	var requestData={LoginSessionKey:LoginSessionKey,UserSocialId:emailarray,Message:personalmessage,EntityType:EntityType,groupid:groupid};
	InviteFriendService.InviteFriendS(requestData).then(function(response){ 
		if(response.ResponseCode==200) {
			alertify.success(response.Message);
			$("#Idfriendsemail").val('');
			$("#personalmessage").val('');
			$("#errorinvitaionmessage").text("");
			$("#erroremailarray").text("");
			$('.close').trigger('click'); 
		} else {
			$('#commonErrorModal').html(response.Message);
		}
	})
	}
});

angular.module('App').controller('GroupPageCtrl', function($scope, groupService){
	//$scope.filteredTodos = [],
	$scope.currentPage = 1,
	$scope.numPerPage = 2,
	$scope.maxSize = 3;
	$scope.grpStatus = ''; 
    $scope.orderByField = '';
    $scope.reverseSort = '';
	$scope.noOfObj='';
    $scope.CanEdit=0;
    $scope.stopExecution = 0;
    $scope.srchgrp = '';
    $scope.oby = '';
    $scope.gim = '0';
    $scope.gij = '0';
    $scope.listData2 = new Array();
    var newArr = new Array();
	$scope.registeredGroup = function(){
	if($('#LoginSessionKey').val()) {
		$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 	
	}
	$scope.searchKey = '' ; 
	if( $('#searchgrp').val()!='') {
		$scope.searchKey = $('#searchgrp').val();
	}
	$scope.grpStatus ='';
	if( $('#cardType').val() ) { 
		$scope.grpStatus = $('#cardType').val();
	}
	$scope.hdngrpid= '' ; 
	if( $('#hdngrpid').val() ){
		$scope.hdngrpid = $('#hdngrpid').val();
	}
	$scope.pageType= 'dashboard' ; 
	if($('#pageType').val() != ''){
		$scope.pageType = $('#pageType').val();
	} 
	
	$scope.orderByField = $('#cardType').val();
	if($scope.orderByField!==$scope.oby){
		PageNo = 1;
		$('#GroupListPageNo').val(1);
		newArr = [];
		$scope.stopExecution = 0;
	}
	$scope.oby = $scope.orderByField;

	var PageNo = 1;
	if($('#GroupListPageNo').length>0){
	  	PageNo = $('#GroupListPageNo').val();
	}
	if($scope.srchgrp!==$scope.searchKey){
		PageNo = 1;
		$('#GroupListPageNo').val(1);
		newArr = [];
		$scope.stopExecution = 0;
	}

	$scope.filterVal = '';
	if($('#filterVal').length>0){
		$scope.filterVal = $('#filterVal').val();
	}

	$scope.srchgrp = $scope.searchKey;
	$(window).scrollTop(parseInt($(window).scrollTop())-10);
	if($scope.stopExecution==0){
		var reqData = {PageNo:PageNo,PageType: $scope.pageType,Begin: $scope.currentPage, End:$scope.numPerPage, StartDate:$scope.startDate, EndDate:$scope.endDate, SearchKey:$scope.searchKey, Status:$scope.grpStatus ,SortBy:$scope.orderByField ,OrderBy:$scope.reverseSort ,UserType : $scope.usertype,AlertStatus:$scope.alertstatus, GroupID:$scope.hdngrpid,LoginSessionKey:$scope.LoginSessionKey,Filter:$scope.filterVal}
		console.log(reqData);
		var reqUrl = reqData[1] ;
		groupService.get_groupList(reqData).then(function(response){
		if(response.ResponseCode==200){
		$scope.listData = [] 
		$scope.noOfObj = response.TotalRecords; 

		var pNo = Math.ceil(response.TotalRecords/response.PageSize);
		console.log('PNO '+pNo);
		if($('#GroupListPageNo').length>0){
			if(pNo>$('#GroupListPageNo').val()){
				newPageNo = parseInt(response.PageNo)+1;
				$('#GroupListPageNo').val(newPageNo);
				console.log(newPageNo);
			} else {
				$scope.stopExecution = 1;
			}
		}

		//If no of records > 0 then show
		$('#grpContainer').show();
		$('#GroupPageCtrl').show();
		//$('#grpHasNoResult').hide();
		//If no of records == 0 then hide
		
		var pushArr = true;

		for (var key in response.Data) {
			$scope.gim = response.Data[key].gim;
			$scope.gij = response.Data[key].gij;
			for(k in newArr){
				pushArr = true;
				if(response.Data[key].GroupID==newArr[k].GroupID){
					pushArr = false;
				}
			}
			if(pushArr){
				newArr.push(response.Data[key]);
			}
		}
		console.log(1);
		if($scope.noOfObj > 0){
			$scope.listData.push({ObjUsers:newArr}); 
			console.log($scope.listData[0].ObjUsers[0].CanReport);
			if(response.Data[0].CanEdit==1 && $scope.hdngrpid!=''){
				//$("#showHideSettings").show();
				$("#reportAbuseLink").hide();
			} else {
				//$("#showHideSettings").hide();
				$("#reportAbuseLink").show();
			}
		} 
		else
		{
			//$('#grpHasNoResult').show();
		}


		
		$('#hdnQuery').val(response.last_query);
		} else {
			//Show Error Message
		}
		}), function(error){
		}
			}
		/*var reqData = {PageNo:'1',PageSize:'10000',PageType: $scope.pageType, SearchKey:$scope.searchKey, Status:$scope.grpStatus ,SortBy:$scope.orderByField ,OrderBy:$scope.reverseSort ,UserType : $scope.usertype,AlertStatus:$scope.alertstatus, GroupID:$scope.hdngrpid,LoginSessionKey:$scope.LoginSessionKey,Filter:'Owner' }
		groupService.get_groupList(reqData).then(function(response){
			if(response.ResponseCode==200){
				$scope.listDataOwner = response.Data;

			}
		});*/

//Function for set group id
	$scope.SetGrp = function (group) {
		$('#btngrpid').val(group.GroupID); 
	}

	$scope.getGroupMembersCount = function(GroupID,key,status){
		var reqData = {GroupID:GroupID,LoginSessionKey:$('#LoginSessionKey').val()};
		groupService.get_groupMembersCount(reqData).then(function(response){
			if(response.ResponseCode==200){
				if(status=='join'){
					$scope.listData[0].ObjUsers[key].count = parseInt(response.Data)+1;
				} else {
					$scope.listData[0].ObjUsers[key].count = parseInt(response.Data)-1;
				}
			}
		});
	}

$scope.setGroupuniqueId  = function()
{
//$('.close').trigger('click');
$scope.LoginSessionKey = $('#LoginSessionKey').val();	
$scope.GroupID = $('#hdngroupid').val(); 

$($scope.listData[0].ObjUsers).each(function(key,value){
	if($scope.listData[0].ObjUsers[key].GroupID==$scope.GroupID){
		if($scope.listData[0].ObjUsers[key].JoinStatus=='Drop Group'){
			$scope.listData[0].ObjUsers[key].JoinStatus='Get In Group';
			$scope.getGroupMembersCount($scope.GroupID,key,'drop');
		} else {
			$scope.listData[0].ObjUsers[key].JoinStatus='Drop Group';
			$scope.getGroupMembersCount($scope.GroupID,key,'join');
		}
	}
});

reqData = {LoginSessionKey:$scope.LoginSessionKey,GroupID:$scope.GroupID,GetInGroup:'1'};
groupService.join_drop_group(reqData).then(function(response){
$scope.message = response.Message; 
//$('#alert_message').trigger('click');
$scope.registeredGroup();

})	
}


$scope.callmembers  = function()
{
//$('.close').trigger('click');
$scope.LoginSessionKey = $('#LoginSessionKey').val();	
$scope.GroupID = $('#hdngroupid').val(); 

reqData = {LoginSessionKey:$scope.LoginSessionKey,GroupID:$scope.GroupID};
groupService.callmember_service(reqData).then(function(response){
$scope.message = response.Message; 
//$('#alert_message').trigger('click');
$scope.registeredGroup();

})	
}


}

	if($('#GroupListPageNo').length>0){
		$(document).ready(function(){
			$(window).scroll(function() {
				var pScroll = $(window).scrollTop();
				var pageBottomScroll1 = parseInt($(document).height()) - parseInt($(window).height())-1;
				var pageBottomScroll2 = parseInt($(document).height()) - parseInt($(window).height());
				var pageBottomScroll3 = parseInt($(document).height()) - parseInt($(window).height())+1;
			   	if(pScroll == pageBottomScroll1 || pScroll == pageBottomScroll2 || pScroll == pageBottomScroll3) {
			       	if(pScroll == pageBottomScroll1 || pScroll == pageBottomScroll2 || pScroll == pageBottomScroll3){
					    $scope.registeredGroup();
			       	}
			   }
			});
		});
	}

});
angular.module('App').controller('GroupMemberCtrl', function($scope,Group_member_service,appInfo,Users){
											
    $scope.hdngrpmember = '';
	$scope.searchKey = ''; 
	 $scope.listData=[];
	 $scope.login_userid= '' ; 
	 var reqData = ''  ; 
	if( $('#hdngrpid').val() )
	 {
          $scope.hdngrpid = $('#hdngrpid').val();
     }	 
	 $data = [] ; 
	
	$scope.removeFriend = function(friendid){
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,FriendID:friendid}
		Users.removeFriend(reqData).then(function(response){
			if(response.ResponseCode==200){
				$.each($scope.listDatas,function(key){
					if($scope.listDatas[key].UserID==friendid){
						$scope.listDatas[key].FriendStatus=4;
					}
				});
			}
		});
	}

	$scope.rejectRequest = function(friendid){
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,FriendID:friendid}
		Users.rejectRequest(reqData).then(function(response){
			if(response.ResponseCode==200){
				console.log('Data');
				console.log($scope.listDatas);
				$.each($scope.listDatas,function(key){
					if($scope.listDatas[key].UserID==friendid){
						$scope.listDatas[key].FriendStatus=4;
					}
				});
				//$scope.listData[0].ObjUsers[friendid].FriendStatus=4;
			}
		});
	}

	$scope.acceptRequest = function(friendid){
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,FriendID:friendid}
		Users.acceptRequest(reqData).then(function(response){
			if(response.ResponseCode==200){
				$.each($scope.listDatas,function(key){
					if($scope.listDatas[key].UserID==friendid){
						$scope.listDatas[key].FriendStatus=1;
					}
				});
			}
		});
	}

	$scope.sendRequest = function(friendid){
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,FriendID:friendid}
		Users.sendRequest(reqData).then(function(response){
			if(response.ResponseCode==200){
				$.each($scope.listDatas,function(key){
					if($scope.listDatas[key].UserID==friendid){
						$scope.listDatas[key].FriendStatus=2;
					}
				});
			}
		});
	}

	$scope.listData = [];
	$scope.stopExecution = 0;
	$scope.srch = '';
	  $scope.showMember = function() {
		  if($('#search-bind').val())
	      {
          	$scope.searchKey = $('#search-bind').val();
          }else{
              $scope.searchKey = '';
          }
		  
		   if($('#LoginSessionKey').val())
	      {
          	$scope.LoginSessionKey = $('#LoginSessionKey').val();
          }

          var PageNo = 1;
          if($('#GroupMembersPageNo').length>0){
          	PageNo = $('#GroupMembersPageNo').val();
		  }

		  if($scope.srch!==$scope.searchKey){
			PageNo = 1;
			$('#GroupMembersPageNo').val(1);
			$scope.listData = new Array();
			$scope.stopExecution = 0;
		}
		$scope.srch = $scope.searchKey;

		var PageSize = '';
		if($('#wall_type').length>0){
			PageSize = 8;
		}

		  if($scope.stopExecution==0){
			   reqData ={GroupID:$scope.hdngrpid,SearchKey:$scope.searchKey,LoginSessionKey:$scope.LoginSessionKey,Type:'user',PageNo:PageNo,PageSize:PageSize}; 
			 
			   Group_member_service.getmember(reqData).then(function(response){
					if(response.ResponseCode==200){
						var pNo = Math.ceil(response.TotalRecords/response.PageSize);
						if($('#GroupMembersPageNo').length>0){
							if(pNo>$('#GroupMembersPageNo').val()){
								newPageNo = parseInt(response.PageNo)+1;
				    			$('#GroupMembersPageNo').val(newPageNo);
							} else {
								$scope.stopExecution = 1;
							}
						}

							//console.log(ObjUsers);
							var addElement = true;
							for(var rkey in response.Data){
								for(var rdkey in $scope.listData){
									addElement = true;
									if($scope.listData[rdkey].UserID==response.Data[rkey].UserID){
										addElement = false;
									}
								}
								if(addElement){
									$scope.listData[response.Data[rkey].UserID] = response.Data[rkey];
								}
							}
							$scope.listDatas = $scope.listData.reduce(function(o, v, i) {o[i] = v;return o;}, {})
							$scope.totalrecrd = response.TotalRecords; 
								var totalrcrd = response.Data.length; 
								if(totalrcrd==0)
								{
									$('#GroupMemberCtrl').hide();
									$('#grpHasNoMember').css('display','block');
								}
								else
								{
									$('#GroupMemberCtrl').show();
									$('#grpHasNoMember').css('display','none');
								};
					} else {
						//Show Error Message
					} 
			});
		}
	}
	
	$scope.follow = function()
	{
		$scope.login_userid = '' ; 
		$scope.memberid= '' ; 
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val(); 
		}
		if($('#memberid').val())
		{
			$scope.memberid = $('#memberid').val(); 
		}
		
		$.ajax({
		url:  appInfo.serviceUrl + 'users/follow',
		type: "POST",
		data:{LoginSessionKey:$scope.LoginSessionKey,MemberID:$scope.memberid,Type:'user'},
		error:function() { alert("Temporary error. Please try again...");},
		success: function(data){  
			var res = data['ResponseCode'];
			if($('#followmem'+$('#memberid').val()).text()=='Follow'){
				$('#followmem'+$('#memberid').val()).text('Unfollow');
			} else {
				$('#followmem'+$('#memberid').val()).text('Follow');
			}
			$scope.showMember();
			}
	   });
	}
	
	$scope.remove_member = function()
	{
		$scope.LoginSessionKey = '' ; 
		$scope.hdngrpid= '' ; 
		$scope.delete_member_id= '' ; 
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val(); 
		}
		if($('#hdngrpid').val())
		{
			$scope.hdngrpid = $('#hdngrpid').val(); 
		}
		
		if($('#memberid').val())
		{
			$scope.delete_member_id = $('#memberid').val(); 
		}
		reqData ={LoginSessionKey:$scope.LoginSessionKey,DeleteMemberID:$scope.delete_member_id,GroupID:$scope.hdngrpid}; 
	     Group_member_service.remove_member(reqData).then(function(response){
			 $('.close').trigger('click'); 
			 $scope.newData = new Array();
			 console.log($scope.listData);
			 $.each($scope.listData,function(key){
			 		console.log(key)
			 		if($scope.listData[key]!==undefined){
			 			if($scope.listData[key].UserID!==$scope.delete_member_id){
							$scope.newData.push($scope.listData[key]);
			 			}
			 		}
			 });
			 $scope.listData = $scope.newData;
			 $scope.listDatas = $scope.listData.reduce(function(o, v, i) {o[i] = v;return o;}, {})
			 $scope.totalrecrd = parseInt($scope.totalrecrd)-1;
			 $scope.showMember();
	    })
	}

	if($('#GroupMembersPageNo').length>0){
		$(document).ready(function(){
			$(window).scroll(function() {
				var pScroll = $(window).scrollTop();
				var pageBottomScroll1 = parseInt($(document).height()) - parseInt($(window).height())-1;
				var pageBottomScroll2 = parseInt($(document).height()) - parseInt($(window).height());
				var pageBottomScroll3 = parseInt($(document).height()) - parseInt($(window).height())+1;
			   	if(pScroll == pageBottomScroll1 || pScroll == pageBottomScroll2 || pScroll == pageBottomScroll3) {
			       setTimeout(function(){
			       	if(pScroll == pageBottomScroll1 || pScroll == pageBottomScroll2 || pScroll == pageBottomScroll3){
					    $(window).scrollTop(parseInt($(window).scrollTop())-10);
					    $scope.showMember();
			       	}
			       },100);
			   }
			});
		});
	}
})


$(document).ready(function(){
	$('#searchlist').click(function(){
	  var grpsearchkey	= $('#insearchgrp').val();
     
	  $('#searchgrp').val(grpsearchkey);
	  angular.element(document.getElementById('GroupPageCtrl')).scope().registeredGroup();
	});
	
	$(document).on("click","#idInvitationBtn",function(){
		angular.element(document.getElementById('InviteMemberCon')).scope().fnSendInvitation();
	});
	
	$('#cardType').change(function(){
		$('#searchlist').trigger('click');
		//angular.element(document.getElementById('GroupPageCtrl')).scope().registeredGroup();
	});
	
	$('#searchgroupmember').click(function(){         
		angular.element(document.getElementById('GroupMemberCtrl')).scope().showMember();						
	});	
	
	$('#commentarea').bind(function(evt){
   		if (evt.keyCode == 13 && !evt.shiftKey) {
             $('#searchlist').trigger('click');
		//angular.element(document.getElementById('WallPostCtrl')).scope().submitComment();
		}
	});
	
	$('input#insearchgrp').keyup(function(e) {
		if ($('#insearchgrp').val().length>=2 || $('#insearchgrp').val().length<1) {
			$('#searchlist').trigger('click');
		}
     });
	
	$('input#search-bind').keyup(function(e) {
		console.log($('#search-bind').length);
		if ($('#search-bind').val().length>=2 || $('#search-bind').val().length<1) {
			$('#searchgroupmember').trigger('click');
		}
     });
     $('input#searchformember').keyup(function(e) {
		if ($('#searchformember').val().length>=2 || $('#searchformember').val().length<1) {
			$('#searchinvitemember').trigger('click');
		}
     });
});
	


angular.module('App').controller('FormCtrl', function ($scope, createGroupService) {
  
    $scope.FormSubmit = function()
	{
        
        var val = checkstatus('formGroup');
		if(val===false) return;
		var jsonData = {};
		 var formData = $("#formGroup").serializeArray();
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
		 jsonData['GroupMedia'] = jsonData['group_media'];
		createGroupService.createGroup(jsonData).then(function(response){
				$scope.response = response.ResponseCode;
				$scope.message = response.Message; 
				var id=response.Data; 
				if(response.ResponseCode=='200')
				{
                    alertify.success('Group created successfully.');
                    if(!isNaN(id) && id>0){
                        setTimeout(function(){window.location.href=base_url+"group/group_wall/"+id;},2000);
                    }
                } else {
                	$('#commonError').html(response.Message)
                	$('#commonError').parent('.alert').show();
                }
		});
	}
	
	$scope.GroupFormDetail = function()
	{
		$scope.grpid = "" ; 
		$scope.userloginid = '' ; 
		if($('#hdngrpid').val())
		{
			$scope.grpid = $('#hdngrpid').val(); 
		}
		
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val(); 
		}
		var reqData={GroupID:$scope.grpid,LoginSessionKey:$scope.LoginSessionKey};
		createGroupService.GroupFormDetail(reqData).then(function(response){
					if(response.ResponseCode==200)
					{
						$scope.groupname = response.Data.GroupName;
						$('.semi-bold').val($scope.groupname);
						$scope.GroupID = response.Data.GroupID;
						$scope.CreatedBy = response.Data.CreatedBy;
						$scope.GroupDescription = response.Data.GroupDescription;
						$scope.IsPublic = response.Data.IsPublic;
						$scope.image = response.Data.imagepath;
						$scope.imagepath = response.Data.GroupImage;
					 
                                
							if(response.Data.imagepath == site_url+'assets/img/profiles/default-148.png'){
								$('#add_group_photo').show();
                                $('#group_photo').hide();
                                $('.del-ico').hide();
							}else{
								 $('#group_photo').show();
								 $('.del-ico').show();
								$('#add_group_photo').hide();
							}
						
						 
					}
					else{}
		});
	}
	
	$scope.updateForm = function()
	{
        var val = checkstatus('formGroup');
		if(val===false) return;
	    var jsonData = {};
		 var formData = $("#formGroup").serializeArray();
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

		 jsonData['GroupMedia'] = jsonData['group_media'];

		createGroupService.UpdateGroupData(jsonData).then(function(response){
						$scope.message = response.Message;
                        
						//$('#alert_message').trigger('click');
						if(response.ResponseCode=='200')
						{
                            alertify.success(response.Message);
                            var id = response.Data ; 
                            setTimeout(function(){window.location.href=base_url+"group/group_wall/"+id ; }, 2000);
							
						} else {
							$('#commonError').html(response.Message);
						}
		});
	}
});



angular.module('App').controller('InviteMemberCtrl', function ($scope, InviteMemberservice) {
  
    $scope.currentPage = 1,
	$scope.numPerPage = 2,
	$scope.maxSize = 3;
	$scope.grpStatus = ''; 
    $scope.orderByField = '';
    $scope.reverseSort = '';
	$scope.noOfObj='';
	$scope.fetchgroupname = function()
	{
		$scope.groupid ='';
		if($('#groupid').val())
		{
			 $scope.groupid=$('#groupid').val();	
		}
	
		$scope.LoginSessionKey = '' ;
		if($('#LoginSessionKey').val())
		{
			 $scope.LoginSessionKey=$('#LoginSessionKey').val();	
		}
		 var reqData = { Begin: $scope.currentPage, End:$scope.numPerPage, StartDate:$scope.startDate, EndDate:$scope.endDate, SearchKey:$scope.searchKey, Status:$scope.grpStatus ,SortBy:$scope.orderByField ,OrderBy:$scope.reverseSort ,UserType : $scope.usertype,AlertStatus:$scope.alertstatus, GroupID:$scope.groupid,LoginSessionKey:$scope.LoginSessionKey }
		InviteMemberservice.get_groupName(reqData).then(function(response){
			if(response.ResponseCode==200){
				$scope.GroupName = response.Data[0].GroupName;
				$scope.Member = response.Data[0].count;
				$scope.noOfObj = response['TotalRecords']; 
				if($scope.noOfObj > 0)
				{
					if(response.Data[0].CanEdit==1){
						$("#showHideSettings").show();
						$("#reportAbuseLink").hide();
					} else {
						$("#showHideSettings").hide();
						$("#reportAbuseLink").show();
					}
				}
			} else {
				//Show Error Message
			}
		});
	}
	
	$scope.skey = '';
	$scope.allmembers = new Array();
	$scope.stopExecution = 0;

	$scope.searchmember = function()
	{
		$scope.LoginSessionKey = '' ;
		if($('#LoginSessionKey').val())
		{
			 $scope.LoginSessionKey=$('#LoginSessionKey').val();	
		}
		
		$scope.groupid = '' ; 
		if($('#groupid').val())
		{
			 $scope.groupid=$('#groupid').val();	
		}
		
		$scope.serch  = '' ; 
		
		if($('#searchformember').val())
		{
			 $scope.serch=$('#searchformember').val();	
		}else{$('#showmember').css('display','none');
								$('#grpHasNoMember').css('display','block');return;}
		
		
		if($scope.skey!==$scope.serch){
			PageNo = 1;
			$('#GroupInvitePageNo').val(1);
			$scope.allmembers = new Array();
			$scope.stopExecution = 0;
		}
		$scope.skey = $scope.serch;

		var PageNo = 1;
		if($('#GroupInvitePageNo').length>0){
			PageNo = $('#GroupInvitePageNo').val();
		}
			
			if($scope.stopExecution==0){
				 var reqData = {PageNo:PageNo,Begin: $scope.currentPage, End:$scope.numPerPage, StartDate:$scope.startDate, EndDate:$scope.endDate, SearchKey:$scope.searchKey, UserStatus:$scope.userStatus,SortBy:$scope.orderByField ,OrderBy:$scope.reverseSort ,UserType : $scope.usertype,LoginSessionKey:$scope.LoginSessionKey, GroupID:$scope.groupid,SearchKey : $scope.serch}
				 
				InviteMemberservice.get_userlist(reqData).then(function(response){
					if(response.ResponseCode==200){
								if(response.TotalRecords>0)
								{
									//$scope.allmember = response.Data.Members ;
									var k = $scope.allmembers.length;
									for(var key in response.Data){
										$scope.allmembers[key]=response.Data[key];
									}
									$scope.allmember = $scope.allmembers.reduce(function(o, v, i) {o[i] = v;return o;}, {});
									console.log($scope.allmember);
									$('#showmember').css('display','block');
									$('#grpHasNoMember').css('display','none');
								
									var pNo = Math.ceil(response.TotalRecords/response.PageSize);
									if(pNo>$('#GroupInvitePageNo').val()){
										newPageNo = parseInt(response.PageNo)+1;
						    			$('#GroupInvitePageNo').val(newPageNo);
									} else {
										$scope.stopExecution = 1;
									}
								}
								else
								{
									$('#showmember').css('display','none');
									$('#grpHasNoMember').css('display','block');
										
								}
					} else {
						//Show Error Message
					}
					/*$scope.GroupName = response.Data.results[0].GroupName;
					$scope.Member = response.Data.results[0].count*/
			});
		}
	}
	
	$scope.add_in_group = function()
	{
		
		$scope.LoginSessionKey = '' ;
		if($('#LoginSessionKey').val())
		{
			 $scope.LoginSessionKey=$('#LoginSessionKey').val();	
		}
		
		$scope.groupid = '' ; 
		if($('#groupid').val())
		{
			 $scope.groupid=$('#groupid').val();	
		}
		
		$scope.userid = '' ; 
		if($('#userids').val())
		{
			 $scope.userid=$('#userids').val();	
		}
		
		
			 var reqData = {LoginSessionKey:$scope.LoginSessionKey,GroupID:$scope.groupid,UserID:$scope.userid}
			 
			InviteMemberservice.add_to_group(reqData).then(function(response){
                if(response.ResponseCode==200){
                	$('#user'+$scope.userid).remove();
				} else {
					//Show Error Message
				}
								//console.log(response) ; 
								//$scope.searchmember();
				/*$scope.GroupName = response.Data.results[0].GroupName;
				$scope.Member = response.Data.results[0].count*/
		});
	}

	if($('#GroupInvitePageNo').length>0){
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


angular.module('App').controller('EditFormCtrl', function ($scope,groupeditservice,appInfo) {
	$scope.deletegrp = function()
	{
		$scope.grpid = "" ; 
		$scope.LoginSessionKey = '' ; 
		
		if($('#hdngrpid').val())
		{
			$scope.grpid = $('#hdngrpid').val(); 
		}
		
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val(); 
		}
		$.ajax({
		url:  appInfo.serviceUrl + 'group/deleteGroups',
		type: "POST",
		data:{GroupID:$scope.grpid,LoginSessionKey:$scope.LoginSessionKey},
		error:function() { alert("Temporary error. Please try again...");},
		success: function(data)
		{ 
			if(data.ResponseCode==200)
			{
				$scope.grpdata = [] ; 
				$scope.grpdata = data.Data[0] ; 
				window.location.href = base_url + 'group/myzone';
				//console.log(data.Message);
				//$('#alert_message').trigger('click');
				//$('#message_slide').html(data.Message);
			}
			else
			{
				alert(data.Message);
			}
		}
	   });
	}

});

function foolwship(str)
{
	var memberid = str.lang ; 
	$('#memberid').val(memberid);
	angular.element(document.getElementById('GroupMemberCtrl')).scope().follow();
}

function changelocation(loc)
{
	window.location.href=base_url + loc;
}

function Groupaction(action){
	angular.element(document.getElementById('EditFormCtrl')).scope().deletegrp();
}

function deleteUserComment(postguid)
{
	$('#postguid').val(postguid);
	angular.element(document.getElementById('WallPostCtrl')).scope().DeleteWallcomment();
}

function setid(lang)
{
	$('#postcommentform').val(lang);
	angular.element(document.getElementById('WallPostCtrl')).scope().submitComment();
}

function setGroupId()
{
	angular.element(document.getElementById('GroupPageCtrl')).scope().setGroupuniqueId();	
}
function CallGroup(str)
{
	$('#hdngroupid').val(str.lang);
	var spantext = $('#btngrpid'+str.lang).text(); 
	if(spantext=='Drop Group')
	{
		$("#OpenGroupModal"+str.lang).trigger("click");
	}
	else
	{
		setGroupId();
	}
}

function RemoveGroupMemberYes(str)
{
	$('#hdngroupid').val(str.lang);
	setGroupId();
	$("#CloseGroupModal"+str.lang).trigger("click");
}


function removeThisMedia(ths){
 $(ths).parent().html('');
 $('#add_group_photo').css('display','block');
}

$(function() {
	 var errorHandler = function(event, id, fileName, reason) {
		//alert(reason);
            //qq.log("id: " + id + ", fileName: " + fileName + ", reason: " + reason);
        };
		
var c=0;var cc=0;
new qq.FineUploaderBasic({
        multiple: false,
        autoUpload: true,
        button: $("#add_group_photo")[0],
        request: {
            endpoint: site_url+"api/uploadimage/uploadFile",
            customHeaders: {
                "Accept-Language": accept_language
            },
		params: {
		   type: 'group',
            unique_id:function() {
                return $('#unique_id').val(); 
            },
            LoginSessionKey:$('input[name="LoginSessionKey"]').val()
        }
        },

      validation: {
        allowedExtensions: ['jpeg', 'jpg', 'gif', 'png','JPEG', 'JPG', 'GIF', 'PNG'],
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
			
			c = parseInt($('#image_counter').val());
			c = c+1;
			$('#image_counter').val(c);

        },onComplete: function(id, fileName, responseJSON) {

                if (responseJSON.Data.result=='success') {
                    $('#group_photo').html('<img width="118"  src="' + responseJSON.Data.thumb + '"><input type="hidden" name="group_media" value="' + responseJSON.Data.file_name + '"/><i class="del-ico" onclick="removeThisMedia(this);">remove</i>');
                    
                }
				
				 $('#group_photo').show();
				 $('#loader').hide();
       	 			$('#add_group_photo').css('display','none');
				
				
				
         },onValidate: function (b) {
			var validExtensions = ['jpeg', 'jpg', 'gif', 'png','JPEG', 'JPG', 'GIF', 'PNG']; //array of valid extensions
			var fileName = b.name;
			var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
			if ($.inArray(fileNameExt, validExtensions) == -1){
				alertify.error("Allowed file type only jpeg,jpg,gif and png .");       
				$(".alertify-message").css('padding-bottom','10px');
				$(".alertify-buttons").css('float','none');
				return false;
			}
             if(b.size>4194304){
                alertify.error('Files must be less than 4 MB.');
                 $(".alertify-message").css('padding-bottom','10px');
				$(".alertify-buttons").css('float','none');
             }
            
         }
        }
    });
	

});

function deleteComment(postguid)
{
	$('#postguid').val(postguid);
	angular.element(document.getElementById('WallPostCtrl')).scope().DeleteWallPost(postguid);
    
}
function activeform(ids)
{
	$('#formid').val(ids.lang);
	angular.element(document.getElementById('WallPostCtrl')).scope().SubmitWallCommentpost();
}

function changeloc(str)
{
	console.log(str);
	window.location.href =base_url+''+str;
	
}
function securityissue($scope, $http)
{  

  $scope.groupid = '' ; 
  $scope.loginsessionkey = '' ; 
  if($('#hdngrpid').val())
  {
	 $scope.groupid =	$('#hdngrpid').val() ;  
  }
  
   if($('#LoginSessionKey').val())
  {
	 $scope.loginsessionkey =	$('#LoginSessionKey').val() ;  
  }
  var records = '' ; 
  // Getting the list of users through ajax call.
  $http({
    url: base_url + 'api_users/permission',
	data : {GroupID :$scope.groupid, LoginSessionKey :$scope.loginsessionkey },
    method: "POST",
  }).success(function (data) {
      records = data.Data ;
	  if(records>0)
	  {
			$('#showHideSettings').css('display','block');
			$('#reportAbuseLink').css('display','none');  
	  } else {$('#showHideSettings').css('display','none'); $('#reportAbuseLink').css('display','block'); } 
  });
}

function removemember(userid)
{
	
	$('#memberid').val(userid);
	//angular.element(document.getElementById('GroupMemberCtrl')).scope().remove_member();
}

function dodelete_member()
{
	
	angular.element(document.getElementById('GroupMemberCtrl')).scope().remove_member();
} 
function donothing_member() {$('.close').trigger('click');} 

angular.module('App').controller('UserProfileCtrl', function($scope, UserProfileService){
				
	//$scope.filteredTodos = [],
	$scope.currentPage = 1,
	$scope.numPerPage = 2,
	$scope.maxSize = 3;
	$scope.grpStatus = ''; 
    $scope.orderByField = '';
    $scope.reverseSort = '';
	$scope.noOfObj='';
       
	$scope.callfollowers = function()
	{
		$scope.LoginSessionKey = '' ; 
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 	
		}
		$scope.typeentity = '' ; 
		if($('#typeentity').val())
		{
			$scope.typeentity = $('#typeentity').val() ; 	
		}
		reqData = {LoginSessionKey:$scope.LoginSessionKey,memberid:$scope.typeentity};
		UserProfileService.getFollowers(reqData).then(function(response){
					$scope.connection = response.connection;
					$scope.noOfObj=response.connections ; 
					//$scope.Userwall() ; 
					
		});
	}
	
	
	$scope.getpoints = function()
	{
		$scope.LoginSessionKey = '' ; 
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 	
		}
		reqData = {LoginSessionKey:$scope.LoginSessionKey};
		UserProfileService.points(reqData).then(function(response){
					$scope.userpoint=response.Data ; 
					//console.log(response);
					//$scope.Userwall() ; 
					
		});
	}
	
	$scope.SaveInterest = function()
	{
		$scope.LoginSessionKey = '' ; 
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 	
		}
		$scope.InterestedIn = '' ; 
		if($('#txtusername-1').val())
		{
			$scope.InterestedIn = $('#txtusername-1').val() ; 	
		}
		$scope.WebSites = '' ; 
		if($('#txtusername-2').val())
		{
			$scope.WebSites = $('#txtusername-2').val() ; 	
		}
		$scope.Topics = '' ; 
		if($('#txtusername-3').val())
		{
			$scope.Topics = $('#txtusername-3').val() ; 	
		}
		$scope.LookingFor = '' ; 
		if($('#txtusername-4').val())
		{
			$scope.LookingFor = $('#txtusername-4').val() ; 	
		}
		console.log(reqData);
		reqData = {LoginSessionKey:$scope.LoginSessionKey,InterestedIn:$scope.InterestedIn,WebSites:$scope.WebSites,Topics:$scope.Topics,LookingFor:$scope.LookingFor};
		UserProfileService.saveinterest_profile(reqData).then(function(response){
					
					//console.log(response);
					//$scope.Userwall() ; 
					
		});
	}
		
	
	$scope.FetchInterest = function()
	{
		$scope.LoginSessionKey = '' ; 
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 	
		}
		reqData = {LoginSessionKey:$scope.LoginSessionKey}; 
		UserProfileService.FetchInterest_profile(reqData).then(function(response){
					$scope.InterestedIn = response.Data.InterestedIn; 
					$scope.LookingFor = response.Data.LookingFor; 
					$scope.Topics = response.Data.Topics; 
					$scope.WebSites = response.Data.WebSites; 
					
					//$scope.Userwall() ; 
					
		});
	}		
	$scope.fetchDetails = function(action)
	{
		
	            
		$scope.LoginSessionKey = '' ; 
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 	
		}
        
            
		
		if(action == 'edit' || action == 'load')
		{	
          
			
			reqData = {LoginSessionKey:$scope.LoginSessionKey}; 
			UserProfileService.GetUserStatusDetail(reqData).then(function(response){
			$scope.imgsrc = response.path;
            $scope.ProfilePicture = response.ProfilePicture;
			$scope.expertise = response.expertise ; 
			$scope.status = response.wallstatus.UserWallStatus ; 
            if(action == 'edit')
                {	      
                    if($scope.ProfilePicture == "" || $scope.ProfilePicture == null){
                         $('#current-picture').css('display','none');
                         $('#uploadprofilepic').css('display','');
                         $('.del-ico').css('display','none');
                    }else{
                        $('.del-ico').css('display','block');
                    }
                       
                        
                        $('#wallEdit').hide();
                        $('#wallSave').show(); 
                        
                }
			//console.log($scope.status);
			 
					
			});
					
		}
		else
		{
			 
			 var jsonData = {};
			 var formData = $("#allcontrolform").serializeArray();
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
			 //console.log(jsonData); 
			 UserProfileService.saveuserdetail(jsonData).then(function(response){
						$('.del-ico').css('display','none');
                  if(action == 'save')
		{	      
                         window.location.href= site_url+'userprofile';
        }
				//console.log(response);
			  //$scope.fetchDetails();
					
			});
		
		}
	}
});

function addmember(str)
{
	$('#userids').val(str.lang); 
	 angular.element(document.getElementById('InviteMemberCtrl')).scope().add_in_group();
}

 
