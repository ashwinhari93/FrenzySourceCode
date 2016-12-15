(function($) {
  'use strict';

  $.fn.bigSlide = function(options) {

    var settings = $.extend({
      'menu': ('#menu'),
      'push': ('.push'),
      'side': 'left',
      'menuWidth': '15.625em',
      'speed': '300'
    }, options);

    var menuLink = this,
        menu = $(settings.menu),
        push = $(settings.push),
        width = settings.menuWidth;

    var positionOffScreen = {
      'position': 'fixed',
      'top': '0',
      'bottom': '0',
      'settings.side': '-' + settings.menuWidth,
      'width': settings.menuWidth,
      'height': '100%'
    };

    var animateSlide = {
      '-webkit-transition': settings.side + ' ' + settings.speed + 'ms ease',
      '-moz-transition': settings.side + ' ' + settings.speed + 'ms ease',
      '-ms-transition': settings.side + ' ' + settings.speed + 'ms ease',
      '-o-transition': settings.side + ' ' + settings.speed + 'ms ease',
      'transition': settings.side + ' ' + settings.speed + 'ms ease'
    };

    menu.css(positionOffScreen);
    push.css(settings.side, '0');
    menu.css(animateSlide);
    push.css(animateSlide);

    menu._state = 'closed';

    menu.open = function() {
      menu._state = 'open';
      menu.css(settings.side, '0');
      push.css(settings.side, width);
    };

    menu.close = function() {
      menu._state = 'closed';
      menu.css(settings.side, '-' + width);
      push.css(settings.side, '0');
    };

    menuLink.on('click.bigSlide', function(e) {
      e.preventDefault();
      if (menu._state === 'closed') {
        menu.open();
      } else {
        menu.close();
      }
    });

    menuLink.on('touchend', function(e){
      menuLink.trigger('click.bigSlide');
      e.preventDefault();
    });
    return menu;
  };
  
  //Settings Google Buttons connects
   //$('.google-connect-listing').hide();
   /*$('.connect-with-google').click(function() {
		  $(this).parent().parent().fadeOut();
		  $('.google-connect-listing').slideDown('fast');
		   if ($(window).width() >767) {
			   $('html, body').animate({scrollTop:$(document).height()}, 'slow');
		   }
    });*/
	
	
	$(window).resize(function(){
		// get the screen height and width  
		//var maskHeight = $(window).height();  
		var maskWidth = $(window).width();
		// calculate the values for center alignment
		//var dialogTop =  (maskHeight  - $('.popup-wrap').height())/2;  
		var dialogLeft = (maskWidth - $('.popup-wrap').width())/2; 
		// assign values to the dialog box
		if($('.popup-wrap').is(':visible'))
		{/*top: dialogTop, */
			$('.popup-wrap').css({ left: dialogLeft, position:"absolute"});
		}
	});
	
	
	//Added on 2 Feb for activity items hover effects
	 if ($(window).width() > 900) {		 
	 	
	 	/*$(document).on('touchstart click', '.iconclose', function(){
			$(this).closest('.info').css('background','none');
			$(this).closest('.info-back').hide();
		})*/




     $(document).on('touchstart mouseleave','.product-img',function(){     
        
        $(this).children('.info').show();
       
     });

     $(document).on('touchstart mouseenter','.hoverEffect',function(){     
        
        //$(this).children('.product-img').children('.img ').children('.btn-dollor').hide();
       
     });
     $(document).on('touchstart mouseleave','.hoverEffect',function(){     
        
       // $(this).children('.product-img').children('.img ').children('.btn-dollor').show();
       
     });


		 $(document).on('touchstart mouseleave','.product-img',function(){
			$(this).closest('.info').css('background','none')
			$(this).closest('.info-back').hide();
      $(this).children('.info').children(".iconclose").hide();
		});

		$(document).on('touchstart mouseenter','.product-img',function(){
			$(this).children('.info').css('background','rgba(0, 0, 0, 0.6)')
			$(this).children('.info').children(".info-back").show();
      $(this).children('.info').children(".iconclose").show();
		});


  $(document).on('touchstart mouseleave','.product-img',function(){
      $(this).next('.info').css('background','rgba(0, 0, 0, 0.6)')
      $(this).next('.info').show();
      $(this).next('.info').children(".iconclose").show();
    });


		
		$(document).on('touchstart mouseleave','.product-img.disabled',function(){
			$(this).children('.info').css('background','rgba(0, 0, 0, 0.6)')
			$(this).children('.info-back').hide();
      $(this).children('.info').children(".iconclose").hide();
		});
	 }
	  
	 if ($(window).width() <= 900) {
		$(document).on('touchstart click','.slideietm-info',function(){
			 
			//$(this).parent('.img').next('.info').fadeIn();;
		})

		/*$(document).on('touchstart click', '.iconclose', function(){
			$(this).closest('.info').fadeOut();
			e.stopPropagation();
		});*/
		
		//For article look info toggle
		$(document).on('touchstart click','.slideietm-info',function(event){
      
			/*$(this).parent('.img').next('.infonewproduct').find('.info').fadeIn();
      $(this).parent('.img').children('.btn-dollor').hide();*/
                        event.stopPropagation();
		});
		$(document).on('touchstart click', '.iconclose', function(event){ 
			$(this).closest('.infonewproduct').find('.info').fadeOut();
    //  $('.btn-dollor').hide();
      event.stopPropagation();
		});
		
		$('.articleimgcontent').find('.iconclose').show();

	 }

	
	$(document).on('touchstart click','.remove-uploaded',function(){
		$(this).prev('span').text(' ');
	});
	
	 if($(window).width() <= 767 && $(window).resize()){
		if($(".content-apped").empty()){
				$(".content-apped").append($(".left-move-article").html());
			}
	} 
   
 }(jQuery));


/*Pop up window product slider*/
$(window).load(function(){		 
   /*Scroll pane Init auto in pop*/
   if ($(window).width() > 767) {$('.scroll-pane').jScrollPane({
         autoReinitialise: true,
      });
   }

//var bxSliderCreated = false;	  
   $('.addpopupopen, .editariclepopup, .edit-product-lists a').on('click', function(){/*            
      if(!bxSliderCreated){ 
         setTimeout(function(){
            $('.add-products-slider').bxSlider({
               minSlides: 3,
               maxSlides: 3,
               slideWidth: 160,
               slideMargin: 10,
               moveSlides: 1,
               pager : false
            }); 
            bxSliderCreated = true;                 
         },50); 
      }

      else {
         return false;
      } 
   */});
});



/*Function for dom tabs Begin*/
	function setTab(index){		 
			 var allLinks=$('ul#primary-nav').children('li');
			 allLinks.removeClass('selected');
			 $(allLinks[index-1]).addClass('selected');
	 }
         
         function setAfterLoginTab(index){		 
			 var allLinks=$('ul#afterlogin-nav').children('li');
			 allLinks.removeClass('selected');
			 $(allLinks[index-1]).addClass('selected');
	 }
	 
	 function setTabSecondary(index){		 
			 var allLinks=$('ul.menu-afftelogin').children('li');
			 allLinks.removeClass('selected');
			 $(allLinks[index-1]).addClass('selected');
	 }

// Create BX Slider
var sliderVar = new Array();
var bxSliderCreated=false;
function createSlider(){
    if(!bxSliderCreated){
    $('[data-type="slider"]').each(function(i) {
            $(this).attr('id','dataslider' + i);
            $('#dataslider' + i).after('<div class="sliderContent dataslider' + i + '"></div>');
            $(this).clone().removeClass('animationlist').attr('id','datasliderUL' + i).appendTo($('.dataslider' + i));
            featureSlider($('.dataslider' + i).find('#datasliderUL' + i));
            bxSliderCreated=true;
       });
    } else {
       return false;
    } 
}
function featureSlider(id){
        sliderVar.push($(id).bxSlider({
        controls:   false,
        ticker:     false,
        slideWidth: 300,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        autoControls:   false,
        useCSS:         true,       
        auto : true
    }));
 }


//Function for  accordion
function detailAccordion(){ 
  $(document).on('click','[data-type="accToggle"]', function(){   
     $('.accordion-content').slideUp();
     $('[data-type="accToggle"]').find('.icon-acc').removeClass('selected');
     if($(this).closest('.accordion-head').next('.accordion-content').is(':visible')){
       $(this).closest('.accordion-head').next('.accordion-content').slideUp();
       $(this).find('.icon-acc').removeClass('selected');
       }
      else{
       $(this).closest('.accordion-head').next('.accordion-content').slideDown();
       $(this).find('.icon-acc').addClass('selected'); 
      } 
     });
}

function subAccordians(){ 
  $(document).on('click','[data-type="accToggle2"]', function(){   
     $('.subaccordion-content').slideUp();
     $('[data-type="accToggle2"]').find('.icon-acc').removeClass('selected');
     if($(this).closest('.subaccordion-head').next('.subaccordion-content').is(':visible')){
       $(this).closest('.subaccordion-head').next('.subaccordion-content').slideUp();
       $(this).find('.icon-acc').children().removeClass('selected');
       }
      else{
       $(this).closest('.subaccordion-head').next('.subaccordion-content').slideDown();
       $(this).find('.icon-acc').addClass('selected'); 
      } 
     });
}



//JS For Lava-Lamp Style Navigation Menu
(function($) {
$.fn.lavaLamp = function(o) {
    o = $.extend({ fx: "linear", speed: 500, click: function(){} }, o || {});

    return this.each(function() {
        var me = $(this), noop = function(){},
            $back = $('<li class="back"><div class="left"></div></li>').appendTo(me),
            $li = $("li", this), curr = $("li.selected", this)[0] || $($li[0]).addClass("selected")[0];
         if($(window).width() > 1024){
            $li.not(".back").hover(function() {
                move(this);
            }, noop);
          }

        $(this).hover(noop, function() {
           move(curr);
        });

        $li.click(function(e) {
            setCurr(this);
            return o.click.apply(this, [e, this]);
        });

        setCurr(curr);

        function setCurr(el) {
            $back.css({ "left": el.offsetLeft+"px", "width": el.offsetWidth+"px" });
            curr = el;
        };

        function move(el) {
            $back.each(function() {
                $(this).dequeue(); }
            ).animate({
                width: el.offsetWidth,
                left: el.offsetLeft
            }, o.speed, o.fx);
        };

    });
};
})(jQuery);

//Left Navigation
 function lefNavigation(){
	 $('.logo-region').on('click', function(){
		if(!$(this).hasClass('isopen')){
			  $(this).addClass('isopen');
			  $('.logo-region .large-logo').fadeIn();
			  $('.logo-region .small-logo').hide();
			  $( "#menu" ).animate({
					width:"180px"
				  }, function() {
					// Animation complete.
					$('.main-menu li span').fadeIn();
		  });
		  $("[data-rel=tipsym]").unbind('mouseenter mouseleave'); 
   	 }
	  else{  
      $('.main-menu li span').hide();
      $(this).removeClass('isopen');
      $('.logo-region .large-logo').hide();
      $('.logo-region .small-logo').fadeIn();
      $( "#menu" ).animate({
            width:"49px"
          }, function() {
            // Animation complete.
            $('.main-menu li span').fadeOut();
          });
		   setTimeout(function(){
            	$('[data-rel="tipsym"]').tipsy({fade: true, gravity: 'w'});
           },100);
      }
  });	
  
  	$('#menu ul li a').on('click', function(e) {
		var el = $(this);
		var link = el.attr('href');
		window.location = link;
        if ($(window).width() <= 1024){ 
            $('#menu').hide();
        }
		$('.icon-ipadnav').removeClass('selected');
	});
	
	
	if ($(window).width() >= 768 && $(window).width() <= 1024) {
		$("[data-rel=tipsym]").unbind('mouseenter mouseleave'); 	
                $(document).click(function(event) { 
                    if(!$(event.target).closest('#menu').length && !$(event.target).closest('.icon-ipadnav').length) {
                        if($('#menu').is(":visible")) {
                            $('#menu').hide();
                            $('.icon-ipadnav').removeClass('selected');
                        }
                  }        
             });
          }
} 


//Function Tag Tooltip
function tagTooltip(){ 
  $(document).on('touchstart mouseenter','[data-type="tagtip"]',function(){ 
    var tagPopupHt = $('.gallery-tag').height()/2,
        tagPopupWd = $('.gallery-tag').width() + 10;
    //$('.gallery-tag').css({left:$(this).offset().left - tagPopupWd, top:$(this).offset().top - tagPopupHt });
      $(this).children('.gallery-tag').show();    
  });
  /*$('.gallery-tag').on('touchstart mouseleave',function(){
    TooltipTimer=setTimeout(function(){
   //   $('.gallery-tag').hide();
    },100);
  }); 
  //Added on 3o jan
	  $(document).on('touchstart mouseenter','.gallery-tag-inner .icon-closeb',function(){
    	$('.gallery-tag').hide();    
  	});*/
}


//Function Tag Tooltip
function runwaytagTooltip(){ 
  $(document).on('touchstart mouseenter','[data-type="tagtiprunway"]',function(){  

    var tagPopupHt = $('.gallery-tag').height()/2,
        tagPopupWd = $('.gallery-tag').width()/2,
        imgcontentOffset = $('.img-content').offset().top,
        imgcontentOffsetleft = $('.img-content').offset().left + tagPopupWd; 
        $('.gallery-tag').css({left:$(this).offset().left - imgcontentOffsetleft, top:$(this).offset().top - imgcontentOffset  + 25 });
        $('.gallery-tag').show();
       
  });

  $('.gallery-tag').on('touchstart mouseleave',function(){
    TooltipTimer=setTimeout(function(){
    //  $('.gallery-tag').hide();
    },100);
  }); 
  //Added on 3o jan
    $(document).on('touchstart mouseenter','.gallery-tag-inner .icon-closeb',function(){
   //   $('.gallery-tag').hide();    
    });
}



//Cliplink
function clipButton(){
	$(document).on('touchstart click','.clip-link',function(e){
		  $(this).addClass('cliped');
		  $(this).find('span').text('Clip’d');      
		});  
}   


//shopPopup
var bxSliderCreated=false;
var shopSlider;

function popupSlider(){ 

  if(!bxSliderCreated){  
   shopSlider = $('.product-slider').bxSlider({
            auto: false,
            pager:false,
            minSlides: 1,			
            maxSlides: 2,
            slideWidth: 160,
            slideMargin: 15,
            pager : false,
            infiniteLoop:false
      }); 
    bxSliderCreated=true;
    
    } 
     
    return shopSlider;

}

var newShopSlider; 
function shopPopupLook(){

if(typeof newShopSlider !== 'undefined' && typeof newShopSlider.destroySlider === 'function'){
   newShopSlider.destroySlider();
}

 newShopSlider = $('.shopProductslider').bxSlider({
            auto: false,
            pager:false,
            minSlides: 3,     
            maxSlides: 3,
	    		moveSlides:1,
            slideWidth: 160,
            slideMargin: 30,
            pager : false,
            infiniteLoop:false,
            hideControlOnEnd:true
      }); 
 

}

//Shop Popup
function shopPopup(){
   var bxSliderCreated=false;
  $(document).on('click','[data-type="shopPopu"]', function(){ 
      $(this).addClass('selected');
      $('#shopPopup').show(); 
       shopPopupLook();

      var opupwd = $('#shopPopup').width()/2
       var opupht = $('#shopPopup').height()/2
       $('#user-wall-activity #shopPopup').offset({left:$(this).offset().left - 120, top:$(this).offset().top - opupht });

        /*setTimeout(function(){
             if(!bxSliderCreated){  
                popupSlider();
                bxSliderCreated=true;             
               }
               else{
                  return false
               }
          });*/  
  });
  $(document).on('touchstart click','.close-this > .icon-closepopup',function(){ 
      $('[data-type="shopPopu"]').removeClass('selected');
      $('#shopPopup').hide();    
  });
}








//Ipad Menu
function iPadmenu(){
  $('.icon-ipadnav').on('click',function(){
    if(!$(this).hasClass('selected')){
      $(this).addClass('selected');
      $('#menu').slideDown();
    }
    else{
      $(this).removeClass('selected');
      $('#menu').slideUp(); 
    } 
  }); 
}

//see Menu in iphone
function iPadseemenu(){
	if ($(window).width() <= 767) {
  $('.see-head').on('click',function(){
    if(!$(this).hasClass('selected')){
      $(this).addClass('selected');
      $('.see-menu').slideDown();
    }
    else{
      $(this).removeClass('selected');
      $('.see-menu').slideUp(); 
    } 
  }); 
	}
}



//see Menu in iphone clothing
function openBox(){
	$('.box-open').on('click',function(e){
	if(!$(this).hasClass('selected')){
      var This = $(this);
	  $('.box-open').removeClass('selected')
      $(this).addClass('selected');
      $("#StorePopup").fadeIn().offset({left:This.offset().left - 122, top:parseInt(This.offset().top - $('#StorePopup').height())-10});
	  $("#GirlPopup, #eventPopup").fadeOut();
     } else {
      $('.box-open').removeClass('selected')
	  $("#StorePopup").fadeOut();
	 }
	 e.stopPropagation();
  });
  $("#StorePopup").on('click',function(e){
	  e.stopPropagation();
  });
  $(document.body).on('click',function(){
    $('.box-open').removeClass('selected')
	$("#StorePopup").fadeOut();
  }); 
}

//see Menu in iphone girl info
function openBox_2(){
	$('.gbox-open').on('click',function(e){
	if(!$(this).hasClass('selected')){
      var This = $(this);
	  $('.gbox-open').removeClass('selected')
      $(this).addClass('selected');
	  $('.box-open').removeClass('selected')
      $("#GirlPopup").fadeIn().offset({left:This.offset().left - 95, top:parseInt(This.offset().top - $('#GirlPopup').height())-8});
	  $("#StorePopup, #eventPopup").fadeOut();
     } 
	 else {
	  $('.gbox-open').removeClass('selected')
	  $("#GirlPopup").fadeOut();
	 }
	 e.stopPropagation();
  });
  $("#GirlPopup").on('click',function(e){
	  e.stopPropagation();
  });
  $(document.body).on('click',function(){
	$("#GirlPopup").fadeOut();
  }); 
}


//see Menu in iphone event
function eventBox_2(){
	$('.box-enent').on('click',function(e){
	if(!$(this).hasClass('selected')){
      var This = $(this);
	  $('.box-enent').removeClass('selected')
      $(this).addClass('selected');
	  $('.box-open').removeClass('selected')
      $("#eventPopup").fadeIn().offset({left:This.offset().left - 122, top:parseInt(This.offset().top - $('#eventPopup').height())-10});
	  $("#GirlPopup, #StorePopup").fadeOut();
     } else {
	  $('.box-enent').removeClass('selected')
	  $("#eventPopup").fadeOut();
	 }
	 e.stopPropagation();
  });
  $("#eventPopup").on('click',function(e){
	  e.stopPropagation();
  });
  $(document.body).on('click',function(){
	$("#eventPopup").fadeOut();
  }); 
}

//Sub Navigation
function subNavigation(){
  $('.mobileSubnav').on('click',function(){
      if(!$(this).hasClass('selected')){
          $(this).addClass('selected');
          $('#navigation').removeClass('hidden-phone');
      }
      else{
          $(this).removeClass('selected');
          $('#navigation').addClass('hidden-phone');
      }
  });

  $('.navigation > ul > li > a').on('click',function(){
    var navText = $(this).text();
    $('#currentTab').text(navText);
    $('#navigation').addClass('hidden-phone');
    $('.mobileSubnav').removeClass('selected');
  });
}


//Saved Button
function savedButton(){
  $(document).on('click','[data-type="saveButton"]', function(){
    $(this).children().children('.icon-newsave').toggleClass('selected');
	if($('.icon-newsave').hasClass('selected'))
		{
			$(this).children().children('span').text('Saved');
			}
    	else{
			$(this).children().children('span').text('Save');
		}
  });
}



/*Followed toggle action*/
function followToggle(){
	$('.follow-action').click(function(e) {
    $(this).toggleClass('following');
		if ( $(this).hasClass("following") ) 	{	
				$(this).find('span').text('Following');
				$(this).find('i').addClass('icon-check');
		}
	else 
		{
				$(this).find('span').text('Follow');
				$(this).find('i').removeClass('icon-check');
		}
	});
}

/*Invite toggle action*/
function inviteToggle(){
	$('.invite-action').click(function(e) {
    $(this).toggleClass('inviting');
		if ( $(this).hasClass("inviting") ) 	{	
				$(this).find('span').text('Invited');
				$(this).find('i').addClass('icon-check');
		}
	else 
		{
				$(this).find('span').text('Invite');
				$(this).find('i').removeClass('icon-check');
		}
	});
}


/*Save Article toggle action*/
function saveToggle(){
	$('.savearticle-action, .save-stylemap').click(function(e) {
	$(this).toggleClass('saving');
		if ( $(this).hasClass("saving") ) 	{	
				$(this).find('span').text('Saved');
				$(this).find('i').addClass('icon-check');
		}
	else 
		{
				$(this).find('span').text('Save');
				$(this).find('i').removeClass('icon-check');
		}
	});
}

/*Add Article toggle action*/
function addToggle(){
	$(document).on('touchstart click', '.add-action', function(){
		$(this).toggleClass('clipping');
		if ( $(this).hasClass("clipping") ) 	{	
				$(this).find('span').text('Clip’d');
				$(this).find('i').addClass('icon-cliped-black');
		}
	else 
	{
			$(this).find('span').text('Clip');
			$(this).find('i').removeClass('icon-cliped-black');
		}
	});
	
}

//Profile  finish and update editing
function editfinish(){
	   $('.finishedit, .edit-product-lists').hide();
		 $(document).on('click','.editnow', function(e) {
			 var myIndex = $(this).closest('li');
			 $(this).closest('li').addClass('editmode').removeClass('viewmode');
			$(this).closest('li').find('.finishedit, .edit-product-lists').show();
			$(this).closest('li').find('.editnow').hide();
			$(this).closest('li').find('.slideietm-info').hide();
		});
		
		
			 $(document).on('click','.finishedit', function(e) {
			 var myIndex = $(this).closest('li');
			 $(this).closest('li').addClass('viewmode').removeClass('editmode');
			$(this).closest('li').find('.editnow').show();
			 if ($(window).width() <= 900) {
					 $(this).closest('li').find('.slideietm-info').show();
			}
			$(this).closest('li').find('.finishedit, .edit-product-lists').hide();
		});
	
			
}

//Article edit
function articleEdit(){
	$('.finishedit').hide();
		$('.article-edit-product .editnow').click(function(e) {
			 var myIndex = $(this).closest('li');
			$(this).closest('li').find('.finishedit, .edit-product-lists').show();
			$(this).closest('li').find('.editnow').hide();
		});
		
		$('.finishedit').click(function(e) {
			 var myIndex = $(this).closest('li');
			$(this).closest('li').find('.editnow').show();
			$(this).closest('li').find('.finishedit, .edit-product-lists').hide();
	});	
}

$('.rating').jRating({
		type:'big',
		showRateInfo:false,
});

//Dropdown menus
function doropDownmenus(){
	 $(".dropdown .opendropdown").click(function() {
				$(".dropdown .dropdowncontent").slideToggle();
	});
	
	$(document).bind('click', function(e) {
		var $clicked = $(e.target);
		if (! $clicked.parents().hasClass("dropdown"))
			$(".dropdown .dropdowncontent").slideUp();
	});
}

//Alerts delete
function alertsRemove(){
	$(document).on('click','.close-alerts',function(){ 
		$(this).closest('li').remove();
	});
}

//Runway slider click excercise
function runwaysliderclicking(){
   			$(document).on('click','.shop-popup-content .product-slider li',function(){ 
						$(this).toggleClass('selected-product');
			});

			if ($(this).find().hasClass("selected-product")){
				$(this).find().removeClass("	-product");
			}
			else{
				$(".selected-product").removeClass("selected-product");	
				$(this).find(".selected-product").addClass("selected-product");				
			}  
			 $(document).on('mouseover',function(){ 
			   	 $('[data-rel="tipsys"]').tipsy({fade: true, gravity: 's'});
  			});
				
  }


/*Tag mannually edit*/
function search(e)
	{
		$(e).on("keydown",function search(event) {
			if(event.keyCode == 13) {
				$('.visible-edit-tag li a').append($(this).val());
			}
		});
	}


/*Selected Items*/
function selectedProductItems()
{
	$('body').on("click",'.attached-item-body  ul > li, .added-product-list > li, .choose-productitems > li',function() {
            $(this).toggleClass('selected-porduct-items');
        });		
	   if ($(this).find().hasClass("selected-porduct-items")){
			$(this).find().removeClass("selected-porduct-items");
		}
	else{
		$(".selected-porduct-items").removeClass("selected-porduct-items");	
		$(this).find(".selected-porduct-items").addClass("selected-porduct-items");									
	}
}

//****** Tabs ******//
function tabIndexFn() {
    $('.tabIndexFn').each(function (i) {
        $(this).attr('id', 'tabIndexFn' + i);
        $('#tabIndexFn' + i + ' .tabsContent').attr('index', i);
        $('#tabIndexFn' + i + '> div > a[data-rel], #tabIndexFn' + i + '> section > a[data-rel]').each(function (i) {
            $(this).attr('index', i);
        });
        $('#tabIndexFn' + i + '> div > a[data-rel], #tabIndexFn' + i + '> section > a[data-rel]').on('click', function () {
            var dataRel = $(this).attr('data-rel');
            if (!$(this).hasClass('active')) {
                $('#tabIndexFn' + i + '> div > a[data-rel], #tabIndexFn' + i + '> section > a[data-rel]').removeClass('active')
                $('#tabIndexFn' + i + ' > .tabsContent').hide();
                $(this).addClass('active');
                $('#' + dataRel).fadeIn();
            }
        });
    });
};

/*Go back change content*/
if ($(window).width() <= 767) {
  $('.goback-btn').html('<i class="icon-goback"></i>');
}


		
/*Tab drop down for small screens*/
function tabDropdowns(){
		$('.tab-dropdowns').click(function(e) {
			if($(this).hasClass('open-dropdown')){
				$(this).removeClass('open-dropdown');
				$('.small-screen-tabs').addClass('hidden-phone');
			} else {
				$(this).addClass('open-dropdown');
				$('.small-screen-tabs').removeClass('hidden-phone');
				}
			
			$('.small-screen-tabs > a').click(function(e) {
						$(this).parent().addClass('hidden-phone');
						$(".tab-dropdowns").removeClass('open-dropdown');
						
						 $(this).parent().slideUp();
						var text = $(this).text();
						$('.tab-dropdowns a').text(text);
				});		
        });
		if ($(window).width() <= 767) {
		$(document).on('touchstart click', function(e) {
				if ($(e.target).closest('.small-screen-tabs, .tab-dropdowns').length === 0) {
					$('.small-screen-tabs').addClass('hidden-phone');
					$(".tab-dropdowns").removeClass('open-dropdown');
				}
		});
	}
}


 


 
var bxSliderCreated = false;
var slider;
function uploadslider(imgCount, forceInit){ 
  if(typeof forceInit !=='undefined' && forceInit){
    bxSliderCreated = false;
  }

  if(!bxSliderCreated){ 

    if(typeof imgCount === 'undefined' || imgCount > 1){

        slider = $('.add-products-slider').bxSlider({
          minSlides: 1,
          maxSlides: 1,
          moveSlides: 1,
          slideWidth: 160,
          slideMargin: 10,
          pager : false,
          infiniteLoop:false
        });
    }else{
        slider = $('.add-products-slider').bxSlider({
          minSlides: 1,
          maxSlides: 1,
          moveSlides: 1,
          slideMargin: 0,
          pager : false,
          infiniteLoop:false,
          control:false
        });
    }

            
      bxSliderCreated = true;
      return slider;
    } 
     else{
        return slider;
     } 
}


function updatebxSliderCreated(value){ 
    bxSliderCreated = value;
  }


var bxArticleSliderCreated = false;
var sliderArticle;
function uploadArticleSlider(imgCount, forceInit){ 
  if(typeof forceInit !=='undefined' && forceInit){
    bxArticleSliderCreated = false;
  }

  if(!bxArticleSliderCreated){ 

    if(typeof imgCount === 'undefined' || imgCount > 1){

        sliderArticle = $('.add-article-slider').bxSlider({
          minSlides: 1,
          maxSlides: 1,
          moveSlides: 1,
          slideWidth: 160,
          slideMargin: 10,
          pager : false,
          infiniteLoop:false
        });
    }else{
        sliderArticle = $('.add-article-slider').bxSlider({
          minSlides: 1,
          maxSlides: 1,
          moveSlides: 1,       
          slideMargin: 0,         
          pager : false,
          infiniteLoop:false,
          controls:false
        });
    }

            
      bxArticleSliderCreated = true;
      return sliderArticle;
    } 
     else{
        return sliderArticle;
     } 
}

function updatebxArticleSliderCreated(value){ 
    bxArticleSliderCreated = value;
  }




/*var bxArticleSliderCreated = false;
 var sliderArticle;
function uploadArticleSlider(){  
  if(!bxArticleSliderCreated){ 
      sliderArticle = $('.add-article-slider').bxSlider({
          minSlides: 3,
          maxSlides: 4,
          moveSlides: 1,
          slideWidth: 160,
          slideMargin: 10,
          pager : false,
          infiniteLoop:false
        });      
      bxArticleSliderCreated = true;
      return sliderArticle;
    } 
     else{
        return sliderArticle;
     } 
}*/

/*Activity Page*/
function activity(){
  /*$(document).on('click','.expaned-activity-icon', function(event){
   
    event.stopPropagation();
    $(this).toggleClass('activeExpanded');
    if($(this).hasClass('activeExpanded')){
      $(this).parents('.ih-item').prev('.expaned-content').show();
    }
    else {
      $('.expaned-content').hide();
      }
  });
  */
  $( ".activity-block" ).hover(function() {
      $(this).addClass('activity-hover');
      }, function() {
      $(this).removeClass('activity-hover');
        $('.expaned-content').hide();
        $('.expaned-activity-icon').removeClass('activeExpanded');
      }
    );
  
  $(document).bind('click', function(e) {
    var $clicked = $(e.target);
    if (! $clicked.parents().hasClass("dropdown"))
      $(".dropdown .dropdowncontent").hide();
  });
}

   /*Article Page*/
  function article(){
  $(".attach-items-content").on("click",function() {
    if ($(".browse-items").is(":visible") == true) { 
      $('.add-article-slider > li').on('click', function(){
       //$(this).find('.slider-editimg').show();
       $('.add-text-content').show();
       $('.browse-items').hide();
     });
    }
    });
              
   $('.add-items-button').click(function() {
   $(this).closest('.add-new-items').slideUp();
   $('.browse-items').slideDown();
   $('.slider-editimg').hide();
   });
   
   
   $('.add-new-item').click(function() {
  $('.attached-items-visible').slideUp();
  $('.add-text-content').slideDown();
  $('.slider-editimg').hide();
  });
   
   $('.go-back-text-field').click(function() {
   $('.add-text-content').slideUp();
   $('.browse-items').slideDown();
   $('.slider-editimg').hide();
   });

   
   $('.already-attached .editariclepopup').on('click', function(){
   $('.add-text-content').slideDown();
   $('.attached-items-visible').slideUp();
   })
   
   $(".already-attached .deleted-current-items").click(function() {
   $(this).parents('li').remove();
   if($('.already-attached li').length == 0)
   {
     $('.attached-items-visible').hide();
     $('.add-new-items').show();     
   }
   });  
       
  var visible = false;
  $('.dresses > li, .handbag > li').on('mouseenter',function(){
     if(!$('.slider-editimg').is(':visible')){
      $('.slider-editimg').fadeIn();
      visible = true;
    }
    else{
     return false;
     $('.slider-editimg').fadeOut();  
    }
  });
}
/* 
Dynamically changing the height of bx-viewport on shop similar click
*/
function setBXViewPortHeight(){
		var h1 = 285;
		$('.shop-popup-content .bx-wrapper > .bx-viewport').height(h1);
	}

/*
Dynamically changing the opacity of the background (from Shop Widget to Shop Similar)
*/
function setOpacityBackGroundShopPopUp(){
	 document.getElementById('shopPopup').style.backgroundColor = "#333333";
}
/*
Dynamically changing the opacity of the background (from Shop Similar to Shop Widget)
*/
function setOpacityBackGroundShopPopUpShopWidget(){
	 document.getElementById('shopPopup').style.backgroundColor = "rgba(0,0,0,0.7)";
}

var articleSliderflag = false; 
function articleLook(){

  if (!articleSliderflag) {
      articleSliderflag = true; 
        var a  = $('.detailSlider > .bx-wrapper .bx-viewport').height();
        $('.articleimg-slider').bxSlider({
          pagerCustom: '#bx-pager',
          adaptiveHeight: false,
          infiniteLoop:false,
          preloadImages:'all',          
          onSlideAfter: function(currentSlideNumber, totalSlideQty, currentSlideHtmlObject){
              var a  = $('.detailSlider > .bx-wrapper .bx-viewport').height();      
             // $('.detailSlider .bx-viewport').css({'overflow':'hidden'});   
              $(".clothing-details .img-right-nav").height(a);
            },

        onSliderLoad: function(currentIndex){

            var a  = $('.detailSlider > .bx-wrapper .bx-viewport').height();      
              $(".clothing-details .img-right-nav").height(a);  
              $('.detailSlider').find('.bx-viewport').find('ul').children().eq(currentIndex).addClass('active-slide');    
            },
            onSlideBefore: function($slideElement){
              $('.detailSlider').find('.bx-viewport').find('ul').children().removeClass('active-slide');
              $slideElement.addClass('active-slide');
            }
       
        });
    }

  //$(".clothing-details .img-right-nav").height(a);

    $(window).on('resize', function(){
      var a  = $('.detailSlider > .bx-wrapper .bx-viewport').height();
      $(".clothing-details .img-right-nav").height(a);
    });

}


/*$(window).on('load', function(){
    $('#mainBanner').bxSlider({
     mode: 'fade',
     auto: false,
     pager:false,
     autoControls: true,
     pause: 2000,
    }); 
 })
*/

function deleteonTouch()
	{
		  if ($(window).width() <= 1024) {
			$('.poduct-add-items > li .items-inner').on('click touchstart', function(e) {
				$(this).toggleClass('selected-items');
				if($(this).hasClass('selected-items')){
					$(this).find('.delete-add-items').show();
				}
				else {
					$(this).find('.delete-add-items').hide();
				}
			});
	}
}

/*Doument ready*/
$(function(){
  
   if ($(window).width() >= 767) {

   
		//$('#navigation').lavaLamp();
   
   


	 };
	
        subNavigation();

	/*  Search Expand for seach page*/
	 if ($(window).width() <= 900)	
    	{
    		$('.search-click').click(function() {	
    			$('.expand-search').toggle('fast');
    		  $('.search-close').toggle('fast');
    		});

        $(document).on('touchstart click','.search-close',function(){
          $('.expand-search').slideUp('fast');
          $(this).hide();
        });
    	}
  

	//Textarea Autorerize
 	$('textarea').autosize();  	
	  
  //Focus Inpu fields focus
  $("input[type='text'], input[type='password'], input[type='email'], textarea").focus(function(){
   $(this).parent().addClass("focus");
  }).blur(function(){
       $(this).parent().removeClass("focus");
  })
   
  /*setTimeout(function(){
	 $(".chosen-select").chosen({width: "100%"}); 
   }, 700);*/

  $(".chosen-select").chosen({width: "100%"}); 
  
 // Grid.init(); 
   
  $('[data-rel="tipsynw"]').tipsy({fade: true, gravity: 'nw'});
  $('[data-rel="tipsyn"]').tipsy({fade: true, gravity: 'n'});
  
  $('[data-rel="tipsyne"]').tipsy({fade: true, gravity: 'ne'});
  $('[data-rel="tipsyw"]').tipsy({fade: true, gravity: 'w'});
  $('[data-rel="tipsye"]').tipsy({fade: true, gravity: 'e'});
  $('[data-rel="tipsysw"]').tipsy({fade: true, gravity: 'sw'});
  $('[data-rel="tipsys"]').tipsy({fade: true, gravity: 's'});
  $('[data-rel="tipsyse"]').tipsy({fade: true, gravity: 'se'});

  if($(window).width() >= 767){
     $('[data-rel="tipsym"]').tipsy({fade: true, gravity: 'w'});
   }
  $('#addtipsy').tipsy({gravity: 's',});    

  $(document).on('mouseenter',function(){
    $('[data-rel="tipsyn"]').tipsy({fade: true, gravity: 'n'});
  });
	
  tabIndexFn();
  detailAccordion(); 
  lefNavigation();
  tagTooltip();
  //clipButton();
  shopPopup(); 
  //popupSlider(); 
  iPadmenu();
  iPadseemenu();
  openBox();
  openBox_2();
  eventBox_2();
  //savedButton();
  followToggle(); //Search  follow toggle 
  saveToggle(); //save toggle 
  //addToggle(); //add toggle 
  editfinish() //Profile  finish and update editing.
  doropDownmenus(); //Dropdown menus
  alertsRemove(); //Alerts delete
  articleEdit(); //Aricle Edit
  subAccordians(); //Subaccodians
  runwaysliderclicking();  //Runway slider click excercise
  selectedProductItems(); //Selected Product Items
  inviteToggle();
  tabDropdowns(); // Tab drop down
  activity(); // Activity
  article(); // Article
  //articleLook(); //Article look and Search Cloth
  deleteonTouch();  // Deleted selected items
});

$(window).load(function(){
  if ($(window).width() >= 767) {
      setTimeout(function(){
        $('#navigation').lavaLamp();    
      },100);
    
   };
});


//function for Edit Wardrobe Item  
$(function(){
  var selectCreated=false; 
    $(document).on('click','.icon-small-edit', function(){
      if(!selectCreated){
        setTimeout(function(){
         $('[data-type="chosen"]').chosen({width: "100%"}); 
          selectCreated=false; 
        },900);
         
      }
       else {
         return false;
      } 
    }); 
})
 

// Article Deatil Page Tag tipsy

//Function Tag Tooltip
/*function tagDetailTooltip(){ 
  $(document).on('touchstart mouseenter','[data-type="tagdetialtip"]',function(){
    $('#tagView').html('');
    var tagPopupHt = $('.gallery-tag').height()/2,
        tagPopupWd = $('.gallery-tag').width() + 10,
        tagInnerHtml = $(this).children('.gallery-tag').html();    
        $('#tagView').html(tagInnerHtml)
        $('#tagView').css({left:$(this).offset().left + 10, top:$(this).offset().top + 25}).show();
   
  });
  $('#tagView').on('touchstart mouseleave',function(){
    TooltipTimer=setTimeout(function(){
       $('#tagView').hide();
       $('#tagView').html('');
    },100);
  }); 
  //Added on 3o jan
    $(document).on('touchstart mouseenter','.gallery-tag-inner .icon-closeb',function(){
       $('#tagView').hide();    
    });
}

$(function(){
  tagDetailTooltip();
});*/



//Product Tag Tooltip


function productTagtip(){
    

   $(document).on('touchstart mouseenter','[data-type="tagtipDetail"]',function(){
    
    if($(window).width()< 767){
       
        $('.img-right-nav').hide();
      

    }
    //console.log($(this).offset().left)  
    //alert($(this).offset().left)
      $('.gallery-tag').removeAttr("style");

      var TooltipTimer,
          contenWrpwd = $('.articleimg-slider > li').width()/2 + $('.detailSlider').offset().left - 20,
          contenWrpht = $('.articleimg-slider > li').height() - $(window).scrollTop(),
          tagwraph    = contenWrpht/2; 
    if ($(this).offset().left >= contenWrpwd) 
   // if (parseInt($('.article-slider .bx-wrapper').offset().left - $(this).offset().left) ==-561) 
            {             
              $(this).children('.gallery-tag').css({left: - $('.gallery-tag').width() + 30});
              $(this).children('.gallery-tag').show();
              
            }
      else 
          {

            $(this).children('.gallery-tag').show();
          }

    }); 
}


function customTip(){ 
  var tiphtml = $('<div id="tipContnet"></div>'),
      tiptextview = $('<div class="tipcontent"></div>')
      tiphtml.appendTo($('body'));
  $(document).on('mouseenter','[data-type="customtip"]',function(){
   // tiphtml.html('');
    var tiptext     = $(this).attr('data-title');
        tiptextview.html(tiptext); 
        tiphtml.html(tiptextview);
    var tipWd       = $('#tipContnet').width()/2,
        tiphoverwd  = $(this).width()/2,
        tipHt       = $('#tipContnet').height();
        tiptotalwd  = tipWd - tiphoverwd;
        $('#tipContnet').css({left:$(this).offset().left - tiptotalwd -10 , top:$(this).offset().top - tipHt - 20});
        $('#tipContnet').fadeIn();
  });

 $(document).on('mouseleave','[data-type="customtip"]', function(){
       $('#tipContnet').hide();
        $('#tipContnet').removeAttr('style');
   
    });
}


/*function itemDetailtip(){ 
  var tiphtml = $('<div id="tipContnetDetail"></div>')
    tiphtml.appendTo($('body'));
  $(document).on('mouseenter','[data-type="itemdetailtip"]',function(){
   // tiphtml.html('');
    var tiptext     = $(this).attr('data-title');
        tiphtml.html(tiptext); 
    var tipWd       = $('#tipContnetDetail').width()/2,
        tiphoverwd  = $(this).width()/2,
        tipHt       = $('#tipContnetDetail').height();
        tiptotalwd  = tipWd - tiphoverwd;
        $('#tipContnetDetail').css({left:$(this).offset().left - tiptotalwd , top:$(this).offset().top + tipHt - 25});
        $('#tipContnetDetail').fadeIn();
  });

 $(document).on('mouseleave','[data-type="itemdetailtip"]', function(){
       $('#tipContnetDetail').hide();
        $('#tipContnetDetail').removeAttr('style');
   
    });
}*/




$(function(){
  if($(window).width() > 1023 ){
    customTip();
  }
  productTagtip(); 
//Gallery expander
 runwaytagTooltip();
 
// expanderGrid();


 showHide();

$(document).on('click','.textView',function(e){ 
   
    $(this).parent('.dropdwonlist').toggleClass('active');
    $('.locationdropdown').slideToggle();  
})
 
 $(document).on('click', function(e) {     
      $(".locationdropdown").hide();
      $('.dropdwonlist').removeClass('active');
  }); 

 $(document).on('click','.dropdwonlist', function(e) {     
      return false
  }); 


 $(document).on('mouseenter','.icon-update.noupdateshow',function(){
    $('.updatedtip.noupdate').fadeIn();
  });

 $(document).on('mouseleave','.icon-update.noupdateshow',function(){
    $('.updatedtip.noupdate').fadeOut();
  });

});


//show-items-button
function showHide(){
 $(document).on('click','.show-items-button', function(){   
  $('.show-items-button').toggleClass('hideBtn');
  if($(this).hasClass('hideBtn')){ 
        $(this).text('Hide Items');
        $('.icon-imgtag').show();
     }
else {
     $(this).text('Show Items'); 
     $('.icon-imgtag').hide();
     $('.gallery-tag').hide();
    }  
 });
 }



function expanderGrid(){
    var scrollExtra = 0,
        marginExpanded = 10,
        oldoffsettop = 0,
        slideUpflag = false, 
        $window = $( window ), winsize,
        $body = $( 'html, body' );
     $(document).on('click','.expander-grid > li', function(evt, event){     

      $('[data-type="shopPopu"]').removeClass('selected');
      $('#shopPopup').hide();    
      $('.show-items-button').text('Show Items');
      $('.gallery-tag').hide();

      if($(window).width() < 1025 ){
          $('.show-items-button').text('Show Items'); 
          $('.show-items-button').removeClass('hideBtn');
          $('.gallery-tag').hide();     
          $('.icon-imgtag').hide();
          //$('.expander-grid > li').removeAttr('style');
        }


         if($(window).width() < 1025 ){
            $('.expander-grid > li').removeAttr('style');
          }

      //$('.runwayImg-block > img').attr('src','');  
      var clickLiht = $(this).children('a').height();     
      var expanderHt = $('#imageDetail').height() + clickLiht + 40;
          var toppos        = $('.pos-relative').offset().top;
          var offsettop     = $(this).offset().top -50,          
              liHeight = $(this).children('a').height() + 10; 
              if (oldoffsettop !==  offsettop) {
                  oldoffsettop = offsettop;
                  slideUpflag = true;
              };

              if(scrollExtra !== offsettop){
                  //console.log(scrollExtra); 
                   $('.expander-grid > li').removeAttr('style');
                   offsettop  = $(this).offset().top -50, 
                   scrollExtra = offsettop;
                }
            
        if($('#imageDetail').is(':visible'))
              { 
                if($(this).hasClass('active')){                   
                    $('#imageDetail').slideUp('fast');            
                    $('.expander-grid > li').removeClass('active');
                    $('.expander-grid > li').removeAttr('style');
                    $('.paddingWrap').css({ 'padding-bottom': 0 +'px'}); 
                    $('.load-more').css({ 'margin-top': 0 +'px'});
                  }

                else { 

                    if (slideUpflag ) {
                       $('#imageDetail').hide();  
                       slideUpflag = false;
                    };

                      $('.expander-grid > li').removeClass('active'); 
                      $(this).addClass('active');
                      $('.paddingWrap').css({ 'padding-bottom': 350 +'px'});
                      $('.load-more').css({ 'margin-top': -300 +'px'});

                      $('#imageDetail').css({ 'top': $(this).offset().top - toppos + liHeight + 20});
                      $(this).height(expanderHt);                                        
                      $('#imageDetail').slideDown(); 
                            $('body,html').animate({
                               scrollTop: offsettop
                            }, 200); 

                          oldoffsettop = $(this).offset().top-50;
                      }
                    } 
                else
                    {               
                      slideUpflag = false;
                      $(this).addClass('active');
                      $('.paddingWrap').css({ 'padding-bottom': 350 +'px'});
                      $('.load-more').css({ 'margin-top': -300 +'px'});
                      $('#imageDetail').css({ 'top': $(this).offset().top - toppos + liHeight + 20});
                      $(this).height(expanderHt);                                        
                      $('#imageDetail').slideDown();  
                      
                          $('body,html').animate({
                              scrollTop: offsettop
                            }, 200); 

                       oldoffsettop = $(this).offset().top-50;
                }  
          }); 
  }



//Function for expanded view

function expandedView(){
  
      var scrollExtra = 0,
        marginExpanded = 10,
        oldoffsettop = 0,
        slideUpflag = false, 
        $window = $( window ), winsize,
        $body = $( 'html, body' );
     $(document).on('click','.expander-grid > li', function(evt, event){     

      $('[data-type="shopPopu"]').removeClass('selected');
      $('#shopPopup').hide();    
      $('.show-items-button').text('Show Items');
      $('.gallery-tag').hide();

      if($(window).width() < 1025 ){
          $('.show-items-button').text('Show Items'); 
          $('.show-items-button').removeClass('hideBtn');
          $('.gallery-tag').hide();     
          $('.icon-imgtag').hide();
          //$('.expander-grid > li').removeAttr('style');
        }


         if($(window).width() < 1025 ){
            $('.expander-grid > li').removeAttr('style');
          }

      //$('.runwayImg-block > img').attr('src','');  
      var clickLiht = $(this).children('a').height();     
      var expanderHt = $('#imageDetail').height() + clickLiht + 40;
          var toppos        = $('.pos-relative').offset().top;
          var offsettop     = $(this).offset().top -50,          
              liHeight = $(this).children('a').height() + 10; 
              if (oldoffsettop !==  offsettop) {
                  oldoffsettop = offsettop;
                  slideUpflag = true;
              };

              if(scrollExtra !== offsettop){
                  //console.log(scrollExtra); 
                   $('.expander-grid > li').removeAttr('style');
                   offsettop  = $(this).offset().top -50, 
                   scrollExtra = offsettop;
                }
            
        if($('#imageDetail').is(':visible'))
              { 
                if($(this).hasClass('active')){                   
                    $('#imageDetail').slideUp('fast');            
                    $('.expander-grid > li').removeClass('active');
                    $('.expander-grid > li').removeAttr('style');
                    $('.paddingWrap').css({ 'padding-bottom': 0 +'px'}); 
                    $('.load-more').css({ 'margin-top': 0 +'px'});
                  }

                else { 

                    if (slideUpflag ) {
                       $('#imageDetail').hide();  
                       slideUpflag = false;
                    };

                      $('.expander-grid > li').removeClass('active'); 
                      $(this).addClass('active');
                      $('.paddingWrap').css({ 'padding-bottom': 350 +'px'});
                      $('.load-more').css({ 'margin-top': -300 +'px'});

                      $('#imageDetail').css({ 'top': $(this).offset().top - toppos + liHeight + 20});
                      $(this).height(expanderHt);                                        
                      $('#imageDetail').slideDown(); 
                         if( !$(evt.target).is('div.product-img') ) {
                            $('body,html').animate({
                               scrollTop: offsettop
                            }, 200);
                          }

                          oldoffsettop = $(this).offset().top-50;
                      }
                    } 
                else
                    {               
                      slideUpflag = false;
                      $(this).addClass('active');
                      $('.paddingWrap').css({ 'padding-bottom': 350 +'px'});
                      $('.load-more').css({ 'margin-top': -300 +'px'});
                      $('#imageDetail').css({ 'top': $(this).offset().top - toppos + liHeight + 20});
                      $(this).height(expanderHt);                                        
                      $('#imageDetail').slideDown(); 

                      if( !$(evt.target).is('div.product-img') ) {

                          $('body, html').animate({
                              scrollTop: offsettop
                            }, 200);
                       }    

                       oldoffsettop = $(this).offset().top-50;
                }  
          }); 


}








$(document).on('click','#navigation li', function(){
  
  $('.paddingWrap').css({ 'padding-bottom': 0 +'px'});
  $('.load-more').css({ 'margin-top': 0 +'px'});

    

})

 
$(document).on('click','#navigation > li, .icon-search.search-click,.update-view', function(event){
    $('#imageDetail').hide();
    $('.expander-grid > li').removeClass('active'); 
    $('.expander-grid > li').removeAttr('style');
 }); 

$(document).on('click','.main-menu > li', function(event){
    //$('#imageDetail').hide();
   /* $('.expander-grid > li').removeClass('active'); 
    $('.expander-grid > li').removeAttr('style');*/
 }); 

$(document).on('click', '.edit-product-lists', function (event) {
    event.stopImmediatePropagation();
});
  
  function shareIt(){
    stLight.options({publisher: "977cd75f-6bc8-4e39-a2de-a0eb2be93aca", doNotHash: false, doNotCopy: false, hashAddressBar: false});
  }

 $(function(){

      $( window ).on( "orientationchange", function( event ) {
        $('#navigation li.back').remove();
     
        $('.og-grid > li.active').addClass('expanderActive');
        $('.og-grid > li.active').trigger('click');
        setTimeout(function(){
           $('#navigation').lavaLamp(); 
          $('.og-grid > li.expanderActive').trigger('click');
          $('.og-grid > li').removeClass('expanderActive');
         
        
        },150);

      });
      setTimeout(function(){
        $('.bx-loadings').remove();        
      },800);



    $(document).on('touchend', '.stopPropagation',function(event) { 
      event.stopPropagation(); 
      event.preventDefault(); 
      return; 
    });
      
 });


$(window).on('scroll',function(){
  $('.tipsy').remove();  
});



$(function(){

  $('#mainBanner').bxSlider({
     mode: 'fade',
     auto: false,
     pager:false,
     autoControls: true,
     pause: 2000,

  onSlideBefore: function (currentSlideNumber, totalSlideQty, currentSlideHtmlObject) {
    //  console.log(currentSlideHtmlObject);
      $('#captionPager > li').removeClass('active-caption');
      $('#captionPager > li').eq(currentSlideHtmlObject).addClass('active-caption')
    },
  onSliderLoad: function () {
      $('#captionPager > li').eq(0).addClass('active-caption')
       }
  }); 

 $('#mainBanner >  li:first-child').show();


$('#mobileBanner').bxSlider({
     mode: 'fade',
     auto: false,
     pager:false,
     autoControls: false,
     pause: 2000
  });


   
});

$(window).resize(function(){
  if ($(window).width() <=667 ) {
        var liht = $('#mainBanner >  li > img').height(),
          bannerCaption = $('#captionPager').innerHeight(),
          totalHt = liht + bannerCaption;
        $('[data-type="banner-wrapper"]').height(totalHt); 
      }
    else {
        var liht = $('#mainBanner >  li > img').height();
        $('[data-type="banner-wrapper"]').height(liht);
    }

});

function highlightCreateIcon() {
    var allLinks=$('ul#primary-nav').children('li');
    $(allLinks[3]).addClass('selected');
    $(allLinks[3]).children('a').attr('onclick','');
}

function removeHighlightCreateIcon() {
    var allLinks=$('ul#primary-nav').children('li');
    $(allLinks[3]).removeClass('selected');
    $(allLinks[3]).children('a').attr('onclick',"openPopDiv('create');highlightCreateIcon();");
}

$(document).on('click','.icon-close', function(event){
    removeHighlightCreateIcon();
}); 

function updateTooltipStatus(tipname) {
    $.ajax({
            url: base_url+'signup/updatetooltipstatus',
            type:'post',
            data: 'tipname='+tipname,
            cache: false,
            dataType:'json',
            success:function(result){
                if(tipname == 'WardrobeTooltipSmall') {
                    $('#WardrobeTooltipSmallAnchor').attr('data-type','customtip');
                    $('.tipsy-create-new').remove();
                }
            }
    });

}

 $('.close-help').on('click', function(){
        $(this).parent('.user-help-region').slideUp();
    });

// For search page 

function searchMove() {     
        $('.icon-close-article').on('click',function(){
           $('.search-wrapper').removeClass('searchTipvisible');
         });  
}

$(window).load(function(){
 
     searchMove();
   
})
$(function(){
    $('.user-help-region.search-help').slideDown();
    if($('.user-help-region.search-help').is(':visible')){
      $('.search-wrapper').addClass('searchTipvisible');
    }
});
$(document).on('load','[data-rel="tipsyn"]',function(){
    alert('aa');
    $(this).tipsy({fade: true, gravity: 'n'})
})
