/*  Controller(s)
 ===================================*/

/**** wardobe Controller ***/
WardApp = angular.module('App').controller('wardrobeCtrl', function ($scope,$rootScope,$http,wardrobeService, tmpJson, $timeout,$window,$q) {

    $rootScope.disablegetWardrobesPagination = false;
    $scope.selectedCategory = '';
    $scope.categoryTitle = '';
    $scope.uploadme = [];
    $scope.filename = '';
    $scope.fileext = '';
    $scope.tempList = [];
    $scope.wardrobeItemsList = [];
    $scope.ItemsList = [];
    $scope.userWardrobes = [];
    
    $scope.editCollectionGuID = '';
    $scope.newItemImages = [];
    $scope.item = {};
    
    $scope.itemSizeData = [];
    $scope.itemColorData = [];
    $scope.countryMasterData = [];
    $scope.uesrWardrobeList = [];
    
    $scope.selectedSection = 9;
    $scope.crop = 'thumbnail';
    $scope.editWardrobeTitle = '';
    $scope.customCategorylistData = {};
    $scope.tags = [];
    $scope.removeCollectionGuID = '';
    $scope.removeCollectionkey = '';
    
    $scope.removeItemGuID = '';
    $scope.removeItemTitle = '';
    $scope.removeItemkey = '';
    $scope.editItemTitle = 'Edit Wardrobe Item';
    $scope.editItemGuID = '';
    $scope.editItemCollectionGuID = '';
    $scope.cameFromEdit = 0;
    $scope.newItemImagesSelected = 0;
    $scope.paginationbusy = false;
    $scope.brandPlaceholder = 'Brand/Designer';
    $scope.hideGoBack = false;
    $scope.UploadSuccess = true;
    
    //stored url information @author: Xingchen Liao
    $scope.reqData = '';
    
    $rootScope.redirectToItemOverview = true;

    $scope.StylemapArticleCount = '';
    
    if ($('#LoginSessionkey').val()!='')
    {
        $scope.LoginSessionKey = $('#LoginSessionKey').val();
    }

    if ($('#UserGUID').val()!='')
    {
        $scope.UserGUID = $('#UserGUID').val();
    }
    
    $rootScope.isWardrobeTabActive = false;


    var reqData = {LoginSessionKey: $scope.LoginSessionKey, UserGuID :$scope.UserGUID };
            
    /*
     * Function Name: getUserWardrobe
     * Description: Called when wardrobe is clicked on the user profile
     */
    $rootScope.getUserWardrobe = function(){
            $rootScope.disablegetWardrobesPagination = false;
            $rootScope.disableFollowFollowingPagination = true;
            $rootScope.disableActivityPagination = true;
            $rootScope.disableArticlePagination = true;

            $('.user-wall-pagecontent').hide();
            $('#user-wall-wardrobe').show();
            //console.log('$rootScope.isWardrobeTabActive'+$rootScope.isWardrobeTabActive);

            
            if($rootScope.isWardrobeTabActive) {
                $("#navigation li").removeClass('selected');
                $("#profileNavigationWardrobe").addClass('selected');
            }
           // $('#navigation').spasticNav();
            
            $(".FollowFollowingUsers").removeClass("active");

    }
    
    /*
     * Function Name: removeItemCnfrm
     * Description: Opens confirm box when removing an item
     */
    $scope.removeItemCnfrm = function (ItemGuID,Title,key) {

        $scope.removeItemGuID = ItemGuID;
        $scope.removeItemTitle = Title;
        $scope.removeItemkey = key;
        
        openPopDiv('removedarticle');
        
    }; 
    
    /*
     * Function Name: createNewItem
     * Description: Opens create item popup
     */
    $scope.createNewItem = function(){
        openPopDiv('createWardraobe');
        $(".dropdown .dropdowncontent").hide();
    }
    
    /*
     * Function Name: removeItem
     * Description: Calls the remove item webservice to delete the item
     */
    $scope.removeItem = function () {
        $('.loader-signup').show();
        $scope.LoginSessionKey = '';
        if ($('#LoginSessionkey').val()!='')
        {
            $scope.LoginSessionKey = $('#LoginSessionKey').val();
        }
        
        var reqData = {LoginSessionKey: $scope.LoginSessionKey, ItemGuID :$scope.removeItemGuID};
        wardrobeService.delete_item(reqData).then(function (response) {
            //$scope.wardrobeItems.splice( $scope.removeItemkey , 1);
            alertify.success(response.Message);
            closePopDiv('removedarticle');

            //window.location.reload();

            $scope.userWardrobes = [];
            $scope.item = {};
            $scope.tags = [];
            $scope.newItemImages = [];

            $scope.getWardrobes(1);
            $('.loader-signup').hide();

            
        }), function (error) {
        }
        $('.loader-signup').hide();
        
    }; 
    
   
    /*
     * Function Name: removeWardrobeCnfrm
     * Description: Opens the remove wardrobe confirm box
     */
    $scope.removeWardrobeCnfrm = function (CollectionGuID,CollectionName,key) {
        
        $scope.removeCollectionGuID = CollectionGuID;
        $scope.removeCollectionName = CollectionName;
        $scope.removeCollectionkey = key;
        
        openPopDiv('removecategory');
        
    }; 
    
    /*
     * Function Name: removeWardrobe
     * Description: Calls the remove wardrobe webservice
     */
    $scope.removeWardrobe = function () {
        $('.loader-signup').show();
        $scope.LoginSessionKey = '';
        if ($('#LoginSessionkey').val()!='')
        {
            $scope.LoginSessionKey = $('#LoginSessionKey').val();
        }
        
        var reqData = {LoginSessionKey: $scope.LoginSessionKey, CollectionGuID :$scope.removeCollectionGuID};
        wardrobeService.delete_collection(reqData).then(function (response) {
            $scope.userWardrobes.splice( $scope.removeCollectionkey , 1);
            alertify.success(response.Message);
            closePopDiv('removecategory');
            
        }), function (error) {
        }
        $('.loader-signup').hide();
        
    }; 
    
    
    
    /*
     * Function Name: loadTags
     * Description: Function that calls the tags master service
     */
    $scope.loadTags = function (query) {
        return $http.get(base_url + 'api/common/styleTagsMaster/'+query); 
    }; 
    
    /*
     * Function Name: getWardrobeList
     * Description: Function gets all the user wardrobes
     */
    $scope.getWardrobeList = function(){
        
        var reqData = [];
        wardrobeService.get_wardrobeList(reqData).then(function (response) {
            $scope.categorylistData = response.Data;
            
            
        }), function (error) {
        }
        
    }
    
    /*
     * Function Name: getItemCategoryList
     * Description: Function that gets the item master category
     */
    $scope.getItemCategoryList = function(){
        if (!$rootScope.itemCategoryListData || !$rootScope.itemCategoryListData.length) {
            var reqData = [];
            wardrobeService.get_itemCategoryList(reqData).then(function (response) {
                console.log('getItemCategoryList', response);
                $rootScope.itemCategoryListData = response.Data && response.Data.map(function(category) {
                    category.ShortName = category.Name.replace(/^(Men|Women)\s+>\s+/, '');
                    return category;
                });
            }, function (error) {
            });
        }
        
    }
    
    /*
     * Function Name: setSelectedCategory
     * Description: Sets the category name on the add wardrobe screen
     */
    $scope.setSelectedCategory = function(guid, categoryName){
        $('.choose-productitems > li').removeClass('selected-porduct-items');
        $scope.selectedCategory = guid;
        $scope.categoryTitle = categoryName;
        
    }
    
    $scope.addEditWardrobeSubmitted = 0;
    
    /*
     * Function Name: addEditWardrobe
     * Description: Save the new / edit existing wardrobe
     */
    $scope.addEditWardrobe = function(editCollectionGuID){
        if($scope.categoryTitle!='' && ($scope.selectedCategory!="" || $scope.uploadme!="")){
            if($scope.uploadme!="" && $.inArray($scope.fileext,['image/jpeg','image/jpg','image/png'])==-1){
                alert('allowed image format .jpg, .jpeg, .png');
                return;
            }
             $scope.addEditWardrobeSubmitted = 0;
            
            closePopDiv('editnewwardrob');
            openPopDiv('addnwardrobe2');
            
            $scope.LoginSessionKey = '';
            if ($('#LoginSessionkey').val()!='')
            {
                $scope.LoginSessionKey = $('#LoginSessionKey').val();
            }
            
            $scope.tempList = [];

            if(angular.isUndefined(editCollectionGuID)){
                var reqData = {LoginSessionKey: $scope.LoginSessionKey}
                wardrobeService.get_ItemsList(reqData).then(function (response) {
                    $scope.ItemsList = response.Data;
                    $scope.wardrobeItemsList = [];
                }), function (error) {
                }
            }else{
                var reqData = {LoginSessionKey: $scope.LoginSessionKey, CollectionGuID :editCollectionGuID};
                wardrobeService.get_CollectionAndRemainingItemsList(reqData).then(function (response) {
                    $scope.ItemsList = response.Data.itemlist;
                    $scope.wardrobeItemsList = response.Data.wardrobeitemlist;
                }), function (error) {
                }
            }
            
        }else{
            $scope.addEditWardrobeSubmitted = 1;
           /*data invalid*/ 
           return;
        }
        
    }
    
    /*
     * Function Name: setUnsetForWardrobeItemsList
     * Description: Adding / removing items from wardrobe into a temporary list for checking
     */
    $scope.setUnsetForWardrobeItemsList = function(itemGuid){
        
        var index = $scope.tempList.indexOf(itemGuid);
        
        if(index==-1)
            $scope.tempList.push(itemGuid);
        else{
            $scope.tempList.splice(index, 1);     
        }
    }
    
    /*
     * Function Name: addSelectedInWardrobeItemsList
     * Description: Adding items from wardrobe
     */
    $scope.addSelectedInWardrobeItemsList = function(){
        
        $scope.tempItemsList = $scope.ItemsList;
        $scope.tempwardrobeItemsList = $scope.wardrobeItemsList;
        

        if($scope.tempList.length>0){
            
            $.each($scope.tempList, function(tempListKey) {
                keepGoing = true;
                $.each($scope.tempItemsList, function(itemListKey) {
                    
                    if(keepGoing && $scope.tempList[tempListKey]==$scope.tempItemsList[itemListKey].ItemGuID){
                        $scope.tempwardrobeItemsList.push($scope.tempItemsList[itemListKey]);
                        $scope.tempItemsList.splice(itemListKey, 1);   
                        $scope.tempList.splice(tempListKey, 1);
                        keepGoing = false;
                    }
                    
                });

            });
            
            $scope.ItemsList = $scope.tempItemsList;
            $scope.wardrobeItemsList = $scope.tempwardrobeItemsList;
            
            if($scope.tempList.length>0)
                $scope.addSelectedInWardrobeItemsList();
        }
        
    }
    
    /*
     * Function Name: removeSelectedFromWardrobeItemsList
     * Description: Removing items from wardrobe
     */
    $scope.removeSelectedFromWardrobeItemsList = function(itemGuid){
        keepGoing = true;
        $.each($scope.wardrobeItemsList, function(wItemListKey) {

            if(keepGoing && $scope.wardrobeItemsList[wItemListKey].ItemGuID==itemGuid){
                $scope.ItemsList.push($scope.wardrobeItemsList[wItemListKey]);
                $scope.wardrobeItemsList.splice(wItemListKey, 1);   
                keepGoing = false;
            }
            
        })
        
    }
    
    /*
     * Function Name: saveWardrobeDetails
     * Description: Save wardrobe details
     */
    $scope.saveWardrobeDetails = function(editCollectionGuID){
        
        //if($scope.wardrobeItemsList.length>0 && $scope.categoryTitle!='' && ($scope.selectedCategory!="" || $scope.uploadme!="")){
        if( $scope.categoryTitle!='' && ($scope.selectedCategory!="" || $scope.uploadme!="")){
            $('.loader-signup').show();
            if($scope.uploadme!="" && $.inArray($scope.fileext,['image/jpeg','image/jpg','image/png'])==-1){
                alert('allowed image format .jpg, .jpeg, .png');
                return;
            }
            
            $scope.LoginSessionKey = '';
            if ($('#LoginSessionkey').val()!='')
            {
                $scope.LoginSessionKey = $('#LoginSessionKey').val();
            }
            
            $scope.items = [];
            $.each($scope.wardrobeItemsList, function(wItemListKey) {
                $scope.items.push($scope.wardrobeItemsList[wItemListKey].ItemGuID);
            });
            
            
            if(angular.isUndefined(editCollectionGuID)){
                var reqData = {LoginSessionKey: $scope.LoginSessionKey,CollectionName:$scope.categoryTitle,CategoryMasterGuID:$scope.selectedCategory,Icon:$scope.filename,Items:$scope.items,uploadfile:$scope.uploadme};

                wardrobeService.save_wardrobeDetails(reqData).then(function (response) {
                    $scope.userWardrobes = [];
                    $scope.getWardrobes(1);
                    alertify.success(response.Message);
                    $('.loader-signup').hide();
                }), function (error) {
                    $('.loader-signup').hide();
                }
            }else{
                var reqData = {LoginSessionKey: $scope.LoginSessionKey, CollectionGuID :editCollectionGuID,CollectionName:$scope.categoryTitle,CategoryMasterGuID:$scope.selectedCategory,Icon:$scope.filename,Items:$scope.items,uploadfile:$scope.uploadme};
            
                wardrobeService.update_wardrobeDetails(reqData).then(function (response) {
                    $scope.userWardrobes = [];
                    $scope.getWardrobes(1);
                    alertify.success(response.Message);
                    $('.loader-signup').hide();
                }), function (error) {
                        $('.loader-signup').hide();
                }
            }
            

           
           closePopDiv('addnwardrobe2');
            
            
        }else{
           /*data invalid*/ 
           return;
        }
        
    }
    
    /*
     * Function Name: getWardrobes
     * Description: Gettting all user wardrobes
     */
    $scope.getWardrobes = function(pageNo){
        $('.create-item-dropdown-profile').show();
        $('.WardrobeNewTooltip').show();
        $('.create-article-dropdown-profile').hide();
        $('.load-more').show(); 
        //$('.loader-signup').show();
        $scope.paginationbusy = true;
        $scope.LoginSessionKey = '';
        $rootScope.isWardrobeTabActive = true;
        $rootScope.isArticleTabActive = false;
        $rootScope.isActivityTabActive = false;
        
        if ($('#LoginSessionkey').val()!='')
        {
            $scope.LoginSessionKey = $('#LoginSessionKey').val();
        }
        
        if ($('#UserGUID').val()!='')
        {
            $scope.UserGUID = $('#UserGUID').val();
        }
        
        $scope.PageNo = pageNo;
        
        var reqData = {LoginSessionKey: $scope.LoginSessionKey, UserGuID :$scope.UserGUID, PageNo: $scope.PageNo, };
        
        wardrobeService.get_userWardrobes(reqData).then(function (response) {
            $scope.privacyMessage = '';
            if(response.ResponseCode==200){
                if(pageNo == 1){
                    $scope.userWardrobes = [];
                    $rootScope.getUserWardrobe();
                    $('.user-help-region.profile-help').slideDown(800);
                    $timeout(function () {
                        $('.tipsy-create-new').fadeIn(500);
                    }, 1200);

                }

                $.each(response.Data, function(key) {
                    $scope.userWardrobes.push(response.Data[key]);
                });
                $scope.PageNo++;
                //$('.loader-signup').hide();
                $scope.paginationbusy = false;
                if(pageNo == 1){
                    $scope.getWardrobes(2);
                }
            }else if(response.ResponseCode==203){
                $scope.privacyMessage = response.Message;
                
                 if(pageNo == 1){
                    $scope.userWardrobes = [];
                    $rootScope.getUserWardrobe();
                }
                //$('.loader-signup').hide();
                $scope.paginationbusy = false;
                
            }
                    
            }), function (error) {
            //$('.loader-signup').hide();
        }
        
    }
    
    /*
     * Function Name: editWardrobe
     * Description: Gettting the current wardrobe for editing
     */
    $scope.editWardrobe = function(CollectionGuID){
        $(".dropdown .dropdowncontent").hide();
        $scope.customCategorylistData = {};
        $scope.editCollectionGuID = CollectionGuID;
        $scope.uploadme = [];
        $scope.filename = '';
        $scope.fileext = '';
        if(!angular.isUndefined($scope.editCollectionGuID)){
            $scope.editWardrobeTitle = 'Edit Wardrobe';
            keepGoing = true;
            $.each($scope.userWardrobes, function(key) {

                if(keepGoing && $scope.userWardrobes[key].CollectionGuID==CollectionGuID){
                    $scope.categoryTitle = $scope.userWardrobes[key].CollectionName;
                    $scope.selectedCategory = $scope.userWardrobes[key].CategoryMasterGuID;
                    if($scope.userWardrobes[key].CategoryMasterStatus==1){
                        var reqData = {CategoryMasterGuID:$scope.selectedCategory};
                        wardrobeService.get_categoryMasterDetail(reqData).then(function (response) {
                            $scope.customCategorylistData = response.Data;

                        }), function (error) {
                        }
                    }
                    $('.choose-productitems > li').removeClass('selected-porduct-items');
                    $('#'+$scope.selectedCategory).addClass('selected-porduct-items');
                    
                    keepGoing = false;
                }
            
            })
        }else{
            $scope.editWardrobeTitle = 'Create Wardrobe';
            $scope.categoryTitle = '';
            $scope.selectedCategory = '';
            $('.choose-productitems > li').removeClass('selected-porduct-items');
        }
        openPopDiv('editnewwardrob');
    }
    
    /*
     * Function Name: clearOldData
     * Description: Clearing old data of popup
     */
    $scope.clearOldData = function(){
        $scope.item = {};
    }
    
    /*
     * Function Name: initFileUpload
     * Description: Initializing file uploader for image uploading
     */
    $scope.initFileUpload = function (){
        $multiple = true;
        $maxSizeInBytes = 1024 * 1024 * 10;
        var oldItemLength = $scope.newItemImages.length;
        //console.log(oldItemLength);
        $allowedExtensions = ['jpg','jpeg', 'gif', 'png'];
        $thumbSize = {"220":true,"71":true};
        var countImages = 0;
        var errorHandler = function (event, id, fileName, reason) {
        };
        var thumbnailuploader = new qq.FineUploader({
            multiple: $multiple,
            element: $('#thumbnail-fine-uploader')[0],
            request: {
                endpoint: base_url + 'api/common/file_upload?selectedSection=' + $scope.selectedSection+ '&crop=' +$scope.crop+'&thumbnail_size=' + JSON.stringify($thumbSize),
                customHeaders: {
                    "Accept-Language": accept_language
                },
            },
            validation: {
                allowedExtensions: $allowedExtensions,
                sizeLimit: $maxSizeInBytes

            },
            callbacks: {
                onError: errorHandler,
                onUpload: function(id, fileName) {
                    $('.loader-signup').show();
                    $scope.newimageData = {
                        'Imagename': '',
                        'Imageurl': '',
                        'Thumburl':'',
                        //'slideImg': $data.thumb_url+'160x190/'+$data.image_name,
                        'image_size': '',
                        'thumbSizeTotal': '',
                        'isChecked':1
                    }
                    var newId = oldItemLength + id;
                    $scope.newItemImages[newId] = $scope.newimageData;
                    countImages++;
                },
                onComplete: function (id, fileName, responseJSON) {
                    //console.log(responseJSON);
                    countImages--;
                    if (responseJSON.Data.success == 1) {
                        setTimeout(function () {
                            if(countImages==0){
                                $('.loader-signup').hide();
                                $scope.finishMediaView();
                            }
                        }, 2000);
                        
                        var undef = undefined;
                        var newId = oldItemLength + id;
                        $scope.setMediaView(responseJSON.Data,undef,newId);
                            
                    }
                },
                onProgress: function (id, name, sent, total) {
                   $('.loader-signup').show();
                },
                onCancel: function (id) {
                   $('.loader-signup').hide();
                }
            }
        });


    }
    
    

    /*
     * Function Name: editItemNexStep
     * Description: Move to next step for item name and other details entering
     */
    $scope.editItemNexStep = function(fromWeb){
        $flag = 0;
        $scope.newItemImagesSelected = 0;
        $.each($scope.newItemImages, function(key) {
            if($scope.newItemImages[key].isChecked==1){
                $flag = 1;
                $scope.newItemImagesSelected++;
            }
        });
        console.log("EachBlank");
        console.log($scope.newItemImages);
//        return;
     
        
        if($scope.newItemImages.length>0 && $flag==1){
            if($scope.cameFromEdit==1){
                $scope.getUesrWardrobeList();
                openPopDiv('edititsmpopup');
                closePopDiv('localstorage');
            }else{
                $scope.getItemSize();
                $scope.getItemColor();
                $scope.getCountryMasterData();
                $scope.getUesrWardrobeList();
                $scope.editItemGuID = '';     
                $scope.editItemCollectionGuID = '';
                $scope.editItemTitle = 'Create Wardrobe Item';
                if(!$scope.item.fromWeb){
                    $scope.item = {};
                }
                openPopDiv('edititsmpopup');
                closePopDiv('localstorage');
            }
            $timeout(function () {
                var forceInit = false;
                if(true){
                    forceInit = true;
                    slider = uploadslider($scope.newItemImagesSelected, false);
                    slider.destroySlider();
                    updatebxSliderCreated(false);
                }

                slider = uploadslider($scope.newItemImagesSelected, forceInit);
                slider.reloadSlider();
            }, 200); 

        }
        
        
        

        // ItemUrl = $scope.itemUrl;
        // $scope.reqData = {LoginSessionKey: $scope.LoginSessionKey,ItemUrl:ItemUrl, signal:2};
        // wardrobeService.get_ItemfromWeb($scope.reqData).then(function (response) {
        //     $scope.item.Source = ItemUrl;
        //     $scope.item.fromWeb = true;
        //     $.each(response.Data.Images, function(key) {
        //         $scope.insertImages(response.Data.Images[key],true, key);
        //     })
        //     console.log("Upload finish ");
        // }), function (error) { 

        // }
        
    }
    
    
    /*
     * Function Name: clearOldData
     * Description: Clear old data of popup
     */
    $scope.clearOldData = function(){
        $scope.cameFromEdit=0;
    }
    
    /*
     * Function Name: uploadWardrobeItem
     * Description: Opens the create item popup
     */
    $scope.uploadWardrobeItem = function(){
        $scope.item = {};
        $scope.cameFromEdit=0;
        $scope.hideGoBack=false;
        //$scope.initFileUpload();
        openPopDiv('localstorage');
        closePopDiv('createWardraobe');
    }
    
    /*
     * Function Name: removeItemImg
     * Description: Function that removes the item image from slider
     */
    $scope.removeItemImg = function(index){
        $scope.newItemImages.splice(index, 1);  
        $scope.newItemImagesSelected--;

        $timeout(function() {
           var forceInit = false;
                if(true){
                    forceInit = true;
                    slider = uploadslider($scope.newItemImagesSelected, false);
                    slider.destroySlider();
                    updatebxSliderCreated(false);
                }

                slider = uploadslider($scope.newItemImagesSelected, forceInit);
                slider.reloadSlider();

        },200); 
        //$scope.$apply(); 
          
        
    }
    
    /*
     * Function Name: getItemSize
     * Description: API to get item size
     */
    $scope.getItemSize = function(){
        if ($scope.itemSizeData.length == 0) {
            var reqData = [];
            wardrobeService.get_itemSize(reqData).then(function (response) {
                   $scope.itemSizeData = response.Data;
                }), function (error) {
            }
        }
        
    }

    $scope.loadMasterSizes = function($query) {
        var promise;
        if ($scope.itemSizeData.length) {
            var deferred = $q.defer();
            deferred.resolve($scope.itemSizeData);
            promise = deferred.promise;
        } else {
            promise = wardrobeService.get_itemSize([]).then(function(response) {
                $scope.itemSizeData = response.Data;
                return response.Data;
            });
        }

        return promise.then(function(sizes) {
            $query = $query.toLowerCase();
            var matchWordPrefix = new RegExp('(^|\\W)' + $query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
            return sizes.filter(function(size) {
                return matchWordPrefix.test(size.Name);
            });
        });
    }

    $scope.loadSuggestions = function(scope, expression, keyProperty, $query) {
        var suggestions = scope.$eval(expression);
        var deferred = $q.defer();
        if (suggestions && suggestions.length) {
            deferred.resolve(suggestions);
        } else {
            var unbind = scope.$watch(expression, function(newVal, oldVal) {
                if (newVal != oldVal) {
                    deferred.resolve(newVal);
                    unbind();
                }
            });
        }

        return deferred.promise.then(function(suggestions) {
            $query = $query.toLowerCase();
            var matchWordPrefix = new RegExp('(^|\\W)' + $query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
            return suggestions.filter(function(suggestion) {
                return matchWordPrefix.test(suggestion[keyProperty]);
            });
        });
    }
    
    /*
     * Function Name: getItemColor
     * Description: API to get item color
     */
    $scope.getItemColor = function(){
        if ($scope.itemColorData.length == 0) {
            var reqData = [];
            wardrobeService.get_itemColor(reqData).then(function (response) {
                   $scope.itemColorData = response.Data;
                }), function (error) {
            }
        }
       
    }
    
    /*
     * Function Name: getCountryMasterData
     * Description: Getting the list of Made In
     */
    $scope.getCountryMasterData = function(){
        if ($scope.countryMasterData.length == 0) {
            var reqData = [];
            wardrobeService.get_countries(reqData).then(function (response) {
                $scope.countryMasterData = response.Data;
                $.each($scope.countryMasterData, function(key) {
                    $scope.countryMasterData[key].country_name = 'Made in '+$scope.countryMasterData[key].country_name;
                });
            }), function (error) {
            }
        }
       
    }
    
    /*
     * Function Name: getUesrWardrobeList
     * Description: Get the user wardrobes
     */
    $scope.getUesrWardrobeList = function(){
        //if ($scope.uesrWardrobeList.length == 0) {
            wardrobeService.get_uesrWardrobeList(reqData).then(function (response) {
                $scope.uesrWardrobeList = response.Data;
            }), function (error) {
            }
        //}
       
    }
    
    
    
    
    /*
     * Function Name: setMediaView
     * Description: set the new item images for slider
     */
    $scope.setMediaView = function($data,fromWeb,id){

        $scope.newimageData = {
            'Imagename': $data.image_name,
            'Imageurl': $data.image_url,
            'Thumburl': fromWeb ? $data.image_url : ($data.thumb_url+'190x160/'+$data.image_name),
            //'slideImg': $data.thumb_url+'160x190/'+$data.image_name,
            'Size': $data.size,
            'image_size': $data.size,
            'thumbSizeTotal': $data.thumbSizeTotal,
            'isChecked':1
        }
        console.log("SetMediaView, imageurl = ");
        console.log($data.image_url);
        
        var finalImages = $scope.newItemImages;
        if(id == undefined) {
            finalImages.push($scope.newimageData);//console.log('$rootScope.newArticleImages'+JSON.stringify($rootScope.newArticleImages));
        } else {
            finalImages[id] = $scope.newimageData;
        }
        $scope.newItemImages = finalImages;
        /*if(fromWeb==undefined){
            $scope.$apply();    
        }*/
        

    }
    
    $scope.insertImages = function($data,fromWeb,id){
        if ($scope.newItemImages[id]) {
            $scope.newItemImages[id].Imagename = $data.image_name;
            $scope.newItemImages[id].Imageurl = $data.image_url;
            $scope.newItemImages[id].image_size = $data.size;
            $scope.newItemImages[id].thumbSizeTotal = $data.thumbSizeTotal;
            console.log($scope.newItemImages[id]);
        }
    }

    /*
     * Function Name: finishMediaView
     * Description: finalizing the new item images
     */
    $scope.finishMediaView = function(fromWeb) {
        var newFinalImages = [];
        var finalImages = $scope.newItemImages;
        for (var key in finalImages) {
            //console.log(finalImages[key]);
            if(finalImages[key] != undefined) {
                newFinalImages.push(finalImages[key]);
            }
        }
        //console.log(newFinalImages);
        //console.log(finalImages);
        $scope.newItemImages = newFinalImages;
        if(fromWeb==undefined){
            $scope.$apply();    
        }
    }
    
    
    /*
     * Function Name: checkUncheckMedia
     * Description: check uncheck uploaded media for selection
     */
    $scope.checkUncheckMedia = function(index){
        
        if($scope.newItemImages[index].isChecked==1){
            $scope.newItemImages[index].isChecked = 0;
        }else{
            $scope.newItemImages[index].isChecked = 1;
        }
        
       
    }
    
    /*
     * Function Name: editWardrobeItem
     * Description: save edited item
     */
    $scope.editWardrobeItem = function($validFlag,editWardrobeItemForm){
        
        var reqData = {LoginSessionKey: $scope.LoginSessionKey, UserGuID :$scope.UserGUID, itemUrl: $scope.itemUrl };
        $scope.submitted=true;
        if(!$validFlag || $scope.newItemImages.length<=0){
            return;
        }
        if(editWardrobeItemForm){
            editWardrobeItemForm.$setPristine();
        }
        $scope.submitted=false;
        
        $('.loader-signup').show();
        $scope.item.Images = [];
        $.each($scope.newItemImages, function(key) {
            
            if($scope.newItemImages[key].isChecked==1){
                $scope.item.Images.push($scope.newItemImages[key]);
            }
            
        });
        
        $scope.LoginSessionKey = '';
        if ($('#LoginSessionkey').val()!='')
        {
            $scope.LoginSessionKey = $('#LoginSessionKey').val();
        }
        
        $scope.item.LoginSessionKey = $scope.LoginSessionKey;
        
        if ($('#latitude').val()!='')
        {
            $scope.item.Latitude = $('#latitude').val();
        }
        
        if ($('#longitude').val()!='')
        {
            $scope.item.Longitude = $('#longitude').val();
        }
        
        if ($('#locations').val()!='')
        {
            $scope.item.Location = $('#locations').val();
        }
        
        $scope.item.StyleTags = [];
        $.each($scope.tags, function(key) {
            
            $scope.item.StyleTags.push($scope.tags[key].text);
        });

        /*
        if(typeof $scope.item.CategoryMasterGuID === 'object')
        $scope.item.CategoryMasterGuID = $scope.item.CategoryMasterGuID.ItemMasterCategoryGuID;
        if(typeof $scope.item.CollectionGuID === 'object')
        $scope.item.CollectionGuID = $scope.item.CollectionGuID.CollectionGuID;
        if(typeof $scope.item.ColorID === 'object')
        $scope.item.ColorID = $scope.item.ColorID.ColorID;
        if(typeof $scope.item.CountryID === 'object')
        $scope.item.CountryID = $scope.item.CountryID.country_id;
        if(typeof $scope.item.SizeID === 'object')
        $scope.item.SizeID = $scope.item.SizeID.SizeID;
*/
        if($scope.editItemGuID!=''){
            $scope.item.ItemGuID = $scope.editItemGuID;
            /*edit*/
            $.each($scope.item, function(key,val) {
                reqData[key] = val;
            })
            if($scope.item.Categories)
                reqData.CategoryMasterGuID = $scope.item.Categories.map(function(category) {
                    return category.ItemMasterCategoryGuID;
                });
            
            if($scope.item.CollectionGuID)
                reqData.CollectionGuID = $scope.item.CollectionGuID.CollectionGuID;
            
            if($scope.item.Colors)
                reqData.ColorID = $scope.item.Colors.map(function(color) {
                    return color.ColorID;
                });
            
            if($scope.item.CountryID)
                reqData.CountryID = $scope.item.CountryID.country_id;
            
            if($scope.item.Sizes) {
                reqData.SizeID = $scope.item.Sizes.map(function(size) {
                    return size.Name;
                });
            } 

            reqData.StockStatus = $scope.item.InStock ? 1 : 0;

            if ( $scope.item.InStock && $scope.item.OnSale == 1)
                reqData.StockStatus = 3;
            
            wardrobeService.edititem(reqData).then(function (response) {
                $(".commonDescription").height(100);
                if(response.ResponseCode==200){
                    alertify.success(response.Message);
                    setTimeout(function () {
                        //window.location.reload();
                        $scope.userWardrobes = [];
                        $scope.item = {};
                        $scope.tags = [];
                        $scope.newItemImages = [];
                        
                        $scope.getWardrobes(1);
                        closePopDiv('edititsmpopup');
                        $('.loader-signup').hide();
                        
                    }, 2000);

                    $timeout(function() {
                       var forceInit = false;
                        if(true){
                            forceInit = true;
                            slider = uploadslider($scope.newItemImagesSelected, false);
                            slider.destroySlider();
                            updatebxSliderCreated(false);
                        }

                     },200);
                }
                else if(response.ResponseCode==512){
                    $('.loader-signup').hide();
                    closePopDiv('edititsmpopup');
                    alertify.confirm(response.Message + 'You will be redirected to existing Item in 15 seconds.')
                            .set('basic', true)
                            .set('labels',{ok:'Redirect', cancel:'Cancel'})
                            .set('oncancel', function(closeEvent){
                                openPopDiv('edititsmpopup');
                            })
                            .set('onok', function(closeEvent){ 
                                /*temp code to show item detail page*/
                                var brandItemName = response.Data.Title
        
                                if(response.Data.Brand !== ""){
                                    brandItemName = response.Data.Brand + ' ' +brandItemName;
                                }

                                brandItemName = brandItemName.replace(/ /g,"-");
                                brandItemName = brandItemName.replace(/[^a-zA-Z0-9-_]+/ig,'');
                                brandItemName = angular.lowercase(brandItemName);

                                $window.open(site_url+'item/'+brandItemName+'/'+response.Data.ItemGuID, '_blank');

                                /*end temp code to show item detail page*/

                                openPopDiv('edititsmpopup');

                            } ).autoOk(15); 


                }
                else{
                    alertify.error(response.Message);
                    $('.loader-signup').hide();
                }

            }), function (error) {
                $('.loader-signup').hide();
            }
        }else{
            /*add*/
             $.each($scope.item, function(key,val) {
                reqData[key] = val;
            })
            if($scope.item.Categories)
                reqData.CategoryMasterGuID = $scope.item.Categories.map(function(category) {
                    return category.ItemMasterCategoryGuID;
                });
            
            if($scope.item.CollectionGuID)
                reqData.CollectionGuID = $scope.item.CollectionGuID.CollectionGuID;
            
            if($scope.item.Colors)
                reqData.ColorID = $scope.item.Colors.map(function(color) {
                    return color.ColorID;
                });
            
            if($scope.item.CountryID)
                reqData.CountryID = $scope.item.CountryID.country_id;
            
            if($scope.item.Sizes)
                reqData.SizeID = $scope.item.Sizes.map(function(size) {
                    return size.Name;
                });

            console.log("size printed in controller");
            console.log(reqData.SizeID);

            reqData.StockStatus = $scope.item.InStock ? 1 : 0;

            if ( $scope.item.InStock && $scope.item.OnSale == 1)
                reqData.StockStatus = 3;

//            console.log("CONSOLE");
//            console.log(reqData.Images);return;
//            if (reqData.Images[0].Imageurl == null) {
//              console.log("empty");
//              return;
//            }

                wardrobeService.additem(reqData).then(function (response) {
                    if(response.ResponseCode==200){
                        alertify.success(response.Message);
                        setTimeout(function () {
                            //window.location.reload();
                            $scope.userWardrobes = [];
                            $scope.item = {};
                            $scope.tags = [];
                            $scope.newItemImages = [];
                            
                            var brandItemName = response.Data.Title

                            if(response.Data.Brand !== ""){
                                brandItemName = response.Data.Brand + ' ' +brandItemName;
                            }

                            brandItemName = brandItemName.replace(/ /g,"-");
                            brandItemName = brandItemName.replace(/[^a-zA-Z0-9-_]+/ig,'');
                            brandItemName = angular.lowercase(brandItemName);
                            if($rootScope.redirectToItemOverview) {
                                window.location = site_url+'item/'+brandItemName+'/'+response.Data.ItemGuID
                            }
                            $rootScope.redirectToItemOverview = true;
                            $scope.getWardrobes(1);
                            closePopDiv('edititsmpopup');
                            $('.loader-signup').hide();
                        }, 2000);

                        $timeout(function() {
                           var forceInit = false;
                            if(true){
                                forceInit = true;
                                slider = uploadslider($scope.newItemImagesSelected, false);
                                slider.destroySlider();
                                updatebxSliderCreated(false);
                            }

                         },200);
                    }
                    else if(response.ResponseCode==512){
                        $('.loader-signup').hide();
                        closePopDiv('edititsmpopup');
                        alertify.confirm(response.Message + 'You will be redirected to existing Item in 15 seconds.')
                                .set('basic', true)
                                .set('labels',{ok:'Redirect', cancel:'Cancel'})
                                .set('oncancel', function(closeEvent){
                                    openPopDiv('edititsmpopup');
                                })
                                .set('onok', function(closeEvent){ 
                                    /*temp code to show item detail page*/
                                    var brandItemName = response.Data.Title
            
                                    if(response.Data.Brand !== ""){
                                        brandItemName = response.Data.Brand + ' ' +brandItemName;
                                    }

                                    brandItemName = brandItemName.replace(/ /g,"-");
                                    brandItemName = brandItemName.replace(/[^a-zA-Z0-9-_]+/ig,'');
                                    brandItemName = angular.lowercase(brandItemName);

                                    $window.open(site_url+'item/'+brandItemName+'/'+response.Data.ItemGuID, '_blank');

                                    /*end temp code to show item detail page*/

                                    openPopDiv('edititsmpopup');

                                } ).autoOk(15); 


                    }
                    else{
                        console.log("ERROR 500\n");
                        console.log(response.Debug);
                        alertify.error(response.Message);
                        $('.loader-signup').hide();
                    }
                    
                }), function (error) {
                    $('.loader-signup').hide();
                }         

            
            
        }
        
        

       
        
        //closePopDiv('edititsmpopup');
    }
    
    /*
     * Function Name: UpdateItemImages
     * Description: clicking on add more images button for item
     */
    $scope.UpdateItemImages = function(){
        $scope.hideGoBack = true;
        openPopDiv('localstorage');
        closePopDiv('edititsmpopup');

        $timeout(function() {
               var forceInit = false;
                if(true){
                    forceInit = true;
                    slider = uploadslider($scope.newItemImagesSelected, false);
                    slider.destroySlider();
                    updatebxSliderCreated(false);
                }

             },200);
    }
    
    /*
     * Function Name: editItem
     * Description: open the edit item popup
     */
    $scope.editItem = function(ItemGuID, collectionGuID){
        $('.loader-signup').show();   
        $scope.editItemTitle = 'Edit Wardrobe Item';
        $scope.editItemGuID = ItemGuID;
        $scope.editItemCollectionGuID = collectionGuID;
        $scope.getItemSize();
        $scope.getItemColor();
        $scope.getCountryMasterData();
        $scope.getUesrWardrobeList();
        $scope.cameFromEdit = 1;
        $scope.newItemImagesSelected = 0;
        
        $scope.LoginSessionKey = '';
        if ($('#LoginSessionkey').val()!='')
        {
            $scope.LoginSessionKey = $('#LoginSessionKey').val();
        }
        
        
        var reqData = {LoginSessionKey: $scope.LoginSessionKey,ItemGuID:ItemGuID, CollectionGuID: collectionGuID};
        
        wardrobeService.get_itemDetail(reqData).then(function (response) {
            $scope.item = {};
            $scope.tags = [];
            $scope.newItemImages = [];
            
            $scope.item.Title = response.Data.Title;
            
            /*set images*/
            $.each(response.Data.Images, function(key) {
                var image = angular.copy(response.Data.Images[key]);
                image.Imagename = image.ImageName;
                image.Imageurl = image.ImageUrl;
                image.image_size = image.Size;
                image.isChecked = 1;
                $scope.newimageData = image; // Why do we have to set $scope.newimageData?
                $scope.newItemImagesSelected++;
                $scope.newItemImages.push($scope.newimageData);

            });
            $scope.initFileUpload();
            
            $scope.item.Brand = response.Data.Brand;
            
            if(response.Data.Brand!="")
                $scope.brandPlaceholder = response.Data.Brand;
            
            
            $scope.item.Price = response.Data.Price;
            if (response.Data.ColorID) {
                $scope.item.ColorID = { ColorID: response.Data.ColorID };
                $scope.item.Colors = response.Data.ColorID.split(',').map(function(colorID) {
                    return { ColorID: colorID };
                });
            }
            
            $scope.item.CountryID = {'country_id':response.Data.CountryID,'country_name':''};
            $scope.item.Description = response.Data.Description;
            if (response.Data.CategoryMasterGuID) {
                $scope.item.CategoryMasterGuID = response.Data.CategoryMasterGuID;
                $scope.item.Categories = response.Data.CategoryMasterGuID.split(',').map(function(categoryGuID) {
                    return { ItemMasterCategoryGuID: categoryGuID };
                });
            }
            if (response.Data.SizeID) {
                $scope.item.SizeID = response.Data.SizeID;
                $scope.item.Sizes = response.Data.SizeID.split(',').map(function(sizeID) {
                    return { SizeID: sizeID };
                });
            }
            $scope.item.Location = response.Data.Location;
            $scope.item.Source = response.Data.Source;
            $scope.item.CollectionGuID = { 'CollectionGuID':response.Data.CollectionGuID};
            $scope.item.OldCollectionGuID = response.Data.CollectionGuID;
            $scope.tags = response.Data.StyleTags; 
            
            var delayForSlider = $scope.newItemImagesSelected * 700;
            
             $timeout(function() {
               var forceInit = false;
                if(true){
                    forceInit = true;
                    slider = uploadslider($scope.newItemImagesSelected, false);
                    slider.destroySlider();
                    updatebxSliderCreated(false);
                }

                slider = uploadslider($scope.newItemImagesSelected, forceInit);
                slider.reloadSlider();
                $('.loader-signup').hide();   
             },delayForSlider);

        }), function (error) {
        }

        openPopDiv('edititsmpopup');        
        //uploadslider();   
        

           
        
    }
    
    /*
     * Function Name: closePopuplocalstorage
     * Description: close the local storage popup
     */
    $scope.closePopuplocalstorage = function(){
        
        $scope.item = {};
        $scope.tags = [];
        $scope.newItemImages = [];
        closePopDiv('localstorage')
        
    }

    /*
     * Function Name: closePopupEditItem
     * Description: close the edit item popup and resetting variables
     */
    $scope.closePopupEditItem = function(){
        
        
        $scope.item = {};
        $scope.tags = [];
        $scope.newItemImages = [];
        closePopDiv('edititsmpopup');
        removeHighlightCreateIcon();
    
         $timeout(function() {
               var forceInit = false;
                if(true){
                    forceInit = true;
                    slider = uploadslider($scope.newItemImagesSelected, false);
                    slider.destroySlider();
                    updatebxSliderCreated(false);
                }

             },200);

        
    }

    /*
     * Function Name: getItemFromWeb
     * Description: function to get item data from url, item data scrapping
     */
    $scope.getItemFromWeb = function(valid){
        $scope.itemwebsubmitted=true;
        if(!valid){
            return;
        }
        $scope.item={};
        $scope.newItemImages = [];
       /* brandItemName = 'Floral Print Drop Waist Dress (Regular & Petite)';
        brandItemName = brandItemName.replace(/ /g,"-");
        brandItemName = brandItemName.replace(/a-z 0-9~%.:_\-/,'');
        alert(brandItemName);return;*/
        $('.loader-signup').show();
        ItemUrl = $scope.itemUrl;
        $scope.reqData = {LoginSessionKey: $scope.LoginSessionKey,ItemUrl:ItemUrl};
        wardrobeService.get_ItemfromWeb($scope.reqData).then(function (response) {
            return $q.all($.map(response.Data.Images || [], function($data) {
                console.log('image', $data);
                var deferred = $q.defer();
                var $img = $('<img/>', { src: $data.image_url }).load(function() {
                    $data.width = this.width;
                    $data.height = this.height;
                    deferred.resolve($data);
                }).error(function() {
                    // handle error
                    deferred.resolve(null);
                });
                return deferred.promise;
            })).then(function (images) {
                // reject errors and small images
                response.Data.Images = images.filter(function($data) {
                    return $data && $data.width > 200 && $data.height > 200;
                });
                return response;
            });
        }).then(function (response) {
            $scope.item.Title = response.Data.Title;
            $scope.item.Brand = response.Data.Brand;
            $scope.item.InStock = response.Data.InStock;
            $scope.item.OnSale = response.Data.OnSale;
            $scope.item.Price = response.Data.Price;
            $scope.item.Description = response.Data.Description;
            var firstColor = response.Data.Colors.PaletteColors[0];
            if (firstColor) {
                $scope.item.Color = firstColor;
            }
            $scope.item.Colors = response.Data.Colors.PaletteColors;
            $scope.item.Sizes = response.Data.Sizes.map(function(size) {
                return { Name: size };
            });
            $scope.item.Categories = response.Data.Categories;
            $scope.item.Source = ItemUrl;
            $scope.item.fromWeb = true;
            console.log(response.Data.debugFlag);
//          console.log(response.Data.debugOriUrl);
            $.each(response.Data.Images, function(key) {
                //alert(response.Data[key].image_uri);
                $scope.setMediaView(response.Data.Images[key],true);
                $scope.finishMediaView(true);
            })
            $scope.initFileUpload();
            $('.loader-signup').hide();
            closePopDiv('fromtheweb');
            openPopDiv('localstorage');
        }, function (error) { //
        });
        
    }

});

 angular.module('App')
    .directive("fileread", [function () {
    return {
        scope: {
            fileread: "=",
            filename: "=",
            fileext: "=",
            ctitle: "=",
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                   
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                        scope.filename = changeEvent.target.files[0].name;
                        scope.fileext = changeEvent.target.files[0].type;
                        //scope.ctitle = '';
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]).directive('autoCompleteBrands', function($timeout) {
    return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: site_url + 'api/common/brand'+iAttrs.uiValues ,
                minLength: 3,
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
}).directive("mydirective", function()
{   
    return {
        restrict: "A",
        link: function(scope, element, attrs)
        {
            scope.$watch('list', function (newVal, oldVal) {
                if (newVal) {

                    //initialize the plugns etc
                    scope.result = 'Model has been populated';
                }    
            });
        }
    };
});














angular.module('App').controller('itemCtrl', function ($scope,$rootScope,$window, wardrobeService, tmpJson,$document) {

    $scope.wardrobeItems = [];
    $scope.LoginSessionKey = '';
    $scope.UserGUID = '';
    $rootScope.uesrCreatedWardrobeList = [];
    $scope.wardrobeForClip = '';
    $scope.clipItemFormsubmitted=false;
    $rootScope.ItemGuIDForClip = '';
    $scope.newItemImagesSelected = 0;
    
    if ($('#LoginSessionkey').val()!='')
    {
        $scope.LoginSessionKey = $('#LoginSessionKey').val();
    }

    if ($('#UserGUID').val()!='')
    {
        $scope.UserGUID = $('#UserGUID').val();
    }

    /*
     * Function Name: getWardrobeItems
     * Description: list items in a particular wardrobe
     */
    $scope.getWardrobeItems = function(collectionGuID){

        $scope.ItemPgNo = '';
        $scope.ItemPgSize = '';        
        var reqData = {LoginSessionKey: $scope.LoginSessionKey,UserGuID :$scope.UserGUID, CollectionGuID :collectionGuID, PageNo: $scope.ItemPgNo, PageSize: $scope.ItemPgSize};
        
        wardrobeService.get_wardrobeItems(reqData).then(function (response) {
                $scope.wardrobeItems = response.Data;
            }), function (error) {
        }
    }

    /*
     * Function Name: viewItemDetails
     * Description: redirect to item details
     */
    $scope.viewItemDetails = function(wardrobeItem){
        if(wardrobeService.get_clipItemCliked()){
            wardrobeService.set_clipItemCliked(false);
            return;
        }
       
        var brandItemName = wardrobeItem.Title
        
        if(wardrobeItem.Brand !== ""){
            brandItemName = wardrobeItem.Brand + ' ' +brandItemName;
        }
        
        brandItemName = brandItemName.replace(/ /g,"-");
        brandItemName = brandItemName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        brandItemName = angular.lowercase(brandItemName);
        
    $window.open(site_url+'item/'+brandItemName+'/'+wardrobeItem.ItemGuID, '_blank');
    } 

    /*
     * Function Name: events
     * Description: getting clip button click
     */
    $scope.events = function(ths){
                    $(ths).addClass('cliped');
                    $(ths).find('span').text('Clip’d'); 
    };
    
    /*
     * Function Name: clipItem
     * Description: clip button clicked, get logged in user wardrobes
     */
    $rootScope.clipItem = function(ItemGuID,event){
        if(event){
            event.stopPropagation();
        }
        if($(event.currentTarget).hasClass("done")){
            return;
        }
        
        wardrobeService.set_clipItemCliked(true);
        
        $('.loader-signup').show();
        var reqData = {LoginSessionKey: $scope.LoginSessionKey};
        wardrobeService.get_uesrWardrobeList(reqData).then(function(response){
            
            if(response.ResponseCode==200){
                $rootScope.uesrCreatedWardrobeList = response.Data;
                $rootScope.ItemGuIDForClip = ItemGuID;
                openPopDiv('clipitempopup', 'bounceInDown');
                wardrobeService.set_event(event);
                
            }else if(response.ResponseCode==501){
                openPopDiv('signin', 'bounceInDown');
                
            }else{
                alertify.error(response.Message);
            }
            
            $('.loader-signup').hide();
        });
        
    }
    
    /*
     * Function Name: saveClipItem
     * Description: clip the item to wardrobe
     */
    $rootScope.saveClipItem = function($validFlag,form){
    
        $scope.clipItemFormsubmitted=true;
        if(!$validFlag){
            return;
        }
        
        $('.loader-signup').show();
        
        var reqData = {LoginSessionKey: $scope.LoginSessionKey, ItemGuID: $rootScope.ItemGuIDForClip,wardrobeForClip: form.inWardrobe.$modelValue};
        
        wardrobeService.clipItem(reqData).then(function(response){
            
            if(response.ResponseCode==200){
                
                //$scope.articleDetail.saveArticle = 1;
                var event = wardrobeService.get_event();
                $(event.currentTarget).addClass('cliped');
                $(event.currentTarget).addClass('done');
                $(event.currentTarget).find('span').text('Clip’d');
                /*for clip in activity tab*/
                if($(event.currentTarget).hasClass('clip-from-activity')){
                    $(event.currentTarget).find('i').addClass('icon-cliped-black');
                    var classActItemClipCount = '#activity-item-clip-'+$rootScope.ItemGuIDForClip;
                    var classActItemClips = '.activity-item-clip-Class-'+$rootScope.ItemGuIDForClip;
                    $(classActItemClipCount).html(parseInt($(classActItemClipCount).html())+1);
                    $(classActItemClipCount).prev('i').addClass('icon-clipped');

                    //change status of all same items
                    $(classActItemClips).find('i').addClass('icon-cliped-black');
                    $(classActItemClips).find('span').text('Clip’d');
                    $(classActItemClips).addClass('done');

                    var activityItemClipCount = '.activity-clip-'+$rootScope.ItemGuIDForClip;
                    $(activityItemClipCount).find('i').addClass('icon-clipped');
                    $(activityItemClipCount).find('span').html(parseInt($(classActItemClipCount).html()));
                }
                /*end for clip in activity tab*/
                else if($(event.currentTarget).hasClass('clip-link')){
                    $rootScope.TagedItemDetail['isclip'] = 1;
                }
                var wardrobeItemClass = '.wardrobe-item-'+$rootScope.ItemGuIDForClip;
                $(wardrobeItemClass).addClass('clipping');
                $(event.currentTarget).find('i').addClass('icon-cliped-black');
                $(wardrobeItemClass).addClass('cliped');
                $(wardrobeItemClass).addClass('done');
                $(wardrobeItemClass).find('span').text('Clip’d');

                $scope.wardrobeForClip = '';
                alertify.success(response.Message); 
                closePopDiv('clipitempopup')
            }else if(response.ResponseCode==501){
                openPopDiv('signin', 'bounceInDown');
                
            }else{
                
                alertify.error(response.Message);
            }
            
            $('.loader-signup').hide();
        });

       
        
    
    } 
    
    /*
     * Function Name: redirectToSource
     * Description: common function to redirect to source url
     */
    $scope.redirectToSource = function(source,event){
        
        if(event)
            event.stopPropagation();
        
        $window.open(source, '_blank');
    }
    
    /*
     * Function Name: viewItemDetailsComment
     * Description: comments clicked for items
     */
    $scope.viewItemDetailsComment = function(wardrobeItem,event){
        
        if(event)
            event.stopPropagation();
        
        var brandItemName = wardrobeItem.Title
        
        if(wardrobeItem.Brand !== ""){
            brandItemName = wardrobeItem.Brand + ' ' +brandItemName;
        }
        
        brandItemName = brandItemName.replace(/ /g,"-");
        brandItemName = brandItemName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        brandItemName = angular.lowercase(brandItemName);
        
    $window.open(site_url+'item/'+brandItemName+'/'+wardrobeItem.ItemGuID+'/##comment', '_blank');
    }
    
    /*
     * Function Name: viewItemDetailsShare
     * Description: share clicked for items
     */
    $scope.viewItemDetailsShare = function(wardrobeItem,event){
        
        if(event)
            event.stopPropagation();
        
        var brandItemName = wardrobeItem.Title
        
        if(wardrobeItem.Brand !== ""){
            brandItemName = wardrobeItem.Brand + ' ' +brandItemName;
        }
        
        brandItemName = brandItemName.replace(/ /g,"-");
        brandItemName = brandItemName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        brandItemName = angular.lowercase(brandItemName);
        
    $window.open(site_url+'item/'+brandItemName+'/'+wardrobeItem.ItemGuID+'/##share', '_blank');
    } 
    
    /*
     * Function Name: viewItemOptions
     * Description: hover called for item
     */
    $scope.viewItemOptions = function(event){
        console.log('wardrobe controller' + event.currentTarget);
        if(event)
            event.stopPropagation();
        $(event.currentTarget).next('.info').fadeIn();
        //$(event.currentTarget).parent('.img').next('.info').fadeIn();
    }

    /*
     * Function Name: iconClose
     * Description: close button clicked on hover details
     */
   $rootScope.iconClose = function(event){
        if(event)
            event.stopPropagation();        
        if ($(window).width() <= 1025) {
            $('.product-img').removeClass('info-show');  
            $(event.currentTarget).closest('.info').fadeOut();
            $(event.currentTarget).closest('.info').removeClass('infoOpen');
           // $(event.currentTarget).closest('.info').prev().children('.img').children('.btn-dollor').show();
        } else {
           // $(event.currentTarget).closest('.info').css('background', 'none');
           $('.product-img').removeClass('info-show');  
            $(event.currentTarget).next('.info-back').hide();
           // $(event.currentTarget).hide();
            $(event.currentTarget).closest('.info').hide();
        }
        
    }  
     /*Share variables*/
    $rootScope.shareUrl = '';
    $rootScope.shareImage = '--';
    $rootScope.shareTitle = '';

    /*
     * Function Name: SetItemShareDetails
     * Description: Function to set Item details in share this popup   
     */
    $scope.SetItemShareDetails = function(Item,event){
        console.log(Item);
        if(event){
            event.stopPropagation();
        }
        var ItemTitle = Item.Title      
        if(Item.Brand !== ""){
            ItemTitle = Item.Brand + ' ' +ItemTitle;
        }
        ItemTitle = ItemTitle.replace(/ /g,"-");
        ItemTitle = ItemTitle.replace(/[^a-zA-Z0-9-_]+/ig,'');

        ItemTitle = angular.lowercase(ItemTitle);
        ItemUrl = site_url+'item/'+ItemTitle+'/'+Item.ItemGuID;

        $rootScope.shareUrl = ItemUrl;
        if(Item.Images[0]){
            $rootScope.shareImage = image_server_path+'uploads/item/530x610/'+Item.Images[0].ImageName;
        }

        $rootScope.shareTitle = Item.Title;
        openPopDiv('commonShare', 'bounceInDown');
        $scope.loadShareThis();
    }

    /*
     * Function Name: SetArticleShareDetails
     * Description: Function to set Article details in share this popup
     */
    $scope.SetArticleShareDetails = function(Article,event){
        if(event){
            event.stopPropagation();
        }
        var ArticleName = Article.Title      
        ArticleName = ArticleName.replace(/ /g,"-");
        ArticleName = ArticleName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        ArticleName = angular.lowercase(ArticleName);
        ArticleUrl = site_url+'article/'+ArticleName+'/'+Article.ArticleGuID;

        $rootScope.shareUrl = ArticleUrl;
        if(Article.Images[0]){
            $scope.shareImage = image_server_path+'uploads/article/530x610/'+Article.Images[0].ImageUrl;    
        }
        $rootScope.shareTitle = Article.Title;

        openPopDiv('commonShare', 'bounceInDown');
        $scope.loadShareThis();
    }

    /*
     * Function Name: loadShareThis
     * Description: Load share this plugin JS
     */
    $scope.loadShareThis = function() {
        $('#commonShare span').each(function(){
            $(this).removeAttr('st_processed');
            $(this).html('');    
        });
        $("meta[property='og:image']").attr("content", $rootScope.shareImage);
        $("meta[property='og:url']").attr("content", $rootScope.shareUrl);
        $('.fb_share_share_btn_custom').attr('href','http://www.facebook.com/sharer.php?s=100&p[url]='+$rootScope.shareUrl+'&p[images][0]='+$rootScope.shareImage);
        //console.log($rootScope.shareImage);
        
        delete stLight;delete stButtons;delete stFastShareObj;delete stIsLoggedIn;delete stWidget;delete stRecentServices;
        $.ajax({  
            url: 'http://w.sharethis.com/button/buttons.js',  
            dataType: 'script',
            type:'get',
            success: function(){
                stLight.options({
                    publisher: share_this_publisher_key, 
                    doNotHash: false, 
                    doNotCopy: false, 
                    hashAddressBar: false
                });
            },  
            cache: false
        });  
    }

}).filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
