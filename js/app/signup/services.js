/*	Service(s)
===================================*/
angular.module('App')
	.factory('Auth', Auth)
	.factory('ForgotPasswordService', ForgotPasswordService)
	.factory('SignUpService', SignUpService);

// "Auth" Service
function Auth($q, $http){
	return {
		checkLogin : function(reqData)
		{
			var deferred = $q.defer();
			if( reqData.username != '' && reqData.password != '' )
			{
				$http.post(base_url + 'signup/LogIn',reqData).success(function (data) {
                        //$http.post(base_url + 'api/login',reqData).success(function (data) {
                        	var parents = data;
                        	//console.log(parents)
                        	deferred.resolve(parents);
                        	if(parents.status=='true') {
                        		deferred.reject(data);
                        		$('#errorUsername').html('').hide();
                        		$('#errorPassword').html('').hide();
                        	} else {
                        		deferred.reject('false');
                        	}
                        }).error(function (data) {
                        	deferred.reject(data);
                        });
                    }
                    else
                    {
                    	if(reqData.username == '' && reqData.password == ''){
                    		$('#errorUsername').html('Please enter username').show();
                    		$('#errorPassword').html('Please enter password').show();
                    	} else if(reqData.username == '' && reqData.password != '') {
                    		$('#errorUsername').html('Please enter username').show();
                    	} else if(reqData.password == '' && reqData.username != '') {
                    		$('#errorPassword').html('Please enter password').show();
                    	}
                    	deferred.reject('false');
                    }
                    return deferred.promise;
                }
            }
        }

// "Forgot Password" Service
function ForgotPasswordService ($http, $q, appInfo) {
		 // Return public API.
		 return {
		 	ForgotPassword : function(reqData){
		 		var deferred = $q.defer();
		 		$http.post(appInfo.serviceUrl + 'recovery_password/recoverypassword',reqData).success(function (data) {
		 			deferred.resolve(data);
		 		}).error(function (data) {
		 			deferred.reject(data);
		 		});
		 		return deferred.promise;
		 	},
		 	SetPassword : function(reqData){
		 		var deferred = $q.defer();
		 		$http.post(appInfo.serviceUrl + 'recovery_password/recoveryonetimepasswordlink',reqData).success(function (data) {
		 			deferred.resolve(data);
		 		}).error(function (data) {
		 			deferred.reject(data);
		 		});
		 		return deferred.promise;
		 	},
			CheckGUID : function(reqData){
			 	var deferred = $q.defer();
		 		$http.post(appInfo.serviceUrl + 'recovery_password/checkUserGUID',reqData).success(function (data) {
		 			deferred.resolve(data);
		 		}).error(function (data) {
		 			deferred.reject(data);
		 		});
		 		return deferred.promise;
			}
		 }
		}

// "Sign Up" Service
function SignUpService ($http, $q, appInfo) {
		 // Return public API.
		 return {
		 	SignUp : function(reqData){
		 		console.log(reqData);
		 		var deferred = $q.defer();
		 		$http.post(appInfo.serviceUrl + 'signup/signup/',reqData).success(function (data) {
		 			deferred.resolve(data);
		 		}).error(function (data) {
		 			deferred.reject(data);
		 		});
		 		return deferred.promise;
		 	},

		 	SignUpAnalytics : function(reqData){
		 		var deferred = $q.defer();
		 		$http.post(appInfo.serviceUrl + 'signup/signupAnalytics',reqData).success(function (data) {
		 			deferred.resolve(data);
		 		}).error(function (data) {
		 			deferred.reject(data);
		 		});
		 		return deferred.promise;
		 	}
		 }
		}