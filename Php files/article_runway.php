<!--Main wrapper-->
</script>

<div class="main-wrapper" ng-controller="articleCtrl" ng-init="getRunwayTabs()">
  
  <div class="update-view" ng-click="changeRunwayTabs(RunwayActiveTab)">
    <i class="icon-update" data-ng-show="NewArticleCount!=''" data-ng-cloak></i>
    <i class="icon-update noupdateshow" ng-if="NewArticleCount==''" data-ng-cloak></i>

  </div> 


  
  <div class="updatedtip noupdate">No Updates</div>
  <!--<div class="updatedtip" data-ng-cloak data-ng-show="NewArticleCount!==''" ng-bind="NewArticleCount"></div>-->
  <div class="updatedtip" data-ng-if="NewArticleCount!==''" ng-bind="NewArticleCount" data-ng-cloak></div>

  <?php $this->load->view('article/featured_slider');?>
  
  <aside class="content-wrapper paddingWrap">
    <nav class="navigation runway-navigation"> 
      <a href="javascript:void(0);" class="visible-phone mobileSubnav">
      <span id="currentTab">Recently Added</span> <i class="icon-mobilesub">&nbsp;</i>
      </a>

      <ul id="navigation" class="hidden-phone" ng-cloak>
        <li id="runwayNavigationRecentAdded" >
            <a href="javascript:void(0);" ng-disabled="runwayTabFlag" ng-click="changeRunwayTabs('RecentAdded')">Recently Added</a>
        </li>

        <li id="runwayNavigationMostPopular" >
          <a href="javascript:void(0);" ng-disabled="runwayTabFlag" ng-click="changeRunwayTabs('MostPopular')">Popular</a>
        </li>

        <li id="runwayNavigation{{RunwayTabs[0].tabName}}" >
          <a href="javascript:void(0);" ng-bind="RunwayTabs[0].tabValue" ng-disabled="runwayTabFlag" ng-click="changeRunwayTabs(RunwayTabs[0].tabName)" ></a>
        </li>
        
        <li id="runwayNavigation{{RunwayTabs[1].tabName}}" >
          <a href="javascript:void(0);" ng-bind="RunwayTabs[1].tabValue" ng-disabled="runwayTabFlag" ng-click="changeRunwayTabs(RunwayTabs[1].tabName)" ></a>
        </li>
        
        <li id="runwayNavigation{{RunwayTabs[2].tabName}}" >
          <a href="javascript:void(0);" ng-bind="RunwayTabs[2].tabValue" ng-disabled="runwayTabFlag" ng-click="changeRunwayTabs(RunwayTabs[2].tabName)" ></a>
        </li>

        <li id="runwayNavigation{{RunwayTabs[3].tabName}}" >
          <a href="javascript:void(0);" ng-bind="RunwayTabs[3].tabValue" ng-disabled="runwayTabFlag" ng-click="changeRunwayTabs(RunwayTabs[3].tabName)" ></a>
        </li>

      </ul>
    </nav>
    
    <div class="tab-content pos-relative" ng-init="getRunwayArticle('RecentAdded')">
      
      <ul class="og-grid expander-grid runway-grid" id="expanderGrid" ng-cloak>
        <li ng-repeat="(key, RunwayArticle) in RunwayArticleData" repeat-done="runwayGridDone();" >
         <a  href="javascript:void(0);" onclick="closeDim()" ng-click="getRunwayArticleDetail(RunwayArticle)" data-title="RunwayArticle.Title" data-description="">
         <span class="icon-new" ng-if="RunwayArticle.isNew=='1'">&nbsp;</span>
          <div class="ih-item square effect13 bottom_to_top">
            <div class="product-img">
                <div class="img">
                  <img thumb-img thumb-type="article" ng-if="RunwayArticle.Images[0]" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=220 thumb-height=220 item="RunwayArticle.Images[0]" alt="img">
                </div>
              <div class="info">
                <div class="info-back">
                  
                  <h3 ng-bind="(RunwayArticle.Title| cut:true:60:' ...')"> </h3>
                  <div class="mrtop20"></div>

                  <h3 ng-if="RunwayArticle.FirstName!=''" ng-bind="'By '+RunwayArticle.FirstName+' '+RunwayArticle.LastName"></h3>
                  <h3 ng-if="RunwayArticle.FirstName==''" ng-bind="'By Author'"></h3>
                  <div class="footer-hrs" ng-bind="RunwayArticle.ModifiedDate"></div>
                </div>
              </div>
            </div>
          </div>
          </a>
        </li>
      </ul>

    <input ng-controller="runwayCtrl" type="hidden" ng-model="LatestDate" ng-click="test(LatestDate)">
	<div class="backButtonImage">     
      <div ng-controller="itemDetailCtrl" id="imageDetail" style="display:none;">
        <div class="image-detail">
          <div class="img-detail-right">
            <div class="img-content" onmouseover="showtags()" onmouseout="hidetags()">
            <button class="button small show-items-button" name="" type="button" ng-show="runwayArticleTag">Show Items</button> 
              <!-- Tad and Shop Popup  -->
              <aside ng-if="runwayArticleItems.length>0" class="shop-popup" id="shopPopup" style="background-color:rgba(0,0,0,0.7);color:white;">
    					      <div ng-if = "!IsVisible"  ng-mouseover="mouseOverClose = true;" ng-mouseleave="mouseOverClose = false;" ng-init="mouseOverClose = false;" ng-model="IsVisible" class="close-this">
									<div ng-if="!mouseOverClose" >      								      							
      							<i class="icon-closepopup1" onclick="closeDim()"></i>
									</div>
									<div ng-if="mouseOverClose" class="close-this">
									<i class="icon-closepopup" onclick="closeDim()"></i>
									</div>								
								</div>
								<div ng-if= "IsVisible" ng-model="IsVisible" class="back-this" ng-mouseover="backState=true" ng-mouseleave="backState=false" ng-init="backState = false">
																		
									<input ng-if="!backState"  class="icon-backpopup1" ng-click="reviveShopWidgetState()" ng-bind="itemDetails+IsVisible" />									
									<div ng-if="backState" class="wow1" ng-model="backState">                                                      									
									<img class="wow" ng-bind="itemDetails+IsVisible" style="width: 60px;height:70px;float: right;margin-top: -110px;border:2px solid grey;" thumb-img alt="" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width="ImageArrayItem.Size > 0 ? 190 : 160" thumb-height="ImageArrayItem.Size > 0 ? 160 : 190" item="ImageArrayItem"/>							
									<div style="background-color:grey; width:115px;height:25px;position: absolute;float: right;box-shadow:-2px -2px 0px #888888;right:-20px;top:-3px;margin-top:-25px;">									
									<img class="OkEnough"  src="/assets/img/backbuttonToolTip.png" style="width:115px;position:absolute;right:2px;top:25px;height:25px;float: right;margin-top: -25px;color: black;" />								   
								   <!--<div class="OkEnough" style="float: right;margin-top: -22px;color: black;">Back To Results</div> -->									
									</div>									
									<input class="icon-backpopup2" ng-click="reviveShopWidgetState()" ng-bind="itemDetails+IsVisible" />															
								</div> 
								</div>
								<div  class="sort-this" ng-model="showCheckBox" ng-mouseover="sortMouseOver=true" ng-mouseleave="sortMouseOver=false" ng-init="sortMouseOver = false;">
									<input ng-if="!sortMouseOver" class="icon-sortbutton1" >
									<div id="sortpopup" ng-if="showCheckBox" style="z-index:20000;position:absolute;background-color:#f5f5f0;float:right;width: 130px;height:110px;opacity:1;margin-top:-80px;margin-right:80px;border: 1px solid black;top:30px;right:-117px;">
                      		<ul style="padding:5px;list-style: none;color:black;"> 
                          		<li><input class = "x1" name="y" value="z" ng-click="sortMe(0)" ng-disabled="mostPopular" ng-bind="itemDetails" type="checkbox" ng-checked="mostPopular" >Most Popular</li>
                          		<li><input class = "x1" name="y" value="z" ng-click="sortMe(1)" ng-disabled="newArrivals" ng-bind="itemDetails" type="checkbox" ng-checked="newArrivals">New Arrivals</li>
                          		<li><input class = "x1" name="y" value="z" ng-click="sortMe(2)" ng-disabled="lowPrices" ng-bind="itemDetails" type="checkbox" ng-checked="lowPrices">Low to High</li>
                          		<li><input class = "x1" name="y" value="z" ng-click="sortMe(3)" ng-disabled="highPrices" ng-bind="itemDetails" type="checkbox" ng-checked="highPrices">High to Low</li>
                      		</ul>
<!--                      		<div  class="CloseSortByPopUp" ng-click="switchSortCloseFlag()" style="z-index:20000;width:20px;height: 20px;position:absolute;float:right;">
                      		<img class="icon-closepopup" src="/assets/img/Closebuttonstate2.png" style="z-index:20000;top:0px;right:0px;color:black;width:15px;height:15px;float: right;">								
									</div>                    		-->	
                    			</div>									
									<div class="nothing" ng-if="sortMouseOver" ng-model="sortMouseOver" ng-click="switchSortCloseFlag()">									
									<img class="icon-sortbutton2"/>
									</div>									 
								</div>							
							
                   <!-- <div class="close-this">
      							<i c
      							lass="icon-closepopup" onclick="closeDim()"></i>
								</div> -->
                <div class="shop-popup-content" style="opacity:1">
         	       <div id="myGif"><img src="../assets/img/loader1.gif" class="ajax-loader"></div>
						 <p ng-if="itemDetails.length == 0" ng-model="itemDetails" style="color:white;font-family:jamesfont;position:absolute;">No Similar Items were found. Please try another search !</p>                   
                  <ul class="product-slider shopProductslider"  ng-init="getItemsDetail(runwayArticleItems)">

                     <li><img src="<?php echo IMAGE_HTTP_PATH; ?>../assets/img/slider-default-img.png"></li>
                      <?php $counter = 0; ?>                      
                      <li data-ng-repeat="(runwayItemKey, runwayItemDetail) in itemDetails" ng-model="itemDetails" ng-mouseenter="showArticleItemDetail($index);counter=true;" ng-mouseleave="counter=false;" ng-init="counter=false;"repeat-done="shoplayoutDone();" style="margin-right:30px;">							
                 	<div ng-if="county" ng-model="county">	
						<div class="popup-header" style="background-color: transparent;height : 30px;margin-bottom: 10px;width:151px;"> 
                  	
                  <div class="cursor-pointer popup-title" style="margin-left:-19px;width:171px;z-index:99999; margin-bottom: 10px;" ng-click="viewItemDetails(showArticleItem)">
                    <label class="label" style="text-align:center;z-index:99999;font-family:jamesfontbold;font-size: 88%; font-weight: bold;" ng-bind="(runwayItemDetail.Brand | cut:true:10:' ...')"></label>
                    <span class="product-name" style="text-align:center;z-index:99999;font-family:jamesfont;font-size: 73%;" ng-bind="(runwayItemDetail.Title | cut:true:35:' ...')"></span> 
                    <span ng-if="runwayItemDetail.StockStatus == 3" class="prduct-cost" style="text-align:center;z-index:99999;font-family:jamesfontbold;color:red;font-size:95%;font-weight: bold;" ng-bind="runwayItemDetail.Price"></span>
                    <span ng-if="runwayItemDetail.StockStatus != 3" class="prduct-cost" style="text-align:center;z-index:99999;font-family:jamesfontbold;color:white;font-size:95%;font-weight: bold;" ng-bind="runwayItemDetail.Price"></span>   
                  </div>
                	</div>
                	</div>
                	<div ng-if="!county" ng-model="county">
                	<div  class="popup-header" style="background-color: transparent;height:30px;margin-bottom: 10px;width:151px;"> 
							<div class="cursor-pointer popup-title" style="margin-left:-19px;width:171px;z-index:99999; margin-bottom: 10px;" ng-click="viewItemDetails(showArticleItem)">
                    <label class="label" style="text-align:center;z-index:99999;font-family:jamesfontbold;font-size: 88%; font-weight: bold;" ng-bind="(runwayItemDetail.Brand | cut:true:10:' ...')"></label>
                    <span class="product-name" style="text-align:center;z-index:99999;font-family:jamesfont;font-size: 73%;" ng-bind="(runwayItemDetail.Title | cut:true:35:' ...')"></span> 
                    <span ng-if="runwayItemDetail.StockStatus == 3" class="prduct-cost" style="text-align:center;z-index:99999;font-family:jamesfontbold;color:red;font-size:95%;font-weight: bold;" ng-bind="runwayItemDetail.Price"></span>   
						  <span ng-if="runwayItemDetail.StockStatus != 3" class="prduct-cost" style="text-align:center;z-index:99999;font-family:jamesfontbold;color:white;font-size:95%;font-weight: bold;" ng-bind="runwayItemDetail.Price"></span>                  
                  </div>                	
                	</div>
						</div>  
						
								<div class= "newSales" ng-model="county" ng-mouseover="county=true" ng-mouseleave="county=false" ng-init="county = false" style="background-color:white;">                        
                        <img class="outerImage" style = "margin-top:6px;margin-bottom: 5px;margin-left: 5px;margin-right: 5px;" thumb-img alt="" ng-click="$parent.viewItemDetails($parent.runwayItemDetail)" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width="runwayItemDetail.Images[0].Size > 0 ? 190 : 160" thumb-height="runwayItemDetail.Images[0].Size > 0 ? 160 : 190" item="runwayItemDetail.Images[0]" >						
								<div id="ShopWidgetOpacityMask" ng-if="county && !IsVisible" ng-model="IsVisible" ng-click="$parent.viewItemDetails($parent.runwayItemDetail)">								
								</div>
								<div id="ShopSimilarOpacityMask" ng-if="county && IsVisible" ng-model="IsVisible" ng-click="$parent.viewItemDetails($parent.runwayItemDetail)">								
								</div>								
								<img ng-if="runwayItemDetail.StockStatus == 3" class="innerImage" src="/assets/img/Saleribbon.png"/>                        
                        </div>
                        <div class="pekka" ng-model="county" ng-mouseover="county=true" ng-mouseleave="county=false">					         
					         <div ng-if = "!IsVisible" ng-model="IsVisible" style="width: 171px;height:55px;background-color:white;"ng-mouseover="count=true" ng-mouseleave="count=false" ng-init="count = false">                           
                        <input class ="GifTester1" type="image"  ng-click="ShowHide(runwayItemDetail.ItemGuID,runwayItemDetail.Images[0],runwayItemDetail.Brand);" style = "margin-left: 5.9px;margin-right: 5px;position: absolute;top:273px;" ng-if="!count" src="/assets/img/ShopSimilar.png" />
                        <img class= "GifTester2" type="image" ng-click="ShowHide(runwayItemDetail.ItemGuID,runwayItemDetail.Images[0],runwayItemDetail.Brand);"  ng-bind="itemDetails" name="shopSimilar"  style = "margin-left: 5.9px;top:273px;margin-right: 5px;position: absolute;" ng-if="count" ng-src="{{decachedImageUrl}}" />					
								</div>
								</div>
														
                      <!--  <span class="add-product-items"> <i class="icon-check-wh"></i></span> -->
                        <div class="shop-popup-action" ng-mouseover="county=true" ng-mouseleave="county=false">
                          <div class="x1" ng-if="!IsVisible" ng-model="IsVisible">
                          <a style="position: absolute;z-index: 99999;top:10px;left: 0px;" id="for-shop-runway-{{runwayItemDetail.ItemGuID}}" ng-if="runwayItemDetail.isclip=='0'" ng-click="clipItem(runwayItemDetail.ItemGuID,$event)" href="javascript:void(0);" class="button-blk clip-link for-shop-runway">
								  <div class="newImage"></div>                        
                            <span>SAVE</span> 
                          </a>
                          </div>
                          <div class="x2" ng-if="IsVisible" ng-model="IsVisible">
                          <a style="position: absolute;z-index: 99999;top:35px;left: 0px;" id="for-shop-runway-{{runwayItemDetail.ItemGuID}}" ng-if="runwayItemDetail.isclip=='0'" ng-click="clipItem(runwayItemDetail.ItemGuID,$event)" href="javascript:void(0);" class="button-blk clip-link for-shop-runway">
								  <div class="newImage"></div>                        
                            <span>SAVE</span> 
                          </a>
                          </div>
                          <div class="x12" ng-if="!IsVisible" ng-model="IsVisible">                           
                          <a style="position: absolute;z-index: 99999;top:10px;left: 0px;" ng-if="runwayItemDetail.isclip!='0'" href="javascript:void(0);" class="button-blk clip-link cliped" data-rel="Clip’d">
                            <span>SAVED</span> 
                          </a>
                          </div>
                          <div class="x22" ng-if="IsVisible" ng-model="IsVisible">                           
                          <a style="position: absolute;z-index: 99999;top:35px;left: 0px;" ng-if="runwayItemDetail.isclip!='0'" href="javascript:void(0);" class="button-blk clip-link cliped" data-rel="Clip’d">
                            <span>SAVED</span> 
                          </a>
                          </div>
								  <div class="x3" ng-if="!IsVisible" ng-model="IsVisible">                          
                          <a id="button_call1" ng-if="runwayItemDetail.SizeID != 109" style="position: absolute;z-index: 99999;top:50px;left: 0px;" id="button_call1" ng-if="runwayItemDetail.StockStatus == 0" onmouseover="button_color1()" onmouseout="button_colorback1()"  ng-click="runwayItemDetail.Source!=''?redirectToSource(runwayItemDetail.Source):'javascript:void(0)'" class="button-blk">BUY</a>
								  </div>
								  <div class="x4" ng-if="IsVisible" ng-model="IsVisible">                          
                          <a id="button_call1" ng-if="runwayItemDetail.SizeID != 109" style="position: absolute;z-index: 99999;top:75px;left: 0px;" id="button_call1" ng-if="runwayItemDetail.StockStatus == 0" onmouseover="button_color1()" onmouseout="button_colorback1()" ng-click="runwayItemDetail.Source!=''?redirectToSource(runwayItemDetail.Source):'javascript:void(0)'" class="button-blk">BUY</a>
								  </div>								  
								  <div class="x5" ng-if="!IsVisible" ng-model="IsVisible">							  
								  <a  ng-if="runwayItemDetail.SizeID == 109"  style="position: absolute;z-index: 99999;top:50px;left: 0px;background-color: rgba(0,0,0,1);" ng-click="runwayItemDetail.Source!=''?redirectToSource(runwayItemDetail.Source):'javascript:void(0)'" class="button-blk">SOLD OUT</a>                        
								  </div>
								  <div class="x6" ng-if="IsVisible" ng-model="IsVisible">							  
								  <a  ng-if="runwayItemDetail.SizeID == 109"  style="position: absolute;z-index: 99999;top:70px;left: 0px;background-color: rgba(0,0,0,1);" ng-click="runwayItemDetail.Source!=''?redirectToSource(runwayItemDetail.Source):'javascript:void(0)'" class="button-blk">SOLD OUT</a>                        
								  </div>                        
                        </div>
                      </li>
                      	
                    <li><img src="<?php echo IMAGE_HTTP_PATH; ?>../assets/img/slider-default-img.png"></li>
                  </ul>
                                  
                        <div class="ShopSimilarCheckBox" ng-if = "IsVisible" ng-model="IsVisible" style="z-index:1000;width: 1989px;margin-top:2px;">
                        	                         
									  <p style="z-index:99999;font-family:jamesfontbold;font-size: 128%; margin-left: 44px;">&nbsp Show Me &nbsp
									  <input id="1" type="checkbox" ng-disabled="FirstCheck" class="ShopSimilarCheck" name="x"  value="y" ng-click="sameBrand(ItemGuID,1)" ng-bind="itemDetails" ng-checked="FirstCheck" ><span style="z-index:99999;font-family:jamesfont;font-size: 75%; font-weight: bold;"> More from  {{ItemArrayBrand | cut:true:10:' ...'}} &nbsp </span>
  									  <input id="2" type="checkbox" ng-disabled="SecondCheck" name="x"  class="ShopSimilarCheck" value="y"  ng-click="sameCategoryColor(ItemGuID,1)" ng-bind="itemDetails" style="color:white;" ng-checked="SecondCheck" ><span style="z-index:99999;font-family:jamesfont;font-size: 75%; font-weight: bold;"> Similar Items &nbsp </span>	
  									  <input id="3" type="checkbox" ng-disabled="ThirdCheck" name="x"  class="ShopSimilarCheck" value="y"  ng-click="lowerPrices(ItemGuID,1)" ng-bind="itemDetails" style="color:white;" ng-checked="ThirdCheck" ><span style="z-index:99999;font-family:jamesfont;font-size: 75%; font-weight: bold;"> Lower Prices	</span>							
							        </p>
                        </div>
						
                </div>

              </aside>
 <div ng-controller="itemDetailCtrl">
                <div class="gallery-tag" onmouseover="hideData()" onmouseout="showData()">
            <div class="gallery-tag-inner" ng-click="viewItemDetails(TagedItemDetail,$event)">

                 <i class="icon-closeb1" ng-click="closeItemDetail($event)"></i>

          <!--       <img style="height:160px" thumb-img alt="" ng-if="TagedItemDetail.Images[0].ImageUrl" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=220 thumb-height=220 item="TagedItemDetail.Images[0]"/> -->
          <!--      <i data-ng-repeat="hotSpotTag in runwayArticleTag | filter:filterHotspot" ng-mouseenter="getTagedItemDetail(hotSpotTag.ItemGuID,1)" class="icon-imgtag" data-type="tagtiprunway" ng-style="{'left':hotSpotTag.FromLeft+'%', 'top':hotSpotTag.FromTop+'%'}"></i>-->
              <img thumb-img alt=""  style="width:160px; height:190px" ng-if="TagedItemDetail.Images[0].ImageUrl" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width="TagedItemDetail.Images[0].Size > 0 ? 190 : 160" thumb-height="TagedItemDetail.Images[0].Size > 0 ? 160 : 190" item="TagedItemDetail.Images[0]" />
                  <div id="maskdisp" class="mask1"></div>
                  <aside class="gallery-tag-cost" ng-if="TagedItemDetail.Price!='$0'" ng-bind="TagedItemDetail.Price"></aside>
                  <a data-rel="Clip’d" ng-if="TagedItemDetail.isclip=='0'" class="button-blk1 clip-link for-tag-runway for-tag-runway-{{TagedItemDetail.ItemGuID}}" ng-click="clipItem(TagedItemDetail.ItemGuID,$event)" href="javascript:void(0);">

                    <span>SAVE</span>
                  </a>

                  <a data-rel="Clip’d" ng-if="TagedItemDetail.isclip!='0'" class="button-blk1 clip-link cliped" href="javascript:void(0);">

                    <span>SAVED</span>
                  </a>

                  <a class="button-blk1" id="button_call"onmouseover="button_color()" onmouseout="button_colorback()" style="background-color:rgba(33,177,255,0.9)" ng-click="TagedItemDetail.Source!=''?redirectToSource(TagedItemDetail.Source,$event):'javascript:void(0)'">BUY</a>

                <div class="gallery-tag-similar">  
                	<span class="similar_img"></span>
               	<span class="similar" style="margin-top:-2px">Similar</span></div>
              </div>
                <div class="gallery-tag-bottom cursor-pointer" ng-click="viewItemDetails(TagedItemDetail,$event)">
                  <div class="brand1"><aside class="tag-detail" style="word-wrap: break-word;height: auto;" ng-bind="TagedItemDetail.Brand"></aside></div>
                  <aside class="title1 tag-detail sm" style="height:39px;overflow: hidden;text-overflow: ellipsis;margin-top: -2px;" ng-bind="TagedItemDetail.Title"></aside>
                </div>
              </div>
              <div class="runwayImg-block ng-scope"  ng-controller="itemDetailCtrl" >

               <div class="show_tags" onmouseover="hideData()" onmouseout="showData()" >
              <i data-ng-repeat="hotSpotTag in runwayArticleTag | filter:filterHotspot" ng-mouseenter="getTagedItemDetail(hotSpotTag.ItemGuID,1)" class="icon-imgtag" data-type="tagtiprunway" ng-style="{'left':hotSpotTag.FromLeft+'%', 'top':hotSpotTag.FromTop+'%'}"></i>
               <span id="inner_tag"><i data-ng-repeat="hotSpotTag in runwayArticleTag | filter:filterHotspot"  ng-mouseenter="getTagedItemDetail(hotSpotTag.ItemGuID,1)" class="icon-imgtag2" data-type="tagtiprunway" ng-style="{'left':hotSpotTag.FromLeft+'%', 'top':hotSpotTag.FromTop+'%'}"></i></span>

             	</div>






                <img thumb-img thumb-type="article" ng-click="$parent.viewArticleDetails($parent.runwayArticleDetail)" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=530 thumb-height=610 item="runwayArticleDetail.Images[0]" alt="">
              </div>
              </div>
              <span class="loading imageloading"></span>
              <div class="img-right-nav">
                <ul>
                  <li ng-click="getSavedArticleUsers(runwayArticleDetail.ArticleGuID,runwayArticleDetail.NoOfSaves)">
                      <i ng-class="{'icon-save-view':runwayArticleDetail.saveArticle == 1, 'icon-savewhite':runwayArticleDetail.saveArticle == 0}"></i><span ng-bind="runwayArticleDetail.NoOfSaves"></span>
                    </li>
                  <li><i class="icon-chat cursor-default"></i><span ng-bind="runwayArticleDetail.NoOfComments"></span></li>
                  <li><i class="icon-view cursor-default"></i><span ng-bind="runwayArticleDetail.NoOfViews"></span></li>
                </ul>
              </div>

            </div>
            <div class="img-footer-nav">
              <ul>
              <li data-type="saveButton" ng-cloak="" class="not-active">
                  <a ng-cloak="" ng-show="runwayArticleDetail.saveArticle=='0'" ng-click="saveArticle(runwayArticleDetail.ArticleGuID,1)">
                      <i class="icon-newsave"></i>
                      <span class="hidden-phone">Save</span>
                  </a>
                  <a ng-cloak="" ng-show="runwayArticleDetail.saveArticle!='0'"  href="javascript:void(0);">
                      <i class="icon-newsave selected"></i>
                      <span class="hidden-phone">Saved</span>
                  </a>
              </li>

                <li ng-if="runwayArticleItems.length > 0" data-type="shopPopu" onclick="dim()">
                  <a href="javascript:void(0);">
                  <i class="icon-shop" style="color:black"></i>
                  <span class="hidden-phone" style="color:black">Shop</span></a>
                </li>

                <li ng-if="runwayArticleItems.length == 0" data-type="">
                  <a href="javascript:void(0);">
                  <i class="icon-shop"></i>
                  <span class="hidden-phone">Shop</span></a>
                </li>

                <li class="not-active">
                  <a href="javascript:void(0);" ng-click="viewArticleDetailsComment(runwayArticleDetail,$event);">
                    <i class="icon-comment"></i>
                    <span class="hidden-phone">Comment</span>
                  </a>
                </li>

                <li class="not-active">
                  <a ng-click="SetArticleShareDetails(runwayArticleDetail);">
                  <i class="icon-share" ></i>
                  <span class="hidden-phone">Share</span>
                  </a>
                </li>
              </ul>

              <ul class="footer-nav-right hidden-phone not-active">
                <li>
                <a ng-if="runwayArticleDetail.Source!=''" ng-click="redirectToSource(runwayArticleDetail.Source)" data-type="customtip" data-title="{{runwayArticleDetail.Source}}" data-rel="tipsys"><i class="icon-link"></i></a>
                <a ng-if="runwayArticleDetail.Source==''"><i class="icon-link"></i></a>
                </li>
                <li>
                    <a ng-if="runwayArticleDetail.Location!='-' && runwayArticleDetail.Location!=''" data-type="customtip" href="<?php echo base_url(); ?>stylemap?location={{runwayArticleDetail.Location}}" target="_blank" data-title="{{runwayArticleDetail.Location}}"><i class="icon-map"></i></a>
                    <a ng-if="runwayArticleDetail.Location=='-' || runwayArticleDetail.Location==''"><i class="icon-map"></i></a>
                </li>
              </ul>

            </div>
          </div>
          <div class="img-accordion">
            <div class="accordion-block not-active" id="Dim">
              <a href="javascript:void(0)" ng-click="viewArticleDetails(runwayArticleDetail)" >
                <div class="accordion-head not-active" ng-bind="runwayArticleDetail.Title | truncate:28" title="{{runwayArticleDetail.Title}}" ></div>
              </a>
              <div class="accordion-content-detail">
                <div class="identify-auhor"> <small class="time-info hours" ng-bind="runwayArticleDetail.ModifiedDate"></small>
                  <div class="name-of-author not-active" ng-cloak> <span>By </span>
                    <a href="{{runwayArticleDetail.ProfileLink}}" target="_blank" class="author-name">
                      <figure><img ng-src="{{runwayArticleDetail.ProfilePicture}}" width="32px" alt="" class="img-circle" /></figure>
                      <span ng-if="runwayArticleDetail.FirstName!=''" ng-bind="runwayArticleDetail.FirstName+' '+runwayArticleDetail.LastName"></span>
                      <span ng-if="runwayArticleDetail.FirstName==''">Author</span>
                    </a>
                  </div>
                </div>
                <div class="minht-content">
                  <p class="" ng-bind="runwayArticleDetail.Description | cut:true:<?php echo ARTICLE_DESCRIPTION_LENGTH;?>:' ...'"></p>
                  <a ng-cloak ng-if="runwayArticleDetail" href="<?php echo base_url(); ?>{{getArticleUrl(runwayArticleDetail)}}" target="_blank" class="read-more not-active">Read Full Article <i class="icon-arrow">&nbsp;</i></a> </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="clearfix">&nbsp;</div>
  </aside>
   <div infinite-scroll='getRunwayArticle()' infinite-scroll-disabled='paginationbusyRunwayArticle || disableRunwayArticlePagination' infinite-scroll-distance='0'></div>
   <div ng-show="paginationbusyRunwayArticle" class="load-more"><span class="loading"></span> <span class="loading-text">Loading... </span></div>
   <!-- clip article user's-->
    <div class="popup-wrap animated" id="savearticleusers">
        <div class="popup-body">
            <div class="popup-header">
                <a class="icon-close" onClick="closePopDiv('savearticleusers')"></a>
                People who saved this article
            </div>
            <div class="popup-content content-center">
                <div class="scroll-pane ">
                    <ul class="follow-list savedUsers">
                        <li ng-repeat="user in savedArticleUsers" ng-hide="user.length>0">
                            <div class="followinfo">
                                <figure><img alt="" ng-src="{{user.ProfilePicURL}}" style="cursor: pointer;" ng-click="redirectToSource(user.ProfileLink)"></figure>
                                <div class="details"> <span ng-bind="user.FirstName+' '+user.LastName" style="cursor: pointer;" ng-click="redirectToSource(user.ProfileLink)"></span><span ng-bind="user.Location"></span></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- //clip article user's-->
</div>
<!--//Main wrapper-->

  <div ng-controller="wardrobeCtrl">
    <?php $this->load->view('include/popup'); ?>
  </div>




   <div class="popup-wrap animated" id="clipitempopup" ng-controller="itemDetailCtrl">
     <div class="popup-body">
         <div class="popup-header">
             <a class="icon-close" onClick="closePopDiv('clipitempopup')"></a>
             Clip Item
         </div>
         <form name="clipItemForm" ng-submit="saveClipItem(clipItemForm.$valid)" novalidate>
             <div class="popup-content">
                 <div class="row"><div class="">Pick a Wardrobe:</div></div>
                 <div class="row">
                     <div class="select-text-fields">
                         <select name="inWardrobe" required
                                 data-ng-model="wardrobeForClip"
                                 data-placeholder="Select Wardrobe"
                                 data-chosen=""
                                 data-disable-search="true"
                                 data-ng-options="uesrWardrobe.CollectionName for uesrWardrobe in uesrCreatedWardrobeList track by uesrWardrobe.CollectionGuID">
                             <option value=""  class="option-visible">Select Wardrobe</option>
                         </select>
                     </div>
                     <div class="error-holder cmn-error">
                         <span ng-show="clipItemForm.inWardrobe.$dirty || clipItemFormsubmitted">
                             <span class="error" ng-show="clipItemForm.inWardrobe.$error.required">Select Wardrobe for Item!</span>
                         </span>
                     </div>
                 </div>

                 <div class="button-action m-t-15">
                     <button class="button button-white btn-space" type="button" onClick="closePopDiv('clipitempopup')">Cancel</button>
                     <input type="submit" value="Clip" class="button button-white btn-space"/>
                 </div>
             </div>
         </form>
     </div>
  </div>
<input type="hidden" id="LoginSessionKey" value="<?php echo $this->session->userdata('LoginSessionKey'); ?>" />
    <input type="hidden" id="WallPageNo" value="1" />
    <input type="hidden" id="UserGUID" value="<?php if(isset($UserGUID)){ echo $UserGUID; } ?>" />
    <input type="hidden" id="AllActivity" value="<?php if(isset($AllActivity)){ echo $AllActivity; } ?>" />
    <input type="hidden" id="UserWall" value="1" />
    <input type="hidden" id="UserID" value="<?php if(isset($UserID)){ echo $UserID; } ?>" />



<script>
// the selector will match all input controls of type :checkbox
// and attach a click event handler

window.onload = function() {
  //document.getElementsByTagName("body");
  if($( '#LoginSessionKey').val() == '' ){
     $('body').addClass('bannerSection');
    }
    $('#inner_tag').hide();
    $('#maskdisp').hide();
};
function dim(){
			  $(".accordion-block").css({"background-color":"rgb(195,195,195)","color":"black"});
			  $(".image-detail").css({"background-color":"rgb(161,161,161)"});
			  $(".not-active").css({"pointer-events":"none"});
			  $(".img-footer-nav").css({"background-color":"rgb(195,195,195)","color":"black"});
			}
function closeDim(){
			  $(".accordion-block").css({"background-color":""});
			  $(".image-detail").css({"background-color":"#ddd"});
			  $(".not-active").css({"pointer-events":"auto"});
			  $(".img-footer-nav").css({"background-color":"","color":""});
			}

function hideData()
{

  $('.icon-imgtag').hide();
  $('#maskdisp').show();
  
}

function showData()
{

  $('.icon-imgtag').show();
  $('#maskdisp').hide();
}

function button_color()
{

  $('#button_call').css("background-color","rgba(0,115,230,1)");
}

function button_colorback()
{
  $('#button_call').css("background-color","rgba(33,177,255,1)");
}

function button_color1()
{
  $('#button_call1').css("background-color","rgba(0,115,230,1)");
}

function button_colorback1()
{
  $('#button_call1').css("background-color","rgba(33,177,255,0.9)");
}

function showtags()
{
$('#inner_tag').show();
}

function hidetags()
{
$('#inner_tag').hide();
}
function show_mask()
{
  $('.mask1').show()
}
function hide_mask()
{
  $('.mask1').hide()
}
</script>