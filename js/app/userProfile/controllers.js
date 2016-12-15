/* User Profile & Wall
=============================*/
angular.module('App')
    .controller('UserProfileCtrl', function($scope, UserProfileService, tmpJson,$rootScope) {

        $scope.FirstName = '';
        $scope.LastName = '';
        $scope.Email = '';
        $scope.Location = ''
        $scope.Website = '';
        $scope.aboutme = '';
        $scope.gplusURL = '';
        $scope.facebookURL = '';
        $scope.twitterURL = '';
        $scope.instagramURL = '';
        $scope.LoginKeyword = '';
        $scope.SetPassword = '';
        $scope.privacySettings = '';
        
        $scope.gPlace;
        
        
        $scope.updatePrivacySettings = function(){
            $('.loader-signup').show();
            var reqData = {LoginSessionKey:$('#LoginSessionKey').val(),privacySettings:$scope.privacySettings};
            UserProfileService.updatePrivacySettings(reqData).then(function(response){
                if(response.ResponseCode==200){
                    $('.loader-signup').hide();
                    closePopDiv('accountSetings');
                    alertify.success(response.Message);
                }
            });
        }
        
        $scope.closeUserAccount = function()
        {
            reqData={LoginSessionKey:$('#LoginSessionKey').val()};
            UserProfileService.closeUserAccount(reqData).then(function(response){
                if(response.ResponseCode==200){
                    window.location.href= site_url;
                }
            });
        }
        
        $scope.closeAccountSettings = function(){
            $scope.fetchDetails('load');
            closePopDiv('accountSetings');
        }

        $scope.editProfile = function(){
            //$scope.initFileUploadUser();
            openPopDiv('accountSetings');
        }

        
        
        var handleFileSelect=function(evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.myImage = evt.target.result;
                    $('.croper-profile').fadeIn('fast');
                });
            };
            reader.readAsDataURL(file);
        };

        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        $scope.myImage='';
        $scope.myCroppedImage='';
        
        $scope.SendDataForCropping = function () {
            $('.loader-signup').show();
            var data = {};
            data.rawImage = $scope.myCroppedImage;
            data.selectedSection = "1";//$('select[name="mediaSectionId[]"]').attr('selected', 'selected').val();
            data.LoginSessionKey = $('#LoginSessionKey').val();
            

            $.ajax({
                url: site_url + "api/uploadimage/rawImage.json",
                data: data,
                type: "POST",
                success: function (response) {

                    $('.croper-profile').fadeOut('fast');
                    $scope.saveMedia(response.Data);

                }
            });

        };

        $scope.CancelCropping = function () {
            $('.croper-profile').fadeOut('fast');
        };

        $scope.changeProfileCover = function(url){
            $scope.ProfileCover = url;
            $scope.IsCoverExists=1;
        }

        $scope.apply_old_image = function(url){
            $('#image_cover').hide();
            $('.profile-cover-loader').show();
            $('#image_cover').attr('src',url);
            $scope.ProfileCover = url;
            $('.profile-footer-wrap').hide();
            $('.overlay-cover').show();
            $('#image_cover').show();
            $('.profile-cover-loader').hide();
            $scope.checkCoverExists();
        }

        $scope.apply_old_image_profilepic = function(){
            $scope.apply_old_image($scope.ProfileCover);
        }

        $scope.removeProfileCover = function(){
            var reqData = {LoginSessionKey:$('#LoginSessionKey').val()};
            UserProfileService.removeProfileCover(reqData).then(function(response){
                if(response.ResponseCode==200){
                    $('#image_cover').attr('src',response.Data.ProfileCover);
                    $scope.ProfileCover = response.Data.ProfileCover;
                    $('.overlay-cover').show();
                    $scope.IsCoverExists='0';
                    $('#image_cover').removeAttr('width');
                }
            });
        }

        $scope.checkCoverExists = function(){
            if($scope.IsCoverExists=='0'){
                $('#image_cover').removeAttr('width');
            }
        }

        $scope.removeProfilePicture = function(){
            var reqData = {LoginSessionKey:$('#LoginSessionKey').val()};
            UserProfileService.removeProfilePicture(reqData).then(function(response){
                if(response.ResponseCode==200){
                    $scope.imgsrc = response.Data.ProfilePicture;
                    window.location.reload();
                }
            });
        }

        $scope.UpdateProfilePicture = function(file_name,profilePicture){
            $('.loader-signup').show();
            var reqData = {LoginSessionKey:$('#LoginSessionKey').val(),ProfilePicture:file_name};
            UserProfileService.updateProfilePicture(reqData).then(function(response){
                if(response.ResponseCode==200){
                    $scope.imgsrc = profilePicture;
                    $('#navigationUserImg').attr({
                        src: profilePicture
                    });
                }
                $('.loader-signup').hide();
            });
        }


        $scope.UpdateProfileCoverStatus = function(status){
            $scope.IsCoverExists=status;
        }

        $scope.aboutmesubmitted=false;
        
        $scope.submitAboutMe = function($validFlag){
            $scope.aboutmesubmitted=true;
            if(!$validFlag){
                return;
            }
            
            $('.loader-signup').show();
            var LoginSessionKey = $('#LoginSessionKey').val();
            var FirstName = $scope.FirstName;
            var LastName = $scope.LastName;
            var Email = $scope.Email;
            var about = $scope.aboutme;
            var location = $scope.Location;
            
            var Website = $scope.Website;
            var gplusURL = $scope.gplusURL;
            var facebookURL = $scope.facebookURL;
            var twitterURL = $scope.twitterURL;
            var instagramURL = $scope.instagramURL;
            var LoginKeyword = $scope.LoginKeyword;

            var reqData = {LoginSessionKey:LoginSessionKey,FirstName:FirstName,LastName:LastName,Email:Email,AboutMe:about,Location:location,Website:Website,gplusURL:gplusURL,facebookURL:facebookURL,twitterURL:twitterURL,instagramURL:instagramURL,Username:LoginKeyword};

            UserProfileService.updateUserProfile(reqData).then(function(response){
                if(response.ResponseCode==200){
                    closePopDiv('accountSetings');
	            alertify.success('Profile has been updated successfully.');
                } else {
                    alertify.error(response.Message);
                }
                $('.loader-signup').hide();
                
            });
        }

        $scope.fetchDetails = function(action) {     
        $scope.LoginSessionKey = '' ; 
        if($('#LoginSessionKey').val())
        {
            $scope.LoginSessionKey = $('#LoginSessionKey').val() ;  
        }
        var expErtise = [] ; 
        var UserID = $('#UserID').val();
        if(action == 'edit' || action == 'load')
        {
            reqData = {LoginSessionKey:$scope.LoginSessionKey,UserID:UserID}; 
            UserProfileService.GetUserStatusDetail(reqData).then(function(response){
            if(response.ResponseCode>=200 && response.ResponseCode<=204){
                $scope.imgsrc = response.Data.path;
                $scope.FirstName = response.Data.FirstName;
                $scope.LastName = response.Data.LastName;
                $scope.Email = response.Data.Email;
                
                $scope.UserWallStatus = response.Data.wallstatus.UserWallStatus;
                $scope.Location = response.Data.wallstatus.Location;
                $scope.Website = response.Data.wallstatus.Website;
                $scope.gplusURL = response.Data.wallstatus.gplusURL;
                $scope.facebookURL = response.Data.wallstatus.facebookURL;
                $scope.twitterURL = response.Data.wallstatus.twitterURL;
                $scope.instagramURL = response.Data.wallstatus.instagramURL;
                $scope.LoginKeyword = response.Data.LoginKeyword;
                $scope.SetPassword = response.Data.SetPassword;
                
                
                $scope.privacySettings = response.Data.privacy_settings;
                
                $scope.ProfilePicture = response.Data.ProfilePicture;
                $scope.ProfileCover = response.Data.ProfileCover;
                $scope.Expertise = [] ; 
                $scope.aboutme = response.Data.wallstatus.UserWallStatus2;
                var ttl = response.Data.totalrows; 
                $scope.ttl = response.Data.totalrows;
                $scope.records = response.Data.totalrecords;
                $scope.points = response.Data.points.EarnPoints; 
                $scope.Percent = response.Data.Perctage ; 
                if(ttl>0)
                {
                    $scope.Expertise = response.Data.expertise ;
                }
                $scope.IsCoverExists = response.Data.IsCoverExists;
                
                
                $scope.status = response.Data.wallstatus.UserWallStatus ; 
                $scope.status2 = response.Data.wallstatus.UserWallStatus2 ; 
                //$('#charCount').val(200-parseInt($scope.status.length));
                if(action == 'edit')
                    {         
                        
                        if($scope.ProfilePicture == "" || $scope.ProfilePicture == null){
                            
                             $('#current-picture').css('display','none');
                             $('#uploadprofilepic').css('display','');  
                             $('.del-ico').css('display','none');
                    
                        }else{
                            $('.del-ico').css('display','block');
                        }
                           
                           $scope.editAbove = $scope.status;
                            $('#wallEdit').hide();
                            $('#wallSave').show(); 
                            var arr = ["1"];
                             $scope.Fetch_expertise(arr) ; 
                            if(ttl>0)
                            {
                                $('#allcontrolform').find('input.tag').tagedit({
                                    autocompleteOptions: {
                                        source: function(request, response){
                                            var data = expertiseJSON;               
                                            return response($.ui.autocomplete.filter(data, request.term) );
                                        }
                                    },
                                    allowEdit: false,
                                    allowAdd: true
                                });
                                 
                            }
                            else
                            {
                                console.log(3);
                                $('#removediv').html('<div class="bold p-b-5">Expertise</div><input type="text" name="tag[]" id="removeinput" class="form-control input-lg tag" >');
                                $('#allcontrolform').find('input.tag').tagedit({
                                    autocompleteOptions: {
                                        source: function(request, response){
                                            var data = expertiseJSON;               
                                            return response($.ui.autocomplete.filter(data, request.term) );
                                        }
                                    },
                                    allowEdit: false,
                                    allowAdd: true
                                }); 
                            }
                    }
                 
                }   
            });
                    
        }
        else
        {
             
             var jsonData = {};
              var tag = [];
               $("input[id='removeinput']").each(function(){
                        $(this).remove();                     
                }); 
             var formData = {};
             formData['LoginSessionKey'] = $('input[name="LoginSessionKey"]').val();
             formData['AboutMe'] = $('#prifiledescription').val();
             formData['ProfileMedia'] = $('input[name="profile_media"]').val();
             formData['tag'] = new Array();
             $('.tagedit-listelement.tagedit-listelement-old input').each(function(i){
                formData['tag'][i] = this.value;
             });
             UserProfileService.saveuserdetail(formData).then(function(response){
                        $('.del-ico').css('display','none');
                  if(action == 'save')
                    {         
                        window.location.reload();
                    }
                    
            });
        
        }
        
           
                
    }

        $scope.Fetch_expertise = function(ckey) {
            var LoginSessionKey = $('#LoginSessionKey').val();
            reqData = {
                ckey: $scope.ckey,
                LoginSessionKey: LoginSessionKey
            };
            UserProfileService.FetchExpertise(reqData).then(function(response) {
                try {
                    expertiseJSON = response.Data.Expertise;
                    teachJSON = response.Data.Teach;
                    lookingJSON = response.Data.Looking;
                    offerJSON = response.Data.Offer;
                    topicJSON = response.Data.Topic;
                    practiceJSON = response.Data.Practice;
                } catch (e) {}
            });
        }


        $scope.callfollowing = function()
    {
        var UserID = '';
        if($('#UserID').length>0){
            UserID = $('#UserID').val();
        }
        $scope.LoginSessionKey = '' ; 
        if($('#LoginSessionKey').val())
        {
            $scope.LoginSessionKey = $('#LoginSessionKey').val() ;  
        }
        $scope.typeentity = '' ; 
        if($('#typeentity').val())
        {
            $scope.typeentity = $('#typeentity').val() ;    
        }
        var PageSize = '';
        if($('#wall_type').length>0){
            PageSize=5;
        }
        reqData = {LoginSessionKey:$scope.LoginSessionKey,memberid:$scope.typeentity,UserID:UserID,PageSize:PageSize};
        UserProfileService.getFollowing(reqData).then(function(response){
            if(response.ResponseCode==200){
                $scope.connection = response.Data.Connection;
                $scope.noOfObj=response.Data.TotalRecords; 
                if($scope.noOfObj==0){ $scope.connection_see_all = response.for_connection_see_all ;   }

                if(!response.Data.TotalRecords > 0){
                    //angular.element(document.getElementById('WallPostCtrl')).scope().isFollowingObj(true);
                }


            } else {
                //Show Error Message
            }
                    
        });
    }

    $scope.reportAbuse = function(UID){
      var LoginSessionKey = $('#LoginSessionKey').val();
      var reportAbuseDesc = $('#reportAbuseDesc').val();
        jsonData = {LoginSessionKey:LoginSessionKey,UID:UID,Type:'User',Description:reportAbuseDesc};
        UserProfileService.reportMedia(jsonData).then(function(response){
            if(response.ResponseCode==200){
                alertify.success('Media Reported');
            }
        });
    }

    $scope.callfollowers = function()
    {
        var UserID = '';
        if($('#UserID').length>0){
            UserID = $('#UserID').val();
        }
        $scope.LoginSessionKey = '' ; 
        if($('#LoginSessionKey').val())
        {
            $scope.LoginSessionKey = $('#LoginSessionKey').val() ;  
        }
        $scope.typeentity = '' ; 
        if($('#typeentity').val())
        {
            $scope.typeentity = $('#typeentity').val() ;    
        }
        var PageSize = '';
        if($('#wall_type').length>0){
            PageSize=5;
        }
        var Type = 'user';
        if($('#FollowerType').length){
            Type = $('#FollowerType').val();
        }
        reqData = {LoginSessionKey:$scope.LoginSessionKey,memberid:$scope.typeentity,UserID:UserID,PageSize:PageSize,Type:Type};
        UserProfileService.getFollowers(reqData).then(function(response){
            if(response.ResponseCode==200){
                $scope.followers = response.Data.Connection;
                $scope.fnoOfObj=response.Data.TotalRecords; 
                if($scope.fnoOfObj==0){ $scope.fconnection_see_all = response.for_connection_see_all;}
                if(!response.Data.TotalRecords > 0){
                    //angular.element(document.getElementById('WallPostCtrl')).scope().isFollowerObj(true);
                }

            } else {
                //Show Error Message
            }
                    
        });
    }
    
    $rootScope.follow = {};
    $scope.callFollowerFollowing = function()
    {
        var UserID = '';
        if($('#UserID').length>0){
            UserID = $('#UserID').val();
        }
        $scope.LoginSessionKey = '' ; 
        if($('#LoginSessionKey').val())
        {
            $scope.LoginSessionKey = $('#LoginSessionKey').val() ;  
        }
        $scope.typeentity = '' ; 
        if($('#typeentity').val())
        {
            $scope.typeentity = $('#typeentity').val() ;    
        }
        var PageSize = '';
        if($('#wall_type').length>0){
            PageSize=5;
        }
        var Type = 'user';
        if($('#FollowerType').length){
            Type = $('#FollowerType').val();
        }
        reqData = {LoginSessionKey:$scope.LoginSessionKey,memberid:$scope.typeentity,UserID:UserID,PageSize:PageSize,Type:Type};
        UserProfileService.getFollowerFollowing(reqData).then(function(response){
            if(response.ResponseCode==200){
                $rootScope.follow.fnoOfObj=response.Data.followersCount; 
                $rootScope.follow.noOfObj=response.Data.followingCount; 
                if(!response.Data.TotalRecords > 0){
                    //angular.element(document.getElementById('WallPostCtrl')).scope().isFollowerObj(true);
                }

            } else {
                //Show Error Message
            }
                    
        });
        
    }
    
    
    
    
    $scope.initFileUploadUser = function (){
        var errorHandler = function (event, id, fileName, reason) {
            //alert(reason);
            //qq.log("id: " + id + ", fileName: " + fileName + ", reason: " + reason);
        };

        var c = 0;
        var cc = 0;
        var serr = 1;
        new qq.FineUploaderBasic({
            multiple: false,
            autoUpload: true,
            button: $("#profile-picture")[0],
            request: {
                endpoint: site_url + "api/uploadimage/uploadFile",
                customHeaders: {
                    "Accept-Language": accept_language
                },
                params: {
                    type: 'temp',
                    unique_id: function () {
                        // return $('#unique_id').val(); 
                        return '';
                    },
                    LoginSessionKey: $('#LoginSessionKey').val()
                }
            },
            validation: {
                allowedExtensions: ['jpeg', 'jpg', 'gif', 'png', 'JPEG', 'JPG', 'GIF', 'PNG'],
                sizeLimit: 4194304 // 4mb
            },
            callbacks: {
                onError: errorHandler,
                onUpload: function (id, fileName) {
                    $('.loader-signup').show();
                },
                onProgress: function (id, fileName, loaded, total) {

                    c = parseInt($('#image_counter').val());
                    c = c + 1;
                    $('#image_counter').val(c);

                }, onComplete: function (id, fileName, responseJSON) {
                    if (responseJSON.Data.result == 'success') {
                        //$scope.UpdateProfilePicture(, responseJSON.Data.thumb);
                        

                    $scope.cropImagePath = responseJSON.Data.file_path;
                    $scope.$apply();
                    $('#profile-picture input').attr('disabled', 'disabled')

                    /*setTimeout(function(){
                        $('#jcrop_target').Jcrop({
                            //onSelect:    showCoords,
                            bgColor:     'black',
                            bgOpacity:   .2,
                            //setSelect:   [ 100, 100, 50, 50 ],
                            aspectRatio: 1
                        });
                        $('.croper-profile').fadeIn('fast');
                    },200);*/

                    crop = setCropping();
                    crop.InitializeJcrop($('#jcrop_target'), 'def', '', responseJSON.Data.size);
                    $('.croper-profile').fadeIn('fast');

                    } else if (responseJSON.Data.result == 'error') {
                        alertify.error(responseJSON.Data.reason);
                        serr++;
                        console.log(serr);
                        $('.loader-signup').hide();
                    }
                    $('.loader-signup').hide();
                    


                }, onValidate: function (b) {
                    var validExtensions = ['jpeg', 'jpg', 'gif', 'png', 'JPEG', 'JPG', 'GIF', 'PNG']; //array of valid extensions
                    var fileName = b.name;
                    var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
                    if ($.inArray(fileNameExt, validExtensions) == -1) {
                        alertify.error("Allowed file type only jpeg,jpg,gif and png .");
                        serr++;
                        $(".alertify-message").css('padding-bottom', '10px');
                        $(".alertify-buttons").css('float', 'none');
                        return false;
                    }
                    if (b.size > 4194304) {
                        alertify.error('Files must be less than 4 MB.');
                        serr++;
                        $(".alertify-message").css('padding-bottom', '10px');
                        $(".alertify-buttons").css('float', 'none');
                    }

                },
                onError: function () {
                    console.log(serr);
                    if (serr == 1) {
                        alertify.error('The uploaded image does not seem to be in a valid image format.');
                    } else {
                        serr = 1;
                    }
                }
            }
        });


    }
    
       function setCropping() {

            var Cropping = function () {
                // this.target_id = target_id;
                self_c = this;
            };

            $.extend(Cropping.prototype, {
                self_c: {},
                cropping_ratio: {
                    'def': {'width': 150, 'height': 150},
                },
                target: '',
                aspect_ratio: 1,
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                file_path: '',
                resp_img_width: 0,
                resp_img_height: 0,
                upload_type: '',
                unique_id: '',
                InitializeJcrop: function (target, type, unique_id, size) {
                    self_c.target = target;
                    var dimensions = self_c.cropping_ratio[type];
                    var width = dimensions.width;
                    var height = dimensions.height;

                    $(target).Jcrop({
                        boxWidth: 510, //Maximum width you want for your bigger images
                        boxHeight: 400, //Maximum Height for your bigger images
                        aspectRatio: 1, //width/height, 
                        onSelect: Cropping.prototype.GetSelectedCoordinates,
                        minSize: [100, 100],
                        setSelect:   [ 0, 0, 150, 150 ],
                        /*setSelect: [0, 0, width, height],*/
                        onRelease: Cropping.prototype.GetSelectedCoordinates,
                        allowSelect: false,
                    });
                    self_c.upload_type = type;
                    self_c.unique_id = unique_id;
                    self_c.size = size;
                    //console.log(type);
                },
                DestroyJcrop: function () {
                    JcropAPI = $(self_c.target).data('Jcrop');
                    JcropAPI.destroy();
                },
                GetSelectedCoordinates: function (c) {
                    self_c.x1 = c.x;
                    self_c.y1 = c.y;
                    self_c.x2 = c.x2;
                    self_c.y2 = c.y2;
                    self_c.file_path = $(self_c.target).attr('src');
                    self_c.resp_img_width = $(self_c.target).width();
                    self_c.resp_img_height = $(self_c.target).height();

                },
                SendDataForCropping: function () {
                    var data = {};
                    data.x1 = self_c.x1;
                    data.x2 = self_c.x2;
                    data.y1 = self_c.y1;
                    data.y2 = self_c.y2;
                    data.img_width = self_c.resp_img_width;
                    data.img_height = self_c.resp_img_height;
                    data.file_path = self_c.file_path;
                    data.upload_type = self_c.upload_type;
                    data.unique_id = self_c.unique_id;
                    data.selectedSection = "1";//$('select[name="mediaSectionId[]"]').attr('selected', 'selected').val();
                    data.size = self_c.size;
                    data.LoginSessionKey = $('#LoginSessionKey').val();
                    
                    reqData = {LoginSessionKey:$('#LoginSessionKey').val()};

                    //console.log(data);

                    $.ajax({
                        url: site_url + "api/uploadimage/create_cropped_image.json",
                        data: data,
                        type: "POST",
                        success: function (response) {

                            self_c.DestroyJcrop();
                            $('.croper-profile').fadeOut('fast'); 
                            $('.loader-signup').show();
                            $scope.saveMedia(response.Data);
                            $('#profile-picture input').removeAttr('disabled');

                        }
                    });

                },
                CancelCropping: function () {
                    $('.croper-profile').fadeOut('fast');
                    self_c.DestroyJcrop();
                    $('#profile-picture input').removeAttr('disabled');
                }

            });



            crop = new Cropping();

            return crop;

        }
        ;
        
        $scope.saveMedia = function ($data)
        {
            $image_name = $data.image_name;
            $image_size = $data.size;
            $thumbSizeTotal = $data.thumbSizeTotal;
            $mediaSectionId = $scope.selectedSection;
            $users = $scope.selectedUser;
            
            $scope.UpdateProfilePicture($image_name, site_url+'uploads/profile/192x192/'+$image_name);

        };

    });
    
 
    

function removeThisMedia(ths){
 $(ths).parent().html('');
  $('#current-picture').css('display','none');
                         $('#uploadprofilepic').css('display','');
                         $('#profile-picture').css('display','');
                         
                         $('.del-ico').css('display','none');
 
}


