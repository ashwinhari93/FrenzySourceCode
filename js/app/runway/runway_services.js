angular.module('App')
        .factory('runwayService', function ($http, $q, appInfo) {
            return {
                get_RunwayUpdate:function (reqData) {
                    var d = $q.defer();
                    $http.post(base_url + 'api/article/checkRunwayUpdate', reqData).success(function (data) {
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