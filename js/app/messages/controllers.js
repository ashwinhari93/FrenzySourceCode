
angular.module('App')
/*	Controller(s)
===================================*/
.controller('messageSectionCtrl',function($scope, $window, messagingService, setFormatDate,$timeout) {
    // layout Height Start : Start
        var w = angular.element($window);
        var mszlist = angular.element('.mszList').offset().top;
        	mszBox = angular.element('.mszBox').offset().top;
        	footerHeight = angular.element('.footer-wrap').innerHeight() + 23;
            mszComposer = angular.element('.message-composer').innerHeight();

        $scope.getHeight = function() {
            return w.height()
        };

        $scope.$watch($scope.getHeight, function(newValue, oldValue) {
            $scope.mszListStyle = function() {
                var mszListHeight;
                if (newValue > 700) {
                    mszListHeight = {height: (newValue-mszlist-footerHeight) + 'px'};
                } else {
                    mszListHeight = {height: 377};
                }
                return mszListHeight;
            };
            $scope.mszBoxStyle = function(){
                var mszBoxHeight;
                if (newValue > 700) {
                     mszBoxHeight = {height: (newValue-mszBox-footerHeight-mszComposer) + 'px'};
                } else {
                     mszBoxHeight = {height: 248};
                }
                return mszBoxHeight;
            };
        });

        w.bind('resize', function () {
                $scope.$apply();
        });
    // layout Height Start : End

    // Date Formate
    $scope.getDateFormate = function (date){
        return setFormatDate.getTime(date)
    }
    // is read flag check
    $scope.isReadFn = function(isReadFlag){
        if(isReadFlag > 1 ){
            return 1
        } else {
            return 2
        }
    }
    // 
    $scope.isTrashFn = function(isTrashFlag){
        return 12
    }

    // Trigger get message on search
    $scope.getMessageSearch = function(){
        var Type = 'Inbox';
        if($('.titleTrash').hasClass('active')){
            Type = 'Trash';
        }
        $('#PageNo').val(1);
        $scope.MszList = [];
        $scope.getMessage(Type,'192');
    }
    
    $scope.MszList = []
    
    // Get Message
    $scope.getMessage = function(type, dn){
        if(type=='InboxF'){
            $('#PageNo').val(1);
            $scope.MszList = [];
            type = 'Inbox';
        } else if(type=='TrashF'){
            $('#PageNo').val(1);
            $scope.MszList = [];
            type = 'Trash';
        }
        $('.messages-title').removeClass('active');
        $('.title'+type).addClass('active');

        var req = {
            "LoginSessionKey": LoginSessionKey,
            "Type": type,
            "PageSize": "10",
            "PageNo": $('#PageNo').val(),
            "SearchKey" : $scope.searchKey
        };
        messagingService.GetMessage(req).then(function(res){
            $('#PageNo').val(parseInt($('#PageNo').val())+1);
            var data = res.Data
            for (i in data) {
                var obj = {
                    'CreatedDate'   : data[i].CreatedDate,
                    'MessageGuID'   : data[i].MessageGuID,
                    'ModifiedDate'  : data[i].ModifiedDate,
                    'Subject'       : data[i].Subject,
                    'UnreadCount'   : data[i].UnreadCount,
                    'Status'        : data[i].Status,
                    'Users'         : []
                }
                $scope.MszList.push(obj)

                for (ii in data[i].Users){
                    if(data[i].Users[ii].ProfilePicture==base_url+'assets/img/profiles/default-148.png'){
                        data[i].Users[ii].ProfilePicture = base_url+'assets/img/profiles/default-148.png'
                    } else {
                        var profilePicture =  data[i].Users[ii].ProfilePicture.split('/')
                        profilePictureUpdate = dn+'x'+dn +'/'+ profilePicture[profilePicture.length-1]
                        profilePicture[profilePicture.length-1] = profilePictureUpdate
                        profilePicture = profilePicture.join('/')
                        data[i].Users[ii].ProfilePicture = profilePicture
                    }
                    obj.Users.push(data[i].Users[ii]);
                }
            }
        })
    };

    $scope.messageDetails = new Array();
    // Get Message details 
    $scope.getMessageDetails = function(guid,dn){
        $scope.isNewMessage = false;
        $('.message-form-group').hide();
        $scope.UsersName = '';
        var messages = new Array();
        var req = {
             "LoginSessionKey": LoginSessionKey,
             "MessageGuID": guid
        };
        messagingService.GetMsgDetails(req).then(function(res){
            if(res.ResponseCode==200){
                var i = 1;
                $(res.Data.Messages).each(function(k,v){
                    var arr = {};
                    arr['Body'] = v.Body;
                    arr['ModifiedDate'] = v.ModifiedDate;
                    arr['UserGUID'] = v.UserGUID;
                    arr['MessageGuID'] = v.MessageGuID;
                    var j = 1;
                    $(res.Data.Users).each(function(key,val){
                        if(i==1){
                            //if(j>1){
                                if(res.Data.Users.length>2){
                                    if(res.Data.Users.length==j+1){
                                        $scope.UsersName += val.FirstName+' & ';
                                    } else {
                                        $scope.UsersName += val.FirstName+', ';
                                    }
                                } else {
                                    if(res.Data.Users.length==j+1){
                                        $scope.UsersName += val.FirstName+' '+val.LastName+' & ';
                                    } else {
                                        $scope.UsersName += val.FirstName+' '+val.LastName+', ';
                                    }
                                }
                            //}
                            j++;
                        }
                        if(val.UserGUID==v.UserGUID){
                            arr['FirstName'] = val.FirstName;
                            arr['LastName'] = val.LastName;
                           // arr['ProfilePicture'] = val.ProfilePicture;
                            if(val.ProfilePicture==base_url+'assets/img/profiles/default-148.png'){
                                arr['ProfilePicture'] = val.ProfilePicture;
                            } else {
                                var profilePicture =  val.ProfilePicture.split('/')
                                profilePictureUpdate = dn+'x'+dn +'/'+ profilePicture[profilePicture.length-1]
                                profilePicture[profilePicture.length-1] = profilePictureUpdate
                                profilePicture = profilePicture.join('/');
                                arr['ProfilePicture'] = profilePicture;
                            }
                        }
                    });
                    i++;
                    messages.push(arr);
                });
                $scope.changeFlagStatus(guid,1);
                $scope.UsersName = $scope.UsersName.substr(0, $scope.UsersName.length-2);
            }
        });
        $scope.messageDetails = messages;
    }

    // Move to Trash
    $scope.moveTrash = function(guid, trashStatus){
        var alertMessage    = "Are you sure you want to delete this message ?";
        var successMessage  = "Message deleted successfully.";
        if(trashStatus==9){
            alertMessage    = "Are you sure you want to move this message to Inbox again ?";
            successMessage  = "Message moved to inbox successfully.";
        }


        alertify.confirm(alertMessage, function (e) {
        if (e) {
                            

        var req = {
                "LoginSessionKey": LoginSessionKey,
                "MessageGuID": guid,
                "MessageReceiverGuID": "",
                "Status": trashStatus
            };
        
        messagingService.ChangeMessageStatus(req).then(function(res){
            $($scope.MszList).each(function(k,v){
                if(guid==$scope.MszList[k]['MessageGuID']){
                    if($('.titleTrash').hasClass('active')){
                        $scope.getMessage('Trash','192');
                    } else {
                        $scope.getMessage('Inbox','192');
                    }
                }
            });
        });
            $scope.newMessageCompose();
            alertify.success(successMessage);
        }
        });
    }

    // Change Flag Status
    $scope.changeFlagStatus = function(guid, flagstatus){
        var req = {
          "LoginSessionKey": LoginSessionKey,
          "MessageGuID": guid,
          "MessageReceiverGuID": "",
          "FlagStatus": flagstatus
        };
        messagingService.MessageFlagStatus(req).then(function(res){
            $($scope.MszList).each(function(k,v){
                if(guid==$scope.MszList[k]['MessageGuID']){
                   if($('.titleTrash').hasClass('active')){
                        $scope.getMessage('Trash','192');
                    } else {
                        $scope.getMessage('Inbox','192');
                    }
                }
            });
        });

    }

    // Send Message
    $scope.sendMessage = function(Subject, Body, PreviousMessageGuID){
        $('#selectedUsers').val('');
        $timeout(function(){ 
            autoCompleteUser();
        },500);

        var Receivers = new Array();
        var dn = '192';
        if(PreviousMessageGuID==''){
            $('.add-user-id').each(function(k){
                var userid = $('.add-user-id:eq('+k+')').attr('id');
                userid = userid.split('-')[1];
                Receivers.push(userid);
            });
        }

        if(PreviousMessageGuID==''){
            PreviousMessageGuID = '0';
        }

        var req = {
          "LoginSessionKey": LoginSessionKey,
          "Subject": Subject,
          "Body": Body,
          "PreviousMessageGuID": PreviousMessageGuID,
          "Receivers" : Receivers
        };
        messagingService.SendMessage(req).then(function(res){
            if(res.ResponseCode==201){
                $('#PageNo').val(1);
                $scope.MszList = [];
                if(res.Data.ProfilePicture==base_url+'assets/img/profiles/default-148.png'){
                    res.Data.ProfilePicture = res.Data.ProfilePicture;
                } else {
                    var profilePicture =  res.Data.ProfilePicture.split('/')
                    profilePictureUpdate = dn+'x'+dn +'/'+ profilePicture[profilePicture.length-1]
                    profilePicture[profilePicture.length-1] = profilePictureUpdate
                    profilePicture = profilePicture.join('/');
                    res.Data.ProfilePicture = profilePicture;
                }

                $scope.messageDetails.push(res.Data);
                $scope.msgBody = '';
                
                $timeout(function(){ 
                    $scope.getMessage('Inbox','192');
                    if($scope.isNewMessage==true){
                        $scope.getMessageDetails(res.Data.MessageGuID,'192');
                    }
                },500);
            } 
            if(res.ResponseCode==511){
                alertify.error(res.Message);
            }
        });

    }

    // Change isNewMessage
    $scope.changeIsNewMessage = function(status){
        if(status==1){
            $scope.isNewMessage = true;
            if($('.add-users').html()==''){
                $('.add-users').html('No Selection');
            }
        } else {
            $scope.isNewMessage = false;
        }
    }

    // New Message Compose
    $scope.newMessageCompose = function(){
        $scope.isNewMessage = true;
        $scope.messageDetails = new Array();
        $scope.msgBody = '';
        $('.message-form-group').show();
        $('.add-users').html('No Selection');
    }

    $scope.textToLink = function (inputText) {
        if(inputText!==undefined){
            var replacedText, replacePattern1, replacePattern2, replacePattern3;

            //URLs starting with http://, https://, or ftp://
            replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            replacedText = inputText.replace(replacePattern1, '<a class="chat-anchor" href="$1" target="_blank">$1</a>');

            //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
            replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            replacedText = replacedText.replace(replacePattern2, '$1<a class="chat-anchor" href="http://$2" target="_blank">$2</a>');

            //Change email addresses to mailto:: links.
            replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
            replacedText = replacedText.replace(replacePattern3, '<a class="chat-anchor" href="mailto:$1">$1</a>');
            
            return replacedText;
        } else {
            return '';
        }
    }


})

$('.defaultScroller').scroll(function(){
    if(parseInt($('.defaultScroller ul').height())-parseInt($('.defaultScroller').scrollTop())=='376'){
        var type = 'Inbox';
        if($('.titleTrash').hasClass('active')){
            type = 'Trash';
        }
        angular.element(document.getElementById('messageSectionCtrl')).scope().getMessage(type,'192');
    }
});



// console.log(data)
// console.log(res.Data)