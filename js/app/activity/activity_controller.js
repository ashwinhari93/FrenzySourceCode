/*	Controller(s)
 ===================================*/

/*** activity Controller ***/
angular.module('App').controller('activityCtrl', function ($scope,$rootScope,$http,activityService,wardrobeService,articleService,$timeout,$interpolate,$window) {
    
    $scope.UserActivities = [];
    $rootScope.disableActivityPagination = true;
    $scope.paginationbusyActivity = false;
    $scope.ActivityPageNo = 1;
    
    if(!$rootScope.isActivityTabActive)
        $rootScope.isActivityTabActive = false;
    
    if ($('#LoginSessionkey').val()!='')
    {
        $scope.LoginSessionKey = $('#LoginSessionKey').val();
    }

    if ($('#UserGUID').val()!='')
    {
        $scope.UserGUID = $('#UserGUID').val();
    }
    
    if ($('#UserID').val()!='')
    {
        $scope.UserID = $('#UserID').val();
    }
    
    
    /*
     * Function Name: getUserActivity
     * Description: Get the user activity for activity tab, setting initial variable for activity db call
     */

    $rootScope.getUserActivity = function () {

        $('.create-item-dropdown-profile').hide();
        $('.WardrobeNewTooltip').hide();
        $('.create-article-dropdown-profile').show();
        $rootScope.disableActivityPagination = false;
        $rootScope.disablegetWardrobesPagination = true;
        $rootScope.disableFollowFollowingPagination = true;
        $rootScope.disableArticlePagination = true;
        
       // $('#navigation').spasticNav();
        
        $('.user-wall-pagecontent').hide();
        $('#user-wall-activity').show();
        $('.load-more').show();
        $scope.ActivityPageNo = 1;
        $scope.UserActivities = [];
        $rootScope.isWardrobeTabActive = false;
        $rootScope.isArticleTabActive = false;
        $rootScope.isActivityTabActive = true;

        $scope.getActivity();
    }
    
    /*
     * Function Name: getActivity
     * Description: Get the user activity for activity tab
     */
    $scope.getActivity = function () {
        $scope.paginationbusyActivity = true;
        $scope.activityNotFoundFlag = false;
       // console.log($rootScope.isActivityTabActive);
        var reqData = {LoginSessionKey: $scope.LoginSessionKey, PageNo :$scope.ActivityPageNo, UserID:$scope.UserID};
        activityService.get_userActivity(reqData).then(function (response) {
                    //console.log('$rootScope.isActivityTabActive'+$rootScope.isActivityTabActive);
                    if($rootScope.isActivityTabActive) {
                        $("#navigation li").removeClass('selected');
                        $("#profileNavigationActivity").addClass('selected');
                    }

                    if(response.ResponseCode==200){
                        $.each(response.Data, function(key) {
                            //$scope.User = response.Data[key].ExtraParams.Entity.FirstName+' '+response.Data[key].ExtraParams.Entity.LastName ;
                            $scope.User = '';
                            response.Data[key].Message = $scope.$eval($interpolate(response.Data[key].Message));
                            $scope.UserActivities.push(response.Data[key]);
                        });
                        
                        if($scope.UserActivities.length == 0){
                            $scope.activityNotFoundFlag = true;
                        }

                        $scope.ActivityPageNo++;
                        $scope.paginationbusyActivity = false;
                        
                        if (response.Data.length < response.PageSize) {
                            $rootScope.disableActivityPagination = true;
                        }
                        
                    }
                    //$('[data-rel="tipsyn"]').tipsy({fade: true, gravity: 'n'});
            }), function (error) {
            //$('.loader-signup').hide();
        }
    }
    
    
    /*
     * Function Name: viewItemDetails
     * Description: Handle click on item in activity tab
     */
    $scope.viewItemDetails = function(wardrobeItem){
        
        
        if(wardrobeService.get_clipItemCliked()){
            wardrobeService.set_clipItemCliked(false);
            return;
        }
        
        var brandItemName = wardrobeItem.Title;
        
        if(wardrobeItem.Brand !== ""){
            brandItemName = wardrobeItem.Brand + ' ' +brandItemName;
        }
        
        brandItemName = brandItemName.replace(/ /g,"-");
        brandItemName = brandItemName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        brandItemName = angular.lowercase(brandItemName);
        
	$window.open(site_url+'item/'+brandItemName+'/'+wardrobeItem.ItemGuID, '_blank');
    } 
    
       
    /*
     * Function Name: viewItemDetailsComment
     * Description: Handle click on item comments in activity tab
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
     * Description: Handle click on item share in activity tab
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
     * Function Name: viewArticleDetails
     * Description: Handle click on article in activity tab
     */
    $scope.viewArticleDetails = function(Article){
        
        var articleName = Article.Title

        articleName = articleName.replace(/ /g,"-");
        articleName = articleName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        articleName = angular.lowercase(articleName);
        
	$window.open(site_url+'article/'+articleName+'/'+Article.ArticleGuID, '_blank');
    } 
    
    /*
     * Function Name: viewArticleDetailsComment
     * Description: Handle click on article comments in activity tab
     */
    $scope.viewArticleDetailsComment = function(Article,event){
        
        if(event)
            event.stopPropagation();
        
        var articleName = Article.Title

        articleName = articleName.replace(/ /g,"-");
        articleName = articleName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        articleName = angular.lowercase(articleName);
        
	$window.open(site_url+'article/'+articleName+'/'+Article.ArticleGuID+'/##comment', '_blank');
    }
    
    /*
     * Function Name: viewArticleDetailsShare
     * Description: Handle click on article share in activity tab
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
     * Function Name: redirectToSource
     * Description: Common function to handle click on source url for item and article
     */
    $scope.redirectToSource = function(source,event){
        
        if(event)
            event.stopPropagation();
        
        $window.open(source, '_blank');
    }

    /*
     * Function Name: saveArticle
     * Description: Function to save an article to logged in user's saved articles
     */
    $scope.saveArticle = function (articleGuID,event) {
        if( $(event.currentTarget).hasClass('done')){
            return;
        }
        
        $('.loader-signup').show();
        var reqData = {LoginSessionKey: $scope.LoginSessionKey, articleGuID: articleGuID};
        
        articleService.saveArticle(reqData).then(function(response){
            
            if(response.ResponseCode==200){

                /*
                $(event.currentTarget).find('i').addClass('icon-check');
                $(event.currentTarget).addClass('done');
                $(event.currentTarget).find('span').html('Saved');*/
                
                var classActArtSaveButton= '.activity-article-save-button-'+articleGuID;
                $(classActArtSaveButton).find('i').addClass('icon-check');
                $(classActArtSaveButton).addClass('done');
                $(classActArtSaveButton).find('span').html('Saved');
                
                var classActArtSaveCount = '.activity-article-save-'+articleGuID;
                $(classActArtSaveCount).html(parseInt($(classActArtSaveCount).html())+1);
                $(classActArtSaveCount).prev('i').addClass('icon-save-view');

                alertify.success(response.Message);  
            }else if(response.ResponseCode==501){
                openPopDiv('signin', 'bounceInDown');
                
            }else{
              
                alertify.error(response.Message);
            }
            
            $('.loader-signup').hide();
            
        });
        
        event.stopPropagation();

    }
    
    /*
     * Function Name: viewItemOptions
     * Description: Function to show the fade effect of item
     */
    $scope.viewItemOptions = function(event){
        if(event)
            event.stopPropagation();
        $(event.currentTarget).next('.info').fadeIn();
        $(event.currentTarget).next('.info').addClass('infoOpen');
        //$(event.currentTarget).parent('.img').next('.info').fadeIn();
    }

    /*
     * Function Name: openItemBottom
     * Description: Function to show bottom section in item
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
    
    /*
     * Function Name: viewArticleOptions
     * Description: Function to show the fade effect of article
     */
    $scope.viewArticleOptions = function(event){
        if(event)
        event.stopPropagation();
        $(event.currentTarget).next('.info').fadeIn();
        $(event.currentTarget).next('.info').addClass('infoOpen');
        //$(event.currentTarget).parent('.img').next('.info').fadeIn();
    }
     /*Share variables*/
    $rootScope.shareUrl = '';
    $rootScope.shareImage = '--';
    $rootScope.shareTitle = '';

    /*
     * Function Name: SetItemShareDetails
     * Description: Function to set share params for items for share this
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
            $rootScope.shareImage = image_server_path+'uploads/item/530x610/'+Item.Images[0].ImageName;
        }

        $rootScope.shareTitle = Item.Title;
        openPopDiv('commonShare', 'bounceInDown');
        $scope.loadShareThis();
    }

    /*
     * Function Name: SetArticleShareDetails
     * Description: Function to set share params for article for share this
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
            $rootScope.shareImage = image_server_path+'uploads/article/530x610/'+Article.Images[0].ImageUrl;    
        }
        $rootScope.shareTitle = Article.Title;

        openPopDiv('commonShare', 'bounceInDown');
        $scope.loadShareThis();
    }

    /*
     * Function Name: loadShareThis
     * Description: Initialize sharethis, caled everytime share button is clicked
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
    
    $scope.disableBubbling = function(event){
        if(event)
            event.stopPropagation();
        
        
    }
    $scope.showTooltips = function(){ 
        $timeout(function(){
            angular.element('[data-rel="tipsyn"]').tipsy({fade: true, gravity: 'n'});
        },500);
        
         
    }
});
