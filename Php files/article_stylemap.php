<!--Main wrapper-->
<div class="main-wrapper" id="wardrobeCtrlInStylemap" ng-controller="wardrobeCtrl">
    <div class="update-view" onclick="getArticleForStylemap(true,true)" >
        <i class="icon-update" data-ng-show="StylemapArticleCount!=''" data-ng-cloak></i>
        <i class="icon-update noupdateshow" ng-if="StylemapArticleCount==''" data-ng-cloak></i>
    </div>
    <div class="updatedtip noupdate">No Updates</div>
    <div class="updatedtip" data-ng-cloak data-ng-if="StylemapArticleCount!==''" ng-bind="StylemapArticleCount"></div>
    
    <?php $this->load->view('article/featured_slider');?>
    <div id="articleCtrl" ng-controller="articleCtrl">
        <aside class="content-wrapper paddingWrap">
            <div class="pos-relative">
                <ul class="article-grid styleMap-grid">
                    <li>
                        <h3 class="sm-artical-name"> <span class="left-head menu-nav"> <a data-rel="tipsyn" class="icon-menu active" href="javascript:void(0)" original-title="See All"></a> <a data-rel="tipsyn" class="icon-eye" href="javascript:void(0)" original-title="Articles"></a> <!--<a data-rel="tipsyn" class="icon-category" href="javascript:void(0)" original-title="Department Stores"></a> <a data-rel="tipsyn" class="icon-info" href="javascript:void(0)" original-title="Clothing Stores"></a>--> </span> <span class="right-head">
                            <span  class="select-field dropdwonlist">                              
                              <!--<select data-placeholder="Select Location" class="chosen-select" tabindex="15">
                                <option>London, UK</option>
                              </select>-->
                            <span class="textView" id="searchAddress"><span>Select Location</span></span>
                            <ul class="locationdropdown">
                                   <li>
                                      <div class="text-field" id="selectLocationManual"><input type="text"></div>
                                   </li>
                                   <li class="location-select" onclick="getPreSelectedLocation('The World')">The World</li>
                                   <li class="location-select" onclick="getPreSelectedLocation('San Francisco, CA')">San Francisco, CA</li>
                                   <li class="location-select" onclick="getPreSelectedLocation('Los Angeles, CA')">Los Angeles, CA</li>
                                   <li class="location-select" onclick="getPreSelectedLocation('New York, US')">New York, New York</li>
                                   <li class="location-select" onclick="getPreSelectedLocation('Paris, France')">Paris, France</li>
                                   <li class="location-select" onclick="getPreSelectedLocation('Milan, Italy')">Milan, Italy</li>
                                   <li class="location-select" onclick="getPreSelectedLocation('Tokyo, Japan')">Tokyo, Japan</li>
                              </ul>  
                            </span> 

                                <a href="javascript:void(0);" id="near-me" class="near-me">
                                    <i class="icon-near-location"></i><small>Near Me</small> 
                                </a> 
                        </span> 

                    </h3>
                        <div class="map-wrapper">
                            <section class="stylemap-container" id="map-canvas">

                            </section>
                        </div>
                    </li>
                    <li>
                        <h3> <span id="latestInText"></span></h3>
                        <ul class="og-grid expanderGrid runway-grid expander-grid" ng-if="SearchedArticles.length > 0">
                            <li ng-repeat="(key, SearchArticle) in SearchedArticles" repeat-done="runwayGridDone();" >
                                <a href="javascript:void(0);" ng-click="getRunwayArticleDetail(SearchArticle)" data-title="SearchArticle.Title" data-description="">
                                    <div class="ih-item square effect13 bottom_to_top">
                                        <div class="product-img">
                                            <div class="img">
                                                <img thumb-img thumb-type="article" ng-if="SearchArticle.Images.length > 0" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=220 thumb-height=220 item="SearchArticle.Images[0]" alt="img">
                                            </div>
                                            <div class="info">
                                                <div class="info-back">
                                                    <h3 ng-bind="(SearchArticle.Title| cut:true:60:' ...')"></h3>
                                                    <div class="mrtop20"></div>
                                                    <h3 ng-if="SearchArticle.FirstName!=''" ng-bind="'By '+SearchArticle.FirstName+' '+SearchArticle.LastName"></h3>
                  <h3 ng-if="SearchArticle.FirstName==''" ng-bind="'By Author'"></h3>
                                                    <div class="footer-hrs" ng-bind="SearchArticle.ModifiedDate"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <div ng-if="SearchedArticles.length == 0 && paginationbusySearchArticle == false">
                            <h3>No Articles for this Location</h3>
                        </div>
                    </li>

                </ul>

      <div id="imageDetail" style="display:none;">
        <div class="image-detail">
          <div class="img-detail-right">
            <div class="img-content" onmouseover="showtags()" onmouseout="hidetags()">
            <button class="button small show-items-button" name="" type="button" ng-show="runwayArticleTag">Show Items</button> 
              <!-- Tad and Shop Popup  -->
              <aside ng-if="runwayArticleItems.length>0" class="shop-popup" id="shopPopup">
    
                <div class="popup-header"> 
                  <i class="icon-closepopup"></i>
                  
                    <div class="cursor-pointer popup-title" ng-click="viewItemDetails(showArticleItem)">
                        <label class="label" ng-bind="(showArticleItemBrand | cut:true:20:' ...')"></label>
                        <span class="product-name" ng-bind="(showArticleItemTitle | cut:true:20:' ...')"></span> 
                        <span class="prduct-cost" ng-if="showArticleItemPrice!='$0'" ng-bind="showArticleItemPrice"></span> 
                    </div>
                </div>
    
                <div class="shop-popup-content">
                  <ul class="product-slider shopProductslider" ng-controller="itemDetailCtrl" ng-init="getItemsDetail(runwayArticleItems)">
                     <li><img src="<?php echo IMAGE_HTTP_PATH; ?>../assets/img/slider-default-img.png"></li>

                      <li data-ng-repeat="(runwayItemKey, runwayItemDetail) in itemDetails" ng-mouseenter="showArticleItemDetail($index)" repeat-done="shoplayoutDone();">
                        
                        <img thumb-img alt="" ng-click="$parent.viewItemDetails($parent.runwayItemDetail)" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=190 thumb-height=160 item="runwayItemDetail.Images[0]"/>
						<span class="add-product-items"> <i class="icon-check-wh"></i></span>
                        <div class="shop-popup-action">
                          <a id="for-shop-runway-{{runwayItemDetail.ItemGuID}}" ng-if="runwayItemDetail.isclip=='0'" ng-click="clipItem(runwayItemDetail.ItemGuID,$event)" href="javascript:void(0);" class="button-blk clip-link for-shop-runway ">
                            <i class="icon-clip-white"></i> 
                            <span>Clip</span> 
                          </a>                           
                          <a ng-if="runwayItemDetail.isclip!='0'" href="javascript:void(0);" class="button-blk clip-link cliped" data-rel="Clipâ€™d">
                            <i class="icon-clip-white"></i> 
                            <span>Clip'd</span> 
                          </a> 
                          <a ng-click="runwayItemDetail.Source!=''?redirectToSource(runwayItemDetail.Source):'javascript:void(0)'" class="button-blk">Buy</a>
                        </div>
                      </li>
                    <li><img src="<?php echo IMAGE_HTTP_PATH; ?>../assets/img/slider-default-img.png"></li>
                  </ul>
                </div>

              </aside>
              <div ng-controller="itemDetailCtrl">
                <div class="gallery-tag" onmouseover="hideData()" onmouseout="showData()">
            <div class="gallery-tag-inner" ng-click="viewItemDetails(TagedItemDetail,$event)">

                 <i class="icon-closeb1" ng-click="closeItemDetail($event)"></i>

          <!--       <img style="height:160px" thumb-img alt="" ng-if="TagedItemDetail.Images[0].ImageUrl" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=220 thumb-height=220 item="TagedItemDetail.Images[0]"/> -->
          <!--      <i data-ng-repeat="hotSpotTag in runwayArticleTag | filter:filterHotspot" ng-mouseenter="getTagedItemDetail(hotSpotTag.ItemGuID,1)" class="icon-imgtag" data-type="tagtiprunway" ng-style="{'left':hotSpotTag.FromLeft+'%', 'top':hotSpotTag.FromTop+'%'}"></i>-->
              <img thumb-img alt=""  style="width:160px; height:190px" ng-if="TagedItemDetail.Images[0].ImageUrl" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width="TagedItemDetail.Images[0].Size > 0 ? 190 : 160" thumb-height="TagedItemDetail.Images[0].Size > 0 ? 160 : 190" item="TagedItemDetail.Images[0]" />
                  <div id="maskdisp2" class="mask1"></div>
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
               <span id="inner_tag3"><i data-ng-repeat="hotSpotTag in runwayArticleTag | filter:filterHotspot"  ng-mouseenter="getTagedItemDetail(hotSpotTag.ItemGuID,1)" class="icon-imgtag2" data-type="tagtiprunway" ng-style="{'left':hotSpotTag.FromLeft+'%', 'top':hotSpotTag.FromTop+'%'}"></i></span>

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
                  <a ng-click="SetArticleShareDetails(runwayArticleDetail);">
                  <i class="icon-share" ></i> 
                  <span class="hidden-phone">Share</span>
                  </a>
                </li>
              </ul>

              <ul class="footer-nav-right hidden-phone">
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
            <div class="accordion-block">
              <a href="javascript:void(0)" ng-click="viewArticleDetails(runwayArticleDetail)" >
                <div class="accordion-head" ng-bind="runwayArticleDetail.Title | truncate:28" title="{{runwayArticleDetail.Title}}" ></div>
              </a>
              <div class="accordion-content-detail">
                <div class="identify-auhor"> <small class="time-info hours" ng-bind="runwayArticleDetail.ModifiedDate"></small>
                  <div class="name-of-author" ng-cloak> <span>By </span>
                    <a href="{{runwayArticleDetail.ProfileLink}}" target="_blank"  class="author-name">
                      <figure><img ng-src="{{runwayArticleDetail.ProfilePicture}}" width="32px" alt="" class="img-circle" /></figure>
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



                <div class="clearfix">&nbsp;</div>
            </div>
        </aside>
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


    <?php $this->load->view('include/popup'); ?>

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

</div>
<!--//Main wrapper-->


<input type="hidden" id="LoginSessionKey" value="<?php echo $this->session->userdata('LoginSessionKey'); ?>" />
<input type="hidden" id="UserGUID" value="<?php
if (isset($UserGUID)) {
    echo $UserGUID;
}
?>" />
<input type="hidden" id="UserID" value="<?php
if (isset($UserID)) {
    echo $UserID;
}
?>" />

<input type="hidden" id="latitudeOnStylemap" value="" />
<input type="hidden" id="longitudeOnStylemap" value="" />
<input type="hidden" id="locationsOnStylemap" value="" />

<script>
// the selector will match all input controls of type :checkbox
// and attach a click event handler

window.onload = function() {
  //document.getElementsByTagName("body");
  if($( '#LoginSessionKey').val() == '' ){
     $('body').addClass('bannerSection');
    }
    $('#inner_tag3').hide();
    $('#maskdisp2').hide();
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
  $('#maskdisp2').show();
  
}

function showData()
{

  $('.icon-imgtag').show();
  $('#maskdisp2').hide();
}

function button_color()
{

  $('#button_call3').css("background-color","rgba(0,115,230,1)");
}

function button_colorback()
{
  $('#button_call3').css("background-color","rgba(33,177,255,1)");
}

function button_color1()
{
  $('#button_call3').css("background-color","rgba(0,115,230,1)");
}

function button_colorback1()
{
  $('#button_call3').css("background-color","rgba(33,177,255,0.9)");
}

function showtags()
{
$('#inner_tag3').show();
}

function hidetags()
{
$('#inner_tag3').hide();
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