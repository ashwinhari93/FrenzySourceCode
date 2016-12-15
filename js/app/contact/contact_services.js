angular.module('App')
        .factory('contactService', function ($http, $q, appInfo) {
            return {
                SendMail:function (reqData) {
                    var d = $q.defer();
                    $http.post(base_url + 'api/signup/sendContactMail', reqData).success(function (data) {
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