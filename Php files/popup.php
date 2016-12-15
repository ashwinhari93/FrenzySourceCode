<!-- All Popup  --> <a id="clickedEvent"></a>
    <?php if( $this->session->userdata('LoginSessionKey') == ''){?>
        <!--Signup Pop up--> 
        <div class="popup-wrap animated registerpopup" id="signup">
            <div class="popup-body">
                <div class="popup-header" style="background-color: black;color: white;opacity: 1;">
                    <a class="icon-close" onClick="closePopDiv('signup')"></a>
                    Sign Up
                </div>
                <div class="popup-content">
                    <div class="row social-row">
                        <input type="button" value="Sign Up Manually" class="button-block button-block-primary" onClick="openPopDiv('joinfrenzy', 'bounceInDown'), closePopDiv('signup'),$('#commonErrorSignup').html(''),$('#commonErrorSignup').parent('div').removeClass().addClass('alert').hide();"/>
                    </div>
                    <div class="row social-row"> 
                        <a href="javascript:void(0);" class="button-block button-block-orange">
                            <i class="icon-g"></i> <span id="gmailsignupbtn">Sign Up with Google</span> </a>
                    </div>
                </div>
                <div  class="popup-footer">
                    Already have an account ? <a href="javascript:void(0);" onClick="openPopDiv('signin', 'bounceInDown'), closePopDiv('signup');">Sign In</a>
                </div>
            </div>
        </div>
        <!--//Signup Pop up-->
        
        <!--set password Pop up-->
        <div class="popup-wrap animated registerpopup" id="setpassword">
            <div class="popup-body" data-ng-controller="loginAccountCtrl" id="forgotPWDForm" ng-cloak>
                <div class="popup-header" style="color:white;background-color: black;opacity: 1;">
                    <a class="icon-close" onClick="closePopDiv('setpassword')"></a>
                    <?php echo lang('setpassword_title');?>
                </div>
                
                <form name="setpassword" ng-submit="setPassword(setpassword.$valid)" novalidate>
                    <input type="hidden" id="UserGUID" value="<?php echo  $this->session->userdata('UserGUID'); ; ?>" />
                    <div class="popup-content">

                        <div class="alert-error-alert">
                            <i class="icon"></i>
                            <span class="overflow" id="commonErrorForgot"><?php if(isset($_GET['msg']) && $_GET['msg'] != '') { echo lang('msg'.$_GET['msg']); } ?></span>
                        </div>

                    <div class="row"> 
                        <div class="text-fields">
                            <input type="password" name="signUpPassword" placeholder="Password" data-ng-model="mod.password" ng-minlength="6" ng-maxlength="20" required >
                        </div>
                        <div class="error-holder">
                        <span ng-show="setpassword.signUpPassword.$dirty || submitted">
                            <span class="error" ng-show="setpassword.signUpPassword.$error.required">Password is Required!</span>
                            <span class="error" ng-show="setpassword.signUpPassword.$error.minlength">Minimum 6 character password required!</span>
                            <span class="error" ng-show="setpassword.signUpPassword.$error.maxlength">Maximum 20 character allowed!</span>
                        </span>
                        </div>
                    </div>

                    <div class="row"> 
                        <div class="text-fields">
                            <input type="password" name="confirmSignUpPassword" placeholder="Confirm Password" data-ng-model="mod.confirmPassword" password-confirm match-target="mod.password" required >
                        </div>
                        <div class="error-holder">
                        <span ng-show="setpassword.confirmSignUpPassword.$dirty  || submitted">
                            <span class="error" ng-show="setpassword.confirmSignUpPassword.$error.required">Confirm Password is Required!</span>
                            <span class="error" ng-show="!setpassword.confirmSignUpPassword.$error.required && setpassword.confirmSignUpPassword.$error.match">Both Password did not match!</span>
                        </span>
                        </div>
                    </div>

                        <div class="row">
                            <input type="submit" value="Set Password" class="button-block button-block-primary" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
        <!--//set password Pop up-->

        <!--Signin Pop up-->
        <div class="popup-wrap animated registerpopup" id="signin">
            <div class="popup-body" data-ng-controller="loginAccountCtrl" ng-cloak>
               
                <form name="signInForm" ng-submit="loginUser(signInForm.$valid)" novalidate>
                    <div class="popup-header" style="color:white;background-color: black;opacity: 1;">
                        <a class="icon-close" ng-click="signInPopup('',signInForm)"></a>
                        Sign In
                    </div>
                    <input type="hidden" data-ng-model="mod.SocialType" ng-init="mod.SocialType='Web'" id="IDSocialTypeLogin" name="SocialType" class="ng-pristine ng-valid">
                    <input type="hidden" data-ng-model="IDSourceIDLogin" ng-init="IDSourceIDLogin='1'" id="IDSourceIDLogin" name="IDSourceIDLogin" class="ng-pristine ng-valid">
                    <input type="hidden" data-ng-model="mod.UserSocialID" ng-init="mod.UserSocialID=''" id="LoginUserSocialID" name="UserSocialID" class="ng-pristine ng-valid">
                    <div class="popup-content">

                        <div class="alert">
                            <i class="icon"></i>
                            <span class="overflow" id="commonError"><?php if(isset($_GET['msg']) && $_GET['msg'] != '') { echo lang('msg'.$_GET['msg']); } ?></span>
                        </div>

                            
                            
                            <!--Alert Message--> 
                          <!-- <div class="alert-error-alert">
                                <i class="icon"></i><span class="overflow">Your profile is still pending for admin approval and will only be visible once approved.  </span>
                            </div>
                          <div class="alert-warning-alert">
                                <i class="icon"></i><span class="overflow">You are successfully registered on Renovate.</span>
                            </div>
                           <div class="alert-info-alert">
                                <i class="icon"></i><span class="overflow">Tell Renovate about yourself and we’ll help you find best contractors in your area </span>
                            </div>-->
                            <!--/ Alert Message-->
                        

                        <div class="row"> 
                            <div class="text-fields">
                                <input type="text" name="userId" placeholder="Email or Username" data-ng-model="mod.userId" required>
                            </div>
                            <div class="error-holder">
                            <span ng-show="signInForm.userId.$dirty || submitted">
                                <span class="error" ng-show="signInForm.userId.$error.required">Email or Username is Required!</span>
                            </span>
                            </div>
                        </div>

                        <div class="row"> 
                            <div class="text-fields">
                                <input type="password" name="password" placeholder="Password" data-ng-model="mod.password" ng-minlength="6" ng-maxlength="20" required>
                            </div>
                            <div class="error-holder">
                            <span ng-show="signInForm.password.$dirty || submitted">
                                <span class="error" ng-show="signInForm.password.$error.required">Password is Required!</span>
                                <span class="error" ng-show="signInForm.password.$error.minlength">Minimum 6 character password required!</span>
                                <span class="error" ng-show="signInForm.password.$error.maxlength">Maximum 20 character allowed!</span>
                            </span>
                            </div>
                        </div>

                        <div class="row fgpassoword"> 
                            <a href="javascript:void(0);" ng-click="signInPopup('forgotPassword',signInForm)" >Forgot Password?</a>
                        </div>

                        <div class="row">
                            <input type="submit" value="Sign in" class="button-block button-block-primary" />
                        </div>
                        <div class="or-seprator">Or</div>

                        <div class="row"> 
                            <a href="javascript:void(0);" class="button-block button-block-orange">
                                <i class="icon-g"></i> <span id="gmailsigninbtn">Sign in  with Google</span> </a>
                        </div>
                    </div>
                </form>
                <div  class="popup-footer">
                    Don’t have an account ? <a href="javascript:void(0);" ng-click="signInPopup('signup',signInForm)" >Sign Up</a>
                </div>
            </div>
        </div>
        
        <!--//Signin Pop up-->
        

         <?php 
        if(isset($_GET['type']) && $_GET['type']!='') { $type=$_GET['type']; } else { $type=1; }
        if(isset($_GET['id']) && $_GET['id']!='') { $id=$_GET['id']; } else { $id=''; }
        if(isset($_GET['email']) && $_GET['email']!='') { $email=$_GET['email']; } else { $email=''; }
        if(isset($_GET['fname']) && $_GET['fname']!='') { $fname=$_GET['fname']; } else { $fname=''; }
        if(isset($_GET['lname']) && $_GET['lname']!='' && $_GET['lname']!='null' && $_GET['lname']!='undefined') { $lname=$_GET['lname']; } else { $lname=''; }
        if(isset($_GET['picture']) && $_GET['picture']!='') { $picture=$_GET['picture']; } else { $picture=''; }

        $email = isset($Email) ? $Email : $email ;

        if($type==1) {
          $api='Web';
          $signupvia='Email';
        } elseif($type==2) {
          $api='Facebook API';
          $signupvia='Facebook';
        } elseif($type==4) {
          $api='Google API';
          $signupvia='Gmail';
        } elseif($type==7) {
          $api='LinkedIN API';
          $signupvia='LinkedIn';
        } elseif($type==3) {
          $api='Twitter API';
          $signupvia='Twitter';
        }
        ?>
        <!--Join Frenzy Pop up-->
        <div class="popup-wrap animated registerpopup" id="joinfrenzy" data-ng-controller="signUpCtrl" ng-cloak>
            <form name="signUpForm" ng-submit="signUpUser(signUpForm.$valid,signUpForm)" novalidate>
                <input type="hidden" id="inviteToken" value="<?php echo isset($token) ? $token : '' ;  ?>" />
                <input type="hidden" name="SourceID" ng-init="IDSourceID='<?php echo $type; ?>'" value="<?php echo $type; ?>" id="IDSourceID" data-ng-model="IDSourceID">
                <input type="hidden" name="SocialType" ng-init="mod.IDSocialType='<?php echo $api; ?>'" value="<?php echo $api; ?>" id="IDSocialType" data-ng-model="mod.IDSocialType">
                <input type="hidden" name="UserSocialID" ng-init="mod.UserSocialID='<?php echo $id; ?>'" value="<?php echo $id; ?>" id="UserSocialID" data-ng-model="mod.UserSocialID">
                <input type="hidden" data-ng-model="mod.DeviceType" data-ng-init="mod.DeviceType='Native'" />
                
            <div class="popup-body">
                <div class="popup-header" style="color:white;background-color: black;opacity: 1;">
                    <a class="icon-close" ng-click="closeSignUpUser(signUpForm)"></a>
                    Join Frenzy
                </div>
                <div class="popup-content">
                    
                    <div class="alert">
                        <i class="icon"></i>
                        <span class="overflow" id="commonErrorSignup"></span>
                    </div>
                    
                    <div class="row"> 
                        <div class="text-fields">
                            <input type="text" name="Username" placeholder="Username" data-ng-model="mod.signUpId" ng-pattern="/^[a-zA-Z0-9]*$/" ng-minlength="6" ng-maxlength="15" required >
                        </div>
                        <div class="error-holder">
                        <span ng-show="signUpForm.Username.$dirty || submitted">
                            <span class="error" ng-show="signUpForm.Username.$error.required">Username is Required!</span>
                            <span class="error" ng-show="signUpForm.Username.$error.pattern">Only alphanumeric characters(0-9 , a-z, A-Z) are allowed!</span>
                            <span class="error" ng-show="signUpForm.Username.$error.minlength">Minimum 6 character Username required!</span>
                            <span class="error" ng-show="signUpForm.Username.$error.maxlength">Maximum 15 character allowed!</span>
                        </span>
                        </div>
                        
                    </div>

                    <div class="row"> 
                        <div class="text-fields">
                            <input type="email" name="signUpEmail" placeholder="Email" data-ng-model="mod.signUpEmail" required >
                        </div>
                        
                        <div class="error-holder">
                        <span ng-show="signUpForm.signUpEmail.$dirty || submitted">
                            <span class="error" ng-show="signUpForm.signUpEmail.$error.required">Email is Required!</span>
                            <span class="error" ng-show="signUpForm.signUpEmail.$error.email">Invalid email format!</span>
                        </span>
                        </div>
                    </div>

                    <div class="row"> 
                        <div class="text-fields">
                            <input type="password" name="signUpPassword" placeholder="Password" data-ng-model="mod.signUpPassword" ng-minlength="6" ng-maxlength="20" required >
                        </div>
                        <div class="error-holder">
                        <span ng-show="signUpForm.signUpPassword.$dirty || submitted">
                            <span class="error" ng-show="signUpForm.signUpPassword.$error.required">Password is Required!</span>
                            <span class="error" ng-show="signUpForm.signUpPassword.$error.minlength">Minimum 6 character password required!</span>
                            <span class="error" ng-show="signUpForm.signUpPassword.$error.maxlength">Maximum 20 character allowed!</span>
                        </span>
                        </div>
                    </div>

                    <div class="row"> 
                        <div class="text-fields">
                            <input type="password" name="confirmSignUpPassword" placeholder="Confirm Password" data-ng-model="mod.confirmSignUpPassword" password-confirm match-target="mod.signUpPassword" required >
                        </div>
                        <div class="error-holder">
                        <span ng-show="signUpForm.confirmSignUpPassword.$dirty  || submitted">
                            <span class="error" ng-show="signUpForm.confirmSignUpPassword.$error.required">Confirm Password is Required!</span>
                            <span class="error" ng-show="!signUpForm.confirmSignUpPassword.$error.required && signUpForm.confirmSignUpPassword.$error.match">Both Password did not match!</span>
                        </span>
                        </div>
                    </div>

                    <div class="row">
                        <input type="submit" value="Create Account" class="button-block button-block-primary"/>
                    </div>

                </div>
                <div  class="popup-footer">
                    Already have an account ? <a href="javascript:void(0);" ng-click="signUpToSignIn(signUpForm)" >Sign In</a>
                </div>
            </div>
            </form>
        </div>
        <!--//Join Frenzy Pop up-->


        <!--Forgot Password Pop up-->
        <div class="popup-wrap animated registerpopup" id="forgotPassword">
            <div class="popup-body" data-ng-controller="loginAccountCtrl" ng-cloak>
                <form name="forgotPWDForm" ng-submit="forgotPWDUser(forgotPWDForm.$valid,forgotPWDForm)" novalidate>
                    <div class="popup-header" style="color:white;background-color: black;opacity: 1;">
                        <a class="icon-close" ng-click="closeForgotPass(forgotPWDForm)"></a>
                        Forgot Password
                    </div>
                    <div class="popup-content">

                        <div class="alert">
                            <i class="icon"></i>
                            <span id="commonErrorForgotone" class="overflow"></span>
                        </div>
                        
                        <div class="row"> 
                            <div class="text-fields">
                                <input type="email" name="email" placeholder="Email" data-ng-model="mod.ForgotPWDId" required  id="txtusername">
                            </div>
                            <div class="error-holder">
                            <span ng-show="forgotPWDForm.email.$dirty || submitted">
                                <span class="error" ng-show="forgotPWDForm.email.$error.required">Email is Required!</span>
                                <span class="error" ng-show="forgotPWDForm.email.$error.email">Invalid email format!</span>
                            </span>
                            </div>
                        </div>

                        <div class="row">
                            <input type="submit" value="Submit" class="button-block button-block-primary" />
                        </div>

                    </div>
                    <div  class="popup-footer">
                        Already have an account ? <a href="javascript:void(0);" ng-click="closeForgotPassOpenSignIn(forgotPWDForm)">Sign In</a>
                    </div>
                </form>
            </div>
        </div>
        <!--//Forgot Password Pop up-->

       
    <?php }else{
        
         if(!isset($UserID)){
            $UserID = $this->session->userdata('UserID');
          }
        
          //if($UserID == $this->session->userdata('UserID') ){
          if(true){  
              
          
        ?>
        
        <!--//Save article Pop up-->
       
        
        <!-- All Popup  -->  
        <div ng-init="getWardrobeList()" >
                <!-- Edit  Wardrobe--> 
                <div class="popup-wrap animated create-product-popups localsorage-product addnwardrobe-products" id="editnewwardrob">
                    <div class="popup-body">
                        <div class="popup-header" style="color:white;background-color: black;opacity: 1;">
                            <a class="icon-close" onClick="closePopDiv('editnewwardrob')"></a>
                            {{editWardrobeTitle}}
                        </div>

                        <div class="popup-content no-bottom-space">

                            <div class="edit-titlehere"> 
                                <input type="text" ng-model="categoryTitle" placeholder="Enter wardrobe title here">
                            </div>
                            <div class="error-holder source-errorholder">
                            <span ng-show="addEditWardrobeSubmitted==1 && categoryTitle.length<=0">
                                <span class="error" >Item Title is Required!</span>
                            </span>
                            </div>

                            <div class="upload-wrap"> 

                                <p class="tex-center">Select an icon for your wardrobe</p>

                                <div class="row-grid">
                                    <ul class="poduct-add-items choose-productitems">
                                        <li ng-if="customCategorylistData.hasOwnProperty('CategoryMasterGuID')" ng-click="setSelectedCategory(customCategorylistData.CategoryMasterGuID,customCategorylistData.CategoryName)" id="{{customCategorylistData.CategoryMasterGuID}}" class="selected-porduct-items">
                                            <div class="items-inner">
                                                <span class="items-figure">
                                                    <img ng-src="{{customCategorylistData.Icon}}" alt="{{customCategorylistData.CategoryName}}">
                                                </span>
                                                <span class="add-product-items">
                                                    <i class="icon-check-wh"></i>
                                                </span>
                                                
                                            </div>
                                        </li>
                                        <li ng-repeat="categorylist in categorylistData" ng-click="setSelectedCategory(categorylist.CategoryMasterGuID,categorylist.CategoryName )" id="{{categorylist.CategoryMasterGuID}}">
                                            <div class="items-inner">
                                                <span class="items-figure"><img alt="" ng-src="{{categorylist.Icon}}"></span>
                                                <span class="add-product-items">
                                                    <i class="icon-check-wh"></i>
                                                </span>
                                            </div>
                                        </li>
                                        
                                       
                                    </ul>
                                </div>
                                

                            </div>
                            
                            <div class="upload-another"><span>Or upload another</span></div>

                            <div class="choosefile-uploader">    
                                <div class="text-fields">
                                    <span class="imgurl">{{filename}}</span> <a href="javascript:void(0);" class="remove-uploaded"><i class="icon-small-close"></i></a>
                                    <button name="" type="button" class="imagebrowse" onclick="$('#fileBrowse2').trigger('click');">
                                        Choose File
                                    </button>
                                    <div class="hiddendiv"><input type="file" ctitle="categoryTitle" fileread="uploadme" filename="filename" fileext="fileext" name="" id="fileBrowse2"></div>
                                </div>
                            </div>
                            <div class="error-holder">
                            <span ng-show="addEditWardrobeSubmitted==1 && (selectedCategory=='' && uploadme=='')">
                                <span class="error" >Select or upload wardrobe icon!</span>
                            </span>
                            </div>
                        </div>

                        <div class="add-content-footer">
                            <button type="button" class="button pull-right button-radius" ng-click="addEditWardrobe(editCollectionGuID)">Next</button>
                        </div>
                    </div>
                </div> 
                <!-- //Edit  Wardrobe-->

                <!-- Add New Wardrobe2--> 
                <div class="popup-wrap animated create-product-popups localsorage-product addnwardrobe-products" id="addnwardrobe2">
                    <div class="popup-body">
                        <div class="popup-header" style="color:white;background-color: black;opacity: 1;">
                            <a class="icon-close" onClick="closePopDiv('addnwardrobe2')"></a>
                            Add Items To Your Wardrobe
                        </div>

                        <div class="popup-content no-bottom-space">

                            <div class="edit-titlehere selected-edit-product"> 
                                <i class=""></i> 
                                <input type="text" ng-model="categoryTitle" placeholder="Handbag" class="edit-wordrobe">
                            </div>


                            <div class="upload-wrap"> 
                                <div class="row-grid">
                                    <ul class="poduct-add-items">
                                        <li ng-repeat="witem in wardrobeItemsList" title="{{witem.Title}}">
                                            <div class="items-inner">
                                                <figure class="img"><img thumb-img server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=71 thumb-height=71 item="witem" alt=""/></figure>
                                                <a ng-click="removeSelectedFromWardrobeItemsList(witem.ItemGuID)" class="delete-add-items" href="javascript:void(0);"><i class="icon-delete"></i></a>
                                            </div>
                                        </li>         
                                    </ul>
                                </div>
                            </div>
                            <div class="added-poduct" ng-show="wardrobeItemsList.length<=0">
                                <p>Your Wardrobe is Empty</p>
                            </div>

                            <div class="added-poduct" ng-show="ItemsList.length>0">
                                <p>Select items you want to include in your wardrobe</p>
                            </div>

                            <div class="upload-wrap" ng-show="ItemsList.length>0"> 
                                <div class="row-grid">
                                    <ul class="added-product-list">
                                        <li ng-repeat="item in ItemsList" data-rel="tipsyn" title="{{item.Title}}">
                                            <div ng-click="setUnsetForWardrobeItemsList(item.ItemGuID)" class="items-inner ih-item square effect13 bottom_to_top">
                                                <div class="product-img"><div class="img"><img thumb-img server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=71 thumb-height=71 item="item" alt=""/></div>
                                                    <div class="info"><div class="info-back"><h3>Add</h3></div></div>
                                                    <span class="add-product-items">
                                                        <i class="icon-check-wh"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </li> 
                                    </ul>
                                    <div class="added-selected-btn">
                                        <button ng-click="addSelectedInWardrobeItemsList()" class="button-black button-radius small pull-right" type="button">Add Selected</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="add-content-footer">
                            <button onclick="closePopDiv('addnwardrobe2'), openPopDiv('editnewwardrob')" class="button-black button-radius small goback-btn" type="button">Go Back</button>
                            <button type="button" class="button-black button-radius pull-right" ng-click="saveWardrobeDetails(editCollectionGuID)">Finish</button>
                            <button type="button" class="button pull-right button-radius cancelbn" onClick="closePopDiv('addnwardrobe2')">Cancel</button>
                        </div>
                    </div>
                </div> 
                <!-- //Add New Wardrobe2-->
</div>
                <!-- Remove Items--> 
                <div class="popup-wrap animated" id="removedarticle">
                    <div class="popup-body">
                        <div class="popup-header" style="color:white;background-color: black;opacity: 1;">
                            <a class="icon-close" onClick="closePopDiv('removedarticle')"></a>
                            Remove Item
                        </div>
                        <div class="popup-content content-center">
                            <p class="msg"> Are you sure you want to permanently remove <span class="yellowclr" ng-cloak="">{{removeItemTitle}}</span> from <br> your Wardrobe ?</p>
                            <div class="button-action m-t-15"> 
                                <button class="button button-white btn-space" type="button" onClick="closePopDiv('removedarticle')">Cancel</button>
                                <button class="button" type="button" ng-click="removeItem()">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- //Remove Items--> 

                <!-- Remove Category--> 
                <div class="popup-wrap animated" id="removecategory">
                    <div class="popup-body">
                        <div class="popup-header" style="color:white;background-color: black;opacity: 1;">
                            <a class="icon-close" onClick="closePopDiv('removecategory')"></a>
                            Remove Category
                        </div>
                        <div class="popup-content content-center">
                            <p class="msg">Remove <span class="yellowclr" ng-cloak="">{{removeCollectionName}}</span> from your wardrobe ?</p>
                            <p class="removedmsg">(Contents from your Wardrobe will not be removed.)</p>
                            <div class="button-action m-t-15"> 
                                <button class="button button-white btn-space" type="button" onClick="closePopDiv('removecategory')">Cancel</button>
                                <button class="button" type="button" ng-click="removeWardrobe(removeCollectionGuID)">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- //Remove Category--> 
                
                <!-- Create Items-->
                <div class="popup-wrap animated create-product-popups" id="create">
                    <div class="popup-body">
                        <div class="popup-header" style="color:white;background-color: black;opacity: 1;"> <a class="icon-close" onClick="closePopDiv('create')"></a> Create </div>
                        <div class="popup-content content-center">
                            <ul class="create-product">
                                <li> <a href="javascript:void(0);" onClick="openPopDiv('createWardraobe'),  closePopDiv('create')">
                                        <figure><i class="icon-wardrobe"></i></figure>
                                        <span class="create-category"> Wardrobe Item </span> </a> </li>
                                <li> <a href="javascript:void(0);" onClick="openPopDiv('createAricle'), closePopDiv('create')">
                                        <figure><i class="icon-article"></i></figure>
                                        <span class="create-category"> Article </span> </a> </li>
                            </ul>
                            <!--<div class="button-action m-t-15"> 
                              <button class="button button-white btn-space" type="button" onClick="closePopDiv('create')">Cancel</button>
                              <button class="button" type="button" onClick="closePopDiv('create')">Remove</button>
                      </div>--> 
                        </div>
                    </div>
                </div>
                <!-- //Create Items--> 
                <div ng-controller="articleCtrl">
                   <!-- Create Article Items-->
                    <div class="popup-wrap animated create-product-popups create-seprated-product" id="createAricle" >
                        <div class="popup-body">
                          <div class="popup-header" style="color:white;background-color: black;opacity: 1;"> <a class="icon-close" onClick="closePopDiv('createAricle')"></a> Create Article </div>
                          <div class="popup-content content-center">
                            <ul class="create-product">
                              <li> <a href="javascript:void(0);" ng-click="ArticleUrl=''" onClick="openPopDiv('articlefromtheweb'),closePopDiv('createAricle')">
                                <figure><i class="icon-web"></i></figure>
                                <span class="create-category"> From Web </span> </a> </li>
                                <li> <a href="javascript:void(0);" ng-click="uploadArticleMedia()">
                                <figure><i class="icon-email"></i></figure>
                                <span class="create-category"> Upload </span> </a> </li>
                              <li> <a href="javascript:void(0);">
                                <figure><i class="icon-upload"></i></figure>
                                <span class="create-category"> Email </span> </a> </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <!-- //Create Article Items-->  
                    
                    <!-- //Localstorage-->
                    <div class="popup-wrap animated create-product-popups localsorage-product" id="localstoragearticle" ng-init="initArticleFileUpload()">
                        <div class="popup-body">
                            <div class="popup-header" style="color:white;background-color: black;opacity: 1;"> <a class="icon-close" ng-click="closePopupLocalStorageArticle()"></a> From Local Storage </div>
                          <div class="popup-content no-bottom-space">
                            <p>Upload an image for your Article</p>
                            <div class="attached-item-body">


                              <ul>
                                <li class="selected-porduct-items" data-ng-repeat="newArticleImage in newArticleImages" ng-click="checkUncheckMedia($index)"> 
                                      
									  <img thumb-img thumb-type="article" item="newArticleImage" thumb-width="newArticleImage.Size>0?190:160" thumb-height="newArticleImage.Size>0?160:190" server="<?php echo IMAGE_SERVER_PATH; ?>" /> 
                                      <span class="add-product-items">
                                          <i class="icon-check-wh"></i>
                                      </span> 
                                </li>

                              </ul>
                              <ul>

                                  <li class="photoadd-wrap">
                                  <button name="" type="button" class="addphoto" onclick="$('#thumbnail-fine-uploader-article input').trigger('click');" data-rel="tipsym" title="Add Image"> <si class="s2 imageico"></i> 
                                  </button>
                                    </li>

                                  <li class="photoadd-wrap fineuploaderView">
                                      <i class="s2 imageico"></i>
                                      <div id="thumbnail-fine-uploader-article">Upload</div>
                                  </li>
                              </ul>
                            </div>

                          </div>
                          <div class="add-content-footer">
                              <button ng-hide="hideGoBack" type="button" class="button-black button-radius small button-radius goback-btn" onclick="closePopDiv('localstoragearticle'), openPopDiv('createAricle')">Go Back</button>
                              <button type="button" class="button pull-right button-radius" ng-click="editArticle()">Upload</button>
                          </div>
                        </div>
                    </div>
                    <!-- //Localstorage--> 
                     
                
                  
                    <!-- Edit Article-->
                    <div class="popup-wrap animated" id="editArtical">
                      <div class="popup-body">
                        
                        <form name="editArticleForm" ng-submit="editUserArticle(editArticleForm.$valid,editArticleForm)" novalidate>
                        <div class="popup-header" style="color:white;background-color: black;opacity: 1;"> <a class="icon-close" ng-click="closePopupEditArticle(editArticleForm)"></a>{{editArticleTitle}}</div>
                        <div class="popup-content slider-minheight">
                            <p class="add-product-title">
                              <input data-ng-model="article.Title" name="ArticleName" type="text" placeholder="Enter Article Name Here" required/>
                            </p>  
                            <div class="error-holder m-r-10">
                            <span ng-show="editArticleForm.ArticleName.$dirty || submitted">
                                <span class="error" ng-show="editArticleForm.ArticleName.$error.required">Article name is Required!</span>
                            </span>
                            </div>
                          <div class="porduct-paging"> 
                              <span class="porduct">Pics</span> 
                              <span class="numbers" ng-cloak>{{newArticleImagesSelected}} of {{newArticleImages.length}} </span>
                              <span class="add-products" ng-click="UpdateArticleImages(editArticleForm)"><i class="icon-add"></i></span> 
                          </div>
                            <ul class="add-article-slider addArticaleSlider" ng-class="{'single-image-slider': newArticleImagesSelected == '1'}">
                                <li ng-repeat="newArticleImage in newArticleImages" ng-if="newArticleImage.isChecked==1" repeat-doneedit="layoutDone();">

                                    <div class="imageTagPos">
                                   
									<img thumb-img thumb-type="article" item="newArticleImage" thumb-width="530" thumb-height="610" server="<?php echo IMAGE_SERVER_PATH; ?>" ng-click="$parent.catchHotSpot($event, item.Imagename)" />
                                    <i ng-repeat="hotspotTags in newArticleImage.Tags | filter:filterHotspot" class="icon-imgtag slider-editimg {{hotspotTags.ItemGuID}}" data-type="tagtip" ng-style="{ 'display': 'inline', 'left':hotspotTags.FromLeft+'px', 'top':hotspotTags.FromTop+'px'}">&nbsp;</i>
                                    <i class="icon-imgtag slider-editimg" data-type="tagtip" ng-style="{ 'display': (newArticleImage.Imagename===activeHotSpot.imageName && activeHotSpot.positionX >= 0 && activeHotSpot.positionY >= 0) ? 'inline':'none', 'left':activeHotSpot.positionX+'px', 'top':activeHotSpot.positionY+'px'}">&nbsp;</i>
                                    </div>

                                    <a href="javascript:void(0);" class="delete-product" ng-click="removeArticleImg($index)"><i class="icon-delete" ></i></a>


                                </li>
                            </ul>
                          <div class="product-info-accordians">
                            <div class="accordion-block">
                              <div class="accordion-head attach-items" data-type="accToggle">Attach Items <!--<span>(Optional)</span>--> <i class="icon-acc">&nbsp;</i></div>
                              <div class="accordion-content attach-items-content" style="display:none;">
                                <div class="photo-add-row add-new-items">
                                  <div class="photoadd-wrap">
                                    <button class="addphoto" type="button" name=""> <i class="s2 imageico"></i> </button>
                                    <div class="hiddendiv">
                                      <input type="file" id="amp" name="">
                                    </div>
                                  </div>
                                  <div class="add-items">
                                    <button class="button small"  type="button" onClick="openPopDiv('createWardraobe')" ng-click="changeScopeToNonRedirect()">Add New Item</button>
                                    <button type="button" name="" class="button small from-wardrobe-button" ng-click="fromWardrobe()">From Wardrobe</button>
                                  </div>
                                </div>
                                <div class="photo-add-row browse-items" style="display:none">
                                  <div class="photoadd-wrap">
                                    <button  class="addphoto" type="button" name=""> Click on the image above to hotspot your item </button>
                                    <div class="hiddendiv">
                                      <input type="file" id="amp1" name="">
                                    </div>
                                  </div>
                                  <div class="add-items">
                                    <button type="button" name="" class="button-black small button-radius go-back">Go Back</button>
                                  </div>
                                </div>
                                <div class="add-text-content" style="display:none">
                                  <div class="add-content-fields">
                                    <div class="row">
                                      <div class="text-fields"> <span class="imgurl data-from-url">
                                        <input type="text" placeholder="Image URL">
                                        </span>
                                        <button onclick="$('#uploadImg').trigger('click');" class="imagebrowse" type="button" name=""> Upload </button>
                                        <div class="hiddendiv">
                                          <input type="file" id="uploadImg" name="">
                                        </div>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="text-fields">
                                        <input type="text" placeholder="Title">
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="text-fields">
                                        <input type="text" placeholder="Designer/Brand">
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="text-fields">
                                        <input type="text" placeholder="Price">
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="text-fields">
                                        <input type="text" placeholder="Buy Link(optional)">
                                      </div>
                                    </div>
                                  </div>
                                  <div class="add-content-footer">
                                    <button class="button small go-back-text-field" type="button">Go Back</button>
                                    <button class="button small pull-right" type="button">Add Items</button>
                                  </div>
                                </div>
                                  <div class="attached-items-visible" style="display:none">
                                    <div class="attached-item-body">
                                        <ul  class="already-attached">
                                            <li ng-repeat="wardrobeItem in articleItems" ng-mouseleave="clearHoverArticleItem(wardrobeItem.item.ItemGuID)" ng-mouseenter="hoverAttachedItem(wardrobeItem.item.ItemGuID);"> 
                                                <img thumb-img server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width="wardrobeItem.item.Images[0].Size > 0 ? 190 : 160" thumb-height="wardrobeItem.item.Images[0].Size > 0 ? 160 : 190" item="wardrobeItem.item.Images[0]" alt="" title="{{wardrobeItem.item.Title}}"/> 
                                                
												<span class="cmnedi-product" ng-click="deleteAttachedItem(wardrobeItem.item.ItemGuID,wardrobeItem.item.$$hashKey)"> 
                                                    <!--<a class="editariclepopup"  href="javascript:void(0);">
                                                        <i class="icon-small-edit-wh"></i>
                                                    </a> -->
                                                    <a href="javascript:void(0);">
                                                        <i class="icon-small-delete-wh"></i>
                                                    </a> 
                                                </span> 
                                            </li>
                                        </ul>
                                    </div>
                                      <div ng-show="articleItems.length==0" class="photoadd-wrap">
                                        <button class="addphoto" type="button" name=""> <i class="s2 imageico"></i> </button>
                                        <div class="hiddendiv">
                                          <input type="file" id="amp" name="">
                                        </div>
                                    </div>
                                  <div class="attached-item-footer">
                                      <button class="button small"  type="button" onClick="openPopDiv('createWardraobe');" ng-click="changeScopeToNonRedirect()">Add New Item</button>
                                    <button class="button small from-wardrobe-button" ng-click="fromWardrobe()"  type="button">From Wardrobe</button>
                                  </div>
                                </div>
                                <div class="subacccrodians-contents" style="display:none">
                                  <div class="subaccordion-block" ng-repeat="userWardrobe in userAllWardrobes">
                                    <div class="subaccordion-head" ng-class="{'noborder': $first}" data-type="accToggle2" ng-cloak>{{userWardrobe.CollectionName}} <i class="icon-acc">&nbsp;</i></div>
                                    <div class="subaccordion-content" ng-style="{ 'display': !$first ? 'none':''}">
                                      <div class="attached-item-body">
                                        <ul class="dresses choose-articleitems">
                                            <li ng-repeat="wardrobeItem in userWardrobe.Item" ng-click="setUnsetForArticle(wardrobeItem)" title="{{wardrobeItem.Title}}"> 
                                                <img thumb-img item="wardrobeItem.Images[0]" thumb-width="wardrobeItem.Images[0].Size>0?190:160" thumb-height="wardrobeItem.Images[0].Size>0?160:190" server="<?php echo IMAGE_SERVER_PATH; ?>" />  
												<span class="add-product-items">
                                                    <i class="icon-check-wh"></i> 
                                                </span> 
                                            </li>
                                            <li ng-show="userWardrobe.Item.length==0">
                                                <span> No Item added in this Wardrobe ! </span>
                                            </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="add-content-footer hotspot"> Don’t forget to hotspot your item ! </div>
                                  <div class="add-content-footer">
                                      <button type="button" class="button small go-back" ng-click="goBackAttachItem()">Go Back</button>
                                    <button type="button" class="button small pull-right" ng-click="addItemInArticle()" >Attach</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!--Item Tag required message-->
                            <div class="error-holder source-errorholder m-r-10">
                            <!--<span ng-show="submitted">
                                <span class="error" ng-show="attachArticleItem">Attach at least one item with article!</span>
                            </span>-->
                            </div>
                              
                              
                            <div class="accordion-block">
                              <div class="accordion-head" data-type="accToggle">Add Text <span>(Optional)</span><i class="icon-acc">&nbsp;</i></div>
                              <div class="accordion-content" style="display:none;">
                                <div class="textarea-fields">
                                  <textarea data-ng-model="article.Description" class="commonDescription" placeholder="Add text from your article"></textarea>
                                </div>
                              </div>
                            </div>
                            <div class="accordion-block">
                                <div class="accordion-head" data-type="accToggle" > Add Style Tags <span>(Optional)</span>  <i class="icon-acc">&nbsp;</i></div>
                                <div class="accordion-content" style="display:none;">
                                    <div class="tagEdit">
                                        <!-- <div class="text-fields"> -->
                                            <tags-input ng-model="articleStyleTags" replace-spaces-with-dashes="false">
                                                <auto-complete source="loadTags($query)"></auto-complete>
                                            </tags-input> 
                                            <!--<input type="text" name="" value="" onkeydown="search(this)" placeholder="Type keywords here.."/>-->
                                        <!-- </div> -->

                                    </div>
                                </div>
                            </div>
                            <div class="locations-content">
                              <div class="row">
                                <div class="text-fields">
                                    <input data-ng-model="article.Location"  type="text" placeholder="Location" id="articlelocations"  class="locations">
                                    <i class="icon-location" id="getarticleLocationDetail" title="Locate Me"></i>
                                </div>
                              </div>
                              <div class="row">
                                <div class="text-fields">
                                  <input type="text" ng-pattern="/^((?:http:\/\/|https:\/\/|www\.)?)(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i" name="Source" data-ng-model="article.Source" placeholder="Source">
                                </div>
                                <div class="error-holder source-errorholder ">
                                <span ng-show="editArticleForm.Source.$dirty || submitted">
                                    <span class="error" ng-show="editArticleForm.Source.$error.pattern">Invalid URL!!</span>
                                </span>
                                </div>
                              </div>
                            </div>
                            <?php $locationDetail = getLocationData($_SERVER['REMOTE_ADDR']); ?>
                            <input type="hidden" id="articlelatitude" value="<?php echo $locationDetail['Latitude']; ?>">
                            <input type="hidden" id="articlelongitude" value="<?php echo $locationDetail['Longitude']; ?>">
                              
                            <div class="button-action m-t-15">
                                <button class="button button-white btn-space" type="button" ng-click="closePopupEditArticle(editArticleForm)">Cancel</button>
                                <input type="submit" value="Done" class="button button-white btn-space" />
                            </div>
                          </div>
                        </div>
                      </form>
                      </div>
                    </div>
                    <!-- //Edit Article-->  


                    <!-- Article From the web-->
                    <div class="popup-wrap animated create-product-popups" id="articlefromtheweb">
                      <form name="articleFromWeb" id="articleFromWeb" ng-submit="getArticleFromWeb(articleFromWeb.$valid)" novalidate>
                      <div class="popup-body">
                        <div class="popup-header" style="color:white;background-color: black;opacity: 1;"> <a class="icon-close" onClick="closePopDiv('articlefromtheweb')"></a> From the Web </div>
                        <div class="popup-content no-bottom-space">
                          <p>Enter a link to your article</p>
                          <div class="text-fields">
                            <input type="url" ng-model="ArticleUrl" name="ArticleUrl" placeholder="" required >
                          </div>
                          <div class="error-holder">
                                <span ng-show="articleFromWeb.ArticleUrl.$dirty || articlewebsubmitted">
                                    <span class="error" ng-show="articleFromWeb.ArticleUrl.$error.required">Required</span>

                                    <span class="error" ng-show="articleFromWeb.ArticleUrl.$error.url">Invalid URL!!</span>
                                </span>
                            </div>
                        </div>
                        <div class="add-content-footer">
                          <button type="button" class="button-black button-radius small button-radius goback-btn" onClick="closePopDiv('articlefromtheweb'), openPopDiv('createAricle')">Go Back</button>
                          <button type="submit" class="button pull-right button-radius">Fetch Images</button>
                        </div>
                      </div>
                      </form>
                    </div>
                    <!-- //Article From the web-->  

               </div>       
                  
                
                
                <!-- Create Wardrobe Items-->
                <div class="popup-wrap animated create-product-popups create-seprated-product" id="createWardraobe">
                  <div class="popup-body">
                    <div class="popup-header" style="color:white;background-color: black;opacity: 1;"> <a class="icon-close" onClick="closePopDiv('createWardraobe')"></a> Create Wardrobe Item </div>
                    <div class="popup-content content-center">
                      <ul class="create-product">
                        <li> 
                            <a href="javascript:void(0);" ng-click="itemUrl='';clearOldData()" onClick="openPopDiv('fromtheweb'), closePopDiv('createWardraobe')">
                              <figure><i class="icon-web"></i></figure>
                              <span class="create-category"> From Web </span> 
                            </a> 
                        </li>
                          <li> <a href="javascript:void(0);" ng-click="uploadWardrobeItem()">
                          <figure><i class="icon-email"></i></figure>
                          <span class="create-category"> Upload </span> </a> </li>
                        <li> <a href="javascript:void(0);">
                          <figure><i class="icon-upload"></i></figure>
                          <span class="create-category"> Email </span> </a> </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!-- //Create Wardrobe Items--> 

                <!-- Localstorage-->
                <div class="popup-wrap animated create-product-popups localsorage-product" id="localstorage" ng-init="initFileUpload()">
                  <div class="popup-body">
                      <div class="popup-header" style="color:white;background-color: black;opacity: 1;"> <a class="icon-close" ng-click="closePopuplocalstorage()"></a> From Local Storage </div>
                    <div class="popup-content no-bottom-space">
                      <p>Upload an image of your Wardrobe item</p>
                      <div class="attached-item-body">
                            

                        <ul>
                        <li class="selected-porduct-items" data-ng-repeat="newItemImage in newItemImages" ng-click="checkUncheckMedia($index)"> 
                                
                                <img thumb-img item="newItemImage" thumb-width="newItemImage.Size>0?190:160" thumb-height="newItemImage.Size>0?160:190" server="<?php echo IMAGE_SERVER_PATH; ?>" />                   
                                <span class="add-product-items">
                                    <i class="icon-check-wh"></i>
                                </span> 
                            </li>
                          
                        </ul>
                        <ul>

                            <li class="photoadd-wrap">
                            <button name="" type="button" class="addphoto" onclick="$('#thumbnail-fine-uploader input').trigger('click');" data-rel="tipsym" title="Add Image"> <si class="s2 imageico"></i> 
                            </button>
                              </li>

                            <li class="photoadd-wrap fineuploaderView">
                                <i class="s2 imageico"></i>
                                <div id="thumbnail-fine-uploader">Upload</div>
                            </li>
                        </ul>
                      </div>
                      
                      <div class="hiddendiv text-fields" style="display:none;"> 
                        <span class="imgurl">F:\HD_Images</span>
                        <button name="" type="button" class="imagebrowse" onclick="$('#fileBrowse').trigger('click');"> Choose File </button>
                        <div class="hiddendiv">
                          <input type="file" name="" id="fileBrowse">
                        </div>
                      </div>
                    </div>
                    <div class="add-content-footer">
                        <button ng-hide="hideGoBack" type="button" class="button-black button-radius small button-radius goback-btn" onclick="closePopDiv('localstorage'), openPopDiv('createWardraobe')">Go Back</button>
                        <button type="button" class="button pull-right button-radius" ng-click="editItemNexStep()">Upload</button>
                    </div>
                  </div>
                </div>
                <!-- //Localstorage--> 
                
                <!-- Edit Items--> 
                <div class="popup-wrap animated" id="edititsmpopup" ng-init="getItemCategoryList()">
                    <div class="popup-body">
                        <div class="popup-header" style="color:white;background-color: black;opacity: 1;">
                            <a class="icon-close" ng-click="closePopupEditItem()"></a>
                            {{editItemTitle}}
                        </div>
                        <form name="editWardrobeItemForm" ng-submit="editWardrobeItem(editWardrobeItemForm.$valid,editWardrobeItemForm)" novalidate>
                        <div class="popup-content slider-minheight">
                            <p class="add-product-title">
                                <input name="itemName" type="text" placeholder="Enter Item Name Here" data-ng-model="item.Title" required >
                            </p>
                            <div class="porduct-paging">
                                <div class="error-holder cmn-error">
                                <span ng-show="editWardrobeItemForm.itemName.$dirty || submitted">
                                    <span class="error" ng-show="editWardrobeItemForm.itemName.$error.required">Item name is Required!</span>
                                </span>
                                </div>
                                <span class="porduct">Pics</span>
                                <span class="numbers" ng-cloak>{{newItemImagesSelected}} of {{newItemImages.length}} </span>
                                <span class="add-products" ng-click="UpdateItemImages()"><i class="icon-add"></i></span>
                            </div>
                            <ul class="add-products-slider"  ng-class="{'single-image-slider': newItemImagesSelected == '1'}">
                                <li ng-repeat="newItemImage in newItemImages" ng-if="newItemImage.isChecked==1" repeat-doneedit="layoutDone();">
                                    
									<img thumb-img item="newItemImage" thumb-width="newItemImage.Size > 0 ? 190 : 160" thumb-height="newItemImage.Size > 0 ? 160 : 190" server="<?php echo IMAGE_SERVER_PATH; ?>" />
                                    <a href="javascript:void(0);" class="delete-product" ng-click="removeItemImg($index)"><i class="icon-delete" ></i></a>
                                </li>
                            </ul>
                            <div class="product-info-accordians">      
                                <div class="accordion-block">
                                    <div class="accordion-head" data-type="accToggle" >Item Details <span>(Optional)</span> <i class="icon-acc">&nbsp;</i></div>
                                    <div class="accordion-content" style="display:none;">
                                        <div class="row">
                                            <div class="row-fields">
                                                <div class="text-fields small-width">
                                                    <!--<input type="text" data-ng-model="item.Brand" placeholder="Brand/Designer"/>-->
                                                    <input auto-complete-brands ui-items="names" ui-values={{item.Brand}} type="text" data-ng-model="item.Brand" placeholder="Brand/Designer"/>
                                                </div>
                                                <div class="select-text-fields small-width m-l-10">
                                                    
                                                <select
                                                    id="itemCategory"
                                                    data-ng-model="item.Categories" data-placeholder="Category"
                                                    data-chosen="" multiple
                                                    data-disable-search="false"                                                    
                                                    data-ng-options="itemCategorylist.ShortName for itemCategorylist in itemCategoryListData track by itemCategorylist.ItemMasterCategoryGuID">
                                                    <option value="" class="option-visible">Category</option>
                                                </select>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="row-fields">
                                                <div class="text-fields small-width">
                                                    <input name="Price" data-ng-model="item.Price" type="text" placeholder="Price"/>
                                                </div>
                                                <div class="select-text-fields m-l-10">
                                                    <tags-input ng-model="item.Sizes" replace-spaces-with-dashes="false" placeholder="Size" display-property="Name" key-property="Name" min-length=1 add-from-autocomplete-only="false">
                                                        <auto-complete source="loadSuggestions(this, 'itemSizeData', 'Name', $query)" load-on-down-arrow="true" load-on-empty="true" load-on-focus="true" min-length=1></auto-complete>
                                                    </tags-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="row-fields">
                                                <div class="select-text-fields left-select-fields">
                                                    <select data-ng-model="item.Colors" data-placeholder="Color"
                                                        data-chosen="" multiple
                                                        data-disable-search="false"                                                    
                                                        data-ng-options="itemColor.Name for itemColor in itemColorData track by itemColor.ColorID">
                                                        <option value="" class="option-visible">Color</option>  
                                                    </select>
                                                </div>
                                                <div class="select-text-fields m-l-10">
                                                    <select
                                                        data-ng-model="item.Material" data-placeholder="Material"
                                                        data-chosen="" multiple
                                                        data-disable-search="false"
                                                        data-ng-options="itemMaterial.Name for itemMaterial in itemMaterialData track by itemMaterial.MaterialID">
                                                        <option value="" class="option-visible">Material</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="textarea-fields">
                                            <textarea class="commonDescription" data-ng-model="item.Description" placeholder="Short Description..."></textarea>
                                        </div>
                                    </div>

                                </div>      

                                <div class="accordion-block">
                                    <div class="accordion-head" data-type="accToggle" > Add Style Tags <span>(Optional)</span>  <i class="icon-acc">&nbsp;</i></div>
                                    <div class="accordion-content" style="display:none;">
                                        <div class="tagEdit">
                                            <!-- <div class="text-fields"> -->
                                                <tags-input ng-model="tags" replace-spaces-with-dashes="false">
                                                    <auto-complete source="loadTags($query)"></auto-complete>
                                                </tags-input> 
                                                <!--<input type="text" name="" value="" onkeydown="search(this)" placeholder="Type keywords here.."/>-->
                                            <!-- </div> -->
                                             
                                        </div>
                                    </div>
                                </div>
                                
                                    


                                <div class="locations-content"> 
                                    <div class="row">
                                        <div class="text-fields">
                                            <input data-ng-model="item.Location"  type="text" placeholder="Location" id="locations"  class="locations">
                                            <i class="icon-location" id="getLocationDetail" title="Locate Me"></i>
                                        </div>
                                    </div>
                                    <div class="row"> 
                                        <div class="text-fields"> 
                                            <input type="text" ng-pattern="/^((?:http:\/\/|https:\/\/|www\.)?)(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i" name="Source" data-ng-model="item.Source" placeholder="Source">
                                        </div>
                                        <div class="error-holder source-errorholder">
                                        <span ng-show="editWardrobeItemForm.Source.$dirty || submitted">
                                            <span class="error" ng-show="editWardrobeItemForm.Source.$error.pattern">Invalid URL!!</span>
                                        </span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="select-text-fields">
                                            <select name="inWardrobe" data-ng-model="item.CollectionGuID" data-placeholder="Select Wardrobe" required
                                                data-chosen=""
                                                data-disable-search="true"                                                    
                                                data-ng-options="uesrWardrobe.CollectionName for uesrWardrobe in uesrWardrobeList track by uesrWardrobe.CollectionGuID">
                                                <option value=""  class="option-visible">Select Wardrobe</option> 
                                            </select>
                                        </div>
                                        <div class="error-holder cmn-error">
                                        <span ng-show="editWardrobeItemForm.inWardrobe.$dirty || submitted">
                                            <span class="error" ng-show="editWardrobeItemForm.inWardrobe.$error.required">Select Wardrobe for Item!</span>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <?php $locationDetail = getLocationData($_SERVER['REMOTE_ADDR']); ?>
                                <input type="hidden" id="latitude" value="<?php echo $locationDetail['Latitude']; ?>">
                                <input type="hidden" id="longitude" value="<?php echo $locationDetail['Longitude']; ?>">
                                
                                <div class="button-action m-t-15"> 
                                    <button class="button button-white btn-space" type="button" ng-click="closePopupEditItem()">Cancel</button>
                                    <input id="DoneButton" type="submit" value="Done" class="button button-white btn-space"/>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
                <!-- //Edit Items--> 
                
                <!-- From the web-->
                    <div class="popup-wrap animated create-product-popups" id="fromtheweb">
                      <form name="itemFromWeb" id="itemFromWeb" ng-submit="getItemFromWeb(itemFromWeb.$valid)" novalidate>
                      <div class="popup-body">
                        <div class="popup-header" style="color:white;background-color: black;opacity: 1;"> <a class="icon-close" onClick="closePopDiv('fromtheweb')"></a> From the Web </div>
                        <div class="popup-content no-bottom-space">
                          <p>Enter a link to your wardrobe item</p>
                          <div class="text-fields">
                            <input type="url" ng-model="itemUrl" name="itemUrl" placeholder="" required >
                          </div>
                          <div class="error-holder">
                                <span ng-show="itemFromWeb.itemUrl.$dirty || itemwebsubmitted">
                                    <span class="error" ng-show="itemFromWeb.itemUrl.$error.required">Required</span>

                                    <span class="error" ng-show="itemFromWeb.itemUrl.$error.url">Invalid URL!!</span>
                                </span>
                            </div>
                        </div>
                        <div class="add-content-footer">
                          <button type="button" class="button-black button-radius small button-radius goback-btn" onClick="closePopDiv('fromtheweb'), openPopDiv('createWardraobe')">Go Back</button>
                          <button type="submit" class="button pull-right button-radius">Fetch Images</button>
                        </div>
                      </div>
                      </form>
                    </div>
                    <!-- //From the web--> 

                    
                
            <?php } }?>

    <!-- common share box--> 
    <div class="popup-wrap animated" id="commonShare">
        <div class="popup-body">
            <div class="popup-header" style="color:white;background-color: black;opacity: 1;">
                <a class="icon-close" onClick="closePopDiv('commonShare')"></a>
                Share
            </div>

            <div class="popup-content content-center">
                <?php /*<span class='st_facebook_large' st_url="{{shareUrl}}" st_title="<?php echo SITE_NAME; ?> - {{shareTitle}}" st_image="{{shareImage}}" displayText='Facebook'></span>*/?>
                <a class="btn fb_share_share_btn_custom" target="_blank" href=""><img ng-src="<?php echo base_url()."/assets/img/facebook_32.png"; ?>" style="margin-top: -25px;" /></a>
                <span class='st_twitter_large' st_url="{{shareUrl}}" st_title="<?php echo SITE_NAME; ?> - {{shareTitle}}" st_image="{{shareImage}}" displayText='Tweet'></span>
                <span class='st_linkedin_large' st_url="{{shareUrl}}" st_title="<?php echo SITE_NAME; ?> - {{shareTitle}}" st_image="{{shareImage}}" displayText='LinkedIn'></span>
                <span class='st_pinterest_large' st_url="{{shareUrl}}" st_title="<?php echo SITE_NAME; ?> - {{shareTitle}}" st_image="{{shareImage}}" displayText='Pinterest'></span>
                <span class='st_email_large' st_url="{{shareUrl}}" st_title="<?php echo SITE_NAME; ?> - {{shareTitle}}" st_image="{{shareImage}}" displayText='Email'></span>
                <span class='st_googleplus_large' st_url="{{shareUrl}}" st_title="<?php echo SITE_NAME; ?> - {{shareTitle}}" st_image="{{shareImage}}" displayText='Google +'></span>
            </div>
        </div>
    </div>

    <div ng-controller="articleCtrl">
    <!--Follow contributer Pop up-->
            <div class="popup-wrap animated followsep-popups" id="follow">
                <div class="popup-body">
                    <div class="popup-header" style="color:white;background-color: black;opacity: 1;">
                      <a class="icon-close" onClick="closePopDiv('follow')" ng-click="removeHashParam();getWardrobes(1);"></a>
                      Follow our top contributors
                    </div>
                    <div class="popup-content">
                        <div class="scroll-pane">
                            <ul class="follow-list">
                                <li ng-if="topUsers.length > 0" ng-repeat="topUser in topUsers">
                                    <button class="button-white follow-action" type="button" ng-if="topUser.FollowStatus=='Follow'" id="followmem{{topUser.UserID}}" ng-click="signUpFollow(topUser.UserID)"> 
                                        <i class="icon-add-small"></i> 
                                        <span>{{topUser.FollowStatus}}</span>
                                    </button>   

                                    <button id="followmem{{topUser.UserID}}" class="button-white follow-action following" id="followmem{{topUser.UserID}}" ng-click="signUpFollow(topUser.UserID)" ng-if="topUser.FollowStatus=='Unfollow'"> 
                                        <i class="icon-add-small icon-check"></i> 
                                        <span>Following</span>
                                    </button>   
                                    <div class="followinfo" ng-cloak>
                                        <figure><img ng-src="{{topUser.ProfilePicURL}}" alt="" /></figure>
                                        <div class="details">
                                            <span ng-if="topUser.FirstName!=''" ng-bind="topUser.FirstName+' '+topUser.LastName"></span>
                                            <span ng-if="topUser.FirstName==''" ng-bind="topUser.Username"></span>    
                                             {{topUser.Location}}                                           
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div  class="popup-footer steps-wizard">
                        <div class="steps">Step 1</div>
                        <div class="identify-steps">
                          <a href="javascript:void(0);" class="active"><span></span></a>
                          <a href="javascript:void(0);" onClick="openPopDiv('clipTopItems', 'bounceInDown'),closePopDiv('follow');" ng-click="getTopItems()"><span></span></a>
                          <a href="javascript:void(0);" onClick="openPopDiv('saveToparticle', 'bounceInDown'), closePopDiv('clipTopItems');" ng-click="getTopArticles()"><span></span></a>
                        </div>

                        <div class="steps-acions">
                         <button type="button" class="button-black" onClick="openPopDiv('clipTopItems', 'bounceInDown'),closePopDiv('follow');" ng-click="getTopItems()">Skip</button>
                         <button type="button" class="button-black" onClick="openPopDiv('clipTopItems', 'bounceInDown'), closePopDiv('follow');" ng-click="getTopItems()">Next</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--//Follow contributer Pop up-->

            <!--Add items  Pop up-->
            <div class="popup-wrap animated followsep-popups" id="clipTopItems" ng-controller="itemCtrl">
              <div class="popup-body">
                <div class="popup-header" style="color:white;background-color: black;opacity: 1;">
                  <a class="icon-close" onClick="closePopDiv('clipTopItems')" ng-click="removeHashParam();getWardrobes(1);"></a>
                  Add items to your wardrobe
                </div>

                <div class="popup-content">
                  <div class="scroll-pane">
                    <ul class="additems-list">
                      <li ng-if="topItems.length > 0" ng-repeat="itemDetail in topItems">
                        <div class="additemsinfo">
                          <figure><img thumb-img server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=220 thumb-height=220 item="itemDetail.Images[0]" alt="" /></figure>
                          <div class="details" ng-bind="itemDetail.Title">                           
                          </div>
                        </div>
                        <div class="clippedaction" ng-if="itemDetail.isclip=='0'" ng-click="clipItem(itemDetail.ItemGuID,$event)">
                          <button class="button-white add-action wardrobe-item-{{itemDetail.ItemGuID}}" id="wardrobe-item-{{itemDetail.ItemGuID}}" type="button"> 
                            <i class="icon-clip-black"></i> 
                            <span>Clip</span>
                          </button>
                        </div>

                        <div class="clippedaction" ng-if="itemDetail.isclip!='0'">
                          <button class="button-white add-action clipping" type="button"> 
                            <i class="icon-clip-black icon-cliped-black"></i> 
                            <span>Clip’d</span>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div  class="popup-footer steps-wizard">
                  <div class="steps">Step 2</div>

                    <div class="identify-steps">
                      <a href="javascript:void(0);" onClick="openPopDiv('follow', 'bounceInDown'),closePopDiv('clipTopItems');" ng-click="getTopUsers()"><span></span></a>
                      <a href="javascript:void(0);" class="active" ><span></span></a>
                      <a href="javascript:void(0);" onClick="openPopDiv('saveToparticle', 'bounceInDown'), closePopDiv('clipTopItems');" ng-click="getTopArticles()"><span></span></a>
                    </div>

                  <div class="steps-acions">
                    <button type="button" class="button-black" onClick="openPopDiv('saveToparticle', 'bounceInDown'), closePopDiv('clipTopItems');" ng-click="getTopArticles()">Skip</button>
                    <button type="button" class="button-black" onClick="openPopDiv('saveToparticle', 'bounceInDown'), closePopDiv('clipTopItems');" ng-click="getTopArticles()">Next</button>
                  </div>
                </div>
              </div>
            </div>
            <!--//Add items  Pop up-->

        <!--Save article Pop up-->
        <div class="popup-wrap animated followsep-popups" id="saveToparticle">
            <div class="popup-body">
                <div class="popup-header" style="color:white;background-color: black;opacity: 1;">
                    <a class="icon-close" onClick="closePopDiv('saveToparticle')" ng-click="removeHashParam();getWardrobes(1);"></a>
                    Save articles that inspire you
                </div>

                <div class="popup-content">
                    <div class="scroll-pane">
                        <ul class="additems-list">        
                            <li ng-if="topArticles.length > 0" ng-repeat="articleDetail in topArticles">
                                <div class="additemsinfo">
                                    <figure><img thumb-img thumb-type="article" server="<?php echo IMAGE_SERVER_PATH; ?>" thumb-width=220 thumb-height=220 item="articleDetail.Images[0]" alt="" /></figure>
                                    <div class="details" ng-bind="articleDetail.Title"></div>
                                </div>

                                <div ng-cloak="" class="clippedaction" ng-show="articleDetail.saveArticle=='0'">
                                    <button class="button-white savearticle-action" type="button" id="activity-article-save-{{articleDetail.ArticleGuID}}" ng-click="saveArticle(articleDetail.ArticleGuID,1,$event)"> 
                                        <i class="icon-add-small"></i> 
                                        <span>Save</span>
                                    </button>
                                </div>

                                  <div ng-cloak="" class="clippedaction" ng-show="articleDetail.saveArticle!='0'">
                                    <button class="button-white savearticle-action saving" type="button"> 
                                        <i class="icon-add-small"></i> 
                                        <span>Saved</span>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div  class="popup-footer steps-wizard">
                    <div class="steps">Step 3</div>
                    <div class="identify-steps">
                        <a href="javascript:void(0);" onClick="openPopDiv('follow', 'bounceInDown'),closePopDiv('saveToparticle');" ng-click="getTopUsers()"><span></span></a>
                        <a href="javascript:void(0);" onClick="openPopDiv('clipTopItems', 'bounceInDown'), closePopDiv('saveToparticle');" ng-click="getTopItems()"><span></span></a>
                        <a href="javascript:void(0);" class="active"><span></span></a>
                    </div>
                    <div class="steps-acions">
                        <button type="button" class="button-black" onClick="closePopDiv('saveToparticle');" ng-click="removeHashParam();getWardrobes(1);">Skip</button>
                        <button type="button" class="button-black" onClick="closePopDiv('saveToparticle');" ng-click="removeHashParam();getWardrobes(1);">Finish</button>
                    </div>
                </div>
            </div>
        </div>
        <!--//Save article Pop up-->
    </div>



<div class="popup-wrap animated coming-soon" id="comingSoon">
<div class="popup-header" style="color:white;background-color: black;opacity: 1;"> <a class="icon-close" onClick="closePopDiv('comingSoon')"></a> </div>
  <div class="popup-body">
    <div class="popup-content content-center">
      <h2>Coming soon</h2>
    </div>
  </div>
</div>