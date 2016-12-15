
angular.module('App').controller('runwayCtrl', function ($scope,$rootScope,$http,$window,runwayService, tmpJson, $timeout,$sce) {
    /*
     * Function Name: CheckForRunwayUpdate
     * Description: Function that works to show the number of new records on runwy tab
     */
    $scope.CheckForRunwayUpdate = function(){
        var reqData = {
            LoginSessionKey: $scope.LoginSessionKey,
            TabName:$scope.RunwayActiveTab,
            CreatedDate:$rootScope.LatestDate
        };
        runwayService.get_RunwayUpdate(reqData).then(function (response) {
            if(response.Data > 0){
                if(response.Data > 1 ){
                    $rootScope.NewArticleCount = response.Data+' New Updates';
                }else{
                    $rootScope.NewArticleCount = response.Data+' New Update';
                }
            }else{
                $rootScope.NewArticleCount = '';
            }
	    }), function (error) {
        }
    }
    setInterval(function () {
    	$scope.CheckForRunwayUpdate();
    }, 30000);
    
});

