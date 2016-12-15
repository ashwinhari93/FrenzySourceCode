/*	Controller(s)
===================================*/
angular.module('App')
	.controller('loginAccountCtrl', loginAccountCtrl)
	.controller('signUpCtrl', signUpCtrl)
	.controller('teachManProfCtrl', teachManProfCtrl);


angular.module('App').directive('passwordConfirm', ['$parse', function ($parse) {
 return {
    restrict: 'A',
    scope: {
      matchTarget: '=',
    },
    require: 'ngModel',
    link: function link(scope, elem, attrs, ctrl) {
      var validator = function (value) {
        ctrl.$setValidity('match', value === scope.matchTarget);
        return value;
      }
 
      ctrl.$parsers.unshift(validator);
      ctrl.$formatters.push(validator);
      
      // This is to force validator when the original password gets changed
      scope.$watch('matchTarget', function(newval, oldval) {
        validator(ctrl.$viewValue);
      });

    }
  };
}]);

// Login Controller
function loginAccountCtrl ($scope, Auth, ForgotPasswordService) {
	$scope.loginDialog = false
	$scope.loginToggle = function() {
		$scope.mod.ForgotPWDId = '';
		$scope.mod.userId = '';
		$scope.mod.password = '';
        //$scope.loginDialog = !$scope.loginDialog;
    	if($('.default-view').is(':visible')){
    		$('.default-view').hide();
    		$('.toggle-view').show();
    	} else {
    		$('.default-view').show();
    		$('.toggle-view').hide();
    	}
    }
	
	$scope.mod={};

	$scope.loginUser = function ($validFlag) {
                $scope.submitted=true;
                if(!$validFlag){
                    return;
                }
                $('.loader-signup').show();
		var loginID=$scope.mod.userId;
		var loginPwd=$scope.mod.password;
		var SocialType=$scope.mod.SocialType;
		var UserSocialID=$scope.mod.UserSocialID;
		var RememberMe=$scope.mod.RememberMe;

		var FirstName=$scope.UserFirstName;
		var LastName=$scope.UserLastName;

		//console.log(loginID)
		//console.log(loginPwd)
	  	
		if(FirstName=='' || FirstName=='null' || FirstName==null || FirstName=='undefined' || typeof(FirstName)=='undefined') {
			FirstName='';
		}

		if(LastName=='' || LastName=='null' || LastName==null || LastName=='undefined' || typeof(LastName)=='undefined') {
			LastName='';
		}
 
 		var requestData = {Username:loginID,Password:loginPwd,SocialType:SocialType,UserSocialID:UserSocialID};
		Auth.checkLogin(requestData).then(function(response){ 
			console.log(response);
			if(response.ResponseCode==200) {
				if(response.Data.IsPasswordChange==1){
					window.location = base_url+'myaccount';
				} else {
					if(response.Data.IsFirstLogin!=0){
						//window.location = base_url+'wall?'+Math.floor((Math.random() * 100000) + 1)+'/#first';	
                                                window.location = base_url+'wall?'+Math.floor((Math.random() * 100000) + 1);
					}else{
						window.location = base_url+'wall?'+Math.floor((Math.random() * 100000) + 1);	
					}
				}
			} else{
                            $("#commonError").html(response.Message);
                            $('#commonError').parent('div').removeClass().addClass('alert-warning-alert').show();
                            setTimeout(
                                function(){
                                    $('#commonError').parent('div').hide();
                                },5000
                            );
			
			}
                        
                        $('.loader-signup').hide();
		});
                
	
	};
        
        $scope.signInPopup = function(openPopup,form){
            form.userId.$dirty = false;
            form.password.$dirty = false;
            $scope.submitted=false;
            $scope.mod.userId = '';
            $scope.mod.password = '';
            if(openPopup!=''){
                openPopDiv(openPopup, 'bounceInDown');
            }
            closePopDiv('signin');
        }

	// Forgot Password 
	$scope.forgotPWDUser = function ($validFlag,form) {
                        $scope.submitted=true;
                        if(!$validFlag){
                            return;
                        }
			$('.loader-signup').show();
			var forgotPWDuserId = $scope.mod.ForgotPWDId
			var requestData = {Value:forgotPWDuserId,Type:'Email'};
			ForgotPasswordService.ForgotPassword(requestData).then(function(response){ 
				if(response.ResponseCode==200) {
					$("#txtusername").val("");
                                        $("#commonErrorForgotone").html(response.Message);
					$('#commonErrorForgotone').parent('div').removeClass().addClass('alert').show();
                                        setTimeout(
                                            function(){
                                                $('#commonErrorForgotone').parent('div').hide();
                                            },5000
                                        );
                                form.email.$dirty = false;    
                                $scope.submitted=false;
                                $scope.mod.ForgotPWDId = '';
                                        
				} else {
					//$("#errorUsername").text(response.Message);
					//alertify.error(response.Message);
                                        $("#commonErrorForgotone").html('This email is not registered in our application.');
					$('#commonErrorForgotone').parent('div').removeClass().addClass('alert-error-alert').show();
                                        setTimeout(
                                            function(){
                                                $('#commonErrorForgotone').parent('div').hide();
                                            },5000
                                        );
                                        
				}
				$('.loader-signup').hide();
			})
	};
        
        $scope.closeForgotPassOpenSignIn = function (form){
            openPopDiv('signin', 'bounceInDown');
            closePopDiv('forgotPassword');
            form.email.$dirty = false;    
            $scope.submitted=false;
            $scope.mod.ForgotPWDId = '';
            
        }
        
        $scope.closeForgotPass = function (form){
            closePopDiv('forgotPassword');
            form.email.$dirty = false;    
            $scope.submitted=false;
            $scope.mod.ForgotPWDId = '';
            
        }
        
        $scope.submitted = false;    
        $scope.mod = {};
        $scope.setPassword = function ($validFlag) {
            $scope.submitted = true;
            if (!$validFlag) {
                return;
            }
            $('.loader-signup').show();

            var ForgotPwd = $scope.mod.password;
            var ForgotRPwd = $scope.mod.confirmPassword;
            var UserGUID = $('#UserGUID').val();

            var requestData = {UserGUID:UserGUID,'Password':ForgotPwd};
            ForgotPasswordService.SetPassword(requestData).then(function(response){
                if(response.ResponseCode==200) {
                    alertify.success(response.Message);
                    closePopDiv('setpassword');
                }else {
                    $('#commonErrorForgot').html(response.Message);
                    $('#commonErrorForgot').parent('div').show();
                }
                
                $('.loader-signup').hide();
            });


                
            
        };
	/*$scope.setPWDCtrlInit = function () {
		var UserGUID = $('#UserGUID').val();
		var rData = {UserGUID:UserGUID};
		ForgotPasswordService.CheckGUID(rData).then(function(response){
			if(response.ResponseCode!==200){
				window.top.location = base_url+'signin?msg=The link is already used once or expired. Please request a new link or login below.';
			}
		});
	}*/

	// Set Password 
	$scope.setPWDCtrl = function () {
			var ForgotPwd = $scope.ForgotPwd;
			var ForgotRPwd = $scope.ForgotRPwd;
			var UserGUID = $('#UserGUID').val();

			if(ForgotPwd==''){
				$('.ajs-message').hide();
				$('#commonErrorForgot').parent('div').show();
				$('#commonErrorForgot').html('Password field should not be blank.');
			} else {
				if(ForgotPwd==ForgotRPwd){
					if(ForgotPwd.length<4){
						$('#commonErrorForgot').parent('div').show();
						$('#commonErrorForgot').html('Minimum 4 characters required.');
					} else {
						var requestData = {UserGUID:UserGUID,'Password':ForgotPwd};
						ForgotPasswordService.SetPassword(requestData).then(function(response){ 
							if(response.ResponseCode==200) {
								$("#txtusername").val("");
								alertify.success(response.Message);
								setTimeout(
									function(){
										//alertify.message(response.Message);
										window.top.location=base_url+'signin';
										//window.top.location=base_url+'signin?msg='+response.Message;
									},5000
								);
							} else {
								//$("#errorUsername").text(response.Message);
								//alertify.error(response.Message);
								$('.ajs-message').hide();
								$('#commonErrorForgot').parent('div').show();
								$('#commonErrorForgot').html('Current position : ' + alertify.setting('notifier','position'));
							}
						})
					}
				} else {
					$('.ajs-message').hide();
					$('#commonErrorForgot').parent('div').show();
					$('#commonErrorForgot').html('Password and confirm password should be same.');
				}
			}
	};
}

// Sign Up Controller
function signUpCtrl ($scope,SignUpService) {
	
	$scope.mod = {}
	
	var requestData = {};
	SignUpService.SignUpAnalytics(requestData).then(function(response){});

	var toggleFrm = $('#toggleFrm').val();
	if(toggleFrm=='hide'){
		$scope.signUpDialog = true;
	} else {
		$scope.signUpDialog = false;
	}
	$scope.signUpToggle = function() {
        $scope.signUpDialog = !$scope.signUpDialog;
    };

    if($('#inviteToken').val()!==''){
		$scope.signUpToggle();
	}

    $scope.closeSignUpUser=function(form){
        closePopDiv('joinfrenzy');
        
        form.Username.$dirty = false;
        form.signUpEmail.$dirty = false;
        form.signUpPassword.$dirty = false;
        form.confirmSignUpPassword.$dirty = false;

        $scope.submitted=false;
        $scope.mod.signUpId = '';
        $scope.mod.signUpEmail = '';
        $scope.mod.signUpPassword = '';
        $scope.mod.confirmSignUpPassword = '';
        
        //$scope.signUpForm.$setPristine();
       
    }
    
    $scope.signUpToSignIn=function(form){
        openPopDiv('signin', 'bounceInDown')
        $scope.closeSignUpUser(form);
       
    } 

	$scope.AccountType='2';
        $scope.submitted=false;
	$scope.signUpUser=function ($validFlag,form) 
		{
                    $scope.submitted=true;
                    if(!$validFlag){
                        return;
                    }
			$('.loader-signup').show();
			var UserName=$scope.mod.signUpId;
			var UserEmail=$scope.mod.signUpEmail;
			var signUpPassword=$scope.mod.signUpPassword;
			var UserTypeID=$('[name="account"]:checked').val(); //$scope.AccountType;
			var SocialType=$scope.mod.IDSocialType;
			var UserSocialID=$scope.mod.UserSocialID;
			var FirstName=$scope.mod.UserFirstName;
			var LastName=$scope.mod.UserLastName;
			var Token = $('#inviteToken').val();
			var Picture = $('#Picture').val();
			var DeviceType = $scope.mod.DeviceType;
			var profileUrl = $('#profileUrl').val();

			if(FirstName=='' || FirstName=='null' || FirstName==null || FirstName=='undefined' || typeof(FirstName)=='undefined') {
				FirstName='';
			}

			if(LastName=='' || LastName=='null' || LastName==null || LastName=='undefined' || typeof(LastName)=='undefined') {
				LastName='';
			}

			if(signUpPassword.length<4){
				$('#errorPassword').text('Minimum 4 characters required.');
				return;
			}

			var requestData = {Username:UserName,Email:UserEmail,Password:signUpPassword,UserTypeID:UserTypeID,SocialType:SocialType,UserSocialID:UserSocialID,FirstName:FirstName,LastName:LastName,Token:Token,Picture:Picture,DeviceType:DeviceType,profileUrl:profileUrl};
			SignUpService.SignUp(requestData).then(function(response){ 

				if(response.ResponseCode==200) {
					//window.location=base_url+'wall';
				} else if(response.ResponseCode==201) {
                                        $("#commonErrorSignup").html(response.Message);
					$('#commonErrorSignup').parent('div').removeClass().addClass('alert').show();
                                        /*setTimeout(
                                            function(){
                                                $("#commonErrorSignup").html('');
                                                $('#commonErrorSignup').parent('div').removeClass().addClass('alert').hide();
                                                closePopDiv('joinfrenzy');
                                            },5000
                                        );*/
                                
                                        form.Username.$dirty = false;
                                        form.signUpEmail.$dirty = false;
                                        form.signUpPassword.$dirty = false;
                                        form.confirmSignUpPassword.$dirty = false;
                                        $scope.submitted=false;
                                        $scope.mod.signUpId = '';
                                        $scope.mod.signUpEmail = '';
                                        $scope.mod.signUpPassword = '';
                                        $scope.mod.confirmSignUpPassword = '';
					/*alertify.message(response.Message);
					setTimeout(function(){
						window.location=base_url;
					},5000);*/
                                } else {
					$("#commonErrorSignup").html(response.Message);
					$('#commonErrorSignup').parent('div').removeClass().addClass('alert-warning-alert').show();
                                        setTimeout(
                                            function(){
                                                $('#commonErrorSignup').parent('div').hide();
                                                
                                            },5000
                                        );
				}
				$('.loader-signup').hide();
			});
                        
		}
}

// Teachers Manage Profile Controller
function teachManProfCtrl ($scope) {
	
	$scope.teachManProf = function () {			
		var profFirstname = $scope.userfirstname
		profLastname = $scope.userlastname
		profusername = $scope.userusername
		profemail = $scope.useremail
		proftimezone = $scope.timezone
		proflocation = $scope.location
		console.log(profFirstname, profLastname, profusername, profemail, proftimezone, proflocation)			
	};
}