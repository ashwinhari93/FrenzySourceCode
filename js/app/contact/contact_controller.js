
angular.module('App').controller('contactCtrl', function ($scope, contactService) {
    $scope.name = "";
    $scope.email = "";
    $scope.subject = "";
    $scope.message = "";
    $scope.isHuman = false;
    
    $scope.submitted = false;
    
    
    /*
     * Function Name: contactUs
     * Description: Contact Us form submission
     */
    $scope.contactUs = function (form)
    {    
        $scope.submitted = true;
        if (!form.$valid) {
            return;
        }
        $('.loader-signup').show();
        

        var requestData = {Name: $scope.name, Email: $scope.email, Subject: $scope.subject, Message: $scope.message};
        
        contactService.SendMail(requestData).then(function (response) {

            if (response.ResponseCode == 200) {
                
                alertify.success(response.Message);
                
                form.Name.$dirty = false;
                form.Email.$dirty = false;
                form.Subject.$dirty = false;
                form.Message.$dirty = false;

                $scope.submitted = false;
                $scope.name = "";
                $scope.email = "";
                $scope.subject = "";
                $scope.message = "";
                $scope.isHuman = false;
            } else {
                alertify.error(response.Message);
            }
            $('.loader-signup').hide();
        });

    }

});