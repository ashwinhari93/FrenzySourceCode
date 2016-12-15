$(document).ready(function(){
	angular.bootstrap(document, ['App']);
});

angular.module('App' , [
    'ReUsableControl',
    'ngSanitize',
    'localytics.directives',
    'infinite-scroll',
    'pasvaz.bindonce',
    ]).config([
    '$parseProvider', function ($parseProvider) {
        return $parseProvider.unwrapPromises(true);
    }
])

// ServiceUrl
.factory('appInfo', function () {
	return {
		serviceUrl: base_url+'api/'
	}
})
// Temporary data 
.factory('tmpJson', function () {
    return {
		serviceUrl: base_url+'assets/js/JsonData/'
	}
})
// DATE Format
.factory('setFormatDate', function () {
    return {
        getRelativeTime: function (date) {
           var str = date.split(" ")
           str = moment(date).startOf('second').fromNow();
            return str;
        },

        getTime: function (date) {
           var str = date.split(" ")
           str = moment(date).format('h:mma')
           
            return str;
        }
    }
});

angular.module('App').run(function($http){
  $http.defaults.headers.common['Accept-Language'] = accept_language;
});

/* ReUsableControl Module
===========================*/
angular.module('ReUsableControl', [])
    .directive('uixInput', uixInput)
    .directive('uixTextarea', uixTextarea)

function uixInput(){
        return {
            restrict: 'EA',
            replace: true,          
            template: '<input>',
            link: function($scope, iElm, iAttrs) {
                        iElm.loadControl();
                }
        }
}
function uixTextarea(){
        return {
            restrict: 'EA',
            replace: true,
            template: '<textarea></textarea>',
            link: function($scope, iElm, iAttrs) {
                setTimeout( function(){ iElm.loadControl();} ,500);
                }
        }
}


/*Editable Region*/
$.fn.wallPostActivity = function(){
    $(this).find('.media-thumb').imagefill();
    $(this).find('.media-block.fiveimgs').BlocksIt({
        numOfCol: 2,
        offsetX: 1,
        offsetY: 1,
        blockElement: '.media-thumbwrap'
    });
    $(this).find('.composer textarea').autoGrowInput();
}

// Global Controller

angular.module('App')
.controller('reportAbuseCtrl',function($scope,$http,appInfo){
	$scope.flagUserOrActivity = function(){
    	var LoginSessionKey = $('#LoginSessionKey').val();
    	var Type = $('.flagType').val();
    	var TypeID = $('.typeID').val();
    	var FlagReason = '';
    	$('.reportAbuseDesc:checkbox:checked').each(function(){
    		FlagReason += $(this).val()+',';
    	});
        $('.reportAbuseDesc:checkbox').removeAttr('checked');
        jsonData = {LoginSessionKey:LoginSessionKey,Type:Type,TypeID:TypeID,FlagReason:FlagReason};
        $http.post(appInfo.serviceUrl + 'flag',jsonData).success(function(response){
            if(response.ResponseCode==200){
                alertify.success(Type+' Reported Successfully.');
                $('#reportAbuse').modal('hide');
                if($('#tid-'+TypeID).length>0){
                	$('#tid-'+TypeID).hide();
                	$('#tid2-'+TypeID).show();	
                }
                if($('#tid-user-'+TypeID).length>0){
                	$('#tid-user-'+TypeID).hide();
                	$('#tid2-user-'+TypeID).show();	
                }
                if($('#reportAbuseLink').length>0){
                	$('#reportAbuseLink').hide();
                	$('#reportAbuseLink2').show();
                }
                //$('#reportAbuseLink').attr('src','javascript:void(0)');
                //$('#reportAbuseLink').html('src','javascript:void(0)');
            }
        });
    }
});


angular.module('App').directive('repeatDone', function() {
    return function(scope, element, attrs) {
        if (scope.$last) { // all are rendered
            scope.$eval(attrs.repeatDone); 
            }
        }
    });    
    
angular.module('App').directive('httpPrefix', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
            function ensureHttpPrefix(value) {
                // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
                if(value && (!/^(http):\/\//i.test(value)
                   && 'http://'.indexOf(value) === -1) && (!/^(https):\/\//i.test(value)
                   && 'https://'.indexOf(value) === -1) ) {
                    controller.$setViewValue('http://' + value);
                    controller.$render();
                    return 'http://' + value;
                }
                else
                    return value;
            }
            controller.$formatters.push(ensureHttpPrefix);
            controller.$parsers.push(ensureHttpPrefix);
        }
    };
});

angular.module('App').filter('truncate', function () {

    return function (content, maxCharacters) {

        if (content == null) return "";

        content = "" + content;

        content = content.trim();

        if (content.length <= maxCharacters) return content;

        content = content.substring(0, maxCharacters);

        var lastSpace = content.lastIndexOf(" ");

        if (lastSpace > -1) content = content.substr(0, lastSpace);

        return content + '...';
    };
});


