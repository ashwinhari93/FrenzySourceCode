// /* ReUsableControl Module
// ===========================*/
// angular.module('ReUsableControl', [])
// 	.directive('uixInput', uixInput)
// 	.directive('uixTextarea', uixTextarea)

// function uixInput(){
// 		return {
// 			restrict: 'E',
// 			replace: true,			
// 			template: '<input>',
// 			link: function($scope, iElm, iAttrs) {
// 			        	iElm.loadControl();
// 				}
// 		}
// }
// function uixTextarea(){
// 		return {
// 			restrict: 'E',
// 			replace: true,
// 			template: '<textarea />',
// 			link: function($scope, iElm, iAttrs) {
// 				setTimeout( function(){ iElm.loadControl()} ,500);
// 				}
// 		}
// }
// 
angular.module('App').directive('thumbImg', function($compile) {
  // http://stackoverflow.com/questions/18761404/how-to-scale-images-on-a-html5-canvas-with-better-interpolation
  function scaleDown(image, ratio, maxSteps) {
    if (ratio < 1)
      return image;
    maxSteps = maxSteps || 1000;
    var resized = image;
    var canvas;
    for (var i = 1, r = 2.0; r < ratio && i < maxSteps; i++, r <<= 1) {
      canvas = document.createElement('canvas');
      canvas.width = image.width/r;
      canvas.height = image.height/r;
      canvas.getContext('2d').drawImage(resized, 0, 0, resized.width, resized.height, 0, 0, canvas.width, canvas.height);
      resized = canvas;
    }
    canvas = document.createElement('canvas');
    canvas.width = image.width/ratio;
    canvas.height = image.height/ratio;
    canvas.getContext('2d').drawImage(resized, 0, 0, resized.width, resized.height, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  function drawThumbnail(src, dest, crop) {
    if (typeof dest.getContext !== 'function')
      return;
    var sw = src.width, sh = src.height, dw = dest.width, dh = dest.height;
    var resized = src;
    if (dw < sw && dh < sh) {
      var rw = sw/dw, rh = sh/dh;
      var selectRatio = crop ? Math.min : Math.max;
      resized = scaleDown(src, selectRatio(rw, rh), 10);
    }

    if (!crop) {
      dest.width = resized.width;
      dest.height = resized.height;
      dest.getContext('2d').drawImage(resized, 0, 0);
      return;
    }

    var sx = 0, sy = 0, dx = 0, dy = 0;
    if (resized.width > dw) {
      sx = (resized.width-dw)/2;
    } else {
      dx = (dw-resized.width)/2
    }
    if (resized.height > dh) {
      sy = (resized.height-dh)/2;
    } else {
      dy = (dh-resized.height)/2;
    }
    dest.getContext('2d').drawImage(resized, sx, sy, dw, dh, dx, dy, dw, dh);
  }

  function normalizeItem(scope) {
    var item = scope.item;
    if (!item)
      return item;
    return {
      ImageName: item.ImageName || item.Imagename,
      ImageUrl: item.ImageUrl || item.Thumburl,
      Size: item.Size || item.image_size || 0
    };
  }

  function renderThumbnail(scope, $element, attrs) {
    var $child;
    if (scope._item && scope._item.Size == 0) {
      $child = $('<canvas/>');
      $child.attr(attrs);
      $child.attr({
        width: scope.thumbWidth,
        height: scope.thumbHeight
      });
      $('<img/>', { src: scope._item.ImageUrl }).load(function() {
        drawThumbnail(this, $child.get(0), scope.thumbWidth != 530);
      });
    } else {
      $child = $('<img ng-src="{{ getUrl() }}"/>');
      $child.attr(attrs);
    }

    $element.replaceWith($child);
    $compile($child)(scope);
    return $child;
  }

  return {
    priority: 10,
    restrict: 'EA',
    scope: {
      thumbWidth: '=',
      thumbHeight: '=',
      thumbType: '@',
      item: '=',
      server: '@'
    },
    template: '<img ng-src="{{ getUrl() }}"/>',
    controller: function($scope) {
      $scope._item = normalizeItem($scope);
      console.log('controller', $scope);
      $scope.getUrl = function() {
        return $scope._item && $scope._item.Size > 0 ? [$scope.server, 'uploads/', $scope.thumbType || 'item', '/',
          $scope.thumbWidth, 'x', $scope.thumbHeight, '/', $scope._item.ImageName].join('') :
          'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='; // 1x1 transparent gif
      }
    },
    link: {
      pre: function preLink(scope, $element, attributes) {
        // $element.attr({
        //   width: scope.thumbWidth,
        //   height: scope.thumbHeight
        // });

        var attrs = {};
        angular.forEach(attributes.$attr, function(key, attrKey) {
          attrs[key] = attributes[attrKey];
        });
        angular.forEach(['thumb-img', 'ng-if'], function(attr) {
          delete attrs[attr];
        });
        
        $element = renderThumbnail(scope, $element, attrs);
        scope.$watch('item', function(newValue, oldValue) {
          if (!angular.equals(newValue, oldValue)) {
            scope._item = normalizeItem(scope);
            $element = renderThumbnail(scope, $element, attrs);
          };
        });
      }
    }
  }
});