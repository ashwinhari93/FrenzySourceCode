/**
 * Created with JetBrains PhpStorm.
 * User: jay
 * Date: 3/18/13
 * Time: 12:15 PM
 * To change this template use File | Settings | File Templates.
 */

var is_fb_loaded = false;

window.onload = function() {
    var e = document.createElement('script');
    e.async = true;
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    document.getElementById('fb-root').appendChild(e);
}


window.fbAsyncInit = function() {

    FB.init({
        appId: FACEBOOK_ID,
        frictionlessRequests: true,
        status: true,
        xfbml: true,
        oauth: true
    });
    is_fb_loaded = true;
};


function fbLoginStatus() {

    FB.getLoginStatus(function(response) {

        if (response.status === 'connected') {
            access_token = FB.getAuthResponse()['accessToken'];
           //fbSignInSignUp(response);
            fbMyInfo();
        } else {
            fblogin();
        }
    });
}

function fblogin() {
    FB.login(function(response) {
        if (response.authResponse) {
            access_token = FB.getAuthResponse()['accessToken'];
            //fbSignInSignUp(response);
            fbMyInfo();

        } else {
           console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: 'email'
    });
}

function fbMyInfo() {
    FB.api('/me', function(response) {
        checkFbUserExist(response);
    });

}
function checkFbUserExist(response){
    console.log(response);

    $.ajax({
        url:  site_url + "signup/verify_login",
        data: 'login_type=facebook&my_info='+JSON.stringify(response)+'&social_id='+response.id+'&email='+response.email,
        type: "POST",
        success: function(data){
            var output = JSON.parse(data);

            if(output.result == 'success' && output.user_status =='active'){
                /*$('#non_logged_in').hide();
                $('#logged_in').show();
                $('#header_user_name').html(output.name);*/
                window.location = site_url+'dashboard' ;
            } else if(output.result == 'success' && output.user_status == 'unverified_email'){
				
					 openPopDiv('socialMessage');
					 $("#alertMessage").html('Please verify email.');
                        
            }else
            if(output.user_status =='disable_account'){
                    window.location = site_url+'account-settings?p=1' ;
                }else{
                window.location.href = site_url+"signup-step-one";
            }
        }
    });
}


/*--------SIGN UP FUNCTION FOR FACEBOOK -------*/

function checkFbLoginStatus()
{
    FB.getLoginStatus(function(response) {

        if (response.status === 'connected') {
            access_token = FB.getAuthResponse()['accessToken'];

            fbMyInfo_signup();
        }
    });
}

function fbLoginStatus_signup() {

    FB.getLoginStatus(function(response) {

        if (response.status === 'connected') {
            access_token = FB.getAuthResponse()['accessToken'];

            fbMyInfo_signup();
        } else {
            fblogin_signup();
        }
    });
}

function fblogin_signup() {
    FB.login(function(response) {
        if (response.authResponse) {
            access_token = FB.getAuthResponse()['accessToken'];

            fbMyInfo_signup();

        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: 'email'
    });
}

function fbMyInfo_signup() {
    FB.api('/me', function(response) {
        //console.log(response);
        var name = response.name;
        var email = response.email;
        var fb_id = response.id;
        $('#user_name').val(name);
        $('#email').val(email);
		$('#hid_email').val(email);
        $('.social_ids').val(0);
        $('#facebook_id').val(fb_id);
        $('#social_image_url').val('https://graph.facebook.com/'+fb_id+'/picture');
       // alert($('#facebook_id').val());

        /* This code will check if user already register then logged in them and redirect to landing page*/
        $.ajax({
            url:  site_url + "signup/verify_login",
            data: 'login_type=facebook&my_info='+JSON.stringify(response)+'&social_id='+response.id+'&email='+response.email,
            type: "POST",
            success: function(data){
                var output = JSON.parse(data);

                if(output.result == 'success' && output.user_status =='active'){
                    window.location.href = site_url;
                }
            }
        });
    });

}

/***********FACEBOOK SIGNUP FUNCTION END********************/

/*************BUILD NETWORK ************************/


 var Build_network = function(){
   //  alert('constructor Facebook');
     self_fb = this;

 };

 $.extend(Build_network.prototype,{
     self_fb :{},


     checkFbLoginStatus:function(){

         FB.getLoginStatus(function(response) {
             if (response.status === 'connected') {
                 access_token = FB.getAuthResponse()['accessToken'];
                 self_fb.getUsersFbFriends();


             } else {
                 self_fb.doFbLogin();
             }
         });

     },
     doFbLogin :function() {

         FB.login(function(response) {
                 if (response.authResponse) {
                     access_token = FB.getAuthResponse()['accessToken'];
                     self_fb.getUsersFbFriends();
                 } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
             }, {
                 scope: 'email,read_friendlists'
         });

     },
     getMyFacebookInfo:function(){
         FB.api('/me',function(response){
             $('#my_fb_name').html(response.name);
             $('#my_fb_profile_pic').attr('src','http://graph.facebook.com/'+response.id+'/picture');

         });
     },
     getUsersFbFriends:function(){
         this.getMyFacebookInfo();
         FB.api('/me/friends',function(response){
                 console.log(response);
             var fb_friend_ids = new Array();
             $.each(response.data,function(index, value) {
                 fb_friend_ids.push(value.id);
             });
             self_fb.checkFriendsInDatabase(fb_friend_ids);
         });

     },

     checkFriendsInDatabase:function(friend_ids){
         $.ajax({
             url:  site_url + "api/build_network/check_friends_list",
             data: 'social_type=facebook&friend_ids='+JSON.stringify(friend_ids),
             type: "POST",
             success: function(data){
                 self_fb.appendRegisteredHeros(data);
             }
         });

     },

     appendRegisteredHeros:function(list){
            var output = list.Data;
         $('#facebook_connect').hide();
         $('#facebook_friends').show();
         if(output.length >0){

             $('#facebook_friends ul.suggestions').html('');
             $.each(output,function(index, value){
                 var html = '<li id="facebook_'+value.facebook_id+'">  <img src="http://graph.facebook.com/'+value.facebook_id+'/picture" width="50" height="50" alt="" class="left">'+
                     ' <div class="text"> <a class="bold" href="'+site_url+'profile-view/'+value.user_id+'">'+value.name+'</a><br>';
                 	if(value.is_hero == null)
                    	html += ' <input name="" type="checkbox" value="'+value.facebook_id+'" class="registered_friend">';


                 	html += '</div>  </li> ';
                 	$('#facebook_friends ul.suggestions').append(html);
					if (!$('#facebook_friends ul.suggestions li').find('.registered_friend').length) {
						$('#facebook_friends').find('.facebook-addhero').hide();			
					}
             });

         } else {
             var html = '<li style="width:auto;text-transform:none;">Invite Facebook friends to build business within your existing network, and help your community prosper!</li> ';
             $('#facebook_friends ul.suggestions').html(html);
             $('#facebook_friends .msg').hide();
			 $('#facebook_friends').find('.facebook-addhero').hide();
			 $('#facebook_new_friends').hide();
         }

     },

     inviteRegisteredHeros:function(){

         var selected_friend = [] ;
         $('#facebook_friends ul li .registered_friend').each(function(){

             if($(this).is(':checked')){

                 selected_friend.push($(this).val());
             }
         });

         // console.log(selected_friend);
         if(selected_friend.length >0) {
             $.ajax({
                 url:  site_url + "build_network/add_as_heros",
                 data: 'social_type=1&social_ids='+JSON.stringify(selected_friend),
                 type: "POST",
                 success: function(data){

                     for (var i=0;i<selected_friend.length;i++)
                     {
                         $('#facebook_'+selected_friend[i]).hide();
                     }
                     $('input.registered_friend').attr('checked', false);
					 if (!$('ul.suggestions li:visible').length) {
						$('#facebook_friends').find('.gray-box').hide();
						$('#facebook_friends').find('.invite').css('border','1px solid #D6D6D6');
					 }
                 }
             });
         }


     },

     FbMultiSelectFriend:function(){
         $('#facebook-invite-btn').removeClass('btn-green').addClass('btn-gray');
         FB.ui({
             method: 'apprequests',
             message: 'Join VCommonSocialNetwork and grow you network'

         }, self_fb.multiSelectFriendCallback);

     },
     multiSelectFriendCallback:function(response){
     		console.log(response);
            if(response!==''){
                var ids = response.to.join();
                $.post(site_url + "api/build_network/save_fb_invites",{Invites:ids,LoginSessionKey:LoginSessionKey,request:response.request},function(){});
            }
         $('#facebook-invite-btn').removeClass('btn-gray').addClass('btn-green');
     }

 });



/*************BUILD NETWORK ***ENDS ********/

/***************ACCOUNT SETTING STARTS ************/


var facebook_acc = function(){
    //alert('constructor Facebook account ');
    self_fb = this;

};

$.extend(facebook_acc.prototype,{
    self_fb :{},

    checkFbLoginStatus:function(){
        FB.getLoginStatus(function(response) {
            console.log(response);
            if (response.status === 'connected') {
                access_token = FB.getAuthResponse()['accessToken'];
                self_fb.getMyFacebookInfo();


            } else {
                self_fb.doFbLogin();
            }
        });
    },
    doFbLogin :function() {

        FB.login(function(response) {
            if (response.authResponse) {
                access_token = FB.getAuthResponse()['accessToken'];
                self_fb.getMyFacebookInfo();
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {
            scope: 'email'
        });

    },
    getMyFacebookInfo:function(){
        FB.api('/me',function(response){
            console.log(response);
            self_fb.checkFacebookIdInDb(response.id);

        });
    },
    checkFacebookIdInDb:function(id){

        $.ajax({
            url:  site_url + "member/check_social_id_exist",
            data: 'social_type=1&social_id='+id,
            type: "POST",
            success: function(data){

                if(data == 1){
                    // id attach with this account
                 //   alert('now id attach');
                    $('#fbconect').parent().hide();
                    //$('.detach-region').hide();
                    $('.detach-region.fb-connect').show();
                    $('#facebook_public_url').attr('href','http://www.facebook.com/'+id);

                } else {
                    // id already exist with other account
                    openPopDiv('socialAccount');
                }
            }
        });

    },
    detachFbAccount:function(){
        $('#fbconect').parent().show();
        $('.detach-region.fb-connect').hide();
        closePopDiv('detachSocialAccount');

        $.ajax({
            url:  site_url + "member/detach_social_network",
            data: 'social_type=1',
            type: "POST",
            success: function(data){
              /*  $('#fbconect').parent().show();
                $('.detach-region.fb-connect').hide();
                closePopDiv('detachSocialAccount');*/
            }
        });
    }


});
