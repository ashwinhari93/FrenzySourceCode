<img src="<?php echo IMAGE_SERVER_PATH; ?>uploads/article/<?php echo $firstImage; ?>" style="display: none;"/>
<div class="main-wrapper" ng-controller="articleCtrl" ng-init="getArticleDetail('<?php echo $articleGuID; ?>')">
    <input type="hidden" name="LoginSessionKey" id="LoginSessionKey" value="<?php echo $this->session->userdata('LoginSessionKey'); ?>" />
     <div class="content-wrapper clothing-details" >
            <aside class="right-details">
            	<div class="content">
                    <div class="details-head" ng-cloak>
                          <h3>
                              Details
                              <a href="javascript:void(0);" data-rel="tipsys" ng-if="articleDetail.isFlagged == 0" ng-click="confirmFlagArticle(articleDetail.ArticleGuID,$event)" title="Flag Article" class="pull-right"><i class="icon-notification"></i></a>
                              <a href="javascript:void(0);" data-rel="tipsys" ng-if="articleDetail.isFlagged > 0" ng-click="ShowErrorMessage('You have already flagged this Article');" title="Flagged" class="pull-right"><i class="icon-notification"></i></a>
                          </h3>
                     </div>
                    <!-- Flag Article-->
                    <div class="popup-wrap animated" id="confirmFlagArticle">
                        <div class="popup-body">
                            <div class="popup-header">
                                <a class="icon-close" onClick="closePopDiv('confirmFlagArticle')"></a>
                                Flag Article
                            </div>
                            <div class="popup-content content-center">
                                <p class="msg">Do you wish to flag this Article for inappropriate content?</p>
                                <div class="button-action m-t-15">
                                    <button class="button button-white btn-space" type="button" onClick="closePopDiv('confirmFlagArticle')">No</button>
                                    <button class="button" type="button" ng-click="flagArticle(ToFlagArticleGuID,ToFlagArticleEvent)">Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- //Flag Article-->

                    <div class="details-meta">
                        <div class="via-info via-detail-block pull-right">
                            <figure>
                                <a href="{{articleDetail.ProfileLink}}"><img alt="" ng-src="{{articleDetail.ProfilePicture}}" class="img-circle"/></a>
                            </figure>
                        </div>
                        <div class="overflow brandDesigner">
                            <h3>Author</h3>
                            <span>
                                <a target="_blank" href="{{articleDetail.ProfileLink}}">
                                    <span ng-if="articleDetail.FirstName =='' && articleDetail.LastName == ''" >Author</span>
                                    <span ng-if="articleDetail.FirstName !='' || articleDetail.LastName != ''" ng-bind="articleDetail.FirstName+' '+articleDetail.LastName"></span>
                                </a>
                            </span>

                        </div>
                    </div>

                    <div ng-class="articleDetail.DescriptionArray.length > 1 ? 'desc-min-ht description' : 'description'">

                       <h3>Article</h3>
                       <!--<p ng-cloak="">{{articleDetail.Description}}</p>-->

                       <p ng-cloak="" dir-paginate="desc in articleDetail.DescriptionArray | filter:q | itemsPerPage: pageSize" current-page="currentPage" > <span ng-bind-html="textToLink(desc)"></span></p>

                    </div>
                    <div class="article-pagination" ng-cloak="" ng-if="articleDetail.DescriptionArray.length > 1">
                       <div class="other-controller">
                        <div class="text-center">
                        <dir-pagination-controls boundary-links="true" on-page-change="pageChangeHandler(newPageNumber)" template-url="<?php echo base_url(); ?>assets/js/dirPagination.tpl.html">
                        </dir-pagination-controls>
                        </div>
                       </div>
                    </div>


                 <!--<div class="article-pagination"> <ul class="pagination">
                    <li class="prev"><a href="javascript:void(0);"><i class="icon-prev"></i></a></li>
                    <li><a href="javascript:void(0);">1</a></li>
                    <li><a href="javascript:void(0);">2</a></li>
                    <li><a href="javascript:void(0);"><span>....</span></a></li>
                    <li class="next"><a href="javascript:void(0);"><i class="icon-next"></i></a></li>
                </ul>
                </div>-->

                <div ng-if="articleDetail.StyleTags.length>0" class="style-tag">
                    <h3>Style Tags</h3>
                    <span ng-repeat="(key, value) in articleDetail.StyleTags">
                    	<a href="<?php echo base_url()?>search/#/searcharticle/StyleTags/{{value}}" target="_blank" ng-cloak="">{{value}}</a>
                    </span>
                </div>

                <div ng-if="articleDetail.ItemTags.length>0" class="items-tags">
                    <h3>Item Tags</h3>
                    <ul class="colors-shaded">
                        <li ng-repeat="ItemTag in articleDetail.ItemTags" class="items">
                            <img thumb-img style="cursor: pointer;" ng-click="$parent.viewItemDetails(item)" ng-mouseleave="$parent.clearHoverArticleItem(item.ItemGuID)" ng-mouseenter="$parent.hoverArticleItem(item.ItemGuID);" class="img-circle" title="{{item.Title}}" alt="" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=71 thumb-height=71 item="ItemTag"/>
                        </li>
                   </ul>
                </div>
                <div class="articles"  ng-if="userArticleCount > 0">
                    <h3 class="article-head">More from <span ng-if="articleDetail.FirstName" ng-bind="articleDetail.FirstName+' '+articleDetail.LastName"></span><span ng-if="!articleDetail.FirstName">Author</span> </h3>
                   <div class="row-grid">
                        <ul>
                           <li class="col-2"  ng-repeat="(articleKey, articleVal) in userArticles2">
                           <div class="articleimgcontent">
                             <div class="ih-item square effect13 bottom_to_top">
                               <div class="product-img">
                                 <div class="img">
                                 <img thumb-img width=140 item="articleVal.Images[0]" thumb-width=220 thumb-height=220 server="<?php echo IMAGE_SERVER_PATH; ?>" alt="img" thumb-type='article' />
                                 <a href="javascript:void(0);" class="slideietm-info stopPropagation" ng-click="disableBubbling($event)"><i class="icon-slideinfo"></i></a>
                                 </div>
                                   <div class="infonewproduct">
                                       <div class="info" ng-click="viewArticleDetails(articleVal)">
                                           <span class="iconclose" ng-click="disableBubbling($event)"><i class="icon-close"></i></span>
                                           <div class="info-back">
                                               <span class="view-imgdetails" ><i class="icon-view"></i></span>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                             </div>
                         </div>
                       </li>
                   </ul>
                </div>
                </div>

                <div class="articles m-t-0" ng-if="itemArticleCount > 0">
                   <h3 class="article-head">Articles you may also like...</h3>
                   <div class="row-grid">
                   <ul>
                           <li class="col-2" ng-repeat="(articleKey, articleVal) in itemsArticles2">
                               <div class="articleimgcontent" ng-init="cntr.push(articleKey);">
                             <div class="ih-item square effect13 bottom_to_top">
                               <div class="product-img">
                                 <div class="img">
                                 <img thumb-img width=140 item="articleVal.Images[0]" thumb-width=220 thumb-height=220 server="<?php echo IMAGE_SERVER_PATH; ?>" alt="img" thumb-type='article'/>
                                 <a href="javascript:void(0);" class="slideietm-info stopPropagation" ng-click="disableBubbling($event)"><i class="icon-slideinfo"></i></a>
                                 </div>
                                  <div class="infonewproduct">
                                       <div class="info" ng-click="viewArticleDetails(articleVal)">
                                          <span class="iconclose" ng-click="disableBubbling($event)"><i class="icon-close"></i></span>
                                          <div class="info-back">
                                            <span class="view-imgdetails" ><i class="icon-view"></i></span>
                                          </div>
                                       </div>
                                   </div>
                               </div>
                             </div>
                         </div>
                       </li>

                   </ul>
                </div>
                </div>

                </div>
            </aside>

         <aside class="left-details">
             <div class="details-head">
                 <span class="hrs" ng-bind="articleDetail.ModifiedDate"></span>
                 <h3 ng-cloak=""><span><img class="grayscale-img" src="<?php echo IMAGE_HTTP_PATH; ?>../assets/img/article-icon.png" /><?php /*<a href="javascript:void(0);" data-rel="tipsys" title="Flag item"><i class="icon-flag"></i></a>*/ ?></span>

                     <span class="article-head pad0"><span title="{{articleDetail.Title}}" ng-bind="articleDetail.Title"></span></span>
                 </h3>
             </div>

             <!--Slider-->
                <aside ng-if="articleDetail.ItemTags.length>0" ng-controller="itemDetailCtrl" id="shopPopup" class="shop-popup" style="height:330px;left:103px;top:515px;">
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

                    <div class="shop-popup-content" style="opacity:1;">
						<ul class="product-slider shopProductslider"  ng-init="getItemsDetail('<?php echo $articleGuID; ?>')">
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
                        <input class ="GifTester1" type="image"  ng-click="ShowHide(runwayItemDetail.ItemGuID,runwayItemDetail.Images[0],runwayItemDetail.Brand);" style = "margin-left: 5.9px;margin-right: 5px;position: absolute;top:273px;" src="/assets/img/ShopSimilar.png" />
    <!--                    <img class= "GifTester2" type="image" ng-click="ShowHide(runwayItemDetail.ItemGuID,runwayItemDetail.Images[0],runwayItemDetail.Brand);"  name="shopSimilar"  style = "margin-left: 5.9px;top:273px;margin-right: 5px;position: absolute;" ng-src="{{decachedImageUrl}}" />					
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
                        	                         
									  <p style="color:white;z-index:99999;font-family:jamesfontbold;font-size: 128%; margin-left: 44px;">&nbsp Show Me &nbsp
									  <input id="1" type="checkbox" ng-disabled="FirstCheck" class="ShopSimilarCheck" name="x"  value="y" ng-click="sameBrand(ItemGuID,1)" ng-bind="itemDetails" ng-checked="FirstCheck" ><span style="z-index:99999;font-family:jamesfont;font-size: 75%; font-weight: bold;"> More from  {{ItemArrayBrand | cut:true:10:' ...'}} &nbsp </span>
  									  <input id="2" type="checkbox" ng-disabled="SecondCheck" name="x"  class="ShopSimilarCheck" value="y"  ng-click="sameCategoryColor(ItemGuID,1)" ng-bind="itemDetails" style="color:white;" ng-checked="SecondCheck" ><span style="z-index:99999;font-family:jamesfont;font-size: 75%; font-weight: bold;"> Similar Items &nbsp </span>	
  									  <input id="3" type="checkbox" ng-disabled="ThirdCheck" name="x"  class="ShopSimilarCheck" value="y"  ng-click="lowerPrices(ItemGuID,1)" ng-bind="itemDetails" style="color:white;" ng-checked="ThirdCheck" ><span style="z-index:99999;font-family:jamesfont;font-size: 75%; font-weight: bold;"> Lower Prices	</span>							
							        </p>
                        </div>
                    </div>
                </aside>
				<div class="article-slider detailSlider">
                 <div class="img-right-nav">
                     <ul>
                         <li style="cursor: pointer;" ng-click="getSavedArticleUsers(articleDetail.ArticleGuID,articleDetail.NoOfSaves)"><i ng-class="{'icon-save-view':articleDetail.saveArticle == 1, 'icon-savewhite':articleDetail.saveArticle == 0}"></i><span ng-bind="articleDetail.NoOfSaves"></span></li>
                         <li><i class="icon-view cursor-default"></i><span id="ArticleNoOfComments3" ng-bind="articleDetail.NoOfViews"></span></li>
                         <li><i class="icon-sharewhite cursor-default"></i><span id="shareCount"></span></li>
                     </ul>
                 </div>
                 <ul class="articleimg-slider articalDetail" ng-if="itemDetails.length >= 0">
                     <li data-ng-repeat="article in articleDetail.Images" repeat-done="articlelayoutDone();">
                      <div class="tagView" onmouseover="show_tags()" onmouseout="hide_tags()">

                        <img thumb-type='article' thumb-img thumb-height=610 thumb-width=530 server="<?php echo IMAGE_SERVER_PATH; ?>" item='article' alt="" title="" />
                         <div class="show_tags2" onmouseover="hide_data()" onmouseout="show_data()">
                         <i data-ng-repeat="hotSpotTag in article.Tags | filter:filterHotspot" class="icon-imgtag3 {{hotSpotTag.ItemGuID}}" data-type="tagtipDetail" ng-style="{'left':hotSpotTag.FromLeft+'%', 'top':hotSpotTag.FromTop+'%'}">&nbsp;</i>
                        <span id="inner_tags2" style="display:none;"><i data-ng-repeat="hotSpotTag in article.Tags | filter:filterHotspot" class="icon-imgtag1 {{hotSpotTag.ItemGuID}}" data-type="tagtipDetail" ng-style="{'left':hotSpotTag.FromLeft+'%', 'top':hotSpotTag.FromTop+'%'}" >&nbsp;


                             <div class="gallery-tag"  ng-controller="itemDetailCtrl" ng-init="populateItemDetail(hotSpotTag.ItemGuID,true)">

                                 <div class="gallery-tag-inner" ng-click="viewItemDetails(itemDetail, $event)">

                                     <i ng-click="closeItemDetail($event)" class="icon-closeb1"></i><img thumb-img item="itemDetail.Images[0]" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=220 thumb-height=220 alt=""/>
                                     <aside class="detail_price"><span ng-if="itemDetail.Price!='$0'" class="prduct-cost-price">{{itemDetail.Price}}</span></aside>
                                     <!-- <a ng-cloak="" class="img-footer-nav clippedaction" data-type="customtip" data-title="Clip" ng-show="itemDetail.isclip=='0'" ng-click="clipItem(itemDetail.ItemGuID,$event)" class="add-action for-tag for-tag-{{itemDetail.ItemGuID}}"><i class="icon-clip-black"></i> </a>-->
                                     <a data-rel="Clip’d" ng-show="itemDetail.isclip=='0'" class="button-blk clip-link for-tag-runway for-tag-runway-{{itemDetail.ItemGuID}}" ng-click="clipItem(itemDetail.ItemGuID,$event)" href="javascript:void(0);">

                                       <span>SAVE</span>
                                     </a>

                                     <a data-rel="Clip’d" ng-if="itemDetail.isclip!='0'" class="button-blk3 clip-link cliped" href="javascript:void(0);">

                                       <span>SAVED</span>
                                     </a>

                                     <a class="button-blk" ng-click="itemDetail.Source!=''?redirectToSource(itemDetail.Source,$event):'javascript:void(0)'">BUY</a>
                                     <a class="button-blk"  ng-click="itemDetail.Source!=''?redirectToSource(itemDetail.Source,$event):'javascript:void(0)'"><i class="similar_symbol"></i><span class="similar_detail">Similar</span></a>
                                 </div>
											<div class="gallery-tag-bottom" >
                                     <aside class="brand2 tag-detail" style="word-wrap: break-word;height: auto;" ng-click="viewItemDetails(itemDetail)" ng-cloak="">{{itemDetail.Brand | cut:true:24:' ...'}}</aside>
                                     <aside class="title2 tag-detail sm " style="height:42px;margin-top: 4px;" ng-click="viewItemDetails(itemDetail)" ng-cloak>{{itemDetail.Title | cut:true:45:' ...'}} </aside>

                                 </div>
                                <!-- <div class="img-footer-nav">
                                     <ul>
                                         <li  class="clippedaction">
                                            <a ng-cloak="" data-type="customtip" data-title="Clip" ng-show="itemDetail.isclip=='0'" ng-click="clipItem(itemDetail.ItemGuID,$event)" class="add-action for-tag for-tag-{{itemDetail.ItemGuID}}"><i class="icon-clip-black"></i> </a>

                                            <a ng-cloak="" data-type="customtip" data-title="Clip'd" ng-show="itemDetail.isclip!='0'"  href="javascript:void(0);" class="add-action clipping" data-rel="Clip’d"><i class="icon-clip-black icon-cliped-black"></i> </a>
                                         </li>
                                         <li><a data-type="customtip" ng-click="itemDetail.Source!=''?redirectToSource(itemDetail.Source):'javascript:void(0)'" data-title="Buy"><i class="icon-shop"></i> </a></li>
                                         <li><a data-type="customtip" ng-click="viewItemDetailsComment(itemDetail)" data-title="Comment"><i class="icon-comment"></i> </a></li>
                                         <li><a data-type="customtip" ng-click="SetItemShareDetails(itemDetail,$event)" data-title="Share"><i class="icon-share"></i></a></li>
                                     </ul>
                                 </div> -->
                             </div>
                         </i></span></div>
                         </div>
                     </li>
                 </ul>


                 <div id="bx-pager">
                     <a ng-repeat="article in articleDetail.Images" data-slide-index="{{$index}}" href="">

						<img thumb-img thumb-type='article' item="article" thumb-width="71" thumb-height="71" server="<?php echo IMAGE_SERVER_PATH; ?>"  />
                 </div>
            </div>
             <!--//Slider-->

             <!--Slider footer info-->
             <div class="img-footer-nav">
                <ul>
                    <span class='st_sharethis_hcount' style="display:none;" displayText='ShareThis'></span>
                    <li data-type="saveButton" ng-cloak="">
                        <a ng-cloak="" ng-show="articleDetail.saveArticle=='0'" ng-click="saveArticle(articleDetail.ArticleGuID)">
                            <i class="icon-newsave"></i>
                            <span class="hidden-phone">Save</span>
                        </a>
                        <a ng-cloak="" ng-show="articleDetail.saveArticle!='0'"  href="javascript:void(0);">
                            <i class="icon-newsave selected"></i>
                            <span class="hidden-phone">Saved</span>
                        </a>
                    </li>
                    <li data-type="shopPopu">
                        <a>
                            <i class="icon-shop"></i>
                            <span class="hidden-phone">Shop</span>
                        </a>
                    </li>
                    <li>
                        <a onclick="openPopDiv('shareit', 'bounceInDown')">
                            <i class="icon-share"></i>
                            <span class="hidden-phone">Share</span>
                        </a>
                    </li>
                </ul>
                <ul class="footer-nav-right">
                    <li><a data-rel="tipsyn" ng-click="articleDetail.Source!=''?redirectToSource(articleDetail.Source):'javascript:void(0)'" title="{{articleDetail.Source}}"><i class="icon-link"></i></a></li>
                    <li>
                        <a ng-if="articleDetail.Location!='-' && articleDetail.Location!=''" data-rel="tipsyn" href="<?php echo base_url(); ?>stylemap?location={{articleDetail.Location}}" target="_blank" title="{{articleDetail.Location}}"><i class="icon-map"></i></a>
                        <a ng-if="articleDetail.Location=='-' || articleDetail.Location==''" data-rel="tipsyn"><i class="icon-map"></i></a>
                    </li>
                </ul>
             </div>
             <!--//Slider footer info-->

             <!-- Comments-->
            <div ng-controller="WallPostCtrl" ng-init="SeeAllPostComments('<?php echo $articleGuID; ?>','Article',4)" >
                <div class="comment-head">
                    <h3 class="pull-left" ng-cloak="">Comments ({{TotalComments}})</h3>
                    <h3 class="pull-right" ng-if="Comments.length < TotalComments"><a ng-click="SeeAllPostComments('<?php echo $articleGuID; ?>','Article',0)"  data-rel="tipsys" title="View All" class="viewall">View All</a></h3>
                </div>
                <div class="comment-body">
                    <ul class="alerts-lisings">
                        <li ng-repeat="comment in Comments">
                            <div class="alerts-left">
                                <figure><img style="max-width: 62px;" alt="" ng-src="{{comment.ProfilePicture}}"></figure>
                                <div class="nameinfo">
                                    <div class="title-info">
                                        <!--<span ng-if="comment.CanDelete == 1"><a ng-click="deleteComment(comment.CommentGuID,'<?php //echo $ArticleGuID; ?>','Article')">Delete</a></span>-->
                                        <div class="alerts-info" ng-cloak="">
                                            {{comment.CreatedDate2}}
                                            <a ng-if="comment.CanDelete == 1" ng-click="confirmDeleteComment(comment.CommentGuID,'<?php echo $articleGuID; ?>','Article')"><i class="icon-small-close"></i></a>
                                        </div>
                                        <span  ng-bind="comment.Name"></span>
                                    </div>
                                    <p ng-bind="comment.PostComment"></p>
                                </div>
                            </div>
                        </li>

                    </ul>

                    <?php if($this->session->userdata('LoginSessionKey') != '') { ?>
                    <div class="comments-add">
                        <div class="text-fields">
                            <textarea id="project_comment" class="form-control sm" placeholder="Add a comment..."></textarea>
                        </div>
                        <div class="row">
                            <button class="button btn-post pull-right" ng-click="submitComment('<?php echo $articleGuID; ?>','Article')">Post</button>
                        </div>
                    </div>
                    <?php } ?>
                </div>
                <!-- Remove Comments-->
                <div class="popup-wrap animated" id="removecomment">
                    <div class="popup-body">
                        <div class="popup-header">
                            <a class="icon-close" onClick="closePopDiv('removecomment')"></a>
                            Remove Comment
                        </div>
                        <div class="popup-content content-center">
                            <p class="msg">Are you sure, You want to delete this comment?</p>
                            <div class="button-action m-t-15">
                                <button class="button button-white btn-space" type="button" onClick="closePopDiv('removecomment')">Cancel</button>
                                <button class="button" type="button" ng-click="deleteComment(CommentGuIDToRemove,ActivityGuIDToRemove,ActivityTypeToRemove)">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- //Remove Comments-->
            </div>
            <!-- //Comments-->

             <div class="popup-wrap animated" id="clipitempopup">
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


         </aside>
     </div>
    <div ng-controller="wardrobeCtrl">
    <?php $this->load->view('include/popup'); ?>
    </div>
    <input type="hidden" id="LoginSessionKey" value="<?php echo $this->session->userdata('LoginSessionKey'); ?>" />
    <input type="hidden" id="WallPageNo" value="1" />
    <input type="hidden" id="UserGUID" value="<?php if(isset($UserGUID)){ echo $UserGUID; } ?>" />
    <input type="hidden" id="AllActivity" value="<?php if(isset($AllActivity)){ echo $AllActivity; } ?>" />
    <input type="hidden" id="UserWall" value="1" />
    <input type="hidden" id="UserID" value="<?php if(isset($UserID)){ echo $UserID; } ?>" />


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

    <!-- share-->
    <div class="popup-wrap animated" id="shareit">
        <div class="popup-body">
            <div class="popup-header">
                <a class="icon-close" onClick="closePopDiv('shareit')"></a>
                Share
            </div>
            <div class="popup-content content-center">
                <?php /*<span class='st_facebook_large' st_url="<?php echo base_url().$articleURL; ?>" st_image="<?php echo IMAGE_SERVER_PATH; ?>uploads/article/<?php echo $firstImage; ?>" displayText='Facebook'></span>*/ ?>
                <span><a class="btn" target="_blank" href="http://www.facebook.com/sharer.php?s=100&p[url]=<?php echo base_url().$articleURL; ?>&p[images][0]=<?php echo IMAGE_SERVER_PATH; ?>uploads/article/530x610/<?php echo $firstImage; ?>"><img src="<?php echo base_url()."/assets/img/facebook_32.png"; ?>" style="margin-top: -25px;" /></a></span>
                <span class='st_twitter_large' st_url="<?php echo base_url().$articleURL; ?>" st_image="<?php echo IMAGE_SERVER_PATH; ?>uploads/article/530x610/<?php echo $firstImage; ?>" displayText='Tweet'></span>
                <span class='st_linkedin_large' st_url="<?php echo base_url().$articleURL; ?>" st_image="<?php echo IMAGE_SERVER_PATH; ?>uploads/article/530x610/<?php echo $firstImage; ?>" displayText='LinkedIn'></span>
                <span class='st_pinterest_large' st_url="<?php echo base_url().$articleURL; ?>" st_image="<?php echo IMAGE_SERVER_PATH; ?>uploads/article/530x610/<?php echo $firstImage; ?>" displayText='Pinterest'></span>
                <span class='st_email_large' st_url="<?php echo base_url().$articleURL; ?>" st_image="<?php echo IMAGE_SERVER_PATH; ?>uploads/article/<?php echo $firstImage; ?>" displayText='Email'></span>
                <span class='st_googleplus_large' st_url="<?php echo base_url().$articleURL; ?>" st_image="<?php echo IMAGE_SERVER_PATH; ?>uploads/article/530x610/<?php echo $firstImage; ?>" displayText='Google +'></span>
            </div>
        </div>
    </div>
    <!-- //share-->
    <script>
    window.onload = function() {
      //document.getElementsByTagName("body");


    };
    function button_color()
    {

      $('#button_call').css("background-color","rgba(0,115,230,1)");
    }

    function button_colorback()
    {
      $('#button_call').css("background-color","rgba(33,177,255,0.9)");
    }

    function show_tags()
    {
      $('#inner_tags2').show();
    }

    function hide_tags()
    {
      $('#inner_tags2').hide();
    }

    function hide_data()
    {
      $('.icon-imgtag3').hide();
    }
    function show_data()
    {
      $('.icon-imgtag3').show();
    }

    </script>