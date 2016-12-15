// JavaScript Document
//Wall controller 
angular.module('App')
.controller('WallPostCtrl', function ($scope,GroupwallService) {
	$scope.listData = [] ;busy = false;
	$scope.SubmitWallpost = function()
	{
		if($('#post_type').val())
		{
			var posttypeid =  $('#post_type').val()	;
			$('#post_type_id').val(posttypeid);
			
		}
		if($('#PostContent').val()==''){
			$('#posterror').text('Please enter text.'); 
			return false;
		} 
		var jsonData = {};
		var formData = $("#wallpostform").serializeArray();
		$.each(formData, function() {
			if (jsonData[this.name]) {
				if (!jsonData[this.name].push) {
					jsonData[this.name] = [jsonData[this.name]];
				}
				jsonData[this.name].push(this.value || '');
			} else {
				jsonData[this.name] = this.value || '';
			}
			

			//$('.textntags-beautifier div').html();
			var PContent = $('.textntags-beautifier div').html();
			jQuery('strong').each(function(e){
				var userid = $('.textntags-beautifier div strong:eq('+e+') span').attr('class');
				userid = userid.split('-')[1];
				PContent = PContent.replace('<strong><span class="user-'+userid+'">'+$('strong:eq('+e+') span').text()+'</span></strong>', '<a href="#">'+$('strong:eq('+e+') span').text()+'</a>'); 
			});

			console.log(PContent);
			jsonData['PostContent'] = PContent;
		});
		GroupwallService.Wallpost(jsonData).then(function(response){
			if(response.ResponseCode==200){
				$('#PostContent').val('');
				$('.textntags-beautifier div').html('');
				$('#posterror').text(''); 
				$('#noOfCharPostContent').text('0');
				$('#wallphotocontainer').html('');

				$scope.listData.unshift(items = response.Data) ;
			angular.element(document.getElementById('WallPostCtrl')).scope().wallslider();
			} else {
				//Show Error Message
			}
		});
	}

	$scope.addFlag = function(PostGuID){
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 
		} 
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,TypeID:PostGuID,Type:'Post'};
		GroupwallService.addFlag(reqData).then(function(response){
			if(response.ResponseCode==200){
				console.log(PostGuID);
			}
		});
	}

	$scope.removeFlag = function(PostGuID){
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 
		} 
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,TypeID:PostGuID,Type:'Post'};
		GroupwallService.removeFlag(reqData).then(function(response){
			if(response.ResponseCode==200){
				console.log(PostGuID);
			}
		});
	}

	$scope.stopExecution = 0;

	$scope.GetwallPost = function()
	{
		if ($scope.busy) return;
		$scope.busy = true;

		$scope.GroupId = '' ;
		$scope.LoginSessionKey = '' ; 
		if($('#hdn_entity_id').val())
		{
			$scope.EntityID 	= $('#hdn_entity_id').val() ; 
		}
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 
		}       
		var offset = $('.offsetc').length;                
		if($('#post_type').val())
		{
			$scope.PostTypeID =  $('#post_type').val()	;		
		}
		
		var PageNo = $('#WallPageNo').val();
		if($scope.stopExecution=='0'){
			var reqData = {Offset:offset,EntityID:$scope.EntityID,LoginSessionKey:$scope.LoginSessionKey,PostType:$scope.PostTypeID,PageNo:PageNo};
			GroupwallService.GetWallpostService(reqData).then(function(response){
				if(response.ResponseCode>=200 && response.ResponseCode<=204){

					var pNo = Math.ceil(response.TotalRecords/response.PageSize);
					if(pNo>$('#WallPageNo').val()){
						newPageNo = parseInt(response.PageNo)+1;
		    			$('#WallPageNo').val(newPageNo);
					} else {
						$scope.stopExecution = 1;
					}

					$scope.name = response.Data.Profile.LoginUser;
					$scope.LoginUserPicture = response.Data.Profile.LoginUserPicture;
					try{
						var items = response.Data.WallPostList;               
						if(items.length>0){
							$scope.busy = false;
							for (var i = 0; i < items.length; i++) {
								if(items[i].Comment.length>0){                    
									items[i]['Comment']= items[i].Comment.reverse();
								}
								$scope.listData.push(items[i]) ;
							}
							angular.element(document.getElementById('WallPostCtrl')).scope().wallslider();
						} 
					}catch(e){
						angular.element(document.getElementById('WallPostCtrl')).scope().wallslider();
					}
					var cond = response.condition ; 
					if(cond==0)
					{
						$('#main').css('display','none');
						$('#grpHasNoResult').css('display','block');
					}
					else
					{
						$('#main').css('display','block');
						$('#grpHasNoResult').css('display','none');	 
					}
				}
			});
		}	
	}
	$scope.loadMore = function() {
		//console.log('Load More Trigger');   
		angular.element(document.getElementById('WallPostCtrl')).scope().GetwallPost();
	}

	$scope.submitComment = function()
	{
		
		var commentPostID = '' ; 
		if($('#comenntformid').val())
		{
			commentPostID = $('#comenntformid').val() ; 	
		}
		
		var jsonData = {};
		var formData = $("#userwall_form"+commentPostID).serializeArray();
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
		
		GroupwallService.submitPostComment(jsonData).then(function(response){
			if(response.ResponseCode==200){
				$('#PostComment'+commentPostID).val('');
				$('#posterror'+commentPostID).text('');
				$('#noOfCharPostComment'+commentPostID).text('200'); 
				$('#commentid'+commentPostID).text(response.Data.PostCommentCount);                     
				for (var i = 0; i < $scope.listData.length; i++) {
					if($scope.listData[i].PostGuID == commentPostID){
						$scope.listData[i].Comment.push(response.Data.Comment) ;
						return;
					}
				} 
			} else {
				//Show Error Message
			}


		});	
	}

	$scope.SeeAllPostComments=function(pid,PageNo)
	{

		var jsonData = {PostGuID:pid,LoginSessionKey:$('#LoginSessionKey').val(),PageNo:PageNo};
		GroupwallService.SeeAllPostComments(jsonData).then(function(response){
			if(response.ResponseCode=200){
				//$('#seeall'+pid).hide();
				for (var i = 0; i < $scope.listData.length; i++) {
					if($scope.listData[i].PostGuID == pid){
						var newArr = new Array;
						//My Codes Starts
						var k = 0;
						
						response.Data.Comment.reverse();
						for(var key in response.Data.Comment){
							newArr[k] = response.Data.Comment[key];
							k++;
						}
						for(var key in $scope.listData[i].Comment){
							newArr[k] = $scope.listData[i].Comment[key];
							k++;
						}
						$scope.listData[i].Comment = newArr;
						
						if(response.TotalRecords==$scope.listData[i].Comment.length){
							$scope.listData[i].PostCommentShow = '0';
						}

						$scope.listData[i].CommentPageNo++;
						//My Codes Ends


						//$scope.listData[i].Comment = new Array;
						//for (var j = 0; j < response.Data.Comment.length; j++) {
						//	$scope.listData[i].Comment.unshift(response.Data.Comment[j]) ;
						//}
						return;
					}
				} 
			} else {
				//Show Error Message	
			}
		});	
	}

	$scope.likepost = function()
	{
		$scope.GroupID = ''
		$scope.setValue = '';
		
		$scope.postguid = ''; 
		if($('#postGuid').val())
		{
			$scope.postguid = $('#postGuid').val() ; 
		}
		
		$scope.LoginSessionKey = '' ; 
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 	
		}
		
		reqData = {LoginSessionKey:$scope.LoginSessionKey,PostGuID:$scope.postguid};
		
		GroupwallService.DoLike(reqData).then(function(response){
			if(response.ResponseCode==200){
//				$("#likeid"+$scope.postguid).text(response.Data.PostLikeCount);
				$($scope.listData).each(function(key,value){
					if($scope.listData[key].PostGuID==$scope.postguid){
						$scope.listData[key].PostLikeCount = response.Data.PostLikeCount;
						if($scope.listData[key].LikeStatus == 1){
							$scope.listData[key].LikeStatus=0;
						} else {
							$scope.listData[key].LikeStatus=1;
						}
					}
				});
				//$scope.GetwallPost() ; 
			} else {
				//Show Error Message
			}
		});	
	}
	
	
	$scope.SubmitWallCommentpost = function()
	{
		
		var jsonData = {};
		var formid = $('#formid').val();
		var formData = $("#innercommentarea"+formid).serializeArray();
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
		   GroupwallService.Submitwall(jsonData).then(function(response){

			//$scope.GetwallPost() ; 
		})	
		},

		$scope.DeleteWallPost = function(PostGuID)
		{
			$scope.LoginSessionKey = '' ; 
			if($('#LoginSessionKey').val())
			{
				$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 	
			}
			$scope.postguid ='';
			if($('#postGuid').val())
			{
				$scope.postguid = $('#postGuid').val() ; 	
			}
			if($('#post_type').val())
			{
				$scope.posttypeid =  $('#post_type').val()	;		
			}
			if($('#hdn_entity_id').val())
			{
				$scope.hdn_entity_id 	= $('#hdn_entity_id').val() ; 
			}
			reqData = {EntityID:$scope.hdn_entity_id,LoginSessionKey:$scope.LoginSessionKey,PostGuID:$scope.postguid,PostType:$scope.posttypeid}; 
			GroupwallService.delete_wall_post(reqData).then(function(response){
					if(response.ResponseCode==200){
						//$scope.message = response.DeleteWallPost.Message;
						$('.close').trigger('click');
	                    //$('#postuserpost'+PostGuID).remove();					
	                    //alertify.success('Message Deleted Successfully.');
						//$scope.GetwallPost() ;
						$('#'+$scope.postguid).remove();
					} else {
						//Show Error Message
					}
				});
		}

		$scope.DeleteWallcomment = function()
		{
			$scope.LoginSessionKey = '' ; 
			if($('#LoginSessionKey').val())
			{
				$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 	
			}
			$scope.postguid ='';
			if($('#postGuid').val())
			{
				$scope.postguid = $('#postGuid').val() ; 	
			}
			if($('#post_type').val())
			{
				$scope.posttypeid =  $('#post_type').val()	;		
			}
			if($('#hdn_entity_id').val())
			{
				$scope.hdn_entity_id 	= $('#hdn_entity_id').val() ; 
			}
			var pid = $('#postParent').val();

			reqData = {EntityID:$scope.hdn_entity_id,LoginSessionKey:$scope.LoginSessionKey,PostGuID:$scope.postguid,PostType:$scope.posttypeid}; 
			GroupwallService.delete_wall_comment(reqData).then(function(response){					
				if(response.ResponseCode==200){
					$('#commentid'+pid).text(response.Data.PostCommentCount);                    
					$('#commentwrapper'+$scope.postguid).remove();                    
					$('.close').trigger('click'); 

					for (var i = 0; i < $scope.listData.length; i++) {
						if($scope.listData[i].PostGuID == pid){
							for (var j = 0; j < $scope.listData[i].Comment.length; j++) {
								if($scope.listData[i].Comment[j].PostCommentGuID == $scope.postguid){
									$scope.listData[i].Comment.splice(j, 1);
									return;
								}
							}
							return;
						}
					} 
						//$scope.GetwallPost() ; 
					
				} else {
					//Show Error Message
				}	
				});
		}

		$scope.Count_LikeMember=function()
		{
			if($('#postGuid').val())
			{
				$scope.postguid=$('#postGuid').val(); 	
			}
			reqData={PostGuID:$scope.postguid};  
			GroupwallService.Count_Like_Member(reqData).then(function(response){
				if(response.ResponseCode==200)
				{
					var totalreords=response.totalrecords;
					if(totalreords>0)
					{
						$scope.LikeCountOfUsers=totalreords;
						$scope.listDataUser=[];
						$scope.listDataUser.push(response.Data);
						console.log($scope.listDataUser);
					}
				}
				else
				{
					alert(response.Message);
				}
		// alertify.success('Message Deleted Successfully.');
		//$scope.GetwallPost() ; 
	});
		}


		$scope.set_Compliment = function()
		{

			$scope.LoginSessionKey = '' ; 
			if($('#LoginSessionKey').val())
			{
				$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 	
			}
			$scope.postguid = '' ; 
			if($('#postGuid').val())
			{
				$scope.postguid = $('#postGuid').val() ; 	
			}
			$scope.complimenttype = '' ; 
			if($('#compliment').val())
			{
				$scope.complimenttype = $('#compliment').val() ; 	
			}


			reqData = {LoginSessionKey:$scope.LoginSessionKey,PostGuID:$scope.postguid,ComplimentType:$scope.complimenttype};  
			GroupwallService.setting_compliment(reqData).then(function(response){
				console.log(response);
				$('.close').trigger('click') ; 
                   // alertify.success('Message Deleted Successfully.');
					//$scope.GetwallPost() ; 
					
					
				});
		}

		$scope.Count_compliment = function()
		{
			if($('#postGuid').val())
			{
				$scope.postguid = $('#postGuid').val() ; 	
			}
			reqData = {PostGuID:$scope.postguid};  
			GroupwallService.NoOfCompliment(reqData).then(function(response){
				console.log(response)
				
                   // alertify.success('Message Deleted Successfully.');
					//$scope.GetwallPost() ; 
					
					
				});
		}

		$scope.wallslider = function(){            	
			setTimeout(function(){
				$(".slider").bxSlider({
					slideWidth: 210,
					minSlides: 2,
					maxSlides: 3,
					slideMargin: 10,
					pager:false,
					moveSlides: 1,
					infiniteLoop:false,
					auto:false,
				});
				$(".slider").show();
			});
		}

		if($('#WallPageNo').length>0){
			$(document).ready(function(){
				$(window).scroll(function() {
					var pScroll = $(window).scrollTop();
					var pageBottomScroll1 = parseInt($(document).height()) - parseInt($(window).height())-1;
					var pageBottomScroll2 = parseInt($(document).height()) - parseInt($(window).height());
					var pageBottomScroll3 = parseInt($(document).height()) - parseInt($(window).height())+1;
				   	if(pScroll == pageBottomScroll1 || pScroll == pageBottomScroll2 || pScroll == pageBottomScroll3) {
				       setTimeout(function(){
				       	if(pScroll == pageBottomScroll1 || pScroll == pageBottomScroll2 || pScroll == pageBottomScroll3){
						    $scope.GetwallPost();
				       	}
				       },200);
				   }
				});
			});
		}

	});

/*$(document).ready(function () {	
	$(".slider").bxSlider({
		slideWidth: 210,
		minSlides: 2,
		maxSlides: 3,
		slideMargin: 10,
		pager:false,
		moveSlides: 1,
		infiniteLoop:false,
		auto:false
	});
});*/


function like(postguid)
{
	$('#postGuid').val(postguid);
	angular.element(document.getElementById('WallPostCtrl')).scope().likepost();	
}

function deleteComment(postguid)
{
	$('#postGuid').val(postguid);
	$('#systemDicisionAlert').attr('lang','DeleteWallPost')  ; 
	//angular.element(document.getElementById('WallPostCtrl')).scope().DeleteWallPost();	
}

function activeuserform(ids)
{
	$('#comenntformid').val(ids);

	if($('#PostComment'+ids).val()=='' || $('#PostComment'+ids).val()=='Post a comment'){
		$('#posterror'+ids).text('Please enter comment.');
		return;
	}
	if($('#post_type').val())
	{
		var posttype =$('#post_type').val() ;
		$('#postytype_insideform').val(posttype);
	}
	angular.element(document.getElementById('WallPostCtrl')).scope().submitComment();	
}

function deleteUserComment(postguid,pid)
{
	$('#postParent').val(pid);
	$('#postGuid').val(postguid);
	$('#systemDicisionAlert').attr('lang','deleteUserComment')  ; 
	//angular.element(document.getElementById('WallPostCtrl')).scope().DeleteWallcomment();	
}

function dodelete()
{
	var alertid = $('#systemDicisionAlert').attr('lang') ; 
	if(alertid=='DeleteWallPost'){
		angular.element(document.getElementById('WallPostCtrl')).scope().DeleteWallPost();	
	} else { angular.element(document.getElementById('WallPostCtrl')).scope().DeleteWallcomment();	 } 
}
function donothing(){ $('.close').trigger('click'); }

function likecount(id)
{

	$('#postGuid').val(id); 
	angular.element(document.getElementById('WallPostCtrl')).scope().Count_LikeMember();	
}

function setCompliment(data,str)
{
	$('#compliment').val(str); 
	$('#postGuid').val(data.lang) ; 
	angular.element(document.getElementById('WallPostCtrl')).scope().set_Compliment();
}

function complimentcount(postid)
{
	
	$('#postGuid').val(postid.lang) ; 
	angular.element(document.getElementById('WallPostCtrl')).scope().Count_compliment();
	$("#ShowComplimentStats").trigger("click");
}


$(function() {
	function removeThisMedia(ths){
		$(ths).parent().remove();

	}
	var errorHandler = function(event, id, fileName, reason) {
		//alert(reason);
            //qq.log("id: " + id + ", fileName: " + fileName + ", reason: " + reason);
        };


        new qq.FineUploaderBasic({
        	multiple: true,
        	autoUpload: true,
        	button: $("#AddWallPhoto")[0],
        	request: {
        		endpoint: site_url+"uploadimage/uploadFile",
        		params: {
        			type: 'wall',
        			unique_id:function() {
        				return ''; 
        			}
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

     },onComplete: function(id, fileName, responseJSON) {

     	if (responseJSON.result=='success') {
     		$('#wallphotocontainer').prepend('<div class="superbox-list"><a href="javascript:void(0);" class="close-pic color-red" onclick="removeThisMedia(this);"><i class="fa fa-times-circle font18"></i></a> <img src="' + responseJSON.thumb + '" alt="" class="superbox-img"><input type="hidden" name="WallMedia[]" value="' + responseJSON.file_name + '"/><input type="hidden" name="MediaSize[]" value="' + responseJSON.size + '"/></div>');
     	}			
     	$('#wallphotocontainer').show();
     	$('#loader').hide();


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