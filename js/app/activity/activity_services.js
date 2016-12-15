angular.module('App')
.factory('activityService', function ($http, $q, appInfo) {
    var e = {};
    var clipItemCliked = false;
    return {
    /*
     * Function Name: get_userActivity
     * Description: Hits the API and returns the result of activity
     */
        get_userActivity: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/activity/index', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
    };

});