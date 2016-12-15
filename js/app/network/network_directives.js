// JavaScript Document

// Directive(s)
/*
app.directive('uixInput',function(){
	return {
		restrict: 'E',
		replace: true,
		template: '<input>',
		link: function($scope, iElm, iAttrs) {
		        	iElm.loadControl();
			}
	}
}).directive('uixTextarea',function(){
	return {
		restrict: 'E',
		replace: true,
		template: '<textarea />',
		link: function($scope, iElm, iAttrs) {
			iElm.loadControl();
			}
	}
})

//select Options
.directive('uixSelect', function () {
    return {
        restrict: 'C',
        replace: false,
        link: function ($scope, iElm, iAttrs) {
            setTimeout(function () {
                iElm.selectbox();
            }, 100);
        }
    }
})



//.directive('chosen', function () {
//    var linker = function (scope, element, attrs) {
//        var list = attrs['chosen'];
//
//        scope.$watch(list, function () {
//            element.trigger('liszt:updated');
//            element.trigger("chosen:updated");
//        });
//
//        element.chosen({ disable_search_threshold: 10 });
//    };
//
//    return {
//        restrict: 'A',
//        link: linker
//    }
//}) */