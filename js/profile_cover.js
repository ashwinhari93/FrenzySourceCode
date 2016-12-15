$(document).ready(function(){
	setTimeout(function(){
		//coverImage();
	},500);
});



    //Cover Image Plugin
    (function(e){"use strict";var t={decelerate:true,y:true,x:true,slowdown:.9,maxvelocity:40,throttleFPS:60,movingClass:{up:"kinetic-moving-up",down:"kinetic-moving-down",left:"kinetic-moving-left",right:"kinetic-moving-right"},deceleratingClass:{up:"kinetic-decelerating-up",down:"kinetic-decelerating-down",left:"kinetic-decelerating-left",right:"kinetic-decelerating-right"}},n="kinetic-settings";if(!window.requestAnimationFrame){window.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e,t){window.setTimeout(e,1e3/60)}}()}e.support=e.support||{};e.extend(e.support,{touch:"ontouchend"in document});var r=function(e,t){return Math.floor(Math.abs(e))===0?0:e*t};var i=function(e,t){var n=e;if(e>0){if(e>t){n=t}}else{if(e<0-t){n=0-t}}return n};var s=function(e,t){this.removeClass(e.movingClass.up).removeClass(e.movingClass.down).removeClass(e.movingClass.left).removeClass(e.movingClass.right).removeClass(e.deceleratingClass.up).removeClass(e.deceleratingClass.down).removeClass(e.deceleratingClass.left).removeClass(e.deceleratingClass.right);if(e.velocity>0){this.addClass(t.right)}if(e.velocity<0){this.addClass(t.left)}if(e.velocityY>0){this.addClass(t.down)}if(e.velocityY<0){this.addClass(t.up)}};var o=function(e,t){if(typeof t.stopped==="function"){t.stopped.call(e,t)}};var u=function(e,t){var n=e[0];if(t.x&&n.scrollWidth>0){n.scrollLeft=t.scrollLeft=n.scrollLeft+t.velocity;if(Math.abs(t.velocity)>0){t.velocity=t.decelerate?r(t.velocity,t.slowdown):t.velocity}}if(t.y&&n.scrollHeight>0){n.scrollTop=t.scrollTop=n.scrollTop+t.velocityY;if(Math.abs(t.velocityY)>0){t.velocityY=t.decelerate?r(t.velocityY,t.slowdown):t.velocityY}}s.call(e,t,t.deceleratingClass);if(typeof t.moved==="function"){t.moved.call(e,t)}if(Math.abs(t.velocity)>0||Math.abs(t.velocityY)>0){window.requestAnimationFrame(function(){u(e,t)})}else{o(e,t)}};var a=function(t,r){var i=e.kinetic.callMethods[t],s=Array.prototype.slice.call(arguments);if(i){this.each(function(){var t=s.slice(1),r=e(this).data(n);t.unshift(r);i.apply(this,t)})}};var f=function(r){this.addClass("kinetic-active").attr("tabindex","0").each(function(){var o=e.extend({},t,r);var a=e(this),f,l=false,c,h=false,p=false,d,v,m=1e3/o.throttleFPS,g,y;o.velocity=0;o.velocityY=0;a.bind("selectstart",function(){return false});var b=function(){f=false;c=false;p=false};e(document).mouseup(b).click(b);var w=function(){o.velocity=i(l-f,o.maxvelocity);o.velocityY=i(h-c,o.maxvelocity)};var E=function(e,t){p=true;o.velocity=l=0;o.velocityY=h=0;f=e;c=t};var S=function(){if(f!==undefined&&l!==undefined&&o.decelerate===false){o.decelerate=true;w();f=l=p=false;u(a,o)}};var x=function(t,n){if(!g||new Date>new Date(g.getTime()+m)){g=new Date;if(p&&(f||c)){if(y){e(y).blur();y=null;a.focus()}o.decelerate=false;o.velocity=o.velocityY=0;a[0].scrollLeft=o.scrollLeft=o.x?a[0].scrollLeft-(t-f):a[0].scrollLeft;a[0].scrollTop=o.scrollTop=o.y?a[0].scrollTop-(n-c):a[0].scrollTop;l=f;h=c;f=t;c=n;w();s.call(a,o,o.movingClass);if(typeof o.moved==="function"){o.moved.call(a,o)}}}};if(e.support.touch){this.addEventListener("touchstart",function(e){E(e.touches[0].clientX,e.touches[0].clientY)},false);this.addEventListener("touchend",function(e){if(e.preventDefault){e.preventDefault()}S()},false);this.addEventListener("touchmove",function(e){if(e.preventDefault){e.preventDefault()}x(e.touches[0].clientX,e.touches[0].clientY)},false)}else{a.mousedown(function(e){E(e.clientX,e.clientY);y=e.target;e.preventDefault()}).mouseup(function(){S();y=null}).mouseleave(function(){S()}).mousemove(function(e){x(e.clientX,e.clientY);e.preventDefault()}).css("cursor","move")}a.click(function(e){if(Math.abs(o.velocity)>0){e.preventDefault();return false}});a.data(n,o)})};e.kinetic={settingsKey:n,callMethods:{start:function(t,n){var r=e(this);t=e.extend(t,n);if(t){t.decelerate=false;u(r,t)}},end:function(t,n){var r=e(this);if(t){t.decelerate=true}}}};e.fn.kinetic=function(e){if(typeof e==="string"){a.apply(this,arguments)}else{f.call(this,e)}return this}})(window.jQuery||window.Zepto)
    
    //Function for change cover image and set imagee_src and offset of uploded image
    $(function(){
        //$('.draggable').imagefill();
        $("#upload_cover").change(function(){
                var n = 1;
                $('#image_cover').error(function(){
                    
                    if(n>1){
                        angular.element(document.getElementById('UserProfileCtrl')).scope().removeProfileCover();
                    } else {
                        angular.element(document.getElementById('UserProfileCtrl')).scope().apply_old_image_profilepic();
                    }
                    setTimeout(function(){
                        if(n==1){
                            alertify.error("The uploaded image does not seem to be in a valid image format.");
                            $('.overlay-cover').show();
                        }
                        n++;
                    },200);
                });

                $('.profile-footer').show();
                $('#image_cover').offset({top:0});
                readURL(this)
                var control = document.getElementById("upload_cover");

                var files = control.files;
                $('#hidden_image_cover').val(files[0].name);
                
                coverImage();

                $('.draggable').on('mouseenter',function(){
                    $('#coY').val(parseInt($('#image_cover').offset().top)*-1) ;
                });

                $('.draggable').on('mouseleave',function(){
                    $('#coY').val(parseInt($('#image_cover').offset().top)*-1) ;
                });
        });
    });

    //Function for set image_src when upload image
    function readURL(input)
    {
        if (input.files && input.files[0])
        {
            var reader = new FileReader();
            var image = new Image();

            if(input.files[0].size>4194304){
                alertify.error("Files must be less than 4 MB.");
                return;
            }

            var img = input.files[0]['name'];
            var image_regex =  /^.*\.(jpeg|JPEG|png|PNG|jpg|JPG)$/;
            if (!image_regex.test(img)) {
                alertify.error("Only jpg,jpeg and png file are accepted");
                $('.overlay-cover').show();
                return false;
            } else {
                $('.overlay-cover').hide();
            }
            reader.onload = function (e) {
                    $('#image_cover').attr('src', e.target.result);
                    $('#image_cover').hide();
                    $('.profile-cover-loader').show();
                    setTimeout(function(){
                        var width = $('#image_cover').width();
                        var height = $('#image_cover').height();
                        console.log(width);
                        console.log(height);
                        if(!$('.ajs-error').is(':visible')){
                            if(width>1 && height>1){
                                if(width<800 || height<380){
                                    alertify.message('Image width should be bigger than 800 and height should be bigger than 380');
                                    $('.cancel-upload').trigger('click');
                                    $('#image_cover').show();
                                    $('.profile-cover-loader').hide();
                                } else {
                                    alertify.message('You may drag the cover photo vertically to set it accordingly.');
                                    angular.element(document.getElementById('UserProfileCtrl')).scope().checkCoverExists();
                                    $('#image_cover').attr('width','2500');
                                    $('#image_cover').show();
                                    $('.profile-cover-loader').hide();
                                }
                            }
                        }
                    },1000);
                    //$('#image_cover').attr('width', 1600);
                    $('#hidden_image_cover_data').val(e.target.result);
                    $('#image_cover').offset({top:0});
                    $('.edit-profile').hide();
                    $('.profile-footer-wrap').show();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    //Function for save cropped image and reload current page
    function ajax_save_crop_image()
    {       
            $('#apply_button').addClass('loading');
            var orignal_image = $('#hidden_image_cover').val();
            var orignal_image_data = $('#hidden_image_cover_data').val();
            
            var img = document.getElementById('image_cover'); 
            var width = img.clientWidth;
            var height = img.clientHeight;
            
            var extension = orignal_image.substr( (orignal_image.lastIndexOf('.') +1) );
            if(extension != 'bmp' || extension != 'BMP' )
            {
                    $.ajax({
                    type: "POST",
                    url: base_url+'api/uploadimage/create_cropped_image',
                    data: 'upload_type=profilebanner&src='+orignal_image+'&img_offset_x='+$("#coX").val()+'&img_offset_y='+$("#coY").val()+'&image_data='+encodeURIComponent(orignal_image_data)+'&height='+height+'&width='+width+'&unique_id='+$('#LoginSessionKey').val()+'&LoginSessionKey='+$('#LoginSessionKey').val(),
                    async : false,
                    dataType:'json',
                    success: function (res) {
                        if(res.result == 'error'){
                            alertify.message(res.msg);
                            //window.location.reload();
                        }else{
                            console.log('Profile Image upload successfully.');
                            $('#apply_button').removeClass('loading');
                            $('.profile-footer-wrap').hide();
                            angular.element(document.getElementById('UserProfileCtrl')).scope().changeProfileCover(res['1200x200']);
                            $('.overlay-cover').show();
                        }

                    }
                });
        }else{
            alertify.error('File Type not supported.');
            //window.location.reload(); 
        }
    }			

    function coverImage() {
    var e = $("#ib-main-wrapper"),
        t = function() {
            var t = false,
                n = -1,
                r = false,
                i = e.find("div.ib-main > a"),
                s = i.not(".ib-content"),
                o = s.length,
                u = function() {
                    s.addClass("ib-image");
                    a();
                    l()
                },
                a = function() {
                    f();
                    e.kinetic({
                        moved: function() {
                            t = true
                        },
                        stopped: function() {
                            $("#coX").val($("#ib-main-wrapper").css("top"));
                            t = false
                        }
                    })
                },
                f = function() {
                    var t = $("#ib-top").outerHeight(true) + $("#header").outerHeight(true) + parseFloat(i.css("margin-top"));
                    e.css("height", $(window).height() - t)
                },
                l = function() {
                    i.bind("click.ibTemplate", function(e) {
                        if (!t) c($(this));
                        return false
                    });
                    $(window).bind("resize.ibTemplate", function(e) {
                        f();
                        $("#ib-img-preview, #ib-content-preview").css({
                            width: $(window).width(),
                            height: $(window).height()
                        })
                    })
                },
                c = function(e) {
                    if (r) return false;
                    if (e.hasClass("ib-content")) {
                        r = true;
                        n = e.index(".ib-content");
                        p(e, function() {
                            r = false
                        })
                    } else {
                        r = true;
                        n = e.index(".ib-image");
                        h(e, function() {
                            r = false
                        })
                    }
                },
                h = function(t, n) {
                    var r = t.children("img").data("largesrc"),
                        i = t.children("span").text(),
                        s = {
                            src: r,
                            description: i
                        };
                    t.addClass("ib-loading");
                    d(r, function() {
                        t.removeClass("ib-loading");
                        var u = $("#ib-img-preview").length > 0;
                        if (!u) $("#previewTmpl").tmpl(s).insertAfter(e);
                        else $("#ib-img-preview").children("img.ib-preview-img").attr("src", r).end().find("span.ib-preview-descr").text(i);
                        var a = w(r);
                        t.removeClass("ib-img-loading");
                        $("#ib-img-preview").css({
                            width: t.width(),
                            height: t.height(),
                            left: t.offset().left,
                            top: t.offset().top
                        }).children("img.ib-preview-img").hide().css({
                            width: a.width,
                            height: a.height,
                            left: a.left,
                            top: a.top
                        }).fadeIn(400).end().show().animate({
                            width: $(window).width(),
                            left: 0
                        }, 500, "easeOutExpo", function() {
                            $(this).animate({
                                height: $(window).height(),
                                top: 0
                            }, 400, function() {
                                var e = $(this);
                                e.find("span.ib-preview-descr, span.ib-close").show();
                                if (o > 1) e.find("div.ib-nav").show();
                                if (n) n.call()
                            })
                        });
                        if (!u) v()
                    })
                },
                p = function(t, n) {
                    var r = $("#ib-content-preview").length > 0,
                        i = t.children("div.ib-teaser").html(),
                        s = t.children("div.ib-content-full").html(),
                        o = {
                            teaser: i,
                            content: s
                        };
                    if (!r) $("#contentTmpl").tmpl(o).insertAfter(e);
                    $("#ib-content-preview").css({
                        width: t.width(),
                        height: t.height(),
                        left: t.offset().left,
                        top: t.offset().top
                    }).show().animate({
                        width: $(window).width(),
                        left: 0
                    }, 500, "easeOutExpo", function() {
                        $(this).animate({
                            height: $(window).height(),
                            top: 0
                        }, 400, function() {
                            var e = $(this),
                                t = e.find("div.ib-teaser"),
                                o = e.find("div.ib-content-full"),
                                u = e.find("span.ib-close");
                            if (r) {
                                t.html(i);
                                o.html(s)
                            }
                            t.show();
                            o.show();
                            u.show();
                            if (n) n.call()
                        })
                    });
                    if (!r) m()
                },
                d = function(e, t) {
                    $("<img/>").load(function() {
                        if (t) t.call()
                    }).attr("src", e)
                },
                v = function() {
                    var e = $("#ib-img-preview");
                    e.find("span.ib-nav-prev").bind("click.ibTemplate", function(e) {
                        g("prev")
                    }).end().find("span.ib-nav-next").bind("click.ibTemplate", function(e) {
                        g("next")
                    }).end().find("span.ib-close").bind("click.ibTemplate", function(e) {
                        y()
                    });
                    $(window).bind("resize.ibTemplate", function(t) {
                        var n = e.children("img.ib-preview-img"),
                            r = w(n.attr("src"));
                        n.css({
                            width: r.width,
                            height: r.height,
                            left: r.left,
                            top: r.top
                        })
                    })
                },
                m = function() {
                    $("#ib-content-preview").find("span.ib-close").bind("click.ibTemplate", function(e) {
                        b()
                    })
                },
                g = function(t) {
                    if (r) return false;
                    r = true;
                    var i = $("#ib-img-preview"),
                        u = i.find("div.ib-loading-large");
                    u.show();
                    if (t === "next") {
                        n === o - 1 ? n = 0 : ++n
                    } else if (t === "prev") {
                        n === 0 ? n = o - 1 : --n
                    }
                    var a = s.eq(n),
                        f = a.children("img").data("largesrc"),
                        l = a.children("span").text();
                    d(f, function() {
                        u.hide();
                        var t = w(f);
                        i.children("img.ib-preview-img").attr("src", f).css({
                            width: t.width,
                            height: t.height,
                            left: t.left,
                            top: t.top
                        }).end().find("span.ib-preview-descr").text(l);
                        e.scrollTop(a.offset().top).scrollLeft(a.offset().left);
                        r = false
                    })
                },
                y = function() {
                    if (r) return false;
                    r = true;
                    var e = s.eq(n);
                    $("#ib-img-preview").find("span.ib-preview-descr, div.ib-nav, span.ib-close").hide().end().animate({
                        height: e.height(),
                        top: e.offset().top
                    }, 500, "easeOutExpo", function() {
                        $(this).animate({
                            width: e.width(),
                            left: e.offset().left
                        }, 400, function() {
                            $(this).fadeOut(function() {
                                r = false
                            })
                        })
                    })
                },
                b = function() {
                    if (r) return false;
                    r = true;
                    var e = i.not(".ib-image").eq(n);
                    $("#ib-content-preview").find("div.ib-teaser, div.ib-content-full, span.ib-close").hide().end().animate({
                        height: e.height(),
                        top: e.offset().top
                    }, 500, "easeOutExpo", function() {
                        $(this).animate({
                            width: e.width(),
                            left: e.offset().left
                        }, 400, function() {
                            $(this).fadeOut(function() {
                                r = false
                            })
                        })
                    })
                },
                w = function(e) {
                    var t = new Image;
                    t.src = e;
                    var n = $(window).width(),
                        r = $(window).height(),
                        i = r / n,
                        s = t.width,
                        o = t.height,
                        u = o / s,
                        a, f, l, c;
                    if (i > u) {
                        f = r;
                        a = r / u
                    } else {
                        f = n * u;
                        a = n
                    }
                    return {
                        width: a,
                        height: f,
                        left: (n - a) / 2,
                        top: (r - f) / 2
                    }
                };
            return {
                init: u
            }
        }();
    t.init()
}
