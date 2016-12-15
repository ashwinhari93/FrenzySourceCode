// JavaScript Document

setInterval(function(){
	fb_obj=new FacebookLogin('CallBack'); 
	$(document).on("click","#facebookbtn",function(){
		$("#IDSourceID").val("2");
		$("#IDSocialType").val("Facebook API");
	});

	$(document).on("click","#facebookloginbtn",function(){
		$("#IDSourceIDLogin").val("2");
		$("#IDSocialTypeLogin").val("Facebook API");
	});

	$(document).on("click","#gmailsignupbtn",function(){
		$("#IDSourceID").val("4");
		$("#IDSocialType").val("Google API");
	});

	$(document).on("click","#gmailsignupbtn",function(){
		$("#IDSourceIDLogin").val("4");
		$("#IDSocialTypeLogin").val("Google API");
	});

	$(document).on("click","#linkedinbtn",function(){
		$("#IDSourceID").val("7");
		$("#IDSocialType").val("LinkedIN API");
	});

	$(document).on("click","#linkedinloginbtn",function(){
		$("#IDSourceIDLogin").val("7");
		$("#IDSocialTypeLogin").val("LinkedIN API");
	});

	$(document).on("click","#twitterloginbtn",function(){
		$("#IDSourceIDLogin").val("3");
		$("#IDSocialTypeLogin").val("Twitter API");
		twitterRegistration('login');
	});

	$(document).on("click","#twitterregistrationbtn",function(){
		$("#IDSourceID").val("3");
		$("#IDSocialType").val("Twitter API");
		twitterRegistration('registration');
	});

	function twitterRegistration(action)
	{
		window.open(base_url+'api/twitter/twittersignup/'+action+'/',"popupwindow","width=500,height=500");
	}

	window.receiveDataFromPopup = function(data) 
	{
		if(data.user.taction=='login')
		{
			$('#LoginUserSocialID').val(data.user.id);
			$('#SignupUserSocialID').val(data.user.id);
			$('#first_name').val(data.user.firstname);
			$('#last_name').val(data.user.lastname);
			var profileUrl = 'https://twitter.com/intent/user?user_id='+data.user.id;
			qstring=getQueryString('3',data.user.id,'',data.user.firstname,data.user.lastname,data.user.picture);
			var picture = data.user.picture;
			submitLoginForm(3,data.user.id,profileUrl);
		}
		else
		{
			$('#LoginUserSocialID').val(data.user.id);
			$('#SignupUserSocialID').val(data.user.id);
			$('#first_name').val(data.user.firstname);
			$('#last_name').val(data.user.lastname);
			var profileUrl = 'https://twitter.com/intent/user?user_id='+data.user.id;
			qstring=getQueryString('3',data.user.id,'',data.user.firstname,data.user.lastname,data.user.picture);
			var picture = data.user.picture;
			submitLoginForm(3,data.user.id,profileUrl);
			//window.location=base_url+'signup?'+qstring;
		}
		console.log(data);
	};				
	
	$(document).on("click","#idsignup",function(){
		pdata=$("#registrationform").serialize();
		$.ajax({
			type: "POST",
			url: base_url+"api_signup/signup.json",
			data: pdata,
			success:function(data){
				if(data.SignUp.ResponseCode!=200)
				{
					alert(data.SignUp.Message);
				}
				else
				{
					alert('Registered successfully, login access key is : .'+data.SignUp.Data.LoginSessionKey);
				}
			}
		});
	});
},300);
	

function CallBack(user_data) 
{
	console.log(user_data);
	if($("#IDSourceIDLogin").val()!='') 
	{
		$('#LoginUserSocialID').val(user_data.id);
		$('#first_name').val(user_data.first_name);
		$('#last_name').val(user_data.last_name);
		var profileUrl = 'https://facebook.com/'+user_data.id;
		qstring=getQueryString('2',user_data.id,user_data.email,user_data.first_name,user_data.last_name,'');
		submitLoginForm(2,user_data.id,profileUrl);
	}
	else
	{
		$('#SignupUserSocialID').val(user_data.id);
		$('#first_name').val(user_data.first_name);
		$('#last_name').val(user_data.last_name);
		$('#email').val(user_data.email);
		$('#birthday').val(user_data.birthday);
		$('#fb_small').attr('src',user_data.picture.small);
		$('#fb_normal').attr('src',user_data.picture.normal);
		$('#fb_large').attr('src',user_data.picture.large);
		$('#fb_square').attr('src',user_data.picture.square);
		var profileUrl = 'https://facebook.com/'+user_data.id;
		qstring=getQueryString('2',user_data.id,user_data.email,user_data.first_name,user_data.last_name,'');
		window.location=base_url+'signup?'+qstring;
	}
}

window.onload = function(){
	var po = document.createElement('script');
	po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/client:plusone.js?onload=google_init';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(po,s);
}

function google_init(){
	g_obj1=new GoogleLogin(google_client_id,google_scope,google_api_key);
	g_obj1.SignInButtonRender('gmailsignupbtn');
	g_obj1.callback='gmailCallback';

	g_obj_login=new GoogleLogin(google_client_id,google_scope,google_api_key);
	g_obj_login.SignInButtonRender('gmailloginbtn');
	g_obj_login.callback='gmailCallback';
}

function gmailCallback(user_data)
{
	$('#SignupUserSocialID').val(user_data.id);
	$('#first_name').val(user_data.first_name);
	$('#last_name').val(user_data.last_name);
	$('#email').val(user_data.email);
	$('#public_url').val(user_data.public_url);      
	var img_size = 500;
	user_data.image = user_data.image.replace(/(sz=)[^\&]+/, '$1' + img_size);
	$('#fb_small').attr('src',user_data.image);
	var profileUrl = user_data.public_url;
	qstring=getQueryString('4',user_data.id,user_data.email,user_data.first_name,user_data.last_name,'');
	console.log(user_data);
	//window.location=base_url+'signup?'+qstring;
	var picture = user_data.image;
	submitLoginForm(4,user_data.id,profileUrl);
}

setInterval(function(){
	in_obj = new LinkedinSignin();
    in_obj.callback = 'linkedin_callback';
},300);

function linkedin_callback(user_data)
{
	$('#SignupUserSocialID').val(user_data.values[0].id);
	$('#first_name').val(user_data.values[0].firstName);
	$('#last_name').val(user_data.values[0].lastName);
	$('#email').val(user_data.values[0].emailAddress);
	var profileUrl = user_data.values[0].publicProfileUrl;
	qstring=getQueryString('7',user_data.values[0].id,user_data.values[0].emailAddress,user_data.values[0].firstName,user_data.values[0].lastName,'');
	console.log(user_data);
	//window.location=base_url+'signup?'+qstring;
	var picture = '';
	if(user_data.values[0].pictureUrls._total>0){
        picture = user_data.values[0].pictureUrls.values[0];
    }
	submitLoginForm(7,user_data.values[0].id,profileUrl);
} 

function submitLoginForm(type,id,profileUrl)
{
	var requestData = {SocialType:type,SocialID:id,LoginSessionKey:$('#LoginSessionKey').val(),profileUrl:profileUrl};
        //console.log(requestData);return;
	$.ajax({
		type: "POST",
		url: base_url+"api/users/attachAccount",
		data: JSON.stringify(requestData),
		dataType: "json",
		contentType: 'application/json; charset=UTF-8',
		headers: { 'Accept-Language': accept_language },
		success:function(data){
            //window.location.reload();
            if(data.ResponseCode==200){
				angular.element(document.getElementById('MyAccountCtrl')).scope().changeSocialValue(data.Data.SocialType,data.Data.SocialID,data.Data.profileUrl);
			} else {
				alertify.alert('Account is already in use.');
			}
		}
	});
}

function getQueryString(type,id,email,fname,lname,picture)
{
	string='type='+type+'&id='+id+'&email='+email+'&fname='+fname+'&lname='+lname+'&picture='+picture;
	return encodeURI(string);
}