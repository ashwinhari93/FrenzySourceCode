$(document).ready(function(){
	angular.bootstrap(document, ['App']);
});


var app = angular.module('App' , ['ui.bootstrap', 'localytics.directives']);


/*	Controller(s)
===================================*/

// Login Controller
app.controller('loginAccountCtrl', ['$scope', function ($scope) {
	$scope.loginUser = function () {			
		var loginID = $scope.userId,
		loginPwd = $scope.password
		// console.log(loginID, loginPwd)			
	};
}])


// SignUp Controller
app.controller('signUpCtrl', ['$scope', function ($scope) {
	$scope.accountinfo = 'student';	
	$scope.signUpUser = function () {			
		var signUpUserId = $scope.signUpId,
		signUpUserEmail = $scope.signUpEmail,
		signUpUserPwd = $scope.signUpPassword
		signUpUserConfPwd = $scope.signUpConfPassword
		signUpUseracc = $scope.accountinfo
		
		// console.log(signUpUserId, signUpUserEmail, signUpUserPwd, signUpUserConfPwd, signUpUseracc)				
		
	};
}])

// Forgot password Controller
app.controller('forgotPWDCtrl', ['$scope', function ($scope) {
	
	$scope.forgotPWDUser = function () {			
		var forgotPWDuserId = $scope.ForgotPWDId
		console.log(forgotPWDuserId)			
	};
}])

// Teachers Manage Profile Controller
app.controller('teachManProfCtrl', ['$scope', function ($scope) {	
	$scope.teachManProf = function () {	
		var profgendername = $scope.genderlist	
		profFirstname = $scope.userfirstname
		profLastname = $scope.userlastname
		profusername = $scope.userusername
		profemail = $scope.useremail
		proftimezone = $scope.timezonelist
		proflocation = $scope.location
		proflanguagename = $scope.languagelist	
		console.log(profgendername,  profFirstname, profLastname, profusername, profemail, proftimezone, proflocation, proflanguagename);
	}; 	
 	$scope.genders = [{"value": "1", "label" : "Mr"}, {"value": "2", "label" : "Mrs"}];	
 	$scope.languages =  [{"value": "1", "label" : "Hindi"}, {"value": "2", "label" : "English"}];
	$scope.timezones =  [{"value": "1", "label" : "USA"}, {"value": "2", "label" : "UK"}];	
}])

// Teachers Manage Notifications Controller
app.controller('teachManNotiCtrl', ['$scope', function ($scope) {
	$scope.teachManNoti = function () {	
		var notiSelectedList = $scope.formlist		
		console.log(notiSelectedList, $scope.alerttime, $scope.remindertime)		
	}
	$scope.hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]; 	
	$scope.minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30","31", "32", "33", "34", "35", "36", "37", "38", "39", "40","41", "42", "43", "44", "45", "46", "47", "48", "49", "50","51", "52", "53", "54", "55", "56", "57", "58", "59"]; 	
	$scope.ampms = ["AM", "PM"]; 
}])

// Teachers Manage Billing Details Controller
app.controller('teachManBillCtrl', ['$scope', function ($scope) {
	$scope.teachManBill = function () {	
		var showbillAddress = $scope.billaddress	
		showbillCity = $scope.billcity	
		showbillCountry = $scope.billcountry	
		showbillBankaccount = $scope.billbankaccount			
		console.log(showbillAddress, showbillCity, showbillCountry, showbillCountry)		
	}
}])

// Teachers Manage Students Invite Friends Email Controller
app.controller('studInvFrdEmailCtrl', ['$scope', function ($scope) {
	$scope.studInvFrdEmail = function () {	
		var showfriendsemail = $scope.friendsemail		
		showpersnolmess = $scope.persnolmess	
		console.log(showfriendsemail, showpersnolmess);
	}
}])

// Teachers Manage Withdrowal History Table Controller
app.controller('teachManWidrHist', ['$scope', function ($scope) {
	$scope.historylists = [
	{"date":"14 April'14", "paidfor":"Course 123", "paidby":"Kelvin", "amount":"$ 10", "invoiceid":"MNF - 001"},
	{"date":"14 April'14", "paidfor":"Course 123", "paidby":"Kelvin", "amount":"$ 10", "invoiceid":"MNF - 001"},
	{"date":"14 April'14", "paidfor":"Course 123", "paidby":"Kelvin", "amount":"$ 10", "invoiceid":"MNF - 001"},
	{"date":"14 April'14", "paidfor":"Course 123", "paidby":"Kelvin", "amount":"$ 10", "invoiceid":"MNF - 001"},
	{"date":"14 April'14", "paidfor":"Course 123", "paidby":"Kelvin", "amount":"$ 10", "invoiceid":"MNF - 001"},
	{"date":"14 April'14", "paidfor":"Course 123", "paidby":"Kelvin", "amount":"$ 10", "invoiceid":"MNF - 001"}
	]
}])



// Teachers Creat Course Setting Controller
app.controller('teachCreatCourseSettCtrl', ['$scope', function ($scope) {
	$scope.groupType = "Free"
	$scope.teachCreatCourseSett = function () {	
		var showuserCourseName = $scope.userCourseName		
		showuserCouseDescription=  $scope.userCouseDescription
		showgroupType = $scope.groupType
		showuserCourseFee = $scope.userCourseFee
		showcheckCourseDisc = $scope.checkCourseDisc
		showcourseDisPer = $scope.courseDisPer
		showuserCourseDisCode = $scope.userCourseDisCode
		showCouseRequirment = $scope.CouseRequirment
		showCouseGetFrom = $scope.CouseGetFrom
		showCouseTarget = $scope.CouseTarget
		console.log(showuserCourseName, showuserCouseDescription, showgroupType, showuserCourseFee, showcheckCourseDisc, showcourseDisPer, showuserCourseDisCode, showCouseRequirment, showCouseGetFrom, showCouseTarget);
	}
}])
