/*$(document).ready(function(){
	angular.bootstrap(document, ['App']);
});


var app = angular.module('App' , ['ui.bootstrap']);
/*	Controller(s)*/


/**** user Controller ***/

var expertiseJSON=[];
var teachJSON=[];
var lookingJSON=[];
var offerJSON=[];
var topicJSON=[];
var practiceJSON=[];


angular.module('App')
.controller('UserProfileCtrl', function($scope, UserProfileService){
	
				
	//$scope.filteredTodos = [],
	$scope.currentPage = 1,
	$scope.numPerPage = 2,
	$scope.maxSize = 3;
	$scope.grpStatus = ''; 
    $scope.orderByField = '';
    $scope.reverseSort = '';
	$scope.noOfObj='';
	$scope.fnoOfObj='';
    $scope.editAbove = '';
    $scope.tmplevel='';
    $scope.tmpwebsite='';
    
    
        $scope.getevels = function()
	{
        reqData={LoginSessionKey:$('#LoginSessionKey').val()};
        /*UserProfileService.getLevelList(reqData).then(function(response){
        if(response.ResponseCode==200) { 
            $scope.levellist=response.Data;
        }
        });*/
    }
       
	$scope.callfollowing = function()
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
		UserProfileService.getFollowing(reqData).then(function(response){
			if(response.ResponseCode==200){
				$scope.connection = response.Data.Connection;
				$scope.noOfObj=response.Data.Connections; 
				if($scope.noOfObj==0){ $scope.connection_see_all = response.for_connection_see_all ;   }
			} else {
				//Show Error Message
			}
					
		});
	}

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
			if(response.ResponseCode==200){
				$scope.followers = response.Data.Connection;
				$scope.fnoOfObj=response.Data.Connections; 
				if($scope.fnoOfObj==0){ $scope.fconnection_see_all = response.for_connection_see_all ;   }
			} else {
				//Show Error Message
			}
					
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
		/*UserProfileService.points(reqData).then(function(response){
					$scope.userpoint=response.Data.EarnPoints ; 
					$scope.see_all_limit = response.see_all_for_points
					
		});*/
	}
	
	$scope.SaveInterestteacher = function()
	{
		var formData = $("#sideform").serialize();   
		UserProfileService.saveinterest_profile(formData).then(function(response){	
																		
				window.location.href= site_url+'userprofile';
		});
	}
	
	
	$scope.SaveIntereststudent = function()
	{
		
		var formData = $("#siform").serialize();  
		UserProfileService.saveinterest_profile_student(formData).then(function(response){	
					//	angular.element(document.getElementById('UserProfileCtrl')).scope().FetchInterest();												
					window.location.href= site_url+'userprofile';
		});
	}
		
	$scope.FetchInterest = function(act)
	{
		$scope.LoginSessionKey = '' ; 
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 	
		}
				reqData = {LoginSessionKey:$scope.LoginSessionKey}; 
				UserProfileService.FetchInterest_profile(reqData).then(function(response){
				if(response.ResponseCode>=200 && response.ResponseCode<=204){
					$scope.teachs = response.Data.Teach;
					$scope.look = response.Data.Looking;    
					$scope.offers = response.Data.Offer; 
					$scope.topic = response.Data.Topic; 
					$scope.practices = response.Data.Practice;
					$scope.student = response.Data.Student ; 
					$scope.teacher = response.Data.Teacher ; 
					if(typeof(response.Data.Websites)!=0)
					$scope.webSites=response.Data.Websites; 
					$scope.WebSitesInText=response.Data.Websites; 

	                $scope.tmplevel= null;
	             if(response.websites==''){
	                $scope.tmpwebsite= null;
	            }else{
	                $scope.tmpwebsite= response.websites;
	            }
	                
					//console.log(response);
					var inte = response.Data.Reason; 
					var arr = ["2","3","4","5","6"];
					//$scope.Fetch_expertise(arr) ; 
	                
	                if(act=='edit'){
	                    $('#siform .editableAnsRegion').show();
	                  
	                }
	                
					if(inte==2)
					{
	                     if(act=='edit'){
	                  
	                    $scope.tmpwebsite = null;
	                 
	                }
						if($scope.teachs.length>0)
						{
							$('#sideform').find('input.tagteach').tagedit({
								autocompleteOptions: {
									source: function(request, response){
										var data = teachJSON;				
										return response($.ui.autocomplete.filter(data, request.term) );
									}
								},
								allowEdit: false,
								allowAdd: true
							});
						}
						else
						{
							$('#teach').html('<div class="que">I CAN TEACH</div><input type="text" name="teach[]" class="form-control input-lg tagteach" >');
							$('#sideform').find('input.tagteach').tagedit({
								autocompleteOptions: {
									source: function(request, response){
										var data = teachJSON;				
										return response($.ui.autocomplete.filter(data, request.term) );
									}
								},
								allowEdit: false,
								allowAdd: true
							});
						}
				
						if($scope.offers.length>0)
						{
							$('#sideform').find('input.tagoffer').tagedit({
								autocompleteOptions: {
									source: function(request, response){
										var data = offerJSON;				
										return response($.ui.autocomplete.filter(data,request.term));
									}
								},
								allowEdit: false,
								allowAdd: true
							});
						}
						else
						{
							$('#offer').html('<div class="que" >I OFFER</div><input type="text" name="offer[]" class="form-control input-lg tagoffer">');	
							$('#sideform').find('input.tagoffer').tagedit({
								autocompleteOptions: {
									source: function(request, response){
										var data = offerJSON;				
										return response($.ui.autocomplete.filter(data, request.term) );
									}
								},
								allowEdit: false,
								allowAdd: true
							});
						}
				
						if($scope.look.length>0)
						{    
							$('#sideform').find('input.taglooking').tagedit({
								autocompleteOptions: {
									source: function(request, response){
										var data = lookingJSON;				
										return response($.ui.autocomplete.filter(data, request.term) );
									}
								},
								allowEdit: false,
								allowAdd: true
							});
						}
						else
						{
							$('#lookings').html('<div class="que">I AM LOOKING IN MINDFULNETS FOR</div><input type="text" name="looking[]" class="form-control input-lg taglooking">');	
							$('#sideform').find('input.taglooking').tagedit({
								autocompleteOptions: {
									source: function(request, response){
										var data = lookingJSON;
										return response($.ui.autocomplete.filter(data,request.term));
									}
								},
								allowEdit: false,
								allowAdd: true
							});
						}
					}
					else
					{
	                     if(act=='edit'){
	                  
	                    $scope.tmplevel = null;
	                    jQuery.each($scope.levellist,function(tindex,tvalue) {
						if(tvalue.LevelID==response.LevelID){
							$scope.level=$scope.levellist[tindex];
						}
					});
	                }
	                    
						if($scope.topic.length>0)
						{ 
							$('#siform').find('input.tagtopic').tagedit({
								autocompleteOptions: {
									source: function(request, response){
										var data = topicJSON; 
										return response($.ui.autocomplete.filter(data, request.term) );
									}
								},
								allowEdit: false,
								allowAdd: true
							});
						}
						else
						{
							$('#topics').html('<div class="que">Topics</div><input type="text" name="topic[]" class="form-control input-lg tagtopic" >');
							$('#siform').find('input.tagtopic').tagedit({
								autocompleteOptions: {
									source: function(request, response){
										var data = topicJSON	;				
										return response($.ui.autocomplete.filter(data, request.term) );
									}
								},
								allowEdit: false,
								allowAdd: true
							});
						}
						
						if($scope.practices.length>0)
						{
							$('#siform').find('input.tagpractice').tagedit({
								autocompleteOptions: {
									source: function(request, response){
										var data =practiceJSON;				
										return response($.ui.autocomplete.filter(data, request.term) );
									}
								},
								allowEdit: false,
								allowAdd: true
							});
						}
						else
						{
							$('#practice').html('<div class="que">I Practice</div><input type="text" name="practice[]" class="form-control input-lg tagpractice">');	
							$('#siform').find('input.tagpractice').tagedit({
								autocompleteOptions: {
									source: function(request, response){
										var data = practiceJSON ; 				
										return response($.ui.autocomplete.filter(data, request.term) );
									}
								},
								allowEdit: false,
								allowAdd: true
							});
						}
						
						if($scope.look.length>0)
						{    
							$('#siform').find('input.taglooks').tagedit({
								autocompleteOptions: {
									source: function(request, response){
										var data = lookingJSON;				
										return response($.ui.autocomplete.filter(data, request.term) );
									}
								},
								allowEdit: false,
								allowAdd: true
							});
						}
						else
						{
							$('#looks').html('<div class="que">I AM LOOKING IN MINDFULNETS FOR</div><input type="text" name="luk[]" class="form-control input-lg taglooks">');	
							$('#siform').find('input.taglooks').tagedit({
								autocompleteOptions: {
									source: function(request, response){
										var data = lookingJSON;				
										return response($.ui.autocomplete.filter(data, request.term) );
									}
								},
								allowEdit: false,
								allowAdd: true
							});
						}
					}
				}				
			});
		}
	
	$scope.Fetch_expertise = function(ckey)
	{
		var LoginSessionKey = $('#LoginSessionKey').val();
    	reqData = {ckey:$scope.ckey,LoginSessionKey:LoginSessionKey}; 
		UserProfileService.FetchExpertise(reqData).then(function(response){
		try{
			if(response.ResponseCode==200){
				expertiseJSON  = response.Data.Expertise;
				teachJSON  = response.Data.Teach;
				lookingJSON  = response.Data.Looking;
				offerJSON  = response.Data.Offer;
				topicJSON  = response.Data.Topic;
				practiceJSON  = response.Data.Practice;
			} else {
				//Show Error Message
			}																	 
		} catch(e) {
		}
		});
	}		
	
	$scope.fetchDetails = function(action)
	{     
		$scope.LoginSessionKey = '' ; 
		if($('#LoginSessionKey').val())
		{
			$scope.LoginSessionKey = $('#LoginSessionKey').val() ; 	
		}
		var expErtise = [] ; 
		if(action == 'edit' || action == 'load')
		{
			reqData = {LoginSessionKey:$scope.LoginSessionKey}; 
			UserProfileService.GetUserStatusDetail(reqData).then(function(response){
			if(response.ResponseCode>=200 && response.ResponseCode<=204){
				$scope.imgsrc = response.Data.path;
	            $scope.ProfilePicture = response.Data.ProfilePicture;
				$scope.Expertise = [] ; 
				var ttl = response.Data.totalrows; 
	            $scope.ttl = response.Data.totalrows;
				$scope.records = response.Data.totalrecords;
				$scope.points = response.Data.points.EarnPoints; 
				$scope.Percent = response.Data.Perctage ; 
				if(ttl>0)
				{
					$scope.Expertise = response.Data.expertise ;
				}
				
				
				
				$scope.status = response.Data.wallstatus.UserWallStatus ; 
	            if(action == 'edit')
	                {	      
	                    
	                    
	                    if($scope.ProfilePicture == "" || $scope.ProfilePicture == null){
							
	                         $('#current-picture').css('display','none');
	                         $('#uploadprofilepic').css('display','');  
	                         $('.del-ico').css('display','none');
					
	                    }else{
	                        $('.del-ico').css('display','block');
	                    }
	                       
	                       $scope.editAbove = $scope.status;
	                        $('#wallEdit').hide();
	                        $('#wallSave').show(); 
							var arr = ["1"];
						     $scope.Fetch_expertise(arr) ; 
	                        if(ttl>0)
							{
								$('#allcontrolform').find('input.tag').tagedit({
									autocompleteOptions: {
										source: function(request, response){
											var data = expertiseJSON;				
											return response($.ui.autocomplete.filter(data, request.term) );
										}
									},
									allowEdit: false,
									allowAdd: true
								});
	                             
							}
							else
							{
								console.log(3);
								$('#removediv').html('<div class="bold p-b-5">Expertise</div><input type="text" name="tag[]" id="removeinput" class="form-control input-lg tag" >');
								$('#allcontrolform').find('input.tag').tagedit({
									autocompleteOptions: {
										source: function(request, response){
											var data = expertiseJSON;				
											return response($.ui.autocomplete.filter(data, request.term) );
										}
									},
									allowEdit: false,
									allowAdd: true
								}); 
							}
	                }
				 
				}	
			});
					
		}
		else
		{
			 
			 var jsonData = {};
			  var tag = [];
			   $("input[id='removeinput']").each(function(){
						$(this).remove();					  
				}); 
			 var formData = {};
			 formData['LoginSessionKey'] = $('input[name="LoginSessionKey"]').val();
			 formData['AboutMe'] = $('#prifiledescription').val();
			 formData['ProfileMedia'] = $('input[name="profile_media"]').val();
			 formData['tag'] = new Array();
			 $('.tagedit-listelement.tagedit-listelement-old input').each(function(i){
			 	formData['tag'][i] = this.value;
			 });
			 UserProfileService.saveuserdetail(formData).then(function(response){
						$('.del-ico').css('display','none');
                  if(action == 'save')
					{	      
						window.location.href= site_url+'userprofile';
					}
					
			});
		
		}
		
		   
				
	}
});


function editmode()
{
	angular.element(document.getElementById('UserProfileCtrl')).scope().FetchInterest();	
}

function callfetch_detail(act)
{
	var text =$('#wallEdit').html(); 
	if(text!='Save'){
		
		
	}
	//angular.element(document.getElementById('UserProfileCtrl')).scope().fetchDetails(act);
}

function removeThisMedia(ths){
 $(ths).parent().html('');
  $('#current-picture').css('display','none');
                         $('#uploadprofilepic').css('display','');
                         $('#profile-picture').css('display','');
                         
                         $('.del-ico').css('display','none');
 
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
        button: $("#profile-picture")[0],
        request: {
            endpoint: site_url+"uploadimage/uploadFile",
		params: {
		   type: 'profile',
            unique_id:function() {
               // return $('#unique_id').val(); 
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
			
			c = parseInt($('#image_counter').val());
			c = c+1;
			$('#image_counter').val(c);

        },onComplete: function(id, fileName, responseJSON) {

                if (responseJSON.result=='success') {
                    $('#current-picture').html('<img width="118"  src="' + responseJSON.thumb + '"><input type="hidden" name="profile_media" value="' + responseJSON.file_name + '"/><i class="del-ico" onclick="removeThisMedia(this);" style="right: 0px ! important; left: 151px ! important;">remove</i>').show();
					// $("#profile-picture").hide();
                    
                }						 
				 $('#loader').hide();
				
				
         },onValidate: function (b) {
			var validExtensions = ['jpeg', 'jpg', 'gif', 'png','JPEG', 'JPG', 'GIF', 'PNG']; //array of valid extensions
			var fileName = b.name;
			var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
			if ($.inArray(fileNameExt, validExtensions) == -1){
				alertify.alert("Allowed file type only jpeg,jpg,gif and png .");       
				$(".alertify-message").css('padding-bottom','10px');
				$(".alertify-buttons").css('float','none');
				return false;
			}
             if(b.size>4194304){
                alertify.alert('Files must be less than 4 MB.');
                 $(".alertify-message").css('padding-bottom','10px');
				$(".alertify-buttons").css('float','none');
             }
            
         }
        }
    });
	

});