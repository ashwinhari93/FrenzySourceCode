
var articleApp = angular.module('App').controller('articleCtrl', function ($scope,$rootScope,$http,$window,articleService, tmpJson, $timeout,$sce,$location, $routeParams, $q, itemDetailService) {
    
    $scope.image_server_path = image_server_path;
    $rootScope.editArticleTitle = '';
    $scope.editArticleGuID = '';
    $rootScope.newArticleImages = [];
    $rootScope.article = {};
    $rootScope.articleStyleTags = [];
    $scope.runwayTabFlag = false;
    
    $rootScope.keepShopPopup = false;
    
    $scope.selectedSection = 6;
    $rootScope.newArticleImagesSelected = 0;
    
    $rootScope.articleDetail = [];
    $rootScope.articleItems = [];
     
    $scope.hideGoBack = false;
    $scope.enableHotSpot = false;
    $scope.hotSpotChecked = false;
    
    $scope.userAllWardrobes = [];
    $scope.selectedArticleItem = {};
    $scope.activeHotSpot = {'imageName':'','positionX':'','positionY':'','mousePercentX':'','mousePercentY':''};
    $rootScope.editMode = false;
    
    $scope.LoginSessionKey = '';
    $scope.UserGUID = '';
    $scope.UserID = '';
    $scope.LoggedUserID = '';
    $rootScope.articlelink = '';
    $scope.attachArticleItem = false;
    
    $scope.showArticleItemBrand = '';
    $scope.showArticleItemTitle = '';
    $scope.showArticleItemPrice = '';
    $scope.savedArticleUsers = {};
    
    var Madein = '';
    var Size = '';

    /* ======= Runway page variables=======*/
    
    $scope.runwayArticleDetail= [];
    $scope.runwayArticleItems= [];
    $scope.runwayArticle = [];
    $scope.RunwayArticleData=[];
    $scope.RunwayTabs=[];
    $scope.RunwayActiveTab = 'RecentAdded';

    $scope.disableRunwayArticlePagination = false;
    $scope.paginationbusyRunwayArticle = false;
    $scope.RunwayArticlePageNo = 1;

    $rootScope.LatestDate = LatestDate;
    $rootScope.NewArticleCount = '';



    /* ======= Search page variables=======*/

    $scope.SearchText = '';
    $scope.PrevSearchText = '';

    //Search section (article, item, user etc)
    $scope.SearchSection = 'searcharticle';
    
    //Article which are result of the search 
    $scope.SearchedArticles = [];

    //Items which are result of the search 
    $scope.SearchedItems = [];
   
   //Users which are result of the search 
    $scope.SearchedUsers = [];

    //Total no. of articles
    $scope.TotalSearchRecords=0;

    //Search Article pagination vars
    $scope.disableSearchArticlePagination = false;
    $scope.paginationbusySearchArticle = false;
    $scope.SearchArticlePageNo = 1;
    $scope.paginationNoArticle = false;

    //Search Item pagination vars
    $scope.disableSearchItemPagination = false;
    $scope.paginationbusySearchItem = false;
    $scope.SearchItemPageNo = 1;
    $scope.paginationNoItem = false;

    $scope.paginationbusySearchFashionWeb = false;

    $scope.ItemCategory=[];
    $scope.ItemBrand=[];
    $scope.ItemColor=[];
    $scope.SeletcedItemColor='';

    //Search user pagination vars
    $scope.disableSearchUserPagination = false;
    $scope.paginationbusySearchUser = false;
    $scope.SearchUserPageNo=1;
    $scope.paginationNoUser = false;


    /*article pagination*/
    $scope.currentPage = 1;
    $scope.pageSize = 1;

    $rootScope.UserProfileArticles = [];
    $rootScope.disableArticlePagination = true;
    //$scope.paginationbusyArticle = false;
    $rootScope.paginationbusyArticle = false;
    $rootScope.ArticlePageNo = 1;
    $rootScope.savedArticlePageNo = 1;
    $rootScope.NoProfileArticleFlag=false;
    $rootScope.NoSavedArticleFlag=false;
    $rootScope.UserSavedArticles = [];
    $rootScope.isSavedArticle = 0;

    $rootScope.SavedArticleDisable=false;
    $rootScope.profileArticleDisable=false;

    $rootScope.savedArticleFirstPage = false;
    $rootScope.articleIsMyAccount = 0;
    //signup first step vars
    $scope.topUsers = [];    
    
    //$scope.SearchUrl='searcharticle';
    /*end article pagination*/


    /*Share variables*/
    $rootScope.shareUrl = '';
    $rootScope.shareImage = '--';
    $rootScope.shareTitle = '';

    if(!$rootScope.isActivityTabActive)
        $rootScope.isArticleTabActive = false;
    /*
     * Function Name: SetItemShareDetails
     * Description: Set parameters for item sharing for share this
     */
    $scope.SetItemShareDetails = function(Item,event){
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
            $rootScope.shareImage = Item.Images[0].Size > 0 ? image_server_path+'uploads/item/530x610/'+Item.Images[0].ImageName : Item.Images[0].ImageUrl;
        }

        $rootScope.shareTitle = Item.Title;
        openPopDiv('commonShare', 'bounceInDown');
        $scope.loadShareThis();
    }

    /*
     * Function Name: SetArticleShareDetails
     * Description: Set parameters for article sharing for share this
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
            $rootScope.shareImage = Article.Images[0].Size > 0 ? image_server_path+'uploads/item/530x610/'+Article.Images[0].ImageName : Article.Images[0].ImageUrl;
        }
        $rootScope.shareTitle = Article.Title;

        openPopDiv('commonShare', 'bounceInDown');
        $scope.loadShareThis();
    }
    
    /*
     * Function Name: SetItemShareDetails
     * Description: Set parameters for item sharing for share this
     */
    $scope.SetItemShareDetails = function(Item,event){
        if(event){
            event.stopPropagation();
        }
        var ItemName = Item.Title      
        ItemName = ItemName.replace(/ /g,"-");
        ItemName = ItemName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        ItemName = angular.lowercase(ItemName);
        ItemUrl = site_url+'item/'+ItemName+'/'+Item.ItemGuID;

        $rootScope.shareUrl = ItemUrl;
        if(Item.Images[0]){
            $rootScope.shareImage = Item.Images[0].Size > 0 ? image_server_path+'uploads/item/530x610/'+Item.Images[0].ImageName : Item.Images[0].ImageUrl;
        }
        $rootScope.shareTitle = Item.Title;

        openPopDiv('commonShare', 'bounceInDown');
        $scope.loadShareThis();
    }

    /*
     * Function Name: loadShareThis
     * Description: Initialize the share this plugin, called everytime share is clicked
     */
    $scope.loadShareThis = function() {
        $('#commonShare span').each(function(){
            $(this).removeAttr('st_processed');
            $(this).html('');    
        });
        $("meta[property='og:image']").attr("content", $rootScope.shareImage);
        $("meta[property='og:url']").attr("content", $rootScope.shareUrl);
        $('.fb_share_share_btn_custom').attr('href','http://www.facebook.com/sharer.php?s=100&p[url]='+$rootScope.shareUrl+'&p[images][0]='+$rootScope.shareImage);
        delete stLight;delete stButtons;delete stFastShareObj;delete stIsLoggedIn;delete stWidget;delete stRecentServices;
        $.ajax({  
            url: 'http://w.sharethis.com/button/buttons.js',  
            dataType: 'script',  
            success: function(){
                stLight.options({
                    publisher: share_this_publisher_key, 
                    doNotHash: false, 
                    doNotCopy: false, 
                    hashAddressBar: false
                });
            },  
            cache: true  
        });  
    }
    
    if ($('#LoginSessionkey').val()!='')
    {
        $scope.LoginSessionKey = $('#LoginSessionKey').val();
    }

    if ($('#UserGUID').val()!='')
    {
        $scope.UserGUID = $('#UserGUID').val();
    }
    
    if ($('#LoggedUserID').val()!='')
    {
        $scope.LoggedUserID = $('#LoggedUserID').val();
    }
    
    if ($('#UserID').val()!='')
    {
        $scope.UserID = $('#UserID').val();
    }
    var reqData = {LoginSessionKey: $scope.LoginSessionKey, UserGuID :$scope.UserGUID };
   
    /*
     * Function Name: getArticleDetail
     * Description: Get the article details
     */
    $scope.getArticleDetail = function (ArticleGuID) {
        $scope.LoginSessionKey = '';
        if ($('#LoginSessionkey').val() != '')
        {
            $scope.LoginSessionKey = $('#LoginSessionKey').val();
        }
        var reqData = {LoginSessionKey: $scope.LoginSessionKey, ArticleGuID: ArticleGuID};
        articleService.get_articleDetail(reqData).then(function (response) {

            $rootScope.articleDetail = response.Data;
            
            if($rootScope.articleDetail.ItemTags.length>0){
                $scope.showArticleItemBrand = $rootScope.articleDetail.ItemTags[0].Brand;
                $scope.showArticleItemTitle = $rootScope.articleDetail.ItemTags[0].Title;
                $scope.showArticleItemPrice = $rootScope.articleDetail.ItemTags[0].Price;
            }
            //get the articles which are associated with the items tagged
            $scope.tagedItemArticle(ArticleGuID,$scope.LoginSessionKey); 
            $scope.getItemsDetail(response.Data.ItemTags);

            //get the articles on the basis of userGuID
            //alert($rootScope.articleDetail.UserGuID);
            $scope.userArticle($rootScope.articleDetail.UserGuID,$scope.LoginSessionKey,ArticleGuID);           
        }), function (error) {
        }
    }
    
    /*
     * Function Name: getItemsDetail
     * Description: Get all the item details tagged in a particular article
     */
    $scope.getItemsDetail = function(Items){
        
        var ItemGuIDs = [];
        $.each(Items, function(key,val) {
            ItemGuIDs.push(val.ItemGuID)
        });
        
        var reqData = {LoginSessionKey: $scope.LoginSessionKey,ItemGuIDs:ItemGuIDs};
        itemDetailService.get_itemsDetail(reqData).then(function (response) {
            $rootScope.itemDetails = response.Data;
        }), function (error) {
        } 
    }
    
    /*
     * Function Name: redirectToSource
     * Description: Common function to redirect the user to source location
     */
    $scope.redirectToSource = function (source,event) {
        if(event)
            event.stopPropagation();
        
        $window.open(source, '_blank');
    }
    
    /*
     * Function Name: articlelayoutDone
     * Description: Function that reinitilizes the slider in add / edit popup
     */
    $rootScope.articlelayoutDone = function () {
        $timeout(function () {
            articleLook();
        },0); // wait...
    }

    /*
     * Function Name: shoplayoutDone
     * Description: Function that reinitilizes the slider in show popup
     */
$scope.shoplayoutDone = function () {
        $timeout(function () {
            shopPopupLook();
        },0); // wait...
    }


    /*
     * Function Name: editArticle
     * Description: Function that sets various variable while editing an article
     */
   $scope.editArticle = function (ArticleData) {
        console.log('editArticle', arguments);
        $('.loader-signup').show();
        $timeout(function () {
            if(!angular.isUndefined(ArticleData) || $rootScope.editMode){
                $rootScope.editMode = true;
                if(angular.isUndefined(ArticleData)){
                    $scope.imageUploaded = true;
                    ArticleData = $rootScope.article;
                    /*reset form*/
                    $scope.submitted=false;
                    $rootScope.articleItems = [];
                    $rootScope.articleStyleTags = [];
                    //$rootScope.newArticleImages = [];
                    /*end reset form*/
                    $.each(ArticleData.Keywords, function(index, keyword) {
                        var reqData = {
                            SearchPage:1,
                            Color: keyword.Color ? keyword.Color.Name : '',
                            ColorID: keyword.Color ? keyword.Color.ColorID : '',
                            Brand: keyword.Brand || '',
                            ItemMasterCategoryID: keyword.ItemMasterCategoryID || '',
                            PageSize: 50,
                            Random: 0,
                            LoginSessionKey: $scope.LoginSessionKey,
                            PageNo: 1,
                            NoFullText: true
                        };
                        articleService.get_SearchItemNew(reqData).then(function(response) {
                            if (response.Data && response.Data.length > 0) {
                                console.log('Found items for', keyword, response.Data);
                                $.each(response.Data, function(index, item) {
                                    console.log('add articleItems', item);
                                    $scope.addItemInArticle(item, $scope.itemRelevance(keyword, item));
                                });
                            } else {
                                console.log('Could not find any item for', keyword, reqData);
                            }
                        });
                    });

                }else{
                    $rootScope.article = ArticleData;
                }
                $scope.editArticleGuID = ArticleData.ArticleGuID;

            }else{
                $scope.editArticleGuID = ArticleData;
                $rootScope.article = {};
            }

            $q.all($.map(ArticleData && ArticleData.Images || [], function($data) {
                /*get image width and height*/
                var deferred = $q.defer();
                var $img = $('<img/>', { src: $data.ImageUrl }).load(function() {
                    $data.width = this.width;
                    $data.height = this.height;
                    deferred.resolve($data);
                }).error(function() {
                    // handle error
                    deferred.resolve($data);
                });
                return deferred.promise;
            })).then(function() {
                /*for edit article*/
                if(!angular.isUndefined($scope.editArticleGuID)){
                    $('.loader-signup').show();   
                    //console.log('ArticleData'+JSON.stringify(ArticleData));
                    $.each(ArticleData.Images, function(key) {//console.log('ArticleData.Images[key].width'+ArticleData.Images[key].width);

                        var aspectDimension = $scope.setImageRatio(ArticleData.Images[key].width,ArticleData.Images[key].height );
                        //console.log('aspectDimension.height'+aspectDimension.height);
                        if(!$scope.imageUploaded){
                            $scope.setMediaView({
                                image_name: ArticleData.Images[key].ImageName,
                                image_url: ArticleData.Images[key].ImageUrl,
                                size: ArticleData.Images[key].Size,
                                width: ArticleData.Images[key].width,
                                height: ArticleData.Images[key].height
                            }, true);
                            $scope.finishMediaView(true);
                            $scope.initArticleFileUpload();
                        }

                        $.each(ArticleData.Images[key].Tags, function(tagkey,tagvalue) {
                            tagvalue.ItemGuID
                            //console.log('tagvalue.ItemGuID'+tagvalue.ItemGuID+'tagvalue.FromLeft' +tagvalue.FromLeft+ 'tagvalue.FromTop'+tagvalue.FromTop);
                            $.each(ArticleData.ItemTags, function(itemTagkey,itemTagvalue) {
                                //console.log('itemTagvalue.ItemGuID'+itemTagvalue.ItemGuID);
                                if(tagvalue.ItemGuID==itemTagvalue.ItemGuID){
                                    var tagValueInPercent = $scope.getPositionInPercent(aspectDimension,tagvalue);
                                    //console.log(tagValueInPercent);

                                    $scope.selectedArticleItem = {
                                        ItemGuID: itemTagvalue.ItemGuID,
                                        Title: itemTagvalue.Title,
                                        Description: "",
                                        Brand: itemTagvalue.Brand,
                                        Price: itemTagvalue.Price,
                                        ColorID:"",
                                        CollectionID:"",
                                        SizeID:"",
                                        CountryID:"",
                                        Source:itemTagvalue.Source,
                                        BuyLink:itemTagvalue.BuyLink,
                                        NoOfSaves:"",
                                        NoOfViews:"",
                                        NoOfComments:"",
                                        Images:[{
                                            ImageName: itemTagvalue.ImageName,
                                            ImageUrl: itemTagvalue.ImageUrl,
                                            Size: itemTagvalue.Size
                                        }]};

                                    $scope.activeHotSpot = {'imageName':ArticleData.Images[key].ImageName,'positionX':tagValueInPercent.FromLeft,'positionY':tagValueInPercent.FromTop,'mousePercentX':tagvalue.FromLeft,'mousePercentY':tagvalue.FromTop};
                                    $scope.hotSpotChecked = true;
                                    $scope.addItemInArticle();
                                }

                            });

                        });



                    });
                    $('.attached-items-visible').slideUp();
                    $('.add-new-items').slideUp();
                    $('.attached-items-visible').slideDown();

                    $.each(ArticleData.StyleTags, function(key,value) {

                        $rootScope.articleStyleTags.push({text:value});

                    });



                }
                /*end for edit article*/

                $flag = 0;
                $rootScope.newArticleImagesSelected = 0;
                $.each($rootScope.newArticleImages, function(key) {
                    if($rootScope.newArticleImages[key].isChecked==1){
                        $flag = 1;
                        $rootScope.newArticleImagesSelected++;
                    }
                });
                
                if($flag==0){
                    $('.loader-signup').hide();
                }


                if($rootScope.newArticleImages.length>0 && $flag==1){
                    if(!angular.isUndefined($scope.editArticleGuID)){
                        $rootScope.editArticleTitle = 'Edit Article';
                        openPopDiv('editArtical');
                        closePopDiv('localstoragearticle');

                    }else{
                        $scope.editArticleGuID = '';
                        $rootScope.editArticleTitle = 'Create Article';
                        openPopDiv('editArtical');
                        closePopDiv('localstoragearticle');


                    }
                    var delayForSlider = $rootScope.newArticleImagesSelected ;

                    $timeout(function () {

                        var forceInit = false;
                        if(true){
                            forceInit = true;
                            sliderArticle = uploadArticleSlider($rootScope.newArticleImagesSelected, false);
                            sliderArticle.destroySlider();
                            updatebxArticleSliderCreated(false);
                        }

                        sliderArticle = uploadArticleSlider($rootScope.newArticleImagesSelected, forceInit);
                        sliderArticle.reloadSlider();               
                        $('.loader-signup').hide();   
                    },delayForSlider);
                      



                }
            });

            
        }, 900);

    }
    
    /*
     * Function Name: UpdateArticleImages
     * Description: Function that open the local storage popup and sets the required variables
     */
    $scope.UpdateArticleImages = function(editArticleForm){
        if(!$rootScope.editMode)
            $scope.resetArticleForm(editArticleForm);
        $scope.hideGoBack = true;
        openPopDiv('localstoragearticle');
        closePopDiv('editArtical');

        $timeout(function () {

            var forceInit = false;
            if(true){
                forceInit = true;
                sliderArticle = uploadArticleSlider($rootScope.newArticleImagesSelected, false);
                sliderArticle.destroySlider();
                updatebxArticleSliderCreated(false);
            } 
        },900);
    }
    
    /*
     * Function Name: uploadArticleMedia
     * Description: Function that open the local storage popup and sets the required variables
     */
    $scope.uploadArticleMedia = function(){
        $rootScope.article = {};
        $rootScope.editMode = false;
        $scope.hideGoBack=false;
        //$scope.initArticleFileUpload();
        openPopDiv('localstoragearticle');
        closePopDiv('createAricle');
    }
    
    /*
     * Function Name: changeScopeToNonRedirect
     * Description: sets if redirection to item is required or now
     */
    $scope.changeScopeToNonRedirect = function() {
        $rootScope.redirectToItemOverview = false;
    }
    
    /*
     * Function Name: editUserArticle
     * Description: Function that saves the updated data of article
     */
    $scope.editUserArticle = function($validFlag,editArticleForm){
        $scope.submitted=true;
        $scope.attachArticleItem = false;
        if(!$validFlag || $rootScope.newArticleImages.length<=0 /*|| $rootScope.articleItems<=0*/){
            /*if($rootScope.articleItems<=0){
                $scope.attachArticleItem = true;
            }else{
                $scope.attachArticleItem = false;
            }*/
            return;
        }
        $('.loader-signup').show();
        
        $scope.LoginSessionKey = '';
        if ($('#LoginSessionkey').val()!='')
        {
            $scope.LoginSessionKey = $('#LoginSessionKey').val();
        }
        
        $rootScope.article.LoginSessionKey = $scope.LoginSessionKey;
        
        if ($('#latitude').val()!='')
        {
            $rootScope.article.Latitude = $('#articlelatitude').val();
        }
        
        if ($('#longitude').val()!='')
        {
            $rootScope.article.Longitude = $('#articlelongitude').val();
        }
        
        if ($('#articlelocations').val()!='')
        {
            $rootScope.article.Location = $('#articlelocations').val();
        }
        
        $rootScope.article.StyleTags = [];
        $.each($rootScope.articleStyleTags, function(key) {
            
            $rootScope.article.StyleTags.push($rootScope.articleStyleTags[key].text);
        });
        
        $rootScope.article.Images = [];//console.log('$rootScope.newArticleImages'+JSON.stringify($rootScope.newArticleImages));
        $.each($rootScope.newArticleImages, function(key,value) {
            var tempTags = [];
            $.each($rootScope.articleItems, function(articleItemKey,articleItemValue) {
                if(articleItemValue.activeHotSpot.imageName==value.Imagename){
                    tempTags.push({
                        'FromTop':articleItemValue.activeHotSpot.mousePercentY,
                        'FromLeft':articleItemValue.activeHotSpot.mousePercentX,
                        'ItemGuID':articleItemValue.item.ItemGuID
                    });
                }
            });
            
            if(value.isChecked==1){
                $rootScope.article.Images.push({
                    'ImageUrl': value.ImageUrl || value.Imageurl,
                    'ImageName': value.ImageName || value.Imagename,
                    'Size': value.Size || value.image_size,
                    'ThumbSizeTotal': value.thumbSizeTotal,
                    'Tags':tempTags,
                    'height':value.height,
                    'width':value.width
                });
            }
            
        });


        if(!angular.isUndefined($rootScope.article.ArticleGuID) && $rootScope.article.ArticleGuID!=""){/*edit*/
            //console.log('$rootScope.article'+JSON.stringify($rootScope.article));
            reqData = $rootScope.article;
            //console.log(reqData);return;
            articleService.editarticle(reqData).then(function (response) {
            $(".commonDescription").height(100);
                
            if(response.ResponseCode==201){
                closePopDiv('editArtical');

                $timeout(function () {

                    var forceInit = false;
                    if(true){
                        forceInit = true;
                        sliderArticle = uploadArticleSlider($rootScope.newArticleImagesSelected, false);
                        sliderArticle.destroySlider();
                        updatebxArticleSliderCreated(false);
                    } 
                },900);


                alertify.success(response.Message);
                $scope.resetArticleForm(editArticleForm,true);
                $scope.activeHotSpot = {'imageName':'','positionX':'','positionY':'','mousePercentX':'','mousePercentY':''};
                
                /*hide article slide*/
                $('#imageDetail').hide();
                $('.expander-grid > li').removeClass('active'); 
                $('.expander-grid > li').removeAttr('style');
                /*end hide article slide*/
                
                /*temp code to show article detail page*/
                /*var articleName = reqData.Title;
                
                articleName = articleName.replace(/ /g,"-");
                articleName = articleName.replace(/[^a-zA-Z0-9-_]+/ig,'');
                
                articleName = angular.lowercase(articleName);*/
                
                //var a = document.createElement("a");
                //a.target = "_blank";
                //a.href = site_url+'article/'+articleName+'/'+response.ArticleGuID;
                //a.click
                //console.log(site_url+'article/'+articleName+'/'+response.ArticleGuID);
                
                //$("#clickedEvent").attr("href", site_url+'article/'+articleName+'/'+response.ArticleGuID).attr("target", "_blank")[0].click();
                
                //$window.open(site_url+'article/'+articleName+'/'+response.ArticleGuID, '_blank');
                
                /*end temp code to show article detail page*/
            }else if(response.ResponseCode==512){
                closePopDiv('editArtical');
                alertify.confirm(response.Message + 'You will be redirected to existing Article in 15 seconds.')
                        .set('basic', true)
                        .set('labels',{ok:'Redirect', cancel:'Cancel'})
                        .set('oncancel', function(closeEvent){
                            openPopDiv('editArtical');
                        })
                        .set('onok', function(closeEvent){ 
                            /*temp code to show article detail page*/
                            var articleName = response.Data.Title;

                            articleName = articleName.replace(/ /g,"-");
                            articleName = articleName.replace(/[^a-zA-Z0-9-_]+/ig,'');

                            articleName = angular.lowercase(articleName);

                            $window.open(site_url+'article/'+articleName+'/'+response.Data.ArticleGuID, '_blank');

                            /*end temp code to show article detail page*/
                            
                            openPopDiv('editArtical');
                        
                        } ).autoOk(15); 
                
                //alertify.set('notifier','delay', 15);
                //alertify.error(response.Message);

                
            }
             $('.loader-signup').hide();   
            }), function (error) {
                
                $('.loader-signup').hide();
            }
            
        }else{/*add*/
            reqData = $rootScope.article;
            //console.log(reqData);return;
            articleService.addarticle(reqData).then(function (response) {
                
            if(response.ResponseCode==201){
                closePopDiv('editArtical');
                alertify.success(response.Message);
                $scope.resetArticleForm(editArticleForm,true);
                
                $rootScope.ArticlePageNo = 1;
                $rootScope.UserProfileArticles = [];
        
                $rootScope.UserSavedArticles = [];
                $rootScope.isSavedArticle = 0;
        
                $scope.getUserArticleData();
                
                /*temp code to show article detail page*/
                var articleName = reqData.Title;
                
                articleName = articleName.replace(/ /g,"-");
                articleName = articleName.replace(/[^a-zA-Z0-9-_]+/ig,'');
                
                articleName = angular.lowercase(articleName);
                
                /*$window.open(site_url+'article/'+articleName+'/'+response.ArticleGuID, '_blank');
                 * 
                    */
                   window.location = site_url+'article/'+articleName+'/'+response.ArticleGuID;
                   
                //$("#clickedEvent").attr("href", site_url+'article/'+articleName+'/'+response.ArticleGuID).attr("target", "_blank")[0].click();
                
                /*end temp code to show article detail page*/
            }else if(response.ResponseCode==512){
                closePopDiv('editArtical');
                alertify.confirm(response.Message + 'You will be redirected to existing Article in 15 seconds.')
                        .set('basic', true)
                        .set('labels',{ok:'Redirect', cancel:'Cancel'})
                        .set('oncancel', function(closeEvent){
                            openPopDiv('editArtical');
                        })
                        .set('onok', function(closeEvent){ 
                            /*temp code to show article detail page*/
                            var articleName = response.Data.Title;

                            articleName = articleName.replace(/ /g,"-");
                            articleName = articleName.replace(/[^a-zA-Z0-9-_]+/ig,'');

                            articleName = angular.lowercase(articleName);

                            $window.open(site_url+'article/'+articleName+'/'+response.Data.ArticleGuID, '_blank');

                            /*end temp code to show article detail page*/
                            
                            openPopDiv('editArtical');
                        
                        } ).autoOk(15); 
                
                //alertify.set('notifier','delay', 15);
                //alertify.error(response.Message);

                
            }
            $('.loader-signup').hide();  
            }), function (error) {
                $('.loader-signup').hide();
                
            }
        }
        
        
        
        
    
    }
    
    
    /*
     * Function Name: initArticleFileUpload
     * Description: Initializes the file uploader
     */
    $scope.initArticleFileUpload = function (){
        $multiple = true;
        var oldArticleLength = $rootScope.newArticleImages.length;
        console.log(oldArticleLength);
        $maxSizeInBytes = 1024 * 1024 * 10;
        $allowedExtensions = ['jpg','jpeg', 'gif', 'png'];
        $thumbSize = {"220":true,"71":true};
        var countImages = 0;
        var errorHandler = function (event, id, fileName, reason) {
        };
        var thumbnailuploader = new qq.FineUploader({
            multiple: $multiple,
            element: $('#thumbnail-fine-uploader-article')[0],
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
                        //'Thumburl': $data.thumb_url+'190x160/'+$data.image_name,
                        'Thumburl': '',
                        'smallThumbUrl':'',
                        //'slideImg': $data.thumb_url+'160x190/'+$data.image_name,
                        'image_size': '',
                        'thumbSizeTotal': '',
                        'isChecked':1,
                        'height':'',
                        'width':''
                    };
                    var newId = oldArticleLength + id;
                    $rootScope.newArticleImages[newId] = $scope.newimageData;
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
                        var newId = oldArticleLength + id;
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
     * Function Name: setMediaView
     * Description: Sets the uploaded images in scope variable for later user
     */
    $scope.setMediaView = function($data,fromWeb,id){

        $scope.newimageData = {
            'Imagename': $data.image_name,
            'Imageurl': $data.image_url,
            //'Thumburl': $data.thumb_url+'190x160/'+$data.image_name,
            'Thumburl': fromWeb ? $data.image_url : ($data.thumb_url+'530x610/'+$data.image_name),
            'smallThumbUrl': fromWeb ? $data.image_url : ($data.thumb_url+'190x160/'+$data.image_name),
            //'slideImg': $data.thumb_url+'160x190/'+$data.image_name,
            'Size': $data.size,
            'image_size': $data.size,
            'thumbSizeTotal': $data.thumbSizeTotal,
            'isChecked':1,
            'height':$data.height,
            'width':$data.width
        };//console.log(id);
        var finalImages = $rootScope.newArticleImages;
        
        if(id==undefined){
            finalImages.push($scope.newimageData);//console.log('$rootScope.newArticleImages'+JSON.stringify($rootScope.newArticleImages));
        } else {
            finalImages[id] = $scope.newimageData;
        }
        $rootScope.newArticleImages = finalImages;

        /*if(fromWeb==undefined){
            $scope.$apply();    
        }*/

    }
    
    /*
     * Function Name: finishMediaView
     * Description: Sets the uploaded images in scope variable for later user
     */
    $scope.finishMediaView = function(fromWeb) {
        var newFinalImages = [];
        var finalImages = $rootScope.newArticleImages;
        for (var key in finalImages) {
            //console.log(finalImages[key]);
            if(finalImages[key] != undefined) {
                newFinalImages.push(finalImages[key]);
            }
        }
        //console.log(newFinalImages);
        //console.log(finalImages);
        $rootScope.newArticleImages = newFinalImages;
        if(fromWeb==undefined){
            $scope.$apply();    
        }
    }
    
    /*
     * Function Name: checkUncheckMedia
     * Description: Handles checked unchecked media in the local storage popup
     */
    $scope.checkUncheckMedia = function(index){
        
        if($rootScope.newArticleImages[index].isChecked==1){
            $rootScope.newArticleImages[index].isChecked = 0;
        }else{
            $rootScope.newArticleImages[index].isChecked = 1;
        }
        
       
    }
    
    /*
     * Function Name: removeArticleImg
     * Description: Removes article image from the slider in add / edit mode
     */
    $scope.removeArticleImg = function(index){
        $rootScope.newArticleImages.splice(index, 1);  
        $rootScope.newArticleImagesSelected--;

        $timeout(function() {

            var forceInit = false;
            if(true){
                forceInit = true;
                sliderArticle = uploadArticleSlider($rootScope.newArticleImagesSelected, false);
                sliderArticle.destroySlider();
                updatebxArticleSliderCreated(false);
            }

            sliderArticle = uploadArticleSlider($rootScope.newArticleImagesSelected, forceInit);
            sliderArticle.reloadSlider();

        },200); 
        //$scope.$apply(); 
          
        
    }
    
    /*
     * Function Name: fromWardrobe
     * Description: Loading wardrobe items for article tagging
     */
    $scope.fromWardrobe = function(){
        $scope.userAllWardrobes = [];
        
        $scope.activeHotSpot = {'imageName':'','positionX':'','positionY':'','mousePercentX':'','mousePercentY':''};
        $scope.selectedArticleItem = {};
        $('.loader-signup').show();
        var reqData = {LoginSessionKey: $scope.LoginSessionKey, UserGuID :$scope.UserGUID };
        
        articleService.get_userAllWardrobes(reqData).then(function (response) {

                $.each(response.Data, function(key) {
                    $scope.userAllWardrobes.push(response.Data[key]);
                        $('.subacccrodians-contents').slideDown();
                        $('.attached-items-visible').slideUp();
                        $('.add-new-items').slideUp();
                });
            $('.loader-signup').hide();
            }), function (error) {
            $('.loader-signup').hide();
        }
    }
    
    
    /*
     * Function Name: setUnsetForArticle
     * Description: Function used for tagging
     */
    $scope.setUnsetForArticle = function(wardrobeItem){
        $scope.selectedArticleItem = wardrobeItem;
        $scope.enableHotSpot = true;
        $('.choose-articleitems > li').removeClass('selected-porduct-items');
    }
    
    /*
     * Function Name: catchHotSpot
     * Description: Handles the user selected position for item tagging
     */
    $scope.catchHotSpot = function(event,imageName){

        console.log('catchHotSpot', arguments);
       
        if($scope.enableHotSpot){
            $scope.hotSpotChecked = true;
            $scope.activeHotSpot = {'imageName':'','positionX':'','positionY':'','mousePercentX':'','mousePercentY':''};
            var mouseX;
            var mouseY;
            var margin = 12;
            if ( event.offsetX == null ) { // Firefox
                mouseX = event.originalEvent.layerX;
                mouseY = event.originalEvent.layerY;
                
                
            
                //for handling margin
                mouseX -= margin;
                mouseY -= margin;

                var targetHeight = event.currentTarget.clientHeight;
                var targetWidth = event.currentTarget.clientWidth;
                //console.log(mouseX + ' ' +mouseY +' '+targetWidth + ' ' +targetHeight);
                var tempMouseX = mouseX - event.target.offsetLeft +(margin/2);
                if(tempMouseX<0)
                    tempMouseX = 0;

                //mousePercentX = Math.round(((mouseX)/(targetWidth))*100);
                //mousePercentX = Math.round(((tempMouseX)/(targetWidth+event.target.offsetLeft))*100);
                mousePercentX = ((tempMouseX)/(targetWidth))*100;

                //mousePercentY = Math.round((mouseY/(targetHeight))*100);
                mousePercentY = ((mouseY+(margin/2))/(targetHeight))*100;
                
                mousePercentX = mousePercentX.toFixed(1);
                mousePercentY = mousePercentY.toFixed(1);

                //console.log('mousePercentX '+mousePercentX+'mousePercentY '+mousePercentY+'mouseX '+mouseX+'targetWidth '+targetWidth+'event.target.offsetLeft '+event.target.offsetLeft+'tempMouseX '+tempMouseX);

                $scope.activeHotSpot = {'imageName':imageName,'positionX':mouseX,'positionY':mouseY,'mousePercentX':mousePercentX,'mousePercentY':mousePercentY};
                
            } else {                       // Other browsers
                mouseX = event.offsetX+event.target.offsetLeft;
                mouseY = event.offsetY;
                
                mouseX -= margin;
                mouseY -= margin;
                
                var targetHeight = event.currentTarget.clientHeight;
                var targetWidth = event.currentTarget.clientWidth;
                
                mousePercentX = ((mouseX+(margin/2))/(targetWidth))*100;
                mousePercentY = ((mouseY+(margin/2))/(targetHeight))*100;
                
                mousePercentX = mousePercentX.toFixed(1);
                mousePercentY = mousePercentY.toFixed(1);
                
                //console.log('mousePercentX '+mousePercentX+'mousePercentY '+mousePercentY+'mouseX '+mouseX+'targetWidth '+targetWidth+'event.target.offsetLeft '+event.target.offsetLeft+'tempMouseX '+tempMouseX);
                
                $scope.activeHotSpot = {'imageName':imageName,'positionX':mouseX,'positionY':mouseY,'mousePercentX':mousePercentX,'mousePercentY':mousePercentY};
            }
            
            
            
        }
    }
    
    /*
     * Function Name: addItemInArticle
     * Description: Adds the item with its position for final saving
     */
    $scope.addItemInArticle = function(item, relevance){
        if (!item) {
            item = $scope.selectedArticleItem;
        }
        if ($scope.selectedArticleItem) {
            if($scope.hotSpotChecked){
                $scope.hotSpotChecked = false;
            } else {
                $scope.activeHotSpot = {
                    imageName: $scope.newArticleImages[0].Imagename,
                    positionX: -1,
                    positionY: -1,
                    mousePercentX: -1,
                    mousePercentY: -1
                };
            }
            $scope.enableHotSpot = false;
            
            $rootScope.articleItems.push(
                {
                    item: item,
                    activeHotSpot: $scope.activeHotSpot,
                    relevance: typeof relevance === 'number' ? relevance : Infinity
                }
            );
                
            var addItemTagFlag = true;
            if(typeof($rootScope.article.ItemTags)!='undefined'){
                $.each($rootScope.article.ItemTags, function(key,value) {
                    if(value.ItemGuID==item.ItemGuID){
                        addItemTagFlag = false;
                    }
                });
            
            
            
                if(addItemTagFlag){
                    $rootScope.article.ItemTags.push({
                        'Title': item.Title,
                        'ItemGuID': item.ItemGuID,
                        'Price': item.Price,
                        'Source': item.Source,
                        'Brand': item.Brand,
                        'BuyLink': item.BuyLink,
                        'ImageName': item.Images[0].ImageName,
                        'ImageUrl': item.Images[0].ImageUrl,
                        'Size': item.Images[0].Size
                    });
                }
            }

            /*show tags in popup slider*/
            $.each($rootScope.newArticleImages, function(key,value) {
                $rootScope.newArticleImages[key]['Tags'] = [];
                $.each($rootScope.articleItems, function(articleItemKey,articleItemValue) {
                    if(articleItemValue.activeHotSpot.imageName==value.Imagename){
                        $rootScope.newArticleImages[key]['Tags'].push({
                            'FromTop':articleItemValue.activeHotSpot.positionY,
                            'FromLeft':articleItemValue.activeHotSpot.positionX,
                            'ItemGuID':articleItemValue.item.ItemGuID
                        });
                    }
                });

                
            });
            /*end show tags in popup slider*/
            $scope.attachArticleItem = false;
            $('.subacccrodians-contents').slideUp();
            $('.add-text-content').slideUp();
            $('.attached-items-visible').slideDown();
            $('.slider-editimg').hide();
        }else{
            
                $('.add-content-footer.hotspot').animate({
                    'margin-left': '-=10px',
                    'margin-right': '+=10px'
                }, 200, function() {
                    $('.add-content-footer.hotspot').animate({
                        'margin-left': '+=10px',
                        'margin-right': '-=10px'
                    }, 200, function() {
                        $('.add-content-footer.hotspot').animate({
                            'margin-left': '-=10px',
                            'margin-right': '+=10px'
                        }, 200, function() {
                            $('.add-content-footer.hotspot').animate({
                            'margin-left': '+=10px',
                            'margin-right': '-=10px'
                            }, 200, function() {

                                //and so on...
                            });
                        
                        });
                        
                    });
                });
        }
        
    }
    
    /*
     * Function Name: goBackAttachItem
     * Description: Resets the current hotspot
     */
    $scope.goBackAttachItem = function(){
        $scope.activeHotSpot = {'imageName':'','positionX':'','positionY':'','mousePercentX':'','mousePercentY':''};
        $('.subacccrodians-contents').slideUp();
        $('.add-text-content').slideUp();
        $('.attached-items-visible').slideDown();
    }
    
    /*
     * Function Name: deleteAttachedItem
     * Description: Remove the attached item in article
     */
    $scope.deleteAttachedItem = function(itemGuID,hashKey){
        var $flag = true;
        $.each($rootScope.articleItems, function(key,value) {
            if($flag && itemGuID==value.item.ItemGuID && hashKey==value.item.$$hashKey){
                
                $rootScope.articleItems.splice( key , 1);

                $.each($rootScope.newArticleImages, function(imgkey,imgvalue) {
                    $.each(imgvalue.Tags, function(tagkey,tagvalue) {
                        if($flag && tagvalue.ItemGuID==itemGuID && imgvalue.Imagename==value.activeHotSpot.imageName){
                            $rootScope.newArticleImages[imgkey].Tags.splice( tagkey , 1);
                            $flag = false;
                        }
                    });
                    
                });  
            }
        });
        //console.log($rootScope.articleItems);
    }
    
    /*
     * Function Name: resetArticleForm
     * Description: Empty the edit article for for new add / edit
     */
    $scope.resetArticleForm = function(editArticleForm,removeImage){
        if(editArticleForm){
            editArticleForm.ArticleName.$dirty = false;
        }
        /*reset form*/
        $rootScope.article = {};
        $rootScope.editMode = false;
        $scope.submitted=false;
        $rootScope.articleItems = [];
        $rootScope.articleStyleTags = [];
        /*end reset form*/
        if(removeImage){
            $rootScope.newArticleImages = [];
            $scope.initArticleFileUpload();
        }else{
            $.each($rootScope.newArticleImages, function(key) {
                $rootScope.newArticleImages[key]['Tags'] = [];/*reset form hotspot*/
            });
        }    
        
    }
    
    /*
     * Function Name: closePopupEditArticle
     * Description: Closes the Edit Popup and reverts all changes in the 
     */
    $scope.closePopupEditArticle = function(editArticleForm){
        $scope.resetArticleForm(editArticleForm,true);
        $scope.goBackAttachItem();
        closePopDiv('editArtical');
        removeHighlightCreateIcon();
         $timeout(function () {

                    var forceInit = false;
                    if(true){
                        forceInit = true;
                        sliderArticle = uploadArticleSlider($rootScope.newArticleImagesSelected, false);
                        sliderArticle.destroySlider();
                        updatebxArticleSliderCreated(false);
                    } 
                },900);
        
    }
    
    /*
     * Function Name: closePopupLocalStorageArticle
     * Description: Closes the Local Storage Popup
     */
    $scope.closePopupLocalStorageArticle = function(){
        $scope.resetArticleForm("",true);
        closePopDiv('localstoragearticle');
         
   }
    
    /*
     * Function Name: viewItemDetails
     * Description: Handle click on item tagged in an article
     */
    $scope.viewItemDetails = function(Item, event){

        var brandItemName = Item.Title
        
        if(Item.Brand !== ""){
            brandItemName = Item.Brand + ' ' +brandItemName;
        }
        
        brandItemName = brandItemName.replace(/ /g,"-");
        brandItemName = brandItemName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        brandItemName = angular.lowercase(brandItemName);
        
        if(event)
            event.stopPropagation();

    $window.open(site_url+'item/'+brandItemName+'/'+Item.ItemGuID, '_blank');
        
        
    } 

    /*
     * Function Name: viewItemDetails
     * Description: Handle click on item tagged in an article
     */
    $scope.closeItemDetail = function(event){
         $('.gallery-tag').hide(); 
         $('.img-right-nav').show();     
         event.stopPropagation();
    }
    
   
    $scope.fallback = function(copy) {
      window.prompt('Press cmd+c to copy the text below.', copy);
    };

    $scope.showMessage = function() {
      console.log("clip-click works!");
    };
    
    /*
     * Function Name: saveArticle
     * Description: Function to save user's acrticle to their own saved articles
     */
    $scope.saveArticle = function (articleGuID,isRunway,event,index) {
        if(event!=undefined && $(event.currentTarget).hasClass('done')){
            return;
        }
        if(event){
            event.stopPropagation();
        }
        $('.loader-signup').show();
        var reqData = {LoginSessionKey: $scope.LoginSessionKey, articleGuID: articleGuID};
        
        articleService.saveArticle(reqData).then(function(response){
            
            if(response.ResponseCode==200){
                
                if(isRunway!=undefined){
                    $scope.runwayArticleDetail.NoOfSaves = parseInt($scope.runwayArticleDetail.NoOfSaves)+1;
                    $scope.runwayArticleDetail.saveArticle = 1;    
                    if(event!=undefined){
                        $(event.currentTarget).find('i').addClass('icon-check');
                        $(event.currentTarget).addClass('done');
                        $(event.currentTarget).addClass('saving');
                        $(event.currentTarget).find('span').html('Saved'); 
                        if(index != undefined) {
                            $scope.UserActivities[index].ExtraParams.Entity.NoOfSaves = parseInt($scope.UserActivities[index].ExtraParams.Entity.NoOfSaves)+1;
                            $scope.UserActivities[index].saveArticle = 1;    
                        }
                    }
                    
                }else{
                    $rootScope.articleDetail.NoOfSaves = parseInt($rootScope.articleDetail.NoOfSaves)+1;
                    $rootScope.articleDetail.saveArticle = 1;
                }
                
                /*update values in other places of googlemap*/

                if (typeof getArticleForStylemap == 'function') { 
                      getArticleForStylemap(false,true);
                    }
                /*
                if($.isFunction(getArticleForStylemap)){
                    getArticleForStylemap(false,true);
                }*/
                
                /*update values in other places googlemap*/
                
                alertify.success(response.Message);  
            }else if(response.ResponseCode==501){
                openPopDiv('signin', 'bounceInDown');
                
            }else{
              
                alertify.error(response.Message);
            }
            
            $('.loader-signup').hide();
        });

    }
    
    /*
     * Function Name: showArticleItemDetail
     * Description: Function that shows the tagged item detail
     */
    $scope.showArticleItemDetail = function (index) {
        $scope.showArticleItemBrand = $rootScope.articleDetail.ItemTags[index].Brand;
        $scope.showArticleItemTitle = $rootScope.articleDetail.ItemTags[index].Title;
        $scope.showArticleItemPrice = $rootScope.articleDetail.ItemTags[index].Price;
        
        $scope.showArticleItem = $rootScope.articleDetail.ItemTags[index];
    }

    /*
     * Function Name: tagedItemArticle
     * Description: get details of tagged items in an article
     */
    $scope.tagedItemArticle = function (ArticleGuID,LoginSessionKey) {
        NoOfSaves = $rootScope.articleDetail.NoOfSaves;
            NoOfViews = $rootScope.articleDetail.NoOfViews;
            Title = $rootScope.articleDetail.Title;
            styleTags = $rootScope.articleDetail.StyleTags;

        var reqData = {LoginSessionKey: LoginSessionKey, ArticleGuID: ArticleGuID,NoOfSaves:NoOfSaves,
            NoOfViews:NoOfViews,Title:Title,styleTags:styleTags,PageSize:7,Random:1};
        articleService.get_tagedItemArticle(reqData).then(function (response) {
            $scope.itemsArticles = response.Data;
            $scope.cntr = [];

            $scope.itemsArticles2 = [];
            itemArticleCount = 0;

            $.each(response.Data, function(key,val) {
               if(ArticleGuID!=val.ArticleGuID && itemArticleCount < 6){
                    $scope.itemsArticles2.push(val);
                    itemArticleCount++;
               }
            });
            $scope.itemArticleCount = itemArticleCount;
        }), function (error) {
        }
    }

    /*
     * Function Name: userArticle
     * Description: get list of all user articles
     */
    $scope.userArticle = function (UserGuID,LoginSessionKey,ArticleGuID) {
        var reqData = {LoginSessionKey: LoginSessionKey, UserGuID: UserGuID,PageSize:7};
        articleService.get_userArticle(reqData).then(function (response) {
            $scope.userArticles = response.Data;
            $scope.cntr2 = [];
            $scope.userArticles2 = [];
            userArticleCount = 0;
            $.each(response.Data, function(key,val) {
               if(ArticleGuID!=val.ArticleGuID && userArticleCount < 6){
                    $scope.userArticles2.push(val);
                    userArticleCount++;
               }
            });
            $scope.userArticleCount = userArticleCount;
        }), function (error) {
        }
    }
    
    /*
     * Function Name: getArticleUrl
     * Description: get the article detail page URL
     */
    $scope.getArticleUrl = function(Article){
        var ArticleName = Article.Title

        
        ArticleName = ArticleName.replace(/ /g,"-");
        ArticleName = ArticleName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        ArticleName = angular.lowercase(ArticleName);
        
    return 'article/'+ArticleName+'/'+Article.ArticleGuID;
        
        
    } 
    
    /*
     * Function Name: hoverArticleItem
     * Description: get the item detail when hovered over the item on the right
     */
    $scope.hoverArticleItem = function(ItemGuID){
        
        $('.gallery-tag').hide();/*added this line to show only tagged items in article image*/
        
        var className = '.'+ItemGuID;
        $(className).addClass('highlightTag');
        
        var galTag = className+ ' .gallery-tag';

        $(galTag).removeAttr("style");
        var contenWrpwd = $('.articleimg-slider > li').width()/2 + $('.detailSlider').offset().left - 30,
            contenWrpht = $('.articleimg-slider > li').height() - $(window).scrollTop(),
            tagwraph    = contenWrpht/2; 

        $(className).addClass('active'); 
        $(className).each(function(){
                if ($(this).offset().left >= contenWrpwd) 
                {             

                    $(this).children('.gallery-tag').css({left: - $('.gallery-tag').width() + 40});
                    $(this).children('.gallery-tag').show();
                }
                else 
                {
                    $(this).children('.gallery-tag').show();
                }
        });


        /*var TooltipTimer,
        contenWrpwd = $('.articleimg-slider > li').width()/2 + $('.detailSlider').offset().left,
        contenWrpht = $('.articleimg-slider > li').height() - $(window).scrollTop(),
        tagwraph = contenWrpht / 2;
        if ($(className).offset().left >= contenWrpwd)
        {
            $(className).children('.gallery-tag').css({left: -$('.gallery-tag').width()});
            $(className).children('.gallery-tag').show();
        }
        else
        {
            $(className).children('.gallery-tag').show();
        }*/

       
    }
    
    /*
     * Function Name: hoverAttachedItem
     * Description: get the item detail when hovered over the item on the article image
     */
    $scope.hoverAttachedItem = function(ItemGuID){
        
        var className = '.'+ItemGuID;
        $(className).addClass('highlightTag');
        
        var galTag = className+ ' .gallery-tag';

        $(galTag).removeAttr("style");
        $(className).children('.gallery-tag').show();

    }
    
    /*
     * Function Name: clearHoverArticleItem
     * Description: close the item detail on article images
     */
    $scope.clearHoverArticleItem = function(ItemGuID){
        var className = '.'+ItemGuID;
        $(className).removeClass('highlightTag');
        $(className).removeClass('active');

        
        //$(className).children('.gallery-tag').hide();
    }
    
    /*
     * Function Name: getSavedArticleUsers
     * Description: get users who have saved this article
     */
    $scope.getSavedArticleUsers = function(ArticleGuID,NoOfSaves){
        if(NoOfSaves>0){
            $('.loader-signup').show();
            var reqData = {ArticleGuID: ArticleGuID}; 
            articleService.getSavedArticleUsers(reqData).then(function (response) {
            if (response.ResponseCode == 200) {
                $scope.savedArticleUsers = response.Data;
                openPopDiv('savearticleusers', 'bounceInDown');
            }
            
        });
        }
        $('.loader-signup').hide();
    }

    $scope.itemRelevance = function(keyword, item) {
        var query = keyword.Query && keyword.Query.toLowerCase() || '';
        var terms = query.split(/\s+/);
        var score = 0;

        var title = item.Title && item.Title.toLowerCase();
        var description = item.Description && item.Description.toLowerCase();
        $.each(terms, function(index, term) {
            if (title && title.indexOf(term) !== -1) {
                score += 100;
            }
            if (description && description.indexOf(term) !== -1) {
                score += 30;
            }
        });

        if (keyword.Color && item.Colors && item.Colors.some(function(itemColor) {
            return itemColor.ColorID === keyword.Color.ColorID;
        })) {
            score += 10;
        }

        if (keyword.Price === item.Price) {
            score += 3;
        }

        return score;
    };

    /*
     * Function Name: getArticleFromWeb
     * Description: function to get item data from url
     */
    $scope.getArticleFromWeb = function(articlevalid){
        $rootScope.articlewebsubmitted=true;
        if(!articlevalid){
            return;
        }
        $rootScope.article={};
        $rootScope.editMode = false;
        $rootScope.newArticleImages = [];

       /* brandItemName = 'Floral Print Drop Waist Dress (Regular & Petite)';
        brandItemName = brandItemName.replace(/ /g,"-");
        brandItemName = brandItemName.replace(/a-z 0-9~%.:_\-/,'');
        alert(brandItemName);return;*/
        $('.loader-signup').show();
        ArticleUrl = $scope.ArticleUrl;
        var reqData = {LoginSessionKey: $scope.LoginSessionKey,ArticleUrl:ArticleUrl};
        articleService.get_ArticlefromWeb(reqData).then(function (response) {
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
            if(response.hasOwnProperty('Data')){
                $rootScope.article.Title = response.Data.Title;
                $rootScope.article.Brand = response.Data.Brand;
                $rootScope.article.Price = response.Data.Price;
                $rootScope.article.Description = response.Data.Description;
                $rootScope.article.Source = ArticleUrl;
                $rootScope.article.fromWeb = true;
                $rootScope.editMode = true;
                $.each(response.Data.Images, function(key) {
                   // alert(response.Data.Images[key].image_uri);
                    $scope.setMediaView(response.Data.Images[key],true);
                    $scope.finishMediaView(true);
                })
                $scope.initArticleFileUpload();

                // Init auto tagging of items
                $rootScope.article.Keywords = response.Data.Keywords || [];
                if (!$rootScope.masterCategoryIDMap) {
                    $rootScope.masterCategoryIDMap = {};
                    $rootScope.itemCategoryListData.forEach(function(category) {
                        $rootScope.masterCategoryIDMap[category.ItemMasterCategoryGuID] = category.ItemMasterCategoryID;
                    });
                }
                $rootScope.article.Keywords.forEach(function(keyword) {
                    keyword.ItemMasterCategoryID = $rootScope.masterCategoryIDMap[keyword.Categories[0]];
                });
                console.log('article keywords', $rootScope.article.Keywords);
                // // for testing
                // $rootScope.article.Keywords = [
                //     { Brand: 'H&M', ItemMasterCategoryID: 98, Query: 'H&M Vest' },
                //     { Brand: 'DL1961', ItemMasterCategoryID: 104, Query: 'DL1961 Jeans' },
                //     // { Brand: 'ASOS', ItemMasterCategoryID: 88, Query: 'ASOS Mules' },
                //     { Brand: 'Rebecca Minkoff', ItemMasterCategoryID: 29, Query: 'Rebecca Minkoff Bag' }
                // ];

                $('.loader-signup').hide();
                closePopDiv('articlefromtheweb');
                openPopDiv('localstoragearticle');
            }
        }, function (error) { //
        });
        
    }
    
    /*
     * Function Name: textToLink
     * Description: convert the text containing hyper links to links
     */
    $scope.textToLink = function (inputText) {
        if(inputText!==undefined){
            var replacedText, replacePattern1, replacePattern2, replacePattern3;


            //URLs starting with http://, https://, or ftp://
            replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            replacedText = inputText.replace(replacePattern1,function($1){
                var link = $1;
                var href = $1;
                if(link.length>20){
                    link = link.substr(0,18);
                    link = link+'..';
                }
                return '<a href="'+href+'" class="chat-anchor" target="_blank">'+link+'</a>';
            });

            //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
            replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            replacedText = replacedText.replace(replacePattern2, function($1,$2){
                var link = $1;
                var href = $1;
                if(link.length>20){
                    link = link.substr(0,18);
                    link = link+'..';
                }
                return '<a class="chat-anchor" href="http://'+href+'" target="_blank">'+link+'</a>';
            });

            //Change email addresses to mailto:: links.
            replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
            replacedText = replacedText.replace(replacePattern3, '<a class="chat-anchor" href="mailto:$1">$1</a>');

            //replacedText = $scope.getHighlighted(replacedText);

            return $sce.trustAsHtml(replacedText);
        } else {
            return '';
        }
    }

    /*
    ============================================================================================
                                            Runway
    ============================================================================================
    */
   
    //Runway tabs
    /*
     * Function Name: getRunwayTabs
     * Description: get runway tab names
     */
    $scope.getRunwayTabs = function(){
        var reqData = {LoginSessionKey: $scope.LoginSessionKey};
        articleService.get_RunwayTabs(reqData).then(function (response) {
            $scope.RunwayTabs = response.Data;
        }), function (error) { //
        } 
    }

    //Change Runway tabs
    /*
     * Function Name: changeRunwayTabs
     * Description: clicking on different runway tabs
     */
    $scope.changeRunwayTabs = function(TabName){
        if($scope.runwayTabFlag && $scope.RunwayActiveTab == TabName){
            //console.log('$scope.runwayTabFlag'+$scope.runwayTabFlag);
            return;
        }
        //$('#navigation').spasticNav();
        $scope.RunwayArticlePageNo=1;
        $scope.RunwayActiveTab = TabName;
        $scope.RunwayArticleData = [];
        $rootScope.NewArticleCount = '';
        $scope.disableRunwayArticlePagination = false;
        
        $scope.getRunwayArticle();       
    }

    //Runway tab data
    /*
     * Function Name: getRunwayArticle
     * Description: get data for the clicked runway tab
     */
    $scope.getRunwayArticle = function(){   
        
        $scope.runwayTabFlag = true;
        $scope.paginationbusyRunwayArticle = true;
        //$scope.articleNotFoundFlag = false;
        PageSize = 50;
        var reqData = {
            LoginSessionKey: $scope.LoginSessionKey,
            TabName:$scope.RunwayActiveTab,
            PageNo:$scope.RunwayArticlePageNo, 
            PageSize:PageSize
        };
        articleService.get_RunwayData(reqData).then(function (response) {
            var flg = 1;
            if(response.ResponseCode==200){
                if(response.Data.length > 0){
                    $rootScope.LatestDate = response.LatestDate;    
                }
                $.each(response.Data, function(key) {
                    response.Data[key].Message = $scope.$eval(response.Data[key].Message);
                    if($scope.RunwayActiveTab==reqData.TabName){
                        flg = 0;
                        $scope.RunwayArticleData.push(response.Data[key]);  
                    }
                });
                if(flg == 0) {
                    if($scope.RunwayArticlePageNo==1){//console.log($(window).width());
                        $("#navigation li").removeClass('selected');
                        $("#runwayNavigation"+reqData.TabName).addClass('selected');
                        $("#imageDetail").hide();
                    }

                    if(response.Data.length < PageSize){
                        $scope.disableRunwayArticlePagination = true;
                    }

                    /*AUTO CLICK ON FIRST ARTICLE TAB*/
                    if($scope.RunwayArticlePageNo==1){//console.log($(window).width());
                        if ($(window).width() <= 767){ 

                                setTimeout(function(){
                                    $('#expanderGrid > li:first > a .product-img').trigger('click');
                                },2700);


                        }else{

                            setTimeout(function(){

                                $('#expanderGrid > li:first > a .product-img').trigger('click');
                            },2000);

                        }
                    }

                    /*END AUTO CLICK ON FIRST ARTICLE TAB*/
                    if($scope.RunwayActiveTab=='MostPopular' && $scope.RunwayArticlePageNo <= MaxNoOfPagesPopularTab){
                        if(MaxNoOfPagesPopularTab==$scope.RunwayArticlePageNo){
                            $scope.disableRunwayArticlePagination = true;
                        }
                        $scope.RunwayArticlePageNo++;
                    }else{
                        $scope.RunwayArticlePageNo++;
                    }
                    $scope.paginationbusyRunwayArticle = false; 
                    $rootScope.NewArticleCount = '';
                    $scope.runwayTabFlag = false;
                }
                
            }

        }), function (error) { //
        }
    }
    
    /*
     * Function Name: getRunwayArticleDetailActivity
     * Description: open the shop poup for activity tab with proper position
     */
    $scope.getRunwayArticleDetailActivity = function(RunwayArticle,event){
        $rootScope.keepShopPopup = false;
        var tops = ($(event.target).offset().top);
        if(event)
            event.stopPropagation();
        $scope.getRunwayArticleDetail(RunwayArticle);
        $timeout(function() {
            $rootScope.keepShopPopup = true;
            $timeout(function() {
                //alert($(event.target).offset().left);
                $('#user-wall-activity #shopPopup').show(); 
                //$(event.target).addClass('selected');
                shopPopupLook();

                var opupwd = $('#shopPopup').width()/2
                var opupht = $('#shopPopup').height()/2
                $('#user-wall-activity #shopPopup').offset({left:$(event.target).offset().left - 120, top:tops - opupht });
            },500);
        },500);

    }

    /*
     * Function Name: getRunwayArticleDetail
     * Description: get article detail for detail view on runway
     */
    $scope.getRunwayArticleDetail = function(RunwayArticle){
        $rootScope.articleDetail = [];
        $scope.runwayArticleDetail = [];
        $('.runwayImg-block').hide();
        // $('.loading.imageloading').show();

        
        $scope.runwayArticleDetail = RunwayArticle;
        $rootScope.articleDetail = RunwayArticle;
        $scope.runwayArticleTag = (RunwayArticle.Images.length > 0)?RunwayArticle.Images[0].Tags:[];
        $scope.runwayArticleItems = RunwayArticle.ItemTags;
        console.log(RunwayArticle);

        //Add first tagged item detail for shop popup
        if($scope.runwayArticleItems.length>0){
            $scope.showArticleItemBrand = $scope.runwayArticleItems[0].Brand;
            $scope.showArticleItemTitle = $scope.runwayArticleItems[0].Title;
            $scope.showArticleItemPrice = $scope.runwayArticleItems[0].Price;

            $scope.showArticleItem = $scope.runwayArticleItems[0];
            $scope.runwayArticleItems = [];
            $timeout(function() {
                $scope.runwayArticleItems = RunwayArticle.ItemTags;
            }, 500); 
        }
        
        // $(".runwayImg-block img").on("load", function() {
            
            $('.runwayImg-block').show();
        //     $('.loading.imageloading').hide();
           
        // }).each(function() {

        //     // attempt to defeat cases where load event does not fire
        //     // on cached images
        //     if(this.complete) $(this).trigger("load");
        // });
        
        /*setTimeout(function(){
            $('.loading.imageloading').hide();
            $('.runwayImg-block').show();
        },2000);*/

    }

    /*
     * Function Name: runwayGridDone
     * Description: Reinitialize grid
     */
    $scope.runwayGridDone = function() {
        $timeout(function() {
       // alert("repeat doen");
        
        /*var gridObj = GridInit();
            gridObj.init();*/
          //  expanderGrid();
        /*expanderGrid2();*/
        
        }, 200); // wait...
    } 

    /*
     * Function Name: viewArticleDetails
     * Description: Redirecting to article detail page
     */
    $scope.viewArticleDetails = function(Article){
        
        var articleName = Article.Title
        articleName = articleName.replace(/ /g,"-");
        articleName = articleName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        articleName = angular.lowercase(articleName);
        
    $window.open(site_url+'article/'+articleName+'/'+Article.ArticleGuID, '_blank');
    } 
    
    $scope.disableBubbling = function(event){
        if(event)
            event.stopPropagation();
        
       // $(event.currentTarget).closest('.infonewproduct').find('.info').fadeOut();
         
    }
    


    /*
     * Function Name: viewArticleDetailsComment
     * Description: Redirecting to article detail page comments
     */
    $scope.viewArticleDetailsComment = function(Article,event){
        if(event)
            event.stopPropagation();

        var ArticleName = Article.Title      
        ArticleName = ArticleName.replace(/ /g,"-");
        ArticleName = ArticleName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        ArticleName = angular.lowercase(ArticleName);
        
    $window.open(site_url+'article/'+ArticleName+'/'+Article.ArticleGuID+'/##comment', '_blank');
    }  

    /*
     * Function Name: viewArticleDetailsShare
     * Description: Handle click on article share
     */
    $scope.viewArticleDetailsShare = function(Article,event){
        
        if(event)
            event.stopPropagation();
        
        var articleName = Article.Title

        articleName = articleName.replace(/ /g,"-");
        articleName = articleName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        articleName = angular.lowercase(articleName);
        
    $window.open(site_url+'article/'+articleName+'/'+Article.ArticleGuID+'/##share', '_blank');
    } 

    /*
     * Function Name: runwayArticleItemDetail
     * Description: hover for item tage
     */
    $scope.runwayArticleItemDetail = function (runwayItemDetail) {
        $scope.showArticleItemBrand = runwayItemDetail.Brand;
        $scope.showArticleItemTitle = runwayItemDetail.Title;
        $scope.showArticleItemPrice = runwayItemDetail.Price;
        $scope.showArticleItem = runwayItemDetail;

    }

    /*
     * Function Name: SearchArticle
     * Description: old function for article search
     */
    $scope.SearchArticle = function () {
        if($scope.paginationbusySearchArticle) return;
        SearchText = $scope.SearchText;
        if($scope.PrevSearchText != SearchText){
            $scope.ResetSearchData();// reset all data created by previous search    
        }
        $scope.paginationbusySearchArticle = true;
        var reqData = {
            SearchPage:1,
            Title:SearchText,
            styleTags:SearchText,
            Locations:SearchText,
            Source:SearchText,
            PageSize:50,
            PageNo:$scope.SearchArticlePageNo,                
            LoginSessionKey: $scope.LoginSessionKey,
        };
     
        articleService.get_SearchArticle(reqData).then(function (response) {
            $scope.TotalSearchRecords = response.TotalRecords;
            $scope.PrevSearchText = response.SearchText;                 
            if(response.Data.length > 0){
                $.each(response.Data, function(key) {
                    $scope.SearchedArticles.push(response.Data[key]);
                });
                
                /*AUTO CLICK ON FIRST ARTICLE TAB*/
                if($scope.SearchArticlePageNo==1){
                    setTimeout(function(){
                        $('.expanderGrid.runway-grid > li:first > a .product-img').trigger('click');
                    },2000);
                    
                }
                /*END AUTO CLICK ON FIRST ARTICLE TAB*/
                
                $scope.SearchArticlePageNo++;    
            }else{
                $scope.paginationNoArticle = true;
            }
            $scope.paginationbusySearchArticle=false;
        }), function (error) {
            //error code goes here
        }
    }

    /*
     * Function Name: loadTags
     * Description: Function that calls the tags master service
     */
    $scope.loadTags = function (query) {
        return $http.get(base_url + 'api/common/styleTagsMaster/'+query); 
    }; 
    
    /*
     * Function Name: getItemCategoryList
     * Description: get item master category list
     */
    $scope.getItemCategoryList = function(){
        var reqData = {};
        if($scope.ItemGender == 'Women')
            reqData.ItemMasterCategory = 1;
        if($scope.ItemGender == 'Men')
            reqData.ItemMasterCategory = 49;
        
        articleService.get_itemCategoryList(reqData).then(function (response) {
            $rootScope.itemCategoryListData = response.Data && response.Data.map(function(category) {
                category.ShortName = category.Name.replace(/^(Men|Women)\s+>\s+/, '');
                return category;
            });
        }), function (error) {
        }
        
    }

    /*
     * Function Name: SearchItem
     * Description: old function for item search, no longer in use
     */
    $scope.oldSelectedBrand = '';
    $scope.oldSelectedColor = '';
    var requestForFriends = null;
    $scope.SearchItem = function () {
        if($scope.oldSelectedBrand==$scope.ItemBrand.Brand && $scope.oldSelectedColor==$scope.ItemColor.Name){
            if($scope.paginationbusySearchItem) return;
        }
        $scope.SearchSection = 'clothings';     
        SearchText = $scope.SearchText;
        if($scope.PrevSearchText != SearchText){
            $scope.ResetSearchData();// reset all data created by previous search    
        }      
        $scope.paginationbusySearchItem = true;
        var reqData = {
            SearchPage:1,
            Title:SearchText,
            Color:$scope.ItemColor?$scope.ItemColor.Name:'',
            ColorID:$scope.ItemColor?$scope.ItemColor.ColorID:'',
            Description:SearchText,
            Brand:$scope.ItemBrand ? $scope.ItemBrand.Brand:'',
            Madein:Madein ? Madein:'',
            Size:Size ? Size:'',
            ItemMasterCategoryLevel:$scope.ItemCategory?$scope.ItemCategory.ItemMasterCategoryLevel:'',
            ItemMasterCategoryID:$scope.ItemCategory?$scope.ItemCategory.ItemMasterCategoryID:'',
            ItemGender:$scope.ItemGender ? $scope.ItemGender:'',
            PriceRang:$scope.ItemPrice ? $scope.ItemPrice:'',
            PageSize:50,
            Random:0,
            LoginSessionKey: $scope.LoginSessionKey,
            PageNo:$scope.SearchItemPageNo,
        };
        $scope.oldSelectedBrand = reqData.Brand;
        $scope.oldSelectedColor = reqData.Color;
        $scope.getItemCategoryList();
        articleService.get_SearchItemNew(reqData).then(function (response) {
            $scope.TotalSearchRecords = response.TotalRecords;

            $scope.PrevSearchText = response.SearchText;
            
            if(response.Data.length > 0){
                $.each(response.Data, function(key) {
                    $scope.SearchedItems.push(response.Data[key]);
                });    
                $scope.SearchItemPageNo++;

            }else{
                $scope.paginationNoItem = true;
            }
            $scope.paginationbusySearchItem = false;
        }), function (error) {
            //error code goes here
        }
    }
    
    $scope.checkWholeSearchData = function(){
        
    }

    /*
     * Function Name: SearchUser
     * Description: search fashion web
     */
    $scope.SearchUser = function () {
        SearchText = $scope.SearchText;
        $scope.paginationbusySearchFashionWeb = true;
        var reqData = {
            SearchPage:1,
            SearchKey:SearchText,
            PageSize:10,
            LoginSessionKey: $scope.LoginSessionKey,
            PageNo:$scope.SearchUserPageNo,
        };
        articleService.get_SearchUsers(reqData).then(function (response) {
            $scope.PrevSearchText = SearchText; 
            $scope.TotalSearchRecords = response.TotalRecords;
            $scope.SearchedUsers = response.Data;
            $scope.paginationbusySearchFashionWeb = false;
        }), function (error) {
            //error code goes here
        }       
    }

    /*
     * Function Name: ResetSearchData
     * Description: Reset all the data created by previous search
     */
    $scope.ResetSearchData = function(){
            //for article search
            $scope.SearchedArticles=[];
            $scope.SearchArticlePageNo=1;
            $scope.paginationNoArticle = false;
           
            //for item search
            $scope.SearchedItems=[];
            $scope.SearchItemPageNo=1;
            $scope.paginationNoItem = false;

            //For user search
            $scope.SearchedUsers=[];
            $scope.SearchUserPageNo=1;
            $scope.paginationNoUser = false;


            //common Search vars
            $scope.TotalSearchRecords = 0;
    }

    /*
     * Function Name: SearchAll
     * Description: Check section and call search method accordingly
     */
    $scope.SearchAll = function (flag) {
        
        /*hide article preview*/
        $('#imageDetail').hide();
        $('.expander-grid > li').removeClass('active'); 
        $('.expander-grid > li').removeAttr('style');
        /*end hide article preview*/
        
        $scope.ResetSearchData();       
        SearchSection = $scope.SearchSection;     
        switch(SearchSection) {
            case 'searcharticle':
                $scope.SearchArticle();
                break;
            case 'clothings':
                if(flag){
                    var ItemBrandTemp = angular.element($('#itemBrand')).scope();
                    ItemBrandTemp.ItemBrand = {Brand: "Designer Any", BrandID: "0"};
                    $scope.ItemBrand = [];
                }
                $scope.SearchItem();
                break;
            case 'fashionweb':
                $scope.SearchUser();
                break;
            default:
                $scope.SearchArticle();
        } 
    }

    /*
     * Function Name: pageChangeHandler
     * Description: user search pagination
     */
    $scope.pageChangeHandler = function(num) {
      $scope.SearchUserPageNo = num;
      $scope.SearchUser();
    };

    /*
     * Function Name: changeSearchSection
     * Description: switching between search tabs
     */
    $scope.changeSearchSection = function (SearchSection,isHome) {
        if($scope.paginationbusySearchFashionWeb || $scope.paginationbusySearchItem || $scope.paginationbusySearchArticle) {
            
        } else {
            $scope.ResetSearchData();
            $scope.SearchSection = SearchSection;
            $("#navigation li").removeClass('selected');
            $("#SearchSection").val(SearchSection);
            $("#"+SearchSection).addClass('selected');
            if(isHome==undefined){
                $scope.SearchAll();
            }
        }
    }

    /*
     * Function Name: changeSearchSection
     * Description: switching between search tabs change URL for proper search view
     */
     $scope.changeSearchLocation = function (SearchSection) {
        $location.path('/'+SearchSection);
        $scope.setSelected(SearchSection);
    }

    /*
     * Function Name: changeSearchSection
     * Description: switching between search tabs make tab active
     */
    $scope.setSelected = function(SearchSection){
        $("#navigation li").removeClass('selected');        
        $("#"+SearchSection).addClass('selected');        
    }
    

    /*
     * Function Name: getAllBrands
     * Description: get all brands
     */
    $scope.getAllBrands = function (SearchSection) {
        articleService.get_AllBrands(reqData).then(function (response) {
            $scope.ItemBrands = response.Data;
          //  alert($scope.ItemBrands);
        }), function (error) {
            //error code goes here
        }
    }

    /*
     * Function Name: changeItemGender
     * Description: function called on changing search gender
     */
    $scope.changeItemGender = function (Gender) {
        $('.selectGender').removeClass('genderSelected');
        var genderClass ='#'+Gender;
        $(genderClass).addClass('genderSelected');
        $scope.ItemGender = Gender;
        var itemCat = angular.element($('#itemCategory')).scope();
        itemCat.ItemCategory = '';
        $scope.ItemCategory = '';
        $scope.SearchAll();
    }
    
    /*
     * Function Name: setItemCategory
     * Description: function called on search item category
     */
    $scope.setItemCategory = function (Category) {
        $scope.ItemCategory = Category;
        
        $('.selectGender').removeClass('genderSelected');
        var genderClass ='#'+$scope.ItemGender;
        $(genderClass).addClass('genderSelected');
        
        //$location.path('/clothings/');
        $scope.SearchAll();
    }
    
    /*
     * Function Name: setItemBrand
     * Description: function called on search item brand
     */
    $scope.setItemBrand = function (Brand) {
        $scope.ItemBrand = Brand;
        $scope.SearchAll();
    }
    
    /*
     * Function Name: setItemColor
     * Description: function called on search item color
     */
    $scope.setItemColor = function (Color) {
        $scope.ItemColor = Color;
        $location.path('/clothings/');
        $scope.SearchAll();
    }

    /*
     * Function Name: setItemPrice
     * Description: function called on search item price
     */
    $scope.setItemPrice = function (Price) {
        $scope.ItemPrice = Price;
        $scope.SearchAll();
    }

    /*
     * Function Name: setSearchText
     * Description: function called to set the search text in the box
     */
    $scope.setSearchText = function (SearchText) {
        if(SearchText!=''){
            $scope.SearchText = SearchText;
        }
    }


    /*
     * Function Name: openItemBottom
     * Description: function called open the item bottom tags in search item
     */
    $scope.openItemBottom = function(event){
        elem = event.currentTarget;
        if(event)
            event.stopPropagation();
        
        $(elem).toggleClass('activeExpanded');
        
        if($(elem).hasClass('activeExpanded')){
          $(elem).parents('.ih-item').prev('.expaned-content').show();
        }
        else {
            $('.activeExpanded').removeClass('activeExpanded');
            $('.expaned-content').hide();
        }
        
        
    }

    /*================================ User profile Article Tab =============================*/
    /*
     * Function Name: getUserArticleData
     * Description: get user article list
     */
    $scope.getUserArticleData = function () {
        //console.log('getUserArticleData');
        $rootScope.articleNotFoundFlag = false;
        PageNo = $rootScope.isSavedArticle?$rootScope.savedArticlePageNo:$rootScope.ArticlePageNo;
        var reqData = {
                LoginSessionKey: $scope.LoginSessionKey,
                PageSize:25, 
                PageNo :PageNo, 
                UserID:$scope.UserID,
                savedArticle:$rootScope.isSavedArticle
            };
if($rootScope.paginationbusyArticle==false) {
        $rootScope.paginationbusyArticle = true;
        $rootScope.isWardrobeTabActive = false;
        $rootScope.isArticleTabActive = true;
        $rootScope.isActivityTabActive = false;
        
       
        articleService.get_userArticle(reqData).then(function (response) {
                    //console.log('$rootScope.isArticleTabActive'+$rootScope.isArticleTabActive);
                    //console.log('$rootScope.isActivityTabActive'+$rootScope.isActivityTabActive);
                    if($rootScope.isArticleTabActive) {
                        $("#navigation li").removeClass('selected');
                        $("#profileNavigationArticle").addClass('selected');
                    }

            
                    $rootScope.articleIsMyAccount = response.myAccount;
                    $rootScope.privacyMessageArticle = '';
                    //console.log($rootScope.articleIsMyAccount);
                    if(response.ResponseCode==200){
                        if($rootScope.isSavedArticle==0){ //YOUR ARTICLE PART 
                            //No articles
                            if(response.Data.length == 0 && $rootScope.ArticlePageNo==1){
                                $rootScope.NoProfileArticleFlag=true;
                            }else{
                                $rootScope.NoProfileArticleFlag=false;
                            }

                            $.each(response.Data, function(key) {
                                $rootScope.UserProfileArticles.push(response.Data[key]);
                            });

                            /*AUTO CLICK ON FIRST ARTICLE TAB*/
                            if ($rootScope.ArticlePageNo == 1) {
                                setTimeout(function () {
                                    $('#expanderGrid1 > li:first > a .product-img').trigger('click');
                                }, 2000);

                            }
                            /*END AUTO CLICK ON FIRST ARTICLE TAB*/
                            
                            $rootScope.ArticlePageNo++;
                        
                            if(response.Data.length <= 12){
                               $rootScope.isSavedArticle = 1;
                               $scope.getUserArticleData();
                               $rootScope.profileArticleDisable=true;
                            }
                            
                        }else { //SAVED ARTICLE PART 
                            //No articles
                            //if($rootScope.paginationbusyArticle==false) {
                                if(response.Data.length == 0 && $rootScope.savedArticlePageNo==1){
                                    $rootScope.NoSavedArticleFlag=true;
                                }else{
                                    $rootScope.NoSavedArticleFlag=false;
                                }

                                if(response.Data.length == 0){
                                    $rootScope.SavedArticleDisable=true;
                                } else {
                                    $.each(response.Data, function(key) {
                                        $rootScope.UserSavedArticles.push(response.Data[key]);
                                    });
                                    
                                    /*AUTO CLICK ON FIRST ARTICLE TAB*/
                                    if ($rootScope.NoProfileArticleFlag && $rootScope.savedArticlePageNo == 1) {
                                        setTimeout(function () {
                                            $('#expanderGrid2 > li:first > a .product-img').trigger('click');
                                        }, 2000);

                                    }
                                    /*END AUTO CLICK ON FIRST ARTICLE TAB*/
                                    
                                    $rootScope.savedArticlePageNo++;
                                    //console.log($rootScope.savedArticlePageNo);
                                }
                            //}else{
                                //$('.load-more').hide();
                            //}

                            /*
                            if (response.TotalRecords < (response.PageNo * response.PageSize)) {
                                $rootScope.articleNotFoundFlag = true;
                            }
                            */
                        }
                        if($rootScope.SavedArticleDisable && $rootScope.profileArticleDisable){
                            $rootScope.articleNotFoundFlag = true;
                        }
                        $rootScope.paginationbusyArticle = false;
                        //setTimeout(function(){ $rootScope.paginationbusyArticle = false; }, 600);
                        $rootScope.privacyMessageArticle = '';
                        
                        
                        
                    }else if(response.ResponseCode==203){
                        $rootScope.privacyMessageArticle = response.Message;

                        if(response.PageNo == 1){
                            $rootScope.paginationbusyArticle = false;
                        }
                        //$('.loader-signup').hide();
                        

                    }
            }), function (error) {
            //$('.loader-signup').hide();
        }
}
    }

    /*
     * Function Name: UserArticleRepeatDone
     * Description: set pagination varibale after repeat of listing is complete
     */
    $rootScope.UserArticleRepeatDone = function () {
        //console.log($rootScope.paginationbusyArticle);
        $rootScope.paginationbusyArticle = false;
    }
    
    /*
     * Function Name: getUserArticle
     * Description: sets various params and then calls service to get all user articles
     */
    $rootScope.getUserArticle = function () {
        $('.create-item-dropdown-profile').hide();
        //hide the tooltip as well here
        $('.WardrobeNewTooltip').hide();
        $('.create-article-dropdown-profile').show();
        
       // $('#navigation').spasticNav();
       
        $('.user-wall-pagecontent').hide();
        $('#user-wall-article').show();
        $('.load-more').show();

        $('#articleeditnow').show();
        $('#articlefinishedit').hide();
        
        $rootScope.disableArticlePagination = false;
        $rootScope.disablegetWardrobesPagination = true;
        $rootScope.disableFollowFollowingPagination = true;
        $rootScope.disableActivityPagination = true;
        
        //reset user article vars
        $rootScope.articleNotFoundFlag= false;
        $rootScope.SavedArticleDisable = false;
        $rootScope.profileArticleDisable = false;
        $rootScope.NoSavedArticleFlag=false;
        $rootScope.NoProfileArticleFlag=false;
        

        $rootScope.ArticlePageNo = 1;
        $rootScope.UserProfileArticles = [];       
        $rootScope.UserSavedArticles = [];
        $rootScope.isSavedArticle = 0;
        $rootScope.savedArticlePageNo=1;
        $rootScope.savedArticleFirstPage = false;
        
        $scope.getUserArticleData();
    }

    /*
     * Function Name: signUpFollow
     * Description: follow unfollow action
     */
    $scope.signUpFollow = function(memberid,event)
    {
        $('.loader-signup').show();
        var reqData = {LoginSessionKey:$scope.LoginSessionKey,MemberID:memberid,Type:'user'}
        articleService.followUser(reqData).then(function(response){
            if(response.ResponseCode==200){

                if($('#followmem'+memberid).text().trim()=='Follow'){
                    $('#followmem'+memberid).children('span').html('Following');
                    $('#followmem'+memberid).find('i').addClass('icon-check');
                    $('#followmem'+memberid).addClass('following');
                    var followingUserCount = parseInt($('#followingUserCount').html());
                    followingUserCount++;
                    $('#followingUserCount').html(followingUserCount);

                } else {
                    $('#followmem'+memberid).children('span').html('Follow');
                    $('#followmem'+memberid).find('i').removeClass('icon-check');
                    $('#followmem'+memberid).removeClass('following');
                    var followingUserCount = $('#followingUserCount').html();
                    followingUserCount--;
                    $('#followingUserCount').html(followingUserCount);
                }
            }else if(response.ResponseCode==501){
                openPopDiv('signin', 'bounceInDown');
                
            }else{
                alertify.error(response.Message);
            }
        });
                $('.loader-signup').hide();
    }
    
    /*
     * Function Name: userFollowPage
     * Description: get all user followers and following
     */
    $scope.userFollowPage = function(memberid,event)
    {
        $('.loader-signup').show();
        var reqData = {LoginSessionKey:$scope.LoginSessionKey,MemberID:memberid,Type:'user'}
        articleService.followUser(reqData).then(function(response){
            if(response.ResponseCode==200){
                
                if($('.followmemb'+memberid).children('span').html().trim()=='Follow'){
                    $('.followmemb'+memberid).children('span').html('Following');
                    $('.followmemb'+memberid).find('i').addClass('icon-check');
                    $('.followmemb'+memberid).addClass('following');
                    
                    $('#followmem'+memberid).children('span').html('Following');
                    $('#followmem'+memberid).find('i').addClass('icon-check');
                    $('#followmem'+memberid).addClass('following');
                    
                    
                    
                    if($scope.UserID == memberid){
                        /*var followingUserCount = parseInt($('#followingUserCount').html());
                        followingUserCount++;
                        $('#followingUserCount').html(followingUserCount);
                        */
                       
                        var followingUserCount = $('#followerUserCount').html();
                        followingUserCount++;
                        //$('#followerUserCount').html(followingUserCount);
                        $rootScope.follow.fnoOfObj += 1;

                    } else if($scope.UserID==$scope.LoggedUserID){
                        var followingUserCount = parseInt($('#followingUserCount').html());
                        followingUserCount++;
                        $('#followingUserCount').html(followingUserCount);
                    }
                    
                    followerCounts = parseInt($('.memberFollowerCount'+memberid).html());
                    $('.memberFollowerCount'+memberid).html(followerCounts+1);
                    //  followerCounts = parseInt($(event.currentTarget).parent().children().find('.followerCounts').html());
                    //  $(event.currentTarget).parent().children().find('.followerCounts').html(followerCounts+1);

                } else {
                    $('.followmemb'+memberid).children('span').html('Follow');
                    $('.followmemb'+memberid).find('i').removeClass('icon-check');
                    $('.followmemb'+memberid).removeClass('following');
                    
                    $('#followmem'+memberid).children('span').html('Follow');
                    $('#followmem'+memberid).find('i').removeClass('icon-check');
                    $('#followmem'+memberid).removeClass('following');
                    if($scope.UserID==memberid){    
                        /*var followingUserCount = parseInt($('#followingUserCount').html());
                        followingUserCount--;
                        $('#followingUserCount').html(followingUserCount);
                        */
                        var followingUserCount = $('#followerUserCount').html();
                        followingUserCount--;
                        //$('#followerUserCount').html(followingUserCount);
                        $rootScope.follow.fnoOfObj -= 1;

                    } else if($scope.UserID==$scope.LoggedUserID){
                        var followingUserCount = parseInt($('#followingUserCount').html());
                        followingUserCount--;
                        $('#followingUserCount').html(followingUserCount);
                    }
                    followerCounts = parseInt($('.memberFollowerCount'+memberid).html());
                    $('.memberFollowerCount'+memberid).html(followerCounts-1);
                    //followerCounts = parseInt($(event.currentTarget).parent().children().find('.followerCounts').html());
                    //$(event.currentTarget).parent().children().find('.followerCounts').html(followerCounts-1);
                }
            }else if(response.ResponseCode==501){
                openPopDiv('signin', 'bounceInDown');
                
            }else{
                alertify.error(response.Message);
            }
        });
                $('.loader-signup').hide();
    }

    //Get highlighted text
    /*$scope.getHighlighted = function(str){
        if(typeof str==='undefined'){
            str = '';
        }
        if(str.length>0 && $('#srch-filters').val().length>0){
            str = str.replace(new RegExp($('#srch-filters').val(), 'gi'), '<span class="highlightedText">$&</span>');
        }
        return str;
    } */


    
    
    /*$scope.checkhotspotTags = function(hotspotTag){
        var itemId = articleService.get_hoverArticleItem();
        if(itemId == hotspotTag.ItemGuID){
            return true;
        }else{
            return false;
        }
        
    }*/

    $scope.filterHotspot = function(hotspotTag) {
        console.log('filterHotspot', hotspotTag, hotspotTag.FromLeft >= 0 && hotspotTag.FromTop >= 0);
        return hotspotTag.FromLeft >= 0 && hotspotTag.FromTop >= 0;
    };
                    
    /*
     * Function Name: userFollowPage
     * Description: remove article confirm box
     */
    $scope.removeArticleCnfrm = function (ProfileArticles,key,isSaveArticle) {
        
        $scope.removeArticleGuID = ProfileArticles.ArticleGuID;
        $scope.removeArticleName = ProfileArticles.Title;
        $scope.removeArticlekey = key;
        $scope.isSaveArticle = isSaveArticle;
        openPopDiv('removearticle');
        
    }; 
    
    /*
     * Function Name: removeArticle
     * Description: remove article 
     */
    $scope.removeArticle = function () {
        $('.loader-signup').show();
        closePopDiv('removearticle');
        
        $scope.LoginSessionKey = ''; 
        if ($('#LoginSessionkey').val()!='')
        {
            $scope.LoginSessionKey = $('#LoginSessionKey').val();
        }
        
        var reqData = {LoginSessionKey: $scope.LoginSessionKey, ArticleGuID :$scope.removeArticleGuID};
        articleService.delete_article(reqData).then(function (response) {
            if(response.ResponseCode==201){
                if($scope.isSaveArticle){
                    
                    $rootScope.UserSavedArticles.splice( $scope.removeArticlekey , 1);
                    
                }else{
                    $rootScope.UserProfileArticles.splice( $scope.removeArticlekey , 1);
                }
                
                $('#imageDetail').hide();
                
                //if ($rootScope.ArticlePageNo == 1) {
                    setTimeout(function () {
                        $('#expanderGrid1 > li:first > a .product-img').trigger('click');
                    }, 2000);

                //}
                
                alertify.success(response.Message);
            }else{
                alertify.error(response.Message);
            }

        }), function (error) {
        }
        $('.loader-signup').hide();
    };

    /*
     * Function Name: getTopUsers
     * Description: get top users for follow after signup
     */
    $scope.getTopUsers = function(){
        $scope.topUsers = [];
        $('.loader-signup').show();
        var reqData = {LoginSessionKey: $scope.LoginSessionKey, UserGuID :$scope.UserGUID,PageSize:10,PageNo:1};
        articleService.get_topUsers(reqData).then(function(response){
            if(response.ResponseCode==200){
                $scope.topUsers = response.Data;
            }
            $('.loader-signup').hide();
        });
        
    };
    $scope.topItems = [];

    /*
     * Function Name: getTopItems
     * Description: get top items to clip save aftr signup
     */
    $scope.getTopItems = function () {
        $scope.topItems=[];
        $('.loader-signup').show();
        var reqData = {
            PageSize:10,
            LoginSessionKey: $scope.LoginSessionKey,
            PageNo:1,
            TopItems:1
        };
        articleService.get_SearchItem(reqData).then(function (response) {
            if(response.Data.length > 0){
                $scope.topItems = response.Data;
            }
            $('.loader-signup').hide();
        }), function (error) {
            //error code goes here
            $('.loader-signup').hide();
        }

    };

    $scope.topArticles = [];
    /*
     * Function Name: SetSeletcedItemColor
     * Description: clic on item clor in listing for search
     */
    $scope.SetSeletcedItemColor = function(ColorName){
        $scope.ItemColor.Name = ColorName;
        $scope.SeletcedItemColor = ColorName;
        $location.path('/clothings/Color/'+$scope.SeletcedItemColor);
    }

    /*
     * Function Name: SetSeletcedItemCategory
     * Description: clic on item category in listing for search
     */
    $scope.SetSeletcedItemCategory = function(srchItm){
        $scope.ItemCategory.ItemMasterCategoryLevel = srchItm.ItemMasterCategoryLevel?srchItm.ItemMasterCategoryLevel:'0';
        $scope.ItemCategory.ItemMasterCategoryID = srchItm.CategoryMasterID?srchItm.CategoryMasterID:'0';
        $location.path('/clothings/Category/'+$scope.ItemCategory.ItemMasterCategoryLevel+'/'+$scope.ItemCategory.ItemMasterCategoryID);
    }

    /*
     * Function Name: getTopArticles
     * Description: get top articles for save after signup
     */
    $scope.getTopArticles = function () {
        $scope.topArticles=[];
        $('.loader-signup').show();
        var reqData = {
            PageSize:10,
            LoginSessionKey: $scope.LoginSessionKey,
            PageNo:1,
            TopArticles:1
        };
        articleService.get_TopArticles(reqData).then(function (response) {
            if(response.Data.length > 0){
                $scope.topArticles = response.Data;
            }
            $('.loader-signup').hide();
        }), function (error) {
            //error code goes here
            $('.loader-signup').hide();
        }

    };

    /* 
      function to redirect to clothings 
      search if clothings passed as parameter in url (Routing)
    */
     /*
     * Function Name: routeInit
     * Description: search if clothings passed as parameter in url (Routing)
     */
   $scope.routeInit = function(){
        hash = decodeURIComponent(window.location.hash);
        var arr=hash.split('/');
        if(arr[2]=='Color' || arr[2]=='Category' || arr[2] == 'Brand' || arr[2] == 'StyleTag' || arr[2] == 'StyleTags'|| arr[2] == 'Madein' || arr[2] == 'Size'){
            $scope.setSelected('clothings'); //set clothing tab selected
            $scope.SearchSection = 'clothings';
            switch(arr[2]) {
                case 'Color':
                    $location.path('/clothings/Color/'+arr[3]);              
                    $scope.ItemColor.Name = arr[3];
                    $scope.SeletcedItemColor=$scope.ItemColor.Name;
                    break;
                case 'Category':
                //{{srchItm.ItemMasterCategoryLevel}}/{{srchItm.CategoryMasterID}}
                    level = arr[3];    
                    if(arr[3]==''){
                        level = 0;    
                    }
                    $location.path('/clothings/Category/'+level+'/'+arr[4]);                           
                    $scope.ItemCategory.ItemMasterCategoryLevel = arr[3];
                    $scope.ItemCategory.ItemMasterCategoryID = arr[4];
                    break;
                case 'Brand':
                    $location.path('/clothings/Brand/'+arr[3]); 
                    $scope.ItemBrand.Brand = arr[3];
                    $scope.SeletcedItemBrand=$scope.ItemBrand.Brand;
                    $scope.SearchText = unescape(arr[3]);
                break;
                case 'Madein':
                    $location.path('/clothings/Madein/'+arr[3]); 
                    Madein = unescape(arr[3]);
                break;
                case 'Size':
                    $location.path('/clothings/Size/'+arr[3]); 
                    Size = unescape(arr[3]);
                break;
                case 'StyleTag':              
                    $location.path('/clothings/StyleTag/'+arr[3]); 
                    $scope.SearchText = arr[3];
                break;
                case 'StyleTags':
                    $scope.setSelected('searcharticle'); //set clothing tab selected
                    $scope.SearchSection = 'searcharticle';              
                    $location.path('/searcharticle/StyleTags/'+arr[3]); 
                    $scope.SearchText = arr[3];
                break;
            } 
        }else if(arr[1]=='first'){
            openPopDiv('follow');
            $scope.getTopUsers();
        }else{
            return false;
        }
    }
    $scope.routeInit();   


    $scope.removeHashParam = function(){
        $location.path('/');
    }
    
    
     /*
     * Function Name: setImageRatio
     * Description: set image ratio for slider for proper tagging
     */
    $scope.setImageRatio = function(width,height){//console.log('width'+width);
        var maxWidth = 160; // Max width for the image
        var maxHeight = 192;    // Max height for the image
        var ratio = 0;  // Used for aspect ratio
        //var width = 530;    // Current image width
        //var height = 384;  // Current image height

        // Check if the current width is larger than the max
        if(width > maxWidth){
            ratio = maxWidth / width;   // get ratio for scaling image
            //console.log('new width:'+maxWidth);//$(this).css("width", maxWidth); // Set new width
            //console.log('new height:'+ height * ratio);//$(this).css("height", height * ratio);  // Scale height based on ratio
            height = height * ratio;    // Reset height to match scaled image
            width = width * ratio;    // Reset width to match scaled image
        }

        // Check if current height is larger than max
        if(height > maxHeight){
            ratio = maxHeight / height; // get ratio for scaling image
            //console.log('new height:'+maxHeight);//$(this).css("height", maxHeight);   // Set new height
            //console.log('new width:'+width * ratio);        //$(this).css("width", width * ratio);    // Scale width based on ratio
            width = width * ratio;    // Reset width to match scaled image
            height = height * ratio;    // Reset height to match scaled image
        }
        
        return {width:width,height:height};
    }
    
     /*
     * Function Name: getPositionInPercent
     * Description: set item tage at the proper position
     */
    $scope.getPositionInPercent = function(aspectDimension,tagvalue){
        var margin = 11;
        //console.log(tagvalue.FromTop+'ddd'+aspectDimension.height);
        var tempTop = (tagvalue.FromTop/100)*(aspectDimension.height);
        tempTop -= (margin/2);
        var tempLeft = (tagvalue.FromLeft/100)*(aspectDimension.width);
        tempLeft -= (margin/2);

        return {FromLeft:tempLeft,FromTop:tempTop};

    }
    
     /*
     * Function Name: confirmFlagArticle
     * Description: confirm box for flagging an article
     */
    $scope.confirmFlagArticle = function(ArticleGuID,event){
        if($(event.currentTarget).hasClass("done")){
            $scope.ShowErrorMessage('You have already flagged this Article');
            return;
        }
        $scope.ToFlagArticleGuID = ArticleGuID;
        $scope.ToFlagArticleEvent = event;
        
        openPopDiv('confirmFlagArticle', 'bounceInDown');
        
    }
    
     /*
     * Function Name: flagArticle
     * Description: flagging an article
     */
    $scope.flagArticle = function(ArticleGuID,event){
        if(event){
            event.stopPropagation();
        }
        if($(event.currentTarget).hasClass("done")){
            $scope.ShowErrorMessage('You have already flagged this Article');
            return;
        }

            
        $('.loader-signup').show();
        closePopDiv('confirmFlagArticle');
        var reqData = {LoginSessionKey: $scope.LoginSessionKey,ArticleGuID:ArticleGuID};
        articleService.set_flagArticle(reqData).then(function(response){

            if(response.ResponseCode==200){
                $(event.currentTarget).addClass("done")
                $(event.currentTarget).attr("title","Flagged");
                $rootScope.articleDetail.isFlagged = 1;
                alertify.success(response.Message);
            }else if(response.ResponseCode==501){
                openPopDiv('signin', 'bounceInDown');
            }else{
                alertify.error(response.Message);
            }
            
            
            
            $('.loader-signup').hide();
        });
    }
    
    $scope.ShowErrorMessage = function(Message){
        alertify.error(Message);
    }

    $scope.showTooltip = function(){
        $('[data-rel="tipsyn"]').tipsy({fade: true, gravity: 'n'});
    }

});




//Routing configuration for search page
articleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/searcharticle', {
        templateUrl: base_url+'searcharticle'
      }).
      when('/searcharticle/:Type/:TypeId', {
        templateUrl: base_url+'searcharticle'
      }).
      when('/clothings', {
        templateUrl: base_url+'clothings'
      }).
      when('/clothings/:Type/:TypeId', {
        templateUrl: base_url+'clothings'
      }).
      when('/clothings/:Type/:TypeId/:TypeId2', {
        templateUrl: base_url+'clothings'
      }).
      when('/fashionweb', {
        templateUrl: base_url+'fashionweb',
      }).
      otherwise({
        redirectTo: '/searcharticle'
      });
  }]);
