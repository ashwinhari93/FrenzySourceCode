/*	Controller(s)
 ===================================*/
angular.module('App').controller('InviteFriendCtrl', function ($scope, InviteFriendService) {
    $scope.personalmessage = '';
    $scope.sendinvsubmitted=false;
    $scope.fnSendInvitation = function ($validFlag,form) {
        $scope.sendinvsubmitted=true;
        if(!$validFlag){
            return;
        }
        
        $('#nativesendinvitaion').attr('disabled', 'disabled');
        /*if ($("#form1email").val() == '') {
            var friendsemail = '';
        } else {
            var friendsemail = $scope.friendsemail;
        }*/
        var personalmessage = $scope.personalmessage;
        var LoginSessionKey = $scope.LoginSessionKey;
        /*emails = friendsemail.split(',');
        if (emails.length > 0)
        {
            emailarray = new Array();
            for (i = 0; i < emails.length; i++)
            {
                emailarray.push(emails[i].trim());
            }
        }*/

        $("#erroremailarray").text('');
        //$scope.multipleEmailValue.splice(0, 1);  
        
        emails = $scope.multipleEmailValue;
        if (emails.length > 0)
        {
            emailarray = new Array();
            for (i = 1; i < emails.length; i++)
            {
                if(typeof(emails[i])!='undefined'){
                    emailarray.push(emails[i].trim());
                }
                    
            }
        }
        
        var requestData = {
            LoginSessionKey: LoginSessionKey,
            UserSocialId: emailarray,//emailarray,
            Message: personalmessage
        };
        $('.loader-signup').show();
        InviteFriendService.InviteFriendS(requestData).then(function (response) {
            if (response.ResponseCode == 200) {
                $("#form1email").val('');
                $("#textareaID").val('');
                $("#errorinvitaionmessage").html('');
                $scope.multipleEmailValue = new Array();
                $scope.sendinvsubmitted=false;
                form.email1.$dirty = false;
                alertify.success(response.Message);
                
                $scope.multipleEmails = [{'name':1}];
                
            } else if (response.ResponseCode == 763) {
                $("#errorinvitaionmessage").html(response.Message);
                alertify.error(response.Message);
            } else if (response.ResponseCode == 506) {
                $("#erroremailarray").text(response.Message);
                alertify.error(response.Message);
            } else {
                if (response.ResponseCode == 511) {
                    if (response.Message == 'Please enter valid emailid.' || response.Message == 'Email ID is required') {
                        $("#errorinvitaionmessage").html('');
                        $("#erroremailarray").html(response.Message);
                        alertify.error(response.Message);
                    } else {
                        $("#errorinvitaionmessage").html(response.Message);
                        alertify.error(response.Message);
                    }
                } else {
                    $("#errorinvitaionmessage").html(response.Message);
                    alertify.error(response.Message);
                }
            }
            
            $('.loader-signup').hide();
            $('#nativesendinvitaion').removeAttr('disabled');
        })
    }
    
    $scope.multipleEmails = [{'name':1}];
    $scope.multipleEmailValue = new Array();
    
    $scope.addMoreEmail = function(){
        $scope.multipleEmails.push({'name':$scope.multipleEmails.length*2+1});
         
    }
    
    $scope.validateDynamicEmail = function(form,name){
        var emailName = 'email'+name;
        return form[emailName].$error.email;
    }
    
    $scope.isDirtyDynamicEmail = function(form,name){
        var emailName = 'email'+name;
        return form[emailName].$dirty;
    }
    
    $scope.getDynamicInputName = function(name){
         var emailName = 'email'+name;
         return emailName;
    }
    
    $scope.validateDynamicEmailRequired = function(form,name){
        var emailName = 'email'+name;
        return form[emailName].$error.required;
    }
    
    $scope.isRequiredEmail = function(name){
        if(name=='1')
            return true;
        else
            return false;
        
    }
    
    
    
}).directive('dynamicName', function($compile, $parse) {
  return {
    restrict: 'A',
    terminal: true,
    priority: 100000,
    link: function(scope, elem) {
      var name = $parse(elem.attr('dynamic-name'))(scope);
      elem.removeAttr('dynamic-name');
      elem.attr('name', name);
      $compile(elem)(scope);
    }
  };
});

$(document).ready(function () {
    $(document).on("click", "#nativesendinvitaion", function () {
        angular.element(document.getElementById('InviteFriendCtrlContainer')).scope().fnSendInvitation();
    });
});
