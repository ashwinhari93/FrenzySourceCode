/*	Controller(s)
 ===================================*/

/**** wardobe Controller ***/
angular.module('App').controller('itemDetailCtrl', function ($scope,$filter,$rootScope,$http,$window,itemDetailService, tmpJson, $timeout,$anchorScroll,$location) {
    
    $scope.itemDetail = [];
    $scope.LoginSessionKey = '';
    $scope.tags = '';
    ArticleGuID='';
    $rootScope.uesrCreatedWardrobeList = [];
    $scope.wardrobeForClip = '';
    $scope.clipItemFormsubmitted=false;
    $rootScope.ItemGuIDForClip = '';
    $scope.wardrobeForClip = '';
    $scope.clipedItemUsers = {};
    $rootScope.TagedItemDetail = [];
    
    /*item pagination*/
    $scope.currentPage = 1;
    $scope.pageSize = 3;
    /*end item pagination*/
    
    
    if($location.hash()=='comment'){
        $anchorScroll();
    }
    
    if($location.hash()=='share'){
        openPopDiv('shareit', 'bounceInDown');
    }
    
    $scope.LoginSessionKey = '';
    if ($('#LoginSessionkey').val()!='')
    {
        $scope.LoginSessionKey = $('#LoginSessionKey').val();
    }
    
    /*
     * Function Name: getItemDetail
     * Description: Get the item details, function used at multiple locations
     */
    $scope.getItemDetail = function(ItemGuID,runway){
        var reqData = {LoginSessionKey: $scope.LoginSessionKey,ItemGuID:ItemGuID};
        itemDetailService.get_itemDetail(reqData).then(function (response) {

            $scope.itemDetail = response.Data;
            if(runway==undefined){
                //get same brand items
                $scope.getBrandItem($scope.itemDetail.Brand,$scope.LoginSessionKey,ItemGuID);
                $scope.getTagedArticles(ItemGuID,ArticleGuID,$scope.LoginSessionKey);
            }
        }), function (error) {
        } 
    }
	 $scope.showCheckBox = false;
    $scope.switchSortCloseFlag = function(){			    
			$scope.showCheckBox = $scope.showCheckBox ? false : true;    
    }

    $scope.IsVisible = false;
    $scope.ShowHide = function (ItemGuID,ItemGuIDImage,ItemGuIDBrand) {
    				
    				 $scope.IsVisible = false;
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = $scope.IsVisible ? false : true;
                setBXViewPortHeight(); //refer to main.js
                setOpacityBackGroundShopPopUp();
                $scope.ItemGuID = ItemGuID;
                $scope.ImageArrayItem = ItemGuIDImage;
                $scope.ItemArrayBrand = ItemGuIDBrand;
					 $scope.sameBrand(ItemGuID,1); 
            }

    /*
     * Function Name: populateItemDetail
     * Description: Function used to set the fetched item 
     */
    $scope.populateItemDetail = function(ItemGuID,runway){
        $.each($rootScope.itemDetails, function(key,val) {
            if(ItemGuID == val.ItemGuID) {
                $scope.itemDetail = val;
            }
        });
   }
	 /*Function Name: getLowerPrices
	  * Description: Get all item details of prices lower than the specified ItemGuid
	  *	 
	 */
	 $scope.lowerPrices = function(ItemGuID,runway){
	 	$scope.itemDetails = null;
	 	$('#myGif').show();
     	$scope.FirstCheck = false;
		$scope.SecondCheck = false;
		$scope.ThirdCheck = true;

		var reqData = {LoginSessionKey: $scope.LoginSessionKey,ItemGuID:ItemGuID};
		console.log(ItemGuID);
		itemDetailService.get_itemLowerPrices(reqData).then(function(response){
			 console.log("AM HERE");	
			 $scope.IsVisible = true;		
			 $scope.itemDetails = response.Data;
			 console.log(response.Data);
			 $('#myGif').hide();
		}),function(error){
		}
	 }
	 
    /*
     * Function Name: getItemsDetail
     * Description: Get all item details tagged by passing item GUIDs array
     */
    $scope.getItemsDetail = function(Items,runway){
        var ItemGuIDs = [];
        $('#myGif').show();
        $scope.IsVisible = false;
        $.each(Items, function(key,val) {
            ItemGuIDs.push(val.ItemGuID)
        });
        
        var reqData = {LoginSessionKey: $scope.LoginSessionKey,ItemGuIDs:ItemGuIDs};
        itemDetailService.get_itemsDetail(reqData).then(function (response) {

            $scope.itemDetails = angular.fromJson(response.Data);
            console.log($scope.itemDetails);
            $scope.tempItemDetails = $scope.itemDetails;
            $('#myGif').hide();
        }), function (error) {
        }

    }
    var imageUrl = '/assets/img/Shopsimilar(mouseover)-1.gif';
	 $scope.decachedImageUrl = imageUrl + '?decache=' + Math.random();
    /*
     * Function Name: getItemDetailInView
     * Description: Get item details for item detail page to increment the view count
     */
    $scope.getItemDetailInView = function(ItemGuID,runway){
        var reqData = {LoginSessionKey: $scope.LoginSessionKey,ItemGuID:ItemGuID};
        itemDetailService.get_itemDetailInView(reqData).then(function (response) {

            $scope.itemDetail = response.Data;
            if(runway==undefined){
                //get same brand items
                $scope.getBrandItem($scope.itemDetail.Brand,$scope.LoginSessionKey,ItemGuID);
                $scope.getTagedArticles(ItemGuID,ArticleGuID,$scope.LoginSessionKey);            
            }
        }), function (error) {
        } 
    }

    /*
     * Function Name: getTagedItemDetail
     * Description: Get item details a single tagged item in article
     */
    $scope.getTagedItemDetail = function(ItemGuID,runway){
        var reqData = {LoginSessionKey: $scope.LoginSessionKey,ItemGuID:ItemGuID};
        itemDetailService.get_itemDetail(reqData).then(function (response) {
            $rootScope.TagedItemDetail = response.Data;
        }), function (error) {
        } 
    }

    $scope.sortMe = function(val){
    	 $scope.$itemDetails = null;
	    if(val == 2){
       		$scope.tempz = $filter('orderBy')($scope.itemDetails,'PriceFloat');	    
		      $scope.mostPopular = false;
   		 	$scope.newArrivals = false;
    			$scope.lowPrices = true;
    			$scope.highPrices = false;
	    }
	    else if(val == 3){
       		$scope.tempz = $filter('orderBy')($scope.itemDetails,'-PriceFloat');
       		$scope.mostPopular = false;
			   $scope.newArrivals = false;
	    		$scope.lowPrices = false;
    			$scope.highPrices = true;
	    
	    }
	    else if(val == 0){
				$scope.tempz = $filter('orderBy')($scope.itemDetails,'-NoOfViews');	    
	    		$scope.mostPopular = true;
    			$scope.newArrivals = false;
    			$scope.lowPrices = false;
    			$scope.highPrices = false; 
	    }
	    else if(val == 1){
				$scope.tempz = $filter('orderBy')($scope.itemDetails,'ModifiedDate');	    
				$scope.mostPopular = false;
    			$scope.newArrivals = true;
    			$scope.lowPrices = false;
    			$scope.highPrices = false;
	    }
	    $scope.itemDetails = $scope.tempz;
       $timeout(function() {
       articleLook();  
       }, 0); // wait...
       $timeout(function () {
       shopPopupLook();
       },0);
	    console.log($scope.itemDetails);
    }
	 /*
	 * Function Name: getSameCategoryColor
	 * Description : this function calls get_itemSameCategoryColor in item_services.js 
	 */
	 $scope.sameCategoryColor = function (ItemGuID, runway) {
	 	$scope.itemDetails = null;
	 	$('#myGif').show();
	 	$scope.FirstCheck = false;
		$scope.SecondCheck = true;
		$scope.ThirdCheck = false;
		var reqData = {LoginSessionKey: $scope.LoginSessionKey,ItemGuID:ItemGuID};
		console.log(ItemGuID);
		itemDetailService.get_itemSameCategoryColor(reqData).then(function(response){
			 $scope.IsVisible = true;		
			 $scope.itemDetails = response.Data;
			 console.log(response.Data);
			 $('#myGif').hide();
		}),function(error){
		}
    }
    /*
    Function Name: reviveShopWidgetState
    To revive the original shop widget view on back button click
    */
    $scope.reviveShopWidgetState = function(){
    	$('#myGif').show();
    	$scope.itemDetails = $scope.tempItemDetails;
    	$scope.IsVisible = false;
    	setOpacityBackGroundShopPopUpShopWidget();
    	//set arrow position
    	//set save and buy buttons not sure
    	$('#myGif').hide();
    }
    /*
    * Function Name: getSameBrand
    */
    $scope.sameBrand = function (ItemGuID, runway) {
    	$scope.itemDetails = null;    	
		$('#myGif').show();
    	$scope.FirstCheck = true;
		$scope.SecondCheck = false;
		$scope.tempItemId = ItemGuID;
		$scope.ThirdCheck = false;
		var reqData = {LoginSessionKey: $scope.LoginSessionKey,ItemGuID:ItemGuID};
		console.log(ItemGuID);
		itemDetailService.get_itemSameBrand(reqData).then(function(response){
			 console.log("AM HERE");	
			 $scope.IsVisible = true;		
			 $scope.itemDetails = response.Data;
			 console.log(response.Data);
		    $('#myGif').hide();
		}),function(error){
		}

    }
    /*
     * Function Name: redirectToSource
     * Description: Common function to redirect to source of item and article
     */
    $scope.redirectToSource = function(source,event){
         if(event)
            event.stopPropagation();
        $window.open(source, '_blank');
    }

    /*
     * Function Name: getBrandItem
     * Description: Function to get the items which belongs to given brand
     */
    $scope.getBrandItem = function(brand,LoginSessionKey,ItemGuID){
        var reqData = {LoginSessionKey: LoginSessionKey,Brand:brand,PageSize:7,Random:1};
        itemDetailService.get_BrandItem(reqData).then(function (response) {

            $scope.brandItem = response.Data;
            $scope.cntr = [];
            $scope.brandItem2 = [];
            itemCount = 0;
            $.each(response.Data, function(key,val) {
               if(ItemGuID!=val.ItemGuID && itemCount < 6){
                    $scope.brandItem2.push(val);
                    itemCount++;
               }
            });
            $scope.itemCount = itemCount;
        }), function (error) {
        } 
    }

    /*
     * Function Name: getTagedArticles
     * Description: Function to get the article items which are taged in the given item
     */
    $scope.getTagedArticles = function(ItemGuID,ArticleGuID,LoginSessionKey){
        var reqData = {LoginSessionKey: LoginSessionKey,ItemGuID:ItemGuID,ArticleGuID:ArticleGuID,PageSize:'',Random:1};
        itemDetailService.get_ItemArticles(reqData).then(function (response) {
            $scope.TotalTagedArticles = response.Data.length;
            $scope.countTagedArticles = response.TotalRecords;
            $scope.TagedArticles = response.Data;
            //console.log($scope.TagedArticles);
        }), function (error) {//
        } 
    }

    /*
     * Function Name: layoutDone
     * Description: Function that initializes the slider
     */
    $scope.layoutDone = function() {
          $timeout(function() {
                articleLook();  
                }, 0); // wait...
    }
    
    /*
     * Function Name: clipItem
     * Description: Function that opens the clip popup
     */
    $scope.clipItem = function(ItemGuID,event){
        if(event){
            event.stopPropagation();
        }
        if($(event.currentTarget).hasClass("done")){
            return;
        }

            
        $('.loader-signup').show();
        var reqData = {LoginSessionKey: $scope.LoginSessionKey};
        itemDetailService.get_uesrWardrobeList(reqData).then(function(response){

            if(response.ResponseCode==200){
                $rootScope.uesrCreatedWardrobeList = response.Data;
                $rootScope.ItemGuIDForClip = ItemGuID;
                openPopDiv('clipitempopup', 'bounceInDown');
                itemDetailService.set_event(event);
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
     * Description: Function that saves the clipped item
     */
    $scope.saveClipItem = function ($validFlag) {
        $scope.clipItemFormsubmitted = true;
        if (!$validFlag) {
            return;
        }

        $('.loader-signup').show();

        var reqData = {LoginSessionKey: $scope.LoginSessionKey, ItemGuID: $rootScope.ItemGuIDForClip,wardrobeForClip: $scope.wardrobeForClip};

        itemDetailService.clipItem(reqData).then(function (response) {

            if (response.ResponseCode == 200) {
                
                /*for article detail page handle clip for shop and tag popup*/
                var event = itemDetailService.get_event();
                if($(event.currentTarget).hasClass("for-shop")){
                    $(event.currentTarget).addClass('cliped');
                    $(event.currentTarget).find('span').text('Clip’d');

                    var forTagClass = '.for-tag-'+$rootScope.ItemGuIDForClip;

                    $(forTagClass).toggleClass('clipping');
                    if ($(forTagClass).hasClass("clipping")) {
                        $(forTagClass).find('span').text('Clip’d');
                        $(forTagClass).find('i').addClass('icon-clip-white');
                        $(forTagClass).find('i').addClass('icon-cliped-black');
                        
                    }
                    
                    /*add class to prevent another click*/
                    $(event.currentTarget).addClass('done');
                    $(forTagClass).addClass('done');
                    



                }else if($(event.currentTarget).hasClass("for-tag")){
                    $(event.currentTarget).toggleClass('clipping');
                    if ($(event.currentTarget).hasClass("clipping")) {
                        $(event.currentTarget).find('span').text('Clip’d');
                        $(event.currentTarget).find('i').addClass('icon-cliped-black');
                    }

                    var forShopId = '#for-shop-'+$rootScope.ItemGuIDForClip;
                    $(forShopId).addClass('cliped');
                    $(forShopId).find('span').text('Clip’d');
                    
                    /*add class to prevent another click*/
                    $(event.currentTarget).addClass('done');
                    $(forShopId).addClass('done');

                }
                /*end for article detail page handle clip for shop and tag popup*/
                
                /*for runway*/
                else if($(event.currentTarget).hasClass("for-shop-runway")){
                    $(event.currentTarget).addClass('cliped');
                    $(event.currentTarget).find('span').text('Clip’d');

                    var forTagClass = '.for-tag-runway-'+$rootScope.ItemGuIDForClip;

                    $(forTagClass).toggleClass('clipping');
                    if ($(forTagClass).hasClass("clipping")) {
                        $(forTagClass).find('span').text('Clip’d');
                        $(forTagClass).find('i').addClass('icon-clip-white');
                    }
                    
                    /*add class to prevent another click*/
                    $(event.currentTarget).addClass('done');
                    $(forTagClass).addClass('done');
                    



                }else if($(event.currentTarget).hasClass("for-tag-runway")){
                    $(event.currentTarget).addClass('cliped');
                    $(event.currentTarget).toggleClass('clipping');
                    if ($(event.currentTarget).hasClass("clipping")) {
                        $(event.currentTarget).find('span').text('Clip’d');
                        $(event.currentTarget).find('i').addClass('icon-cliped-black');
                    }

                    var forShopId = '#for-shop-runway-'+$rootScope.ItemGuIDForClip;
                    $(forShopId).addClass('cliped');
                    $(forShopId).find('span').text('Clip’d');
                    
                    /*add class to prevent another click*/
                    $(event.currentTarget).addClass('done');
                    $(forShopId).addClass('done');
                    
                    $timeout(function() {
                       $rootScope.TagedItemDetail['isclip'] = 1;
                    }, 500); // wait...
                   

                }else if($(event.currentTarget).hasClass('clip-from-activity')){
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
                }else{ /*for item in search section*/
                    
                    var forShopTopClass = '#for-shop-runways-'+$rootScope.ItemGuIDForClip;
                    if($(forShopTopClass).length > 0){
                        $(forShopTopClass).addClass('clipping');
                    }
                    $(event.currentTarget).toggleClass('clipping');
                    if ($(event.currentTarget).hasClass("clipping")) {
                        $(event.currentTarget).find('span').text('Clip’d');
                        $(event.currentTarget).find('i').addClass('icon-cliped-black');
                    }
                }
                /*end for runway*/
                

                $scope.itemDetail.isclip = 1;
                $scope.itemDetail.NoOfSaves = parseInt($scope.itemDetail.NoOfSaves)+1;
                
                closePopDiv('clipitempopup')
                alertify.success(response.Message);  
            } else if (response.ResponseCode == 501) {
                openPopDiv('signin', 'bounceInDown');

            } else {

                alertify.error(response.Message);
            }

            $('.loader-signup').hide();
        });

    }
    
    /*
     * Function Name: getItemUrl
     * Description: Function generates the item URL as per name
     */
    $scope.getItemUrl = function(Item){
        var brandItemName = Item.Title
        
        if(Item.Brand !== ""){
            brandItemName = Item.Brand + ' ' +brandItemName;
        }
        
        brandItemName = brandItemName.replace(/ /g,"-");
        brandItemName = brandItemName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        brandItemName = angular.lowercase(brandItemName);
        
	return 'item/'+brandItemName+'/'+Item.ItemGuID;
        
        
    } 
    
    /*
     * Function Name: getArticleUrl
     * Description: Function generates the article URL as per name
     */
    $scope.getArticleUrl = function(Article){
        var ArticleName = Article.Title

        
        ArticleName = ArticleName.replace(/ /g,"-");
        ArticleName = ArticleName.replace(/[^a-zA-Z0-9-_]+/ig,'');
        ArticleName = angular.lowercase(ArticleName);
        
	return 'article/'+ArticleName+'/'+Article.ArticleGuID;
        
        
    } 
    
    /*
     * Function Name: getClipedItemUsers
     * Description: Function that gets the list of users who have clipped  particular item
     */
    $scope.getClipedItemUsers = function(itemGuID,clipCount){
        if(clipCount>0){
            $('.loader-signup').show();
            var reqData = {ItemGuID: itemGuID}; 
            itemDetailService.getClipedItemUsers(reqData).then(function (response) {
            if (response.ResponseCode == 200) {
                $scope.clipedItemUsers = response.Data;
                openPopDiv('clipitemusers', 'bounceInDown');
            }
            
        });
        }
        $('.loader-signup').hide();
    }

    /*
     * Function Name: viewItemDetailsComment
     * Description: Function that redirects to item comments
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
     * Description: Function that redirects to item share
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
     * Description: Function that opens the item overlay
     */
     $scope.viewItemOptions = function(event){
      
        if(event)
         event.stopPropagation();
        $(event.currentTarget).next('.info').fadeIn();
        $(event.currentTarget).next('.info').addClass('infoOpen'); 
        $(event.currentTarget).addClass('info-show');  
        
        //$(event.currentTarget).children('.img').children('.btn-dollor').hide();
    }
    
    /*
     * Function Name: confirmFlagItem
     * Description: Function that asks for confirmation of flagging an item
     */
    $scope.confirmFlagItem = function(ItemGuID,event){
        if($(event.currentTarget).hasClass("done")){
            $scope.ShowErrorMessage('You have already flagged this Item');
            return;
        }
        $scope.ToFlagItemGuID = ItemGuID;
        $scope.ToFlagItemEvent = event;
        
        openPopDiv('confirmFlagItem', 'bounceInDown');
        
    }
    
    /*
     * Function Name: flagItem
     * Description: Function that flags the item
     */
    $scope.flagItem = function(ItemGuID,event){
        if(event){
            event.stopPropagation();
        }
        if($(event.currentTarget).hasClass("done")){
            $scope.ShowErrorMessage('You have already flagged this Item');
            return;
        }

            
        $('.loader-signup').show();
        closePopDiv('confirmFlagItem');
        var reqData = {LoginSessionKey: $scope.LoginSessionKey,ItemGuID:ItemGuID};
        itemDetailService.set_flagItem(reqData).then(function(response){

            if(response.ResponseCode==200){
                $(event.currentTarget).addClass("done")
                $(event.currentTarget).attr("title","Flagged");
                
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
     * Function Name: ShowErrorMessage
     * Description: Common function to show error message on the page
     */
    $scope.ShowErrorMessage = function(Message){
        alertify.error(Message);
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


