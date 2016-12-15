<!--Main wrapper-->
<div ng-controller="wardrobeCtrl">
<div ng-controller="itemDetailCtrl" class="main-wrapper">
    <?php $this->load->view('userProfile/profile_banner') ?>

    <?php $this->load->view('userProfile/profile_navigation') ?>

    <div class="user-wall-pagecontent" id="user-wall-wardrobe"><!-- Start of userwardrobe -->
         <aside class="content-wrapper" ng-init="getWardrobes(1)">
        <?php if($UserID == $this->session->userdata('UserID') && $this->session->userdata('WardrobeTooltipMain') == 'true') {//show the tooltip here ?>

        <div class="user-help-region profile-help">
        <span class="close-article close-help"><i class="icon-close-article"  onclick="updateTooltipStatus('WardrobeTooltipMain')"></i></span>
        <h2>This is Your Wardrobe.</h2>
        <p class="text-hideinPhone">All of the clothing items you clip are saved here.</p>
        <button class="btn-gotit close-help"  onclick="updateTooltipStatus('WardrobeTooltipMain')">OK, got it</button>
      </div>



        <?php } ?>
        <ul class="profile-list product-items-slider userWardRobe" ng-cloak="">
            <a class="loadmore" ng-cloak="" ng-if="privacyMessage" >{{privacyMessage}}</a>
            <li ng-repeat="userWardrobe in userWardrobes">
                <h3>
                    <span class="title-products pull-left"><span class="items-figure"><img src="{{userWardrobe.Icon}}" alt="" /></span> </span>
                    <span class="product-name" ng-cloak ng-bind="userWardrobe.CollectionName"></span>
                    <?php if($UserID == $this->session->userdata('UserID')){ ?>
                    <span class="edit-product">
                        <span class="edit-product-lists">
                            <a href="javascript:void(0);"  class="addpopupopen"  ng-click="editWardrobe(userWardrobe.CollectionGuID)" data-title="Edit Wardrobe" data-type="customtip"><i  class="icon-small-edit"></i></a>
                            <a href="javascript:void(0);" class="" ng-click="removeWardrobeCnfrm(userWardrobe.CollectionGuID, userWardrobe.CollectionName, $index)" data-title="Delete Wardrobe" data-type="customtip"><i  class="icon-delete"></i></a>
                        </span>
                        <i class="icon-create editnow"  data-title="Edit" data-type="customtip"></i>
                        <a href="javascript:void(0);" class="finishedit">
                        	<span class="finish"><small>Finish Editing</small>
                           <i class="icon-save-view"></i></span>
                       </a>
                    </span>
                    <?php }?>
                </h3>
                <ul ng-controller="itemCtrl" ng-init="getWardrobeItems(userWardrobe.CollectionGuID)" class="og-grid product-slider expanderGrid">

                    <li ng-repeat="wardrobeItem in wardrobeItems">
                        <span class="edit-product-lists">
                            <a ng-if="wardrobeItem.isowner" href="javascript:void(0);" ng-click="editItem(wardrobeItem.ItemGuID,userWardrobe.CollectionGuID)"  data-title="Edit Item" data-type="customtip"><i  class="icon-small-edit"></i></a>
                            <a href="javascript:void(0);" ng-click="removeItemCnfrm(wardrobeItem.ItemGuID,wardrobeItem.Title,$index )"  data-title="Delete Item" data-type="customtip"><i  class="icon-delete"></i></a>
                        </span>
                        <div class="ih-item square effect13 bottom_to_top">
                            <div class="product-img">
                                <div class="img" ng-click="viewItemOptions($event)">
                                <img thumb-img server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=178 thumb-height=220 item=wardrobeItem.Images[0] alt="img" />
                                <a class="slideietm-info"><i class="icon-slideinfo"></i></a>
                                </div>
                                <div class="info"  ng-click="viewItemDetails(wardrobeItem)">
                                    <span stop-event class="iconclose zindez2" ng-click="iconClose($event)"><i class="icon-close" ></i></span>
                                    <div class="info-back">
                                        <h3 class="block text-ellipsis heading-minheight" ng-cloak>{{wardrobeItem.Brand | cut:true:15:' ...'}}<span class="block text-ellipsis" ng-cloak>{{wardrobeItem.Title | cut:true:15:' ...'}}</span> <span ng-if="wardrobeItem.Price!='$0'" class="block priceWardrobe" ng-cloak>{{wardrobeItem.Price}}</span>

                                        </h3>

                                        <a data-rel="Clip’d" class="button-blk clip-link wardrobe-item-{{wardrobeItem.ItemGuID}}" ng-cloak="" ng-show="wardrobeItem.isclip=='0'" ng-click="clipItem(wardrobeItem.ItemGuID,$event)">
                                            <i class="icon-clip-white"></i> <span>Clip</span>
                                        </a>
                                        <a data-rel="Clip’d" class="button-blk clip-link cliped" ng-cloak="" ng-show="wardrobeItem.isclip!='0'"  href="javascript:void(0);">
                                            <i class="icon-clip-white"></i> <span>Clip’d</span>
                                        </a>

                                        <ul class="product-action">
                                            <li data-rel="tipsyn" original-title="Buy"><a ng-click="wardrobeItem.Source!=''?redirectToSource(wardrobeItem.Source,$event):'javascript:void(0)'"><i class="icon-shopwhite"></i></a></li>
                                            <li data-rel="tipsyn" original-title="Comments"  > <a ng-click="viewItemDetailsComment(wardrobeItem,$event)"><i class="icon-commentwhite"></i></a></li>
                                            <li data-rel="tipsyn" original-title="Share"><a ng-click="SetItemShareDetails(wardrobeItem,$event)" ><i class="icon-sharewhite"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>
                    <!--<ul class="pagination">
                        <li class="prev"><a href="javascript:void(0);"><i class="icon-prev"></i></a></li>
                        <li><a href="javascript:void(0);">1</a></li>
                        <li><a href="javascript:void(0);">2</a></li>
                        <li><a href="javascript:void(0);"><span>....</span></a></li>
                        <li class="next"><a href="javascript:void(0);"><i class="icon-next"></i></a></li>
                      </ul>-->
                    <div class="clearfix"></div>
                </li>


            </ul>

            <div class="clearfix">&nbsp;</div>
        </aside>
        <div  infinite-scroll='getWardrobes({{PageNo}})' infinite-scroll-disabled='paginationbusy || disablegetWardrobesPagination' infinite-scroll-distance='0'></div>
        <div ng-show="paginationbusy" class="load-more"><span class="loading"></span> <span class="loading-text">Loading... </span></div>
    </div>
    <!-- End of userwardrobe -->

    <div ng-controller="itemCtrl" class="popup-wrap animated" id="clipitempopup">
        <div class="popup-body">
            <div class="popup-header">
                <a class="icon-close" onClick="closePopDiv('clipitempopup')"></a>
                Clip Item
            </div>
            <form name="clipItemForm" ng-submit="saveClipItem(clipItemForm.$valid,clipItemForm)" novalidate>
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


    <!-- Start of followers-following -->
    <div class="user-wall-pagecontent" id="user-wall-followers-following" style="display:none;" ng-controller="UserListCtrl">
        <aside class="content-wrapper">
            <!--Followers Grid-->
            <div class="row-grid">
                <ul class="followers-grid">
                    <li id="user{{list.UserID}}" class="col-3" ng-repeat="list in allmember" ng-hide="list.length>0">
                        <div class="grid-content">
                            <div class="grid-body">
                                <figure>
                                    <a href="{{list.ProfileLink}}" target="_blank">
                                        <img style="max-width: 62px;" alt="" ng-src="{{list.ProfilePicURL}}">
                                    </a>
                                </figure>
                                <div class="grid-info"ng-cloak="" >
                                    <a href="{{list.ProfileLink}}" target="_blank">
                                        <span class="short-location" title="{{list.FirstName+' '+list.LastName}}" ng-bind="list.FirstName+' '+list.LastName"></span>
                                        <span class="short-location">{{list.Location}}</span>
                                    </a>
                                </div>
                            </div>

                            <div class="grid-footer">
                                <p ng-cloak="">
                                    <span class="folCount">{{list.followers}}</span>
                                    <span class="folText" ng-if="list.followers==1">Follower</span>
                                    <span class="folText" ng-if="list.followers > 1 || list.followers == 0">Followers</span>
                                </p>
                                <div class="follower-grid-action">
                                    <button type="button" ng-if="list.ShowFollowBtn==1 && list.MySelf!='1'" ng-disabled="buttonDisabled" id="followmem{{list.UserID}}" ng-click="follow(list.UserID,$event)" class="button-white follow-action" ng-class="{'following':list.FollowStatus == 'Following'}"> <i class="icon-add-small" ng-class="{'icon-check':list.FollowStatus == 'Following'}"></i> <span class="bold">{{list.FollowStatus}}</span></button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <a class="loadmore" ng-cloak="" ng-if="userNotFoundFlag" >No User Found.</a>

            <!-- //Followers Grid-->
            <div class="clearfix">&nbsp;</div>
        </aside>
        <!--<input type="hidden" id="FollowersPageNo" value="1">
        <input type="hidden" id="FollowingPageNo" value="1">-->

        <div infinite-scroll='getMemberFollow(currentterm)' infinite-scroll-disabled='paginationbusyFollowFollowing || disableFollowFollowingPagination' infinite-scroll-distance='0'></div>
        <div ng-show="paginationbusyFollowFollowing" class="load-more"><span class="loading"></span> <span class="loading-text">Loading... </span></div>
    </div>
    <!-- End of followers-following -->


    <!-- Start of Activity -->
    <div class="user-wall-pagecontent" id="user-wall-activity" style="display:none;" ng-controller="activityCtrl">
        <aside class="content-wrapper article-search-wrapper" ng-controller="articleCtrl">
            <!--Followers Grid-->

    <!-- Shop Popup Activity-->
        <aside ng-if="keepShopPopup" class="shop-popup" id="shopPopup" ng-controller="itemDetailCtrl" ng-init="getItemsDetail(runwayArticleDetail.ItemTags)">
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
                        <img class= "GifTester2" type="image" ng-click="ShowHide(runwayItemDetail.ItemGuID,runwayItemDetail.Images[0],runwayItemDetail.Brand);" name="shopSimilar"  style = "margin-left: 5.9px;top:273px;margin-right: 5px;position: absolute;" ng-if="count" ng-src="{{decachedImageUrl}}" />					
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
      							  <p style="z-index:99999;color:white;font-family:jamesfontbold;font-size: 128%; margin-left: 44px;">&nbsp Show Me &nbsp
									  <input id="1" type="checkbox" ng-disabled="FirstCheck" class="ShopSimilarCheck" name="x"  value="y" ng-click="sameBrand(ItemGuID,1)" ng-bind="itemDetails" ng-checked="FirstCheck" ><span style="z-index:99999;font-family:jamesfont;font-size: 75%; font-weight: bold;"> More from  {{ItemArrayBrand | cut:true:10:' ...'}} &nbsp </span>
  									  <input id="2" type="checkbox" ng-disabled="SecondCheck" name="x"  class="ShopSimilarCheck" value="y"  ng-click="sameCategoryColor(ItemGuID,1)" ng-bind="itemDetails" style="color:white;" ng-checked="SecondCheck" ><span style="z-index:99999;font-family:jamesfont;font-size: 75%; font-weight: bold;"> Similar Items &nbsp </span>	
  									  <input id="3" type="checkbox" ng-disabled="ThirdCheck" name="x"  class="ShopSimilarCheck" value="y"  ng-click="lowerPrices(ItemGuID,1)" ng-bind="itemDetails" style="color:white;" ng-checked="ThirdCheck" ><span style="z-index:99999;font-family:jamesfont;font-size: 75%; font-weight: bold;"> Lower Prices	</span>							
							        </p>
                        </div>
        </div>
      </aside>


<!-- //Shop Popup Activity-->

        <?php if($UserID == $this->session->userdata('UserID') && $this->session->userdata('ActivityTooltipMain') == 'true') {//show the tooltip here ?>

        <div class="user-help-region activity-help">
            <span class="close-article close-help"><i class="icon-close-article" onclick="updateTooltipStatus('ActivityTooltipMain')"></i></span>
            <h2>See updates from people you follow.</h2>
            <p class="text-hideinPhone">Find top contributors to follow <a href="<?php echo base_url(); ?>search/fashionweb">here</a>.</p>
            <button class="btn-gotit close-help" onclick="updateTooltipStatus('ActivityTooltipMain')">OK, got it</button>
        </div>
        <?php } ?>


            <div class="row-grid">
                <ul class="activity-grid">

                    <li ng-repeat="UserActivity in UserActivities track by $index"  repeat-done="showTooltips()" ng-class="UserActivity.EntityType === 'User'?'follo-wers col-2':'col-2'">
                        <div  ng-if="UserActivity.EntityType === 'User'"  class="activity-grid-body">
                            <div class="activity-grid-header">
                                <figure><a target="_blank" href="{{UserActivity.ExtraParams.User.ProfileLink}}"><img class="img-circle" ng-src="{{UserActivity.ExtraParams.User.ProfilePicturePath}}"  alt="" /></a></figure>
                                <div class="aciver-name" ng-cloak="">
                                    <span class="user-short-detail">
                                    <a target="_blank" href="{{UserActivity.ExtraParams.User.ProfileLink}}"><span class="name" ng-cloak="">{{UserActivity.ExtraParams.User.Name}}</span></a> {{UserActivity.Message}}
                                    </span>

                                    <span class="time" ng-cloak="">{{UserActivity.LastActionDate}}</span>
                                </div>
                            </div>
                            <div class="activity-grid-content">
                                <div class="ih-item square effect13 bottom_to_top">
                                    <div class="followers-block">
                                        <figure class="user-profile-pic">
                                            <a href="{{UserActivity.ExtraParams.Entity.ProfileLink}}" target="_blank">
                                                <img ng-src="{{UserActivity.ExtraParams.Entity.ProfilePicturePath}}" alt="">
                                            </a>
                                        </figure>
                                        <div class="profile-title">
                                            <a href="{{UserActivity.ExtraParams.Entity.ProfileLink}}" target="_blank">
                                                <label ng-bind="UserActivity.ExtraParams.Entity.Name"></label>
                                            </a>
                                        </div>
                                        <ul class="profile-address">
                                           <li><a href="javascript:void(0);"ng-if="UserActivity.ExtraParams.Entity.Location!=''"><i class="icon-street"></i> <span ng-bind="UserActivity.ExtraParams.Entity.Location"></span></a></li>
                                           <li><a href="javascript:void(0);" ng-if="UserActivity.ExtraParams.Entity.Website!=''"><i class="icon-website"></i> <span ng-bind="UserActivity.ExtraParams.Entity.Website"></span></a></li>
                                           <li>
                                               <a ng-if="UserActivity.ExtraParams.Entity.facebookURL!=''" ng-href="{{UserActivity.ExtraParams.Entity.facebookURL}}" class="facebook" target="_blank"><i class="icon-fb "></i></a>
                                               <a ng-href="{{UserActivity.ExtraParams.Entity.twitterURL}}" ng-if="UserActivity.ExtraParams.Entity.twitterURL!=''" class="twitter" target="_blank"><i class="icon-tw "></i></a>
                                           </li>
                                        </ul>
                                        <p class="font16 style-blogger" ng-bind="UserActivity.ExtraParams.Entity.Description"></p>
                                    </div>

                                    <div class="product-img">
                                        <div class="img">
                                            <img src="<?php echo IMAGE_HTTP_PATH; ?>../assets/img/placeholder.png" alt="">
                                        </div>
                                    </div>
                                    <div class="activity-grid-footer" ng-controller="articleCtrl">
                                        <a href="javascript:void(0);"><span class="followerCounts memberFollowerCount{{UserActivity.ExtraParams.Entity.UserID}}" ng-bind="UserActivity.ExtraParams.Entity.followerCount"></span> Followers</a>
                                        <a href="javascript:void(0);"><span class="followingCounts memberFollowingCount{{UserActivity.ExtraParams.Entity.UserID}}" ng-bind="UserActivity.ExtraParams.Entity.followingCount"></span> Following</a>
                                        <button
                                                ng-if="UserActivity.ExtraParams.Entity.FollowStatus=='Unfollow' && UserActivity.ExtraParams.Entity.isSelf!=1"
                                                ng-click="userFollowPage(UserActivity.ExtraParams.Entity.UserID,$event)"
                                                class="button-white follow-action following followmemb{{UserActivity.ExtraParams.Entity.UserID}}">
                                            <i class="icon-add-small icon-check"></i>
                                            <span>Following</span>
                                        </button>
                                        <button
                                                ng-if="UserActivity.ExtraParams.Entity.FollowStatus=='Follow'&& UserActivity.ExtraParams.Entity.isSelf!=1"
                                                ng-click="userFollowPage(UserActivity.ExtraParams.Entity.UserID,$event)"
                                                class="button-white follow-action following followmemb{{UserActivity.ExtraParams.Entity.UserID}}">
                                            <i class="icon-add-small"></i>
                                            <span>Follow</span>
                                        </button>


                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--for article-->
                        <div ng-if="UserActivity.EntityType === 'Article'" class="activity-grid-body articlebody" >
                            <div class="activity-grid-header">
                                <figure><a target="_blank" href="{{UserActivity.ExtraParams.User.ProfileLink}}"><img class="img-circle" ng-src="{{UserActivity.ExtraParams.User.ProfilePicturePath}}"  alt="" /></a></figure>
                                <div class="aciver-name">
                                 <span class="user-short-detail">
                                    <a target="_blank" href="{{UserActivity.ExtraParams.User.ProfileLink}}"><span class="name" ng-cloak="">{{UserActivity.ExtraParams.User.Name}}</span></a> {{UserActivity.Message}}
                                  </span>
                                    <span class="time" ng-cloak="">{{UserActivity.LastActionDate}}</span>
                                </div>
                            </div>
                            <div class="activity-grid-content">
                                <div class="ih-item square effect13 bottom_to_top hoverEffect">
                                    <div class="product-img" ng-click="viewArticleOptions($event)">
                                        <div class="img">
                                            <img src="<?php echo IMAGE_HTTP_PATH; ?>../assets/img/placeholder.png" alt="">
                                            <img thumb-img thumb-type="article" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=530 thumb-height=610 item="UserActivity.ExtraParams.Entity.Images[0]" alt="" class="mainimg" />
                                            <a href="javascript:void(0);" class="slideietm-info"><i class="icon-slideinfo"></i></a>
                                        </div>
                                    </div>

                                    <div class="info" ng-click="viewArticleDetails(UserActivity.ExtraParams.Entity)">
                                    <div class="info-back">
                                        <h3 ng-cloak="">{{UserActivity.ExtraParams.Entity.Title}}</h3>
                                        <span class="iconclose" ng-click="iconClose($event)"  stop-event><i class="icon-close zindez2" ></i></span>
                                        <div class="mid-info">
                                            <button type="button" class="button-white savearticle-action activity-article-save-button-{{UserActivity.ExtraParams.Entity.ArticleGuID}}" ng-show="UserActivity.ExtraParams.Entity.saveArticle=='0'" ng-click="saveArticle(UserActivity.ExtraParams.Entity.ArticleGuID,0,$event,$index)"> <i class="icon-add-white"></i> <span>Save</span></button>
                                            <button type="button" class="button-white savearticle-action" ng-show="UserActivity.ExtraParams.Entity.saveArticle!='0'"> <i class="icon-add-white icon-check"></i> <span>Saved</span></button>
                                            <!--<button type="button" class="button-white add-action search-clipped"> <i class="icon-clip-black"></i> <span>Clip</span></button>-->
                                            <ul class="product-action">

                                                <li data-rel="tipsyn" original-title="Buy" ng-if="UserActivity.ExtraParams.Entity.ItemTags.length > 0" >
                                                    <a ng-click="getRunwayArticleDetailActivity(UserActivity.ExtraParams.Entity,$event)"><i class="icon-shopwhite"></i>
                                                    </a>
                                                </li>
                                                <li data-rel="tipsyn" original-title="Buy" ng-if="UserActivity.ExtraParams.Entity.ItemTags.length == '0'" >
                                                    <a><i class="icon-shopwhite"></i></a>
                                                </li>
                                                <li data-rel="tipsyn" original-title="Comments"> <a ng-click="viewArticleDetailsComment(UserActivity.ExtraParams.Entity,$event)"><i class="icon-commentwhite"></i></a></li>
                                                <li data-rel="tipsyn" original-title="Share"><a ng-click="SetArticleShareDetails(UserActivity.ExtraParams.Entity,$event)"><i class="icon-sharewhite"></i></a></li>
                                            </ul>
                                        </div>
                                        <div class="acivity-footer">
                                            <span class="left" ng-click="UserActivity.ExtraParams.Entity.Source!=''?redirectToSource(UserActivity.ExtraParams.Entity.Source,$event):'javascript:void(0)'" ng-cloak="">{{UserActivity.ExtraParams.Entity.Source}}</span>
                                            <span class="right" ng-cloak="" ng-click>
                                                <a ng-click="disableBubbling($event)" href="<?php echo base_url()?>stylemap?location={{UserActivity.ExtraParams.Entity.Location}}" target="_blank">
                                                {{UserActivity.ExtraParams.Entity.Location}}
                                            </a>
                                            </span>
                                        </div>
                                        <!-- <div class="acivity-footer expanded-wrap">

                                        </div> -->
                                    </div>



                                </div>


                                <div class="activity-grid-footer">
                                    <a href="javascript:void(0);" ng-cloak="" ng-click="getSavedArticleUsers(UserActivity.ExtraParams.Entity.ArticleGuID,UserActivity.ExtraParams.Entity.NoOfSaves)"><i ng-class="{'icon-save-view':UserActivity.ExtraParams.Entity.saveArticle == 1, 'icon-savewhite':UserActivity.ExtraParams.Entity.saveArticle == 0}"></i> <span class="activity-article-save-{{UserActivity.ExtraParams.Entity.ArticleGuID}}">{{UserActivity.ExtraParams.Entity.NoOfSaves}}</span></a>
                                    <a href="javascript:void(0);" ng-cloak=""><i class="icon-chat"></i> {{UserActivity.ExtraParams.Entity.NoOfComments}}</a>
                                    <a href="javascript:void(0);" ng-cloak=""><i class="icon-view "></i> {{UserActivity.ExtraParams.Entity.NoOfViews}}</a>
                                    <!--<a href="javascript:void(0);" class="button btn-dollor pull-right pos-inherit">$250</a>-->
                                </div>
                                </div>
                            </div>
                        </div>
                        <!--end for article-->

                        <!--for item-->
                        <div ng-if="UserActivity.EntityType === 'Item'" class="activity-grid-body">
                            <div class="activity-grid-header">
                                <figure><a target="_blank" href="{{UserActivity.ExtraParams.User.ProfileLink}}"><img class="img-circle" ng-src="{{UserActivity.ExtraParams.User.ProfilePicturePath}}"  alt="" /></a></figure>
                                <div class="aciver-name" ng-cloak="">
                                    <span class="user-short-detail">
                                    <a target="_blank" href="{{UserActivity.ExtraParams.User.ProfileLink}}"><span class="name" ng-cloak="">{{UserActivity.ExtraParams.User.Name}}</span></a> {{UserActivity.Message}}
                                    </span>
                                    <span class="time" ng-cloak="">{{UserActivity.LastActionDate}}</span>
                                </div>
                            </div>
                            <div class="activity-grid-content activity-block activity-overlook">
                                <div class="expaned-content">
                                    <div class="activity-content-head activity-vias">
                                        <div class="pull-left">
                                            <div class="via pull-left"><i class="icon-pencil-dark">&nbsp;</i> <span>Via</span></div>
                                            <a href="{{UserActivity.ExtraParams.Entity.ProfileLink}}" target="_blank">
                                                <figure>
                                                    <img class="img-circle" ng-src="{{UserActivity.ExtraParams.Entity.ProfilePicture}}"  alt="" />
                                                </figure>
                                                <h3 ng-bind="UserActivity.ExtraParams.Entity.FirstName+' '+UserActivity.ExtraParams.Entity.LastName"></h3>
                                            </a>
                                        </div>
                                        <ul class="colors-shaded-square" ng-controller="articleCtrl">
                                            <li class="items activityItmCategory" ng-if="UserActivity.ExtraParams.Entity.Icon!=''">
                                                <a ng-if="UserActivity.ExtraParams.Entity.ItemMasterCategoryLevel!=''" href="<?php echo base_url()?>search/#/clothings/Category/{{UserActivity.ExtraParams.Entity.ItemMasterCategoryLevel}}/{{UserActivity.ExtraParams.Entity.CategoryMasterID}}">
                                                    <img ng-src="{{UserActivity.ExtraParams.Entity.Icon}}" alt="" title="" />
                                                </a>
                                            </li>

                                            <li ng-if="UserActivity.ExtraParams.Entity.colorname!=''">
                                                <ul>
                                                <li ng-repeat="colorname in UserActivity.ExtraParams.Entity.colorname.split(',')"><a href="<?php echo base_url()?>search/#/clothings/Color/{{colorname}}" href="javascript:void(0)"  class="{{colorname}}"></a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <!--<div class="activity-tag"></div>-->
                                        <div class="style-tag" ng-show="UserActivity.ExtraParams.Entity.StyleTags.length > 0">
                                        <h3>Style Tags</h3>
                                        <span ng-cloak="" ng-repeat="(key, value) in UserActivity.ExtraParams.Entity.StyleTags">
                                            <a href="javascript:void(0);">{{value}}</a>
                                        </span>
                                    </div>

                                </div>
                                <div class="ih-item square effect13 bottom_to_top hoverEffect" >
                                    <div class="product-img" ng-click="viewItemOptions($event)">
                                        <div class="img">
                                        <?php //<a class="button btn-dollor m-t-15 visible-rate" href="javascript:void(0);" ng-bind="UserActivity.ExtraParams.Entity.Price!=''?UserActivity.ExtraParams.Entity.Price:0"></a>?>
                                        <img src="<?php echo IMAGE_HTTP_PATH; ?>../assets/img/placeholder.png" alt="">
                                       <img thumb-img server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-height="UserActivity.ExtraParams.Entity.Images[0].Size>0?610:471" thumb-width="530" item="UserActivity.ExtraParams.Entity.Images[0]" class="mainimg"/><a href="javascript:void(0);" class="slideietm-info"><i class="icon-slideinfo"></i></a></div>

                                    </div>
                                    <!--ng-click="viewItemDetails(UserActivity.ExtraParams.Entity)"-->
                                    <div class="info" ng-click="viewItemDetails(UserActivity.ExtraParams.Entity)">
                                    <div class="info-back">
                                        <h3 ng-cloak="">{{UserActivity.ExtraParams.Entity.Title}}</h3>
                                        <h4 ng-cloak="" class="url-web" >{{UserActivity.ExtraParams.Entity.Brand}}</h4>
                                        <a href="javascript:void(0);" ng-if="UserActivity.ExtraParams.Entity.Price!='$0'" class="button btn-dollor m-t-15" ng-bind="UserActivity.ExtraParams.Entity.Price"></a>
                                        <span class="iconclose" ng-click="iconClose($event)"  stop-event><i class="icon-close zindez2" ></i></span>
                                        <div class="mid-info">
                                          <!-- <button type="button" class="button-white savearticle-action"> <i class="icon-add-white"></i> <span>Save</span></button>-->
                                            <button type="button" class="button-white add-action search-clipped clip-from-activity activity-item-clip-Class-{{UserActivity.ExtraParams.Entity.ItemGuID}}" ng-show="UserActivity.ExtraParams.Entity.isclip=='0'" ng-click="clipItem(UserActivity.ExtraParams.Entity.ItemGuID,$event)"> <i class="icon-clip-black"></i> <span>Clip</span></button>
                                            <button type="button" class="button-white add-action search-clipped" ng-show="UserActivity.ExtraParams.Entity.isclip!='0'" > <i class="icon-cliped-black"></i> <span>Clip'd</span></button>

                                            <ul class="product-action">
                                                <li  data-rel="tipsyn" original-title="Buy"><a ng-click="UserActivity.ExtraParams.Entity.Source!=''?redirectToSource(UserActivity.ExtraParams.Entity.Source,$event):'javascript:void(0)'"><i class="icon-shopwhite"></i></a></li>
                                                <li data-rel="tipsyn" original-title="Comments"><a ng-click="viewItemDetailsComment(UserActivity.ExtraParams.Entity,$event)"><i class="icon-commentwhite"></i></a></li>
                                                <li data-rel="tipsyn" original-title="Share"><a ng-click="SetItemShareDetails(UserActivity.ExtraParams.Entity,$event)"><i class="icon-sharewhite"></i></a></li>
                                            </ul>
                                        </div>
                                        <!--<div class="acivity-footer">
                                            <span class="left" ng-click="UserActivity.ExtraParams.Entity.Source!=''?redirectToSource(UserActivity.ExtraParams.Entity.Source,$event):'javascript:void(0)'" ng-cloak="">{{UserActivity.ExtraParams.Entity.Source}}</span>
                                            <span class="right" ng-cloak="">{{UserActivity.ExtraParams.Entity.Location}}</span>
                                        </div>-->
                                        <div class="acivity-footer expanded-wrap">
                                            <a href="javascript:void(0);" class="expaned-activity-icon"  ng-click="openItemBottom($event)"><i class="icon-expand"></i></a>
                                        </div>
                                    </div>
                                </div>


                                <div class="activity-grid-footer">

                                    <a ng-cloak="" class="activity-clip-{{UserActivity.ExtraParams.Entity.ItemGuID}}" ng-click="getClipedItemUsers(UserActivity.ExtraParams.Entity.ItemGuID,UserActivity.ExtraParams.Entity.NoOfSaves)">
                                        <i ng-class="{'icon-clip-white':UserActivity.ExtraParams.Entity.isclip == 0, 'icon-clipped':UserActivity.ExtraParams.Entity.isclip == 1}"></i>
                                        <span id="activity-item-clip-{{UserActivity.ExtraParams.Entity.ItemGuID}}">{{UserActivity.ExtraParams.Entity.NoOfSaves}}</span>
                                    </a>

                                    <a href="javascript:void(0);" ng-cloak=""><i class="icon-chat"></i> {{UserActivity.ExtraParams.Entity.NoOfComments}}</a>
                                    <a href="javascript:void(0);" ng-cloak=""><i class="icon-view "></i> {{UserActivity.ExtraParams.Entity.NoOfViews}}</a>
                                    <a href="javascript:void(0);" class="button btn-dollor pull-right pos-inherit" ng-if="UserActivity.ExtraParams.Entity.Price!='$0'" ng-cloak="">{{UserActivity.ExtraParams.Entity.Price}}</a>
                                </div>
                                </div>
                            </div>
                        </div>
                        <!--end for item-->
                    </li>

                </ul>
            </div>
            <!-- //Followers Grid-->
            <a class="loadmore" ng-cloak="" ng-if="activityNotFoundFlag" >No Activity Found.</a>
            <div class="clearfix">&nbsp;</div>
        </aside>

        <div  infinite-scroll='getActivity()' infinite-scroll-disabled='paginationbusyActivity || disableActivityPagination' infinite-scroll-distance='0'></div>
        <div ng-show="paginationbusyActivity" class="load-more"><span class="loading"></span> <span class="loading-text">Loading... </span></div>
    </div>
    <!-- End of Activity -->

    <!-- Start of Artile -->
<div class="user-wall-pagecontent" id="user-wall-article" style="display:none;" ng-controller="articleCtrl" >
    <aside class="content-wrapper article-wrap paddingWrap">
    <div class="tab-content pos-relative">
        <!--Article Grid-->
        <?php if($UserID == $this->session->userdata('UserID') && $this->session->userdata('ArticleTooltipMain') == 'true') {//show the tooltip here ?>

        <div class="user-help-region">
            <span class="close-article close-help"><i class="icon-close-article" onclick="updateTooltipStatus('ArticleTooltipMain')"></i></span>
            <h2>This is where Articles are saved.</h2>
            <p class="text-hideinPhone">Save new articles from the <a href="<?php echo base_url(); ?>">Runway</a> or <a onclick="openPopDiv('createAricle')">create</a> your own.</p>
            <button class="btn-gotit close-help" onclick="updateTooltipStatus('ArticleTooltipMain')">OK, got it</button>
        </div>

        <?php } ?>
        <ul class="article-grid">
            <a class="loadmore" ng-cloak="" ng-if="privacyMessageArticle" ng-bind="privacyMessageArticle"></a>
            <li ng-hide="privacyMessageArticle">
                <h3>

                <?php
                    if($UserID == $this->session->userdata('UserID') && $this->session->userdata('UserID')){
                        $displayName = 'Your Articles';
                        $savedArtName = 'Saved Articles';
                 } else {
                        $UserNameArr = $this->login_model->getUserData($UserID);
                        $UserName = $UserNameArr[0]['FirstName']." ".$UserNameArr[0]['LastName'];

                        $displayName = !empty($UserName)?$UserName."'s Articles":"Author's Articles";
                        $savedArtName = !empty($UserName)?$UserName."'s saved Articles":"Author's saved Articles";
                 }
                ?>

                <span class="article-name"><?php echo $displayName;?></span>
                <span ng-if="articleIsMyAccount" class="edit-product article-edit-product"> <a href="javascript:void(0);" class="editnow" id="articleeditnow"> <small>Edit Articles</small> <i class="icon-create"></i></a> <a href="javascript:void(0);" class="finishedit" id="articlefinishedit"><span class="finish"><small>Finish Editing</small> <i class="icon-save-view"></i></span></a> </span> </h3>
                <ul ng-if="UserProfileArticles.length > 0"class="og-grid runway-grid expander-grid" id="expanderGrid1">
                    <li ng-repeat="ProfileArticles in UserProfileArticles">
                        <div class="edi-relative"> <span class="edit-product-lists"> <a ng-click="editArticle(ProfileArticles)"  class="editariclepopup" data-title="Edit Article" data-type="customtip"><i class="icon-small-edit"></i></a> <a href="javascript:void(0);" ng-click="removeArticleCnfrm(ProfileArticles,$index,false)" data-title="Delete Article" data-type="customtip"><i class="icon-delete"></i></a> </span> </div>
                        <a data-description="" ng-click="getRunwayArticleDetail(ProfileArticles)" data-title="Azuki bean" data-largesrc="img/grid-photo-2.jpg" href="javascript:void(0);">
                            <div class="ih-item square effect13 bottom_to_top">
                                <div class="product-img">
                                    <div class="img"><img thumb-img alt="img" ng-if="ProfileArticles.Images[0]" thumb-type='article' server="<?php echo IMAGE_SERVER_PATH; ?>" item='ProfileArticles.Images[0]' thumb-height=220 thumb-width=220></div>
                                    <div class="info">
                                        <div class="info-back">
                                            <h3 ng-bind="(ProfileArticles.Title| cut:true:60:' ...')"> </h3>
                                            <div class="mrtop20"></div>
                                            <h3 ng-if="ProfileArticles.FirstName!=''" ng-bind="'By '+ProfileArticles.FirstName+' '+ProfileArticles.LastName"> </h3>
                                            <h3 ng-if="ProfileArticles.FirstName==''" ng-bind="'By: Author'"> </h3>
                                            <div class="footer-hrs" ng-bind="ProfileArticles.modifiedAgo"></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
                <div ng-if="NoProfileArticleFlag" class="text-message">Nothing here yet....</div>
            </li>

            <li ng-if='UserSavedArticles.length > 0'>
              <h3>
                <span class="article-name"><?php echo $savedArtName;?></span>
                <span ng-if="articleIsMyAccount" class="edit-product article-edit-product"> <a href="javascript:void(0);" class="editnow"> <small>Edit Articles</small> <i class="icon-create"></i></a> <a href="javascript:void(0);" class="finishedit"><span class="finish"><small>Finish Editing</small> <i class="icon-save-view"></i></span></a> </span>
              </h3>

              <ul ng-if='UserSavedArticles.length > 0' class="og-grid runway-grid expander-grid" id="expanderGrid2">
                    <li ng-repeat="SaveUserArticle in UserSavedArticles" repeat-done="runwayGridDone();">
                      <div class="edi-relative"> <span class="edit-product-lists"> <a href="javascript:void(0);" ng-click="removeArticleCnfrm(SaveUserArticle,$index,true)"><i class="icon-delete"></i></a> </span> </div>
                      <a data-description="" ng-click="getRunwayArticleDetail(SaveUserArticle)" data-title="Azuki bean" data-largesrc="img/grid-photo-2.jpg" href="javascript:void(0);">
                      <div class="ih-item square effect13 bottom_to_top">
                        <div class="product-img">
                          <div class="img"><img thumb-img thumb-type="article" alt="img" ng-if="SaveUserArticle.Images[0]" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=220 thumb-height=220 item="SaveUserArticle.Images[0]"></div>
                          <div class="info">
                            <div class="info-back">
                              <h3 ng-bind="(SaveUserArticle.Title | cut:true:60:' ...')"> </h3>
                              <div class="mrtop20"></div>
                              <h3 ng-if="SaveUserArticle.FirstName!=''" ng-bind="'By: '+SaveUserArticle.FirstName+' '+SaveUserArticle.LastName"> </h3>
                              <h3 ng-if="SaveUserArticle.FirstName==''" ng-bind="'By: Author'"> </h3>
                              <div class="footer-hrs" ng-bind="SaveUserArticle.modifiedAgo"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      </a>
                    </li>
                </ul>
                <div ng-if="NoSavedArticleFlag" class="text-message">Nothing here yet....</div>
            </li>

        </ul>
          <!--//Article Grid-->
      <div id="imageDetail" style="display:none;">
        <div class="image-detail">
          <div class="img-detail-right">
            <div class="img-content" onmouseover="showtags()" onmouseout="hidetags()">
            <button class="button small show-items-button" name="" type="button"  ng-show="runwayArticleItems">Show Items</button>
              <!-- Tad and Shop Popup  -->
              <aside ng-if="runwayArticleItems.length>0" class="shop-popup" id="shopPopup">
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
                        <img class= "GifTester2" type="image" ng-click="ShowHide(runwayItemDetail.ItemGuID,runwayItemDetail.Images[0],runwayItemDetail.Brand);"  name="shopSimilar"  style = "margin-left: 5.9px;top:273px;margin-right: 5px;position: absolute;" ng-if="count" ng-src="{{decachedImageUrl}}" />					
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
                        	                         
									  <p style="z-index:99999;color:white;font-family:jamesfontbold;font-size: 128%; margin-left: 44px;">&nbsp Show Me &nbsp
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

                 <i ng-click="closeItemDetail($event)" class="icon-closeb1"></i>

          <!--       <img style="height:160px" thumb-img alt="" ng-if="TagedItemDetail.Images[0].ImageUrl" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=220 thumb-height=220 item="TagedItemDetail.Images[0]"/> -->
          <!--      <i data-ng-repeat="hotSpotTag in runwayArticleTag | filter:filterHotspot" ng-mouseenter="getTagedItemDetail(hotSpotTag.ItemGuID,1)" class="icon-imgtag" data-type="tagtiprunway" ng-style="{'left':hotSpotTag.FromLeft+'%', 'top':hotSpotTag.FromTop+'%'}"></i>-->
              <img thumb-img alt=""  style="width:160px; height:190px" ng-if="TagedItemDetail.Images[0].ImageUrl" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width="TagedItemDetail.Images[0].Size > 0 ? 190 : 160" thumb-height="TagedItemDetail.Images[0].Size > 0 ? 160 : 190" item="TagedItemDetail.Images[0]" />
                  <div id="maskdisp5" class="mask1"></div>
                  <aside class="gallery-tag-cost" ng-if="TagedItemDetail.Price!='$0'" ng-bind="TagedItemDetail.Price"></aside>
                  <a data-rel="Clip’d" ng-if="TagedItemDetail.isclip=='0'" class="button-blk1 clip-link for-tag-runway for-tag-runway-{{TagedItemDetail.ItemGuID}}" ng-click="clipItem(TagedItemDetail.ItemGuID,$event)" href="javascript:void(0);">

                    <span>SAVE</span>
                  </a>

                  <a data-rel="Clip’d" ng-if="TagedItemDetail.isclip!='0'" class="button-blk1 clip-link cliped" href="javascript:void(0);">

                    <span>SAVED</span>
                  </a>

                  <a class="button-blk1" id="button_call5"onmouseover="button_color()" onmouseout="button_colorback()" style="background-color:rgba(33,177,255,0.9)" ng-click="TagedItemDetail.Source!=''?redirectToSource(TagedItemDetail.Source,$event):'javascript:void(0)'">BUY</a>

                <div class="gallery-tag-similar">  <span class="similar_img"></span><span class="similar" style="margin-top:-2px">Similar</span></div>




              </div>
                <div class="gallery-tag-bottom cursor-pointer" ng-click="viewItemDetails(TagedItemDetail,$event)">
                  <div class="brand1"><aside class="tag-detail" style="word-wrap: break-word;height: auto;" ng-bind="TagedItemDetail.Brand"></aside></div>
                  <aside class="title1 tag-detail sm" style="height:39px;margin-top: -2px;" ng-bind="TagedItemDetail.Title"></aside>
                </div>
              </div>
              <div class="runwayImg-block ng-scope"  ng-controller="itemDetailCtrl" >

               <div class="show_tags" onmouseover="hideData()" onmouseout="showData()" >
              <i data-ng-repeat="hotSpotTag in runwayArticleTag | filter:filterHotspot" ng-mouseenter="getTagedItemDetail(hotSpotTag.ItemGuID,1)" class="icon-imgtag" data-type="tagtiprunway" ng-style="{'left':hotSpotTag.FromLeft+'%', 'top':hotSpotTag.FromTop+'%'}"></i>
               <span id="inner_tag5"><i data-ng-repeat="hotSpotTag in runwayArticleTag | filter:filterHotspot"  ng-mouseenter="getTagedItemDetail(hotSpotTag.ItemGuID,1)" class="icon-imgtag2" data-type="tagtiprunway" ng-style="{'left':hotSpotTag.FromLeft+'%', 'top':hotSpotTag.FromTop+'%'}"></i></span>

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
              <li data-type="saveButton" ng-cloak="">
                  <a ng-cloak="" ng-if="runwayArticleDetail.saveArticle=='0'" ng-click="saveArticle(runwayArticleDetail.ArticleGuID,1)">
                      <i class="icon-newsave"></i>
                      <span class="hidden-phone">Save</span>
                  </a>
                  <a ng-cloak="" ng-if="runwayArticleDetail.saveArticle!='0'"  href="javascript:void(0);">
                      <i class="icon-newsave selected"></i>
                      <span class="hidden-phone">Saved</span>
                  </a>
              </li>

                <li ng-if="runwayArticleItems.length > 0" data-type="shopPopu">
                  <a href="javascript:void(0);">
                  <i class="icon-shop"></i>
                  <span class="hidden-phone">Shop</span></a>
                </li>

                <li ng-if="runwayArticleItems.length == 0" data-type="">
                  <a href="javascript:void(0);">
                  <i class="icon-shop"></i>
                  <span class="hidden-phone">Shop</span></a>
                </li>

                <li>
                  <a href="javascript:void(0);" ng-click="viewArticleDetailsComment(runwayArticleDetail,$event);">
                    <i class="icon-comment"></i>
                    <span class="hidden-phone">Comment</span>
                  </a>
                </li>

                <li>
                  <a ng-click="SetArticleShareDetails(runwayArticleDetail,$event)">
                  <i class="icon-share"></i>
                  <span class="hidden-phone">Share</span>
                  </a>
                </li>
              </ul>

              <ul class="footer-nav-right hidden-phone">
                <li>
                    <a ng-if="runwayArticleDetail.Source!=''" ng-click="redirectToSource(runwayArticleDetail.Source)"data-type="customtip" data-title="{{runwayArticleDetail.Source}}">
                        <i class="icon-link"></i>
                    </a>
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
            <div class="accordion-block">
            <a href="javascript:void(0)" ng-click="viewArticleDetails(runwayArticleDetail)" >
                <div class="accordion-head" ng-bind="runwayArticleDetail.Title| truncate:28" title="{{runwayArticleDetail.Title}}"><!-- <i class="icon-acc selected">&nbsp;</i>--></div>
            </a>
              <div class="accordion-content-detail">
                <div class="identify-auhor"> <small class="time-info hours" ng-bind="runwayArticleDetail.modifiedAgo"></small>
                  <div class="name-of-author" ng-cloak> <span>By </span>
                    <a href="{{runwayArticleDetail.ProfileLink}}" target="_blank" class="author-name">
                        <figure><img ng-src="{{runwayArticleDetail.ProfilePicture}}" width="32px" alt="" class="img-circle"/></figure>
                        <span ng-if="runwayArticleDetail.FirstName!=''" ng-bind="runwayArticleDetail.FirstName+' '+runwayArticleDetail.LastName"></span>
                        <span ng-if="runwayArticleDetail.FirstName==''">Author</span>
                    </a>
                  </div>
                </div>
                <div class="minht-content">
                  <p class="" ng-bind="runwayArticleDetail.Description | cut:true:<?php echo ARTICLE_DESCRIPTION_LENGTH;?>:' ...'"></p>
                  <a ng-cloak ng-if="runwayArticleDetail" href="<?php echo base_url(); ?>{{getArticleUrl(runwayArticleDetail)}}" target="_blank" class="read-more">Read Full Article <i class="icon-arrow">&nbsp;</i></a> </div>
              </div>
            </div>
          </div>
        </div>
      </div>



<div id="imageDetailgrid" style="display:none;">
        <div class="image-detail">
          <div class="img-detail-right">
            <div class="img-content">
            <button class="button small show-items-button" name="" type="button">Show Items</button>
              <!-- Tad and Shop Popup  -->
              <aside class="shop-popup" id="shopPopup">

                <div class="popup-header">
                  <i class="icon-closepopup"></i>
                  <label class="label" ng-bind="(showArticleItemBrand | cut:true:20:' ...')"></label>
                  <span class="product-name" ng-bind="(showArticleItemTitle | cut:true:20:' ...')"></span>
                  <span class="prduct-cost" ng-if="showArticleItemPrice!='$0'" ng-bind="showArticleItemPrice"></span>
                </div>

                <div class="shop-popup-content">
                  <ul class="product-slider">
                  <li><img src="<?php echo IMAGE_HTTP_PATH; ?>../assets/img/slider-default-img.png"></li>

                      <li data-ng-repeat="(runwayItemKey, runwayItemDetail) in runwayArticleItems" ng-mouseenter="runwayArticleItemDetail(runwayItemDetail)">
                        <img thumb-img alt="" ng-click="$parent.viewItemDetails($parent.runwayItemDetail)" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width="runwayItemDetail.Images[0].Size > 0 ? 190 : 160" thumb-height="runwayItemDetail.Images[0].Size > 0 ? 160 : 190" item="runwayItemDetail.Images[0]" />
                      <span class="add-product-items"> <i class="icon-check-wh"></i></span>
                      <div class="shop-popup-action" ng-controller="itemDetailCtrl">

                      <a ng-cloak="" ng-show="itemDetail.isclip=='0'" ng-click="clipItem(runwayItemDetail.ItemGuID,$event)" href="javascript:void(0);" class="button-blk clip-link ">
                        <i class="icon-clip-white"></i>
                        <span>Clip</span>
                      </a>

                      <a ng-cloak="" ng-show="itemDetail.isclip!='0'" href="javascript:void(0);" class="button-blk clip-link cliped">
                        <i class="icon-clip-white"></i>
                        <span>Clip’d</span>
                      </a>

                      <a ng-click="itemDetail.Source!=''?redirectToSource(runwayItemDetail.Source):'javascript:void(0)'" class="button-blk">Buy</a>
                    </div>
                    </li>
                    <li><img src="<?php echo IMAGE_HTTP_PATH; ?>../assets/img/slider-default-img.png"></li>
                  </ul>
                </div>

              </aside>
              <div ng-controller="itemDetailCtrl">
                <div class="gallery-tag">
                <div class="gallery-tag-inner" ng-click="viewItemDetails(TagedItemDetail,$event)">
                 <i onclick="$('.gallery-tag').hide();" class="icon-closeb"></i>
                 <img thumb-img alt="" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=220 thumb-height=220 item="TagedItemDetail.Images[0]" />
                  <aside class="gallery-tag-cost" ng-bind="TagedItemDetail.Price"></aside>
                  <a data-rel="Clip’d" ng-if="TagedItemDetail.isclip=='0'" class="button-blk clip-link" ng-click="clipItem(TagedItemDetail.ItemGuID,$event)" href="javascript:void(0);">
                    <i class="icon-clip-white"></i>
                    <span>Clip</span>
                  </a>

                  <a data-rel="Clip’d" ng-if="TagedItemDetail.isclip!='0'" class="button-blk clip-link cliped" href="javascript:void(0);">
                    <i class="icon-clip-white"></i>
                    <span>Clip’d</span>
                  </a>

                  <a class="button-blk" ng-click="TagedItemDetail.Source!=''?redirectToSource(TagedItemDetail.Source,$event):'javascript:void(0)'">Buy</a>

                </div>
                <div class="gallery-tag-bottom" ng-click="viewItemDetails(TagedItemDetail,$event)">
                  <aside class="tag-detail sm" ng-bind="TagedItemDetail.Brand"></aside>
                  <aside class="tag-detail" ng-bind="TagedItemDetail.Title"></aside>
                </div>
              </div>

              <i data-ng-repeat="hotSpotTag in runwayArticleTag | filter:filterHotspot" ng-mouseenter="getTagedItemDetail(hotSpotTag.ItemGuID,1)" class="icon-imgtag" data-type="tagtiprunway" ng-style="{'left':hotSpotTag.FromLeft+'%', 'top':hotSpotTag.FromTop+'%'}"></i>
              </div>
              <img thumb-img thumb-type="article" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=530 thumb-height=610 item="runwayArticleDetail.Images[0]" alt="">

              <div class="img-right-nav">
                <ul>
                  <li><i class="icon-save-view" ng-class="{'icon-save-view':runwayArticleDetail.NoOfSaves > 0}"></i><span ng-bind="runwayArticleDetail.NoOfSaves"></span></li>
                  <li><i class="icon-chat"></i><span ng-bind="runwayArticleDetail.NoOfComments"></span></li>
                  <li><i class="icon-view"></i><span ng-bind="runwayArticleDetail.NoOfViews"></span></li>
                </ul>
              </div>
            </div>
            <div class="img-footer-nav">
              <ul>
              <li data-type="saveButton" ng-cloak="">
                  <a ng-cloak="" ng-show="runwayArticleDetail.saveArticle=='0'" ng-click="saveArticle(runwayArticleDetail.ArticleGuID,1)">
                      <i class="icon-newsave"></i>
                      <span class="hidden-phone">Save</span>
                  </a>
                  <a ng-cloak="" ng-show="runwayArticleDetail.saveArticle!='0'"  href="javascript:void(0);">
                      <i class="icon-newsave selected"></i>
                      <span class="hidden-phone">Saved</span>
                  </a>
              </li>

                <li ng-if="runwayArticleItems.length > 0" data-type="shopPopu">
                  <a href="javascript:void(0);">
                  <i class="icon-shop"></i>
                  <span class="hidden-phone">Shop</span></a>
                </li>

                <li ng-if="runwayArticleItems.length == 0" data-type="">
                  <a href="javascript:void(0);">
                  <i class="icon-shop"></i>
                  <span class="hidden-phone">Shop</span></a>
                </li>

                <li>
                  <a href="javascript:void(0);" ng-click="viewArticleDetailsComment(runwayArticleDetail,$event);">
                    <i class="icon-comment"></i>
                    <span class="hidden-phone">Comment</span>
                  </a>
                </li>

                <li>
                  <a ng-click="SetArticleShareDetails(runwayArticleDetail,$event)">
                  <i class="icon-share"></i>
                  <span class="hidden-phone">Share</span>
                  </a>
                </li>
              </ul>

              <ul class="footer-nav-right hidden-phone">
                <li><a ng-click="runwayArticleDetail.Source!=''?redirectToSource(runwayArticleDetail.Source):'javascript:void(0)'" title="{{runwayArticleDetail.Source}}"><i class="icon-link"></i></a></li>
                <li><a href="javascript:void(0);" title="{{runwayArticleDetail.Location}}"><i class="icon-map"></i></a></li>
              </ul>

            </div>
          </div>
          <div class="img-accordion">
            <div class="accordion-block">
              <div class="accordion-head" ng-bind="runwayArticleDetail.Title" title="{{runwayArticleDetail.Title}}"><!-- <i class="icon-acc selected">&nbsp;</i>--></div>
              <div class="accordion-content">
                <div class="identify-auhor"> <small class="time-info hours" ng-bind="runwayArticleDetail.ModifiedDate"></small>
                  <div class="name-of-author" ng-cloak> <span>By </span>
                    <figure><img ng-src="{{runwayArticleDetail.ProfilePicture}}" width="32px" alt="" class="img-circle" /></figure>
                    <span ng-if="runwayArticleDetail.FirstName!=''" ng-bind="runwayArticleDetail.FirstName+' '+runwayArticleDetail.LastName"></span>
                    <span ng-if="runwayArticleDetail.FirstName==''">Author</span>
                  </div>
                </div>
                <div class="minht-content">
                  <p class="" ng-bind="runwayArticleDetail.Description | cut:true:500:' ...'"></p>
                  <a ng-cloak ng-if="runwayArticleDetail" href="<?php echo base_url(); ?>{{getArticleUrl(runwayArticleDetail)}}" target="_blank" class="read-more">Read Full Article <i class="icon-arrow">&nbsp;</i></a> </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div class="clearfix">&nbsp;</div>
  </aside>
   <div  infinite-scroll='getUserArticleData()' infinite-scroll-disabled='paginationbusyArticle || disableArticlePagination || articleNotFoundFlag' infinite-scroll-distance='0'></div>
   <div ng-show="paginationbusyArticle" class="load-more"><span class="loading"></span> <span class="loading-text">Loading... </span></div>

    <!-- Remove Article-->
    <div class="popup-wrap animated" id="removearticle">
        <div class="popup-body">
            <div class="popup-header">
                <a class="icon-close" onClick="closePopDiv('removearticle')"></a>
                Remove Article
            </div>
            <div class="popup-content content-center">
                <p class="msg">
                Are you sure you want to permanently remove <span class="yellowclr" ng-cloak="">{{removeArticleName}}</span> from your Articles ?</p>
                <p class="removedmsg"></p>
                <div class="button-action m-t-15">
                    <button class="button button-white btn-space" type="button" onClick="closePopDiv('removearticle')">Cancel</button>
                    <button class="button" type="button" ng-click="removeArticle()">Remove</button>
                </div>
            </div>
        </div>
    </div>
    <!-- //Remove Article-->

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
</div><!-- End of Artile --></div>
<?php $this->load->view('include/popup'); ?>
</div>
 <input type="hidden" id="LoginSessionKey" value="<?php echo $this->session->userdata('LoginSessionKey'); ?>" />
<input type="hidden" id="WallPageNo" value="1" />
<input type="hidden" id="UserGUID" value="<?php if(isset($UserGUID)){ echo $UserGUID; } ?>" />
<input type="hidden" id="AllActivity" value="<?php if(isset($AllActivity)){ echo $AllActivity; } ?>" />
<input type="hidden" id="UserWall" value="1" />
<input type="hidden" id="UserID" value="<?php if(isset($UserID)){ echo $UserID; } ?>" />
<?php
$LoggedUserID = $this->session->userdata('UserID');
?>
<input type="hidden" id="LoggedUserID" value="<?php if(isset($LoggedUserID)){ echo $LoggedUserID; } ?>" />
<script>
// the selector will match all input controls of type :checkbox
// and attach a click event handler

window.onload = function() {
  //document.getElementsByTagName("body");
  if($( '#LoginSessionKey').val() == '' ){
     $('body').addClass('bannerSection');
    }
    $('#inner_tag5').hide();
    $('#maskdisp5').hide();
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
  $('#maskdisp5').show();
}

function showData()
{

  $('.icon-imgtag').show();
  $('#maskdisp5').hide();
}

function button_color()
{

  $('#button_call5').css("background-color","rgba(0,115,230,1)");
}

function button_colorback()
{
  $('#button_call5').css("background-color","rgba(33,177,255,0.9)");
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
$('#inner_tag5').show();
}

function hidetags()
{
$('#inner_tag5').hide();
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