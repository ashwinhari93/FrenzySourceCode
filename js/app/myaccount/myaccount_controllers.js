
angular.module('App')
/*	Controller(s)
===================================*/
// Teachers Manage Profile Controller

.controller('teachManProfCtrl',function($scope,MyAccountSettingService) {
	
	$scope.about = '';
	$scope.submitAboutMe = function(){
        var LoginSessionKey = $('#LoginSessionKey').val();
        var FirstName = $scope.FirstName;
        var LastName = $scope.LastName;
        var Email = $scope.Email;
        var about = $scope.about;
        var location = $scope.location;
        var Expertise = new Array();
        var Username = $scope.Username;
        $('.tagedit-list input[type="hidden"]').each(function(k,v){
        	if($(v).val()!==''){
        		Expertise[k] = v.value;
        	}
        });
        var reqData = {LoginSessionKey:LoginSessionKey,FirstName:FirstName,LastName:LastName,Email:Email,AboutMe:about,Location:location,Expertise:Expertise,Username:Username};
        MyAccountSettingService.updateUserProfile(reqData).then(function(response){
            if(response.ResponseCode==200){
	            alertify.message('Profile has been updated successfully.');
            } else {
            	alertify.message(response.Message);
            }
        });
    }

    $scope.changeSocialValue = function(SocialType,SocialID,profileUrl){
    	if(SocialType=='2'){
			$scope.facebook['Username'] = SocialID;
			$scope.facebook['profileUrl'] = profileUrl;
		} else if(SocialType=='3'){
			$scope.twitter['Username'] = SocialID;
			$scope.twitter['profileUrl'] = profileUrl;
		} else if(SocialType=='4'){
			$scope.gplus['Username'] = SocialID;
			$scope.gplus['profileUrl'] = profileUrl;
		} else if(SocialType=='7'){
			$scope.linkedin['Username'] = SocialID;
			$scope.linkedin['profileUrl'] = profileUrl;
		}
    }

    $scope.facebook = {'Username':'','profileUrl':''};
    $scope.twitter = {'Username':'','profileUrl':''};
    $scope.gplus = {'Username':'','profileUrl':''};
    $scope.linkedin = {'Username':'','profileUrl':''};
    $scope.checkSocialAccounts = function(){
    	var LoginSessionKey = $('#LoginSessionKey').val();
    	var reqData = {LoginSessionKey:LoginSessionKey};
    	MyAccountSettingService.checkSocialAccounts(reqData).then(function(response){
    		if(response.ResponseCode==200){
    			if(response.Data!==''){
    				$(response.Data).each(function(k,v){
    					if(response.Data[k].SourceID=='2'){
    						$scope.facebook['Username'] = response.Data[k].LoginKeyword;
    						$scope.facebook['profileUrl'] = response.Data[k].ProfileURL;
    					} else if(response.Data[k].SourceID=='3'){
    						$scope.twitter['Username'] = response.Data[k].LoginKeyword;
    						$scope.twitter['profileUrl'] = response.Data[k].ProfileURL;
    					} else if(response.Data[k].SourceID=='4'){
    						$scope.gplus['Username'] = response.Data[k].LoginKeyword;
    						$scope.gplus['profileUrl'] = response.Data[k].ProfileURL;
    					} else if(response.Data[k].SourceID=='7'){
    						$scope.linkedin['Username'] = response.Data[k].LoginKeyword;
    						$scope.linkedin['profileUrl'] = response.Data[k].ProfileURL;
    					}
    				});
    			}
    		}
    	});
    }

    // $scope.aboutCount = function(){
    // 	console.log($scope.about.length);
    // 	$('#aboutCount').html(200-parseInt($scope.about.length));
    // }

    $scope.fetchDetails = function(){

        var reqData = {LoginSessionKey:LoginSessionKey};
        MyAccountSettingService.getUserProfile(reqData).then(function(response){
	        $scope.FirstName = response.Data.FirstName;
	        $scope.LastName = response.Data.LastName;
	        $scope.Email = response.Data.Email;
	        $scope.about = response.Data.UserWallStatus;
	        $scope.location = response.Data.Location;
	        $scope.Expertise = response.Data.Expertise;
	        $scope.Username = response.Data.Username;
	        //$scope.aboutCount();
	        var arr = ["1"];
	        $scope.Fetch_expertise(arr); 
        });
    }

    $scope.Fetch_expertise = function(ckey) {
        var LoginSessionKey = $('#LoginSessionKey').val();
        reqData = {
            ckey: $scope.ckey,
            LoginSessionKey: LoginSessionKey
        };
        MyAccountSettingService.FetchExpertise(reqData).then(function(response) {
            if(response.ResponseCode==200){
                var expertiseJSON = response.Data.Expertise;
                if($scope.Expertise.length>0)
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
	                $('#removediv').html('<input type="text" name="tag[]" id="removeinput" class="form-control input-lg tag" >');
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
        });
    }

	$scope.teachManProf = function () {	
		var val = checkstatus('teach-manage-profile-form');
		if(val===false) return;

		var profgendername=$scope.genderlist;
		var profFirstname=$scope.userfirstname;
		var profLastname=$scope.userlastname;
		var profusername=$scope.userusername;
		var profprofilename=$scope.userprofilename;
		var profemail=$scope.useremail;
		var proftimezone=$scope.timezonelist;
		var profcountry=$scope.countrylist;
		var proflocation=$scope.location;
		var UserGUID=$scope.UserGUID;
		var LoginSessionKey=$scope.LoginSessionKey;
		
		if(typeof(profgendername)=='undefined' || profgendername==null) {
			usergender='';
		} else {
			usergender=profgendername.gvalue;
		}
		
		if(typeof(proftimezone)=='undefined' || proftimezone==null) {
			usertimezone='';
		} else {
			usertimezone=proftimezone.TimeZoneID;
		}

		if(typeof(profcountry)=='undefined' || profcountry==null) {
			usercountry='';
		} else {
			usercountry=profcountry.country_id;
		}
		
var requestData={FirstName:profFirstname,LastName:profLastname,Email:profemail,UserGUID:UserGUID,CityId:0,Location:proflocation,Gender:usergender,TimeZoneId:usertimezone,ProfileName:profprofilename,UserName:profusername,CountryId:usercountry,LoginSessionKey:LoginSessionKey};
		MyAccountSettingService.ChangePersonalSetting(requestData).then(function(response){ 
		//$("#ApiSaveSettingMessage").text(response.Message);
		
		if(response.ResponseCode==200) {
			//alertify.success(response.Message);
            window.location=base_url+'myaccount';
			blankFields('all','all');
		} else {
			$('#commonError').html(response.Message);
		}
		//$("#ApiSaveSettingBtn").trigger("click");
		})
	};

	function blankFields(targetid,textmessage)
	{
		$("#errorFirstname").text('');
		$("#errorlastname").text('');
		$("#erroremail").text('');
		$("#errortimezone").text('');
		$("#errorgender").text('');
		$("#errorprofilename").text('');
		if(targetid!='all') {
			$("#"+targetid).text(textmessage);
		}
	}

	$scope.FillUserDetails=function () {
		$scope.timezones=[];
		var UserGUID=$('#UserGUID').val();
		LoginSessionKey=$('#LoginSessionKey').val();
		//console.log(UserGUID,LoginSessionKey);
		var requestData = {UserGUID:UserGUID,LoginSessionKey:LoginSessionKey};
		MyAccountSettingService.GetUserData(requestData).then(function(response){ 
			if(response.ResponseCode==200)
			{
				$scope.userfirstname=response.Data.FirstName;
				$scope.userlastname=response.Data.LastName;
				$scope.useremail=response.Data.Email;
				$scope.userprofilename=response.Data.ProfileName;
				$scope.userusername=response.Data.Username;
				$scope.roleofuser=response.Data.RoleName;
				$scope.userrolename=response.Data.RoleName;
				$scope.usertype=response.Data.UserType;
				$scope.location=response.Data.Location;
				$scope.usergenderid=response.Data.Gender;
				$scope.usertimezoneid=response.Data.TimeZoneID;
				$scope.CountryID=response.Data.CountryID;
				$scope.SetPassword=response.Data.SetPassword;
				$("#roleofuser").text("www.mindfulnets.com/"+response.Data.RoleName);
				if(response.Data.SourceID!=1 || typeof(response.Data.SourceID)=='undefined' || response.Data.SourceID==null) {
					//$("#resetpasswordlink").hide();
				}

				$scope.countries=response.Data.Countries;
				jQuery.each(response.Data.Countries,function(index,value) {
				if(value.country_id==response.Data.CountryID){					
				$scope.countrylist=$scope.countries[index];
				}
				});
				
				$scope.genders=[{"gvalue":"1","glabel":"Mr."},{"gvalue":"2","glabel":"Mrs."},{"gvalue":"3","glabel":"Ms."}];
				if(response.Data.Gender>0){
					usergenderid=response.Data.Gender-1;
				} else {
					usergenderid='';
				}
				$scope.genderlist = $scope.genders[usergenderid];
			
				$scope.languagelist = {selected: "English"};
			 	$scope.languages = ["English", "Hindi"];

				//console.log($scope.timezones);
				jQuery.each($scope.timezones,function(tindex,tvalue) {
					if(tvalue.TimeZoneID==response.Data.TimeZoneID){
						$scope.timezonelist=$scope.timezones[tindex];
					}
				});
			}
			else
			{
				//Show Error Message
			}
		})
	};

	UserGUID=$("#UserGUID").val();
	var InitialData={UserGUID:UserGUID};
	MyAccountSettingService.InitData(InitialData).then(function(response){ 
		if(response.ResponseCode==200){
			$scope.timezones = response.Timezone.Data; 
			InitTimeZoneID='';
			$scope.timezonelist=$scope.timezones[InitTimeZoneID];  
		} else {
			//Show Error Message
		}
	})
})

// Teachers Manage Notifications Controller
.controller('teachManNotiCtrl', ['$scope', function ($scope) {
	$scope.teachManNoti = function () {		
		var monhourtime = $scope.hourslist	
		monminutestime = $scope.minuteslist	
		monsecondstime = $scope.secondslist
		
		
		$scope.monalerttime = [monhourtime, monminutestime, monsecondstime]
		
	}
	$scope.hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]; 
	
	$scope.minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30","31", "32", "33", "34", "35", "36", "37", "38", "39", "40","41", "42", "43", "44", "45", "46", "47", "48", "49", "50","51", "52", "53", "54", "55", "56", "57", "58", "59"]; 
	
	$scope.seconds = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30","31", "32", "33", "34", "35", "36", "37", "38", "39", "40","41", "42", "43", "44", "45", "46", "47", "48", "49", "50","51", "52", "53", "54", "55", "56", "57", "58", "59"]; 

}])

.controller('SetPasswordCtrl', function($scope,SetPasswordService){
    $scope.submitted = false;    
$scope.SetPassword=function($validFlag,form){
        $scope.submitted=true;
        if(!$validFlag){
            return;
        }
        $('.loader-signup').show();
	var NewPassword=$scope.NewSetPassword;
	var NewConPassword=$scope.NewSetConPassword;
	var LoginSessionKey=$scope.LoginSessionKey;
	var requestData = {PasswordNew:NewPassword,ConfirmPassword:NewConPassword,LoginSessionKey:LoginSessionKey};
	if(NewPassword!==NewConPassword){
		$('#commonErrorModal2').html('Password and Confirm Password Should Be Same.');
		$('#commonErrorModal').parents('.alert').show();
		return;
	}
	if(NewPassword.length<4){
		$('#commonErrorModal2').html('Password should be atleast 4 characters long.');
		$('#commonErrorModal').parents('.alert').show();
		return;
	}
	$('#commonErrorModal').html('');
	SetPasswordService.ChangePassword(requestData).then(function(response){ 
		if(response.ResponseCode==200) {
			$("#myModal2 .close").trigger("click");
			$("#errorOldPassword").text("");
			$("#errorNewPassword").text("");
			$("#errorConPassword").text("");
			$("#OldPassword").val("");
			$("#NewPassword").val("");
			$("#NewConPassword").val("");
			$("#strengthNewPassword").text("");
                        $('.loader-signup').hide();
                        
                        form.NewPassword.$dirty = false;
                        form.NewConPassword.$dirty = false;

                        
                        $scope.submitted=false;
                        $scope.NewSetPassword = '';
                        $scope.NewSetConPassword = '';
                        
                        closePopDiv('accountSetings');
			alertify.success('Password updated successfully.');
			//window.location.reload();
		} else {
                        $('.loader-signup').hide();
                        alertify.error(response.Message);
			//$('#commonErrorModal').html(response.Message);
			//$('#commonErrorModal').parents('.alert').show();
		}
	})
	}
})

.controller('ResetPasswordCtrl', function($scope,ResetPasswordService){
    $scope.resetpasssubmitted=false;
    
$scope.ResetPassword=function($validFlag,form){
        $scope.resetpasssubmitted=true;
        if(!$validFlag){
            return;
        }
	$('.loader-signup').show();
	var OldPassword=$scope.OldPassword;
	var NewPassword=$scope.NewPassword;
	var NewConPassword=$scope.NewConPassword;
	var LoginSessionKey=$scope.LoginSessionKey;
	var requestData = {Password:OldPassword,PasswordNew:NewPassword,ConfirmPassword:NewConPassword,LoginSessionKey:LoginSessionKey};
	if(NewPassword!==NewConPassword){
		$('#commonErrorModal').html('Password and Confirm Password Should Be Same.');
		$('#commonErrorModal').parents('.alert').removeClass('alert-success').addClass('alert-danger').show();
		return;
	}
	if(NewPassword.length<4){
		$('#commonErrorModal').html('Password should be atleast 4 characters long.');
		$('#commonErrorModal').parents('.alert').removeClass('alert-success').addClass('alert-danger').show();
		return;
	}
	$('#commonErrorModal').html('');
	$('#commonErrorModal').parents('.alert').removeClass('alert-success').addClass('alert-danger').hide();
	ResetPasswordService.ChangePassword(requestData).then(function(response){ 
		if(response.ResponseCode==200) {
			$("#CloseResetPasswordModal").trigger("click");
			$("#errorOldPassword1").text("");
			$("#errorNewPassword1").text("");
			$("#errorConPassword1").text("");
			$("#OldPassword").val("");
			$("#NewPassword").val("");
			$("#NewConPassword").val("");
			$("#strengthNewPassword1").text("");
                        $('.loader-signup').hide();
                        
                        form.OldPassword.$dirty = false;
                        form.NewPassword.$dirty = false;
                        form.NewConPassword.$dirty = false;
                        
                        $scope.resetpasssubmitted=false;
                        $scope.OldPassword = '';
                        $scope.NewPassword = '';
                        $scope.NewConPassword = '';
                        
                        closePopDiv('accountSetings');
			alertify.success('Password updated successfully.');
			//$('#commonErrorModal').html(response.Message);
			//$('#commonErrorModal').parents('.alert').removeClass('alert-danger').addClass('alert-success').show();
		} else {
                        $('.loader-signup').hide();
                        alertify.error(response.Message);
			//$('#commonErrorModal').html(response.Message);
			//$('#commonErrorModal').parents('.alert').removeClass('alert-success').addClass('alert-danger').show();
		}
	})
	}
})
.controller('DeleteAccountCtrl', function($scope,MyAccountSettingService){
	$scope.DeleteAccount=function(){
	var UserGUID=$scope.UserGUID;
	var LoginSessionKey=$scope.LoginSessionKey;
	var requestData = {UserGUID:UserGUID,LoginSessionKey:LoginSessionKey};
	MyAccountSettingService.DeleteAccount(requestData).then(function(response){ 
		if(response.ResponseCode==200) {
			window.location=base_url+'signup/SignOut';
		} else {
			$("#APIRetunMessage").text(response.Message);
			$("#ApiReturnBtn").trigger("click");
		}
	})
	}
})
.controller('reportAbuseCtrl',function($scope,$http,appInfo){

	$scope.flagUserOrActivity = function(){
    	var LoginSessionKey = $('#LoginSessionKey').val();
    	var Type = $('.flagType').val();
    	var TypeID = $('.typeID').val();
    	var FlagReason = '';
    	$('.reportAbuseDesc:checkbox:checked').each(function(){
    		FlagReason += $(this).val()+',';
    	});
        jsonData = {LoginSessionKey:LoginSessionKey,Type:Type,TypeID:TypeID,FlagReason:FlagReason};
        $http.post(appInfo.serviceUrl + 'flag',jsonData).success(function(response){
            if(response.ResponseCode==200){
                alertify.success(Type+' Reported Successfully.');
                $('#reportAbuse').modal('hide');
                if($('#tid-'+TypeID).length>0){
                	$('#tid-'+TypeID).hide();
                	$('#tid2-'+TypeID).show();	
                }
                if($('#tid-user-'+TypeID).length>0){
                	$('#tid-user-'+TypeID).hide();
                	$('#tid2-user-'+TypeID).show();	
                }
                if($('#reportAbuseLink').length>0){
                	$('#reportAbuseLink').hide();
                	$('#reportAbuseLink2').show();
                }
                //$('#reportAbuseLink').attr('src','javascript:void(0)');
                //$('#reportAbuseLink').html('src','javascript:void(0)');
            }
        });
    }
}).filter("nl2br", function($filter) {
 return function(data) {
   if (!data) return data;
   return data.replace(/\n\r?/g, '<br />');
 };
});;




$(document).ready(function(){
	$(document).on("click","#idChangePasswordBtn",function(){
		//angular.element(document.getElementById('ChangePassCon')).scope().ResetPassword();
	});

	$(document).on("click","#idDeleteAccountBtn",function(){
		angular.element(document.getElementById('DeleleAccountContainer')).scope().DeleteAccount();
	});
	
	$(document).on("click","#resetpasswordlink",function(){
		$("#errorOldPassword").text("");
		$("#errorNewPassword").text("");
		$("#errorConPassword").text("");
		$("#OldPassword").val("");
		$("#NewPassword").val("");
		$("#NewConPassword").val("");
		$("#strengthNewPassword").text("");
	});

	$( ".expertise" ).tagedit();
        
        
        $('input#searchformember').keyup(function (e) {
            if ($('#searchformember').val().length >= 2 || $('#searchformember').val().length < 1) {
                $('#searchinvitemember').trigger('click');
            }
        });
        
});
