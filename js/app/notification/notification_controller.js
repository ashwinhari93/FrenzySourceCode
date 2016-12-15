/* Notification directive */

angular.module('App').directive('html', [ function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.html(attrs.html);
    }
  }
}]);

/* Notification controller  */
angular.module('App').controller('NotificationCtrl',  function($scope, $interval,NotificationService) {
	$scope.notification = [];
	$scope.PageNo = 1;
	$scope.LoginSessionKey='';
	$scope.UserGUID = '';
	$scope.notificationPageNo=1;
	$scope.disableNotificationPagination = false;
	$scope.paginationbusyNotification = false;
	$scope.NotificationFor = '';

	if ($('#LoginSessionkey').val()!='')
    {
        $scope.LoginSessionKey = $('#LoginSessionKey').val();
    }

    if ($('#UserGUID').val()!='')
    {
        $scope.UserGUID = $('#UserGUID').val();
    }
 
    /*
     * Function Name: getNotification
     * Description: Function that gets the Alert list
     */
	$scope.getNotification = function() 
	{
		PageSize = 10;
		var requestData={
			LoginSessionKey :$scope.LoginSessionKey,
			PageNo:$scope.notificationPageNo, 
            PageSize:PageSize,
            NotificationFor:$scope.NotificationFor

		};
		$scope.paginationbusyNotification = true;
		NotificationService.GetNotification(requestData).then(function(response){ 
			if(response.ResponseCode==200) {
				$.each(response.Data, function(key) {
                    $scope.notification.push(response.Data[key]);
                });   
                if(response.Data.length < PageSize){
                    $scope.disableNotificationPagination = true;
                }
                $scope.notificationPageNo++;
			}
			$scope.paginationbusyNotification = false;
		});			
	}

    /*
     * Function Name: setNotificationType
     * Description: Function that sets some parameters for getting alerts
     */
	$scope.setNotificationType = function(type){
		$scope.NotificationFor = type?type:'';
		$scope.notification=[];
		$scope.notificationPageNo=1;
		$scope.getNotification();
	}

    /*
     * Function Name: deleteNotification
     * Description: Function that deletes a notification
     */
	$scope.deleteNotification = function(NotificationGuID){
		var requestData={
			LoginSessionKey :$scope.LoginSessionKey,
            NotificationGuID:NotificationGuID
		};
		NotificationService.deleteNotifications(requestData).then(function(response){ 
			if(response.ResponseCode==200) {
				alertsRemove();
			}
		});
	}	



    /*
     * Function Name: UpdateReadNotification
     * Description: Function that updates the alert as read
     */
	$scope.UpdateReadNotification = function(){
		if(!$('.notification-contens').is(':visible')){
			var LoginSessionKey = $('#LoginSessionKey').val();
			var requestData={
								"LoginSessionKey" :LoginSessionKey	
							};
			NotificationService.UpdateReadNotification(requestData).then(function(response){ 
				$scope.notification_count = 0;
			});
		}
		/*var LoginSessionKey = $('#LoginSessionKey').val();
		var requestData={
							"LoginSessionKey" :LoginSessionKey	
						};
		NotificationService.UpdateReadNotification(requestData).then(function(response){ 
			
			if(response.ResponseCode==200) {				
				$scope.notification = response.Data;
				$scope.notification_count = 0;
				$scope.offset = $scope.notification.length;
				// console.log($scope.offset);
				$scope.HasMoreItem();

			} else if(response.ResponseCode==763) {
				
			} else if(response.ResponseCode==506) {
				
			}

		});	*/		

	}

    /*
     * Function Name: HasMoreItem
     * Description: Function that checks if scroll should get the next page results
     */
	$scope.HasMoreItem = function(){
			
		if($scope.offset%5 != 0 || $scope.offset == 0 ){			
			$scope.show_more_visible = false;
		} else {			
			$scope.show_more_visible = true;				
		}
	}

    /*
     * Function Name: LoadMoreNotification
     * Description: Function that gets the second, third and so on pages for notification
     */
	$scope.LoadMoreNotification = function(){
		var LoginSessionKey = $('#LoginSessionKey').val();
		var Offset = $scope.notification.length;
		if($scope.notification_count==$scope.notification){
			$scope.show_more_visible = false;
			return;
		}
		var requestData={"LoginSessionKey" :LoginSessionKey,"Offset":Offset};
		NotificationService.GetNotification(requestData).then(function(response){ 
			
			if(response.ResponseCode==200) {
				$scope.notification = response.Data;
				$scope.notification_count = response.TotalRecords;
			} else if(response.ResponseCode==763) {
				
			} else if(response.ResponseCode==506) {
				
			}

		});
	}
/*
	$interval(function(){
		$scope.getNotification();
	},10000);
*/

})