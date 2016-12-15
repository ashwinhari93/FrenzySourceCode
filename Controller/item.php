<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Item extends Main_Item {

    function __construct() {
        parent::__construct();
         $this->load->model(array('upload_model'));
    }

    public function test_post() {
        ignore_user_abort(TRUE);
        file_put_contents('/var/www/html/uploads/item/test_log.txt', 'before response');
        $this->response(fileperms('/var/www/html/uploads/item'), NULL, FALSE);
        log_message('error', 'before sleep');
        file_put_contents('/var/www/html/uploads/item/test_log_before.txt', 'before sleep');
        sleep(300);
        log_message('error', 'after sleep');
        file_put_contents('/var/www/html/uploads/item/test_log_after.txt', 'after sleep');
    }

    /**
     * //FUNCTION TO ADD A WARDROBE ITEM TO USER'S WARDROBE
     * @param LoginSessionKey,Title,Images,[Brand,Price,ColorID,CollectionGuID,SizeID,CountryID,Description,StyleTags,Source,BuyLink,Location,Latitude,Longitude,IPAdress]
     * @return 
     * @author Anoop Singh
     */
    public function addItem_post() {
        $this->load->model('scrapping_model');
        $this->load->model('upload_model');
        /* Define variables - starts */
        $Return['ResponseCode'] = 200;
        $Return['ServiceName'] = 'additem';
        $Return['Message'] = 'Success';
        $Return['Data'] = array();
        
        $itemIndexArray = [];
        /* Define variables - ends */

        $Data = $this->post_data;


       

        $Return['Debug'] = $Data;
        if (isset($Data)) {
            
            /*set validation rules*/
            $this->form_validation->set_rules('Title', 'Title', 'trim|required');
            $this->form_validation->set_rules('Images', 'Images', 'required|is_nonempty_array[]');
            $this->form_validation->set_rules('CollectionGuID', 'CollectionGuID', 'value_existance_in_db[CollectionGuID,'.COLLECTION.']');
            $this->form_validation->set_rules('StyleTags', 'StyleTags', 'array_max_length[StyleTags,'.STYLE_TAGS_MAX_LIMIT.']');
            /*$ipRequiredFlag = TRUE;
            if(((isset($Data['Location']) && trim($Data['Location'])=="") || (!isset($Data['Location']))) && ((isset($Data['IPAdress']) && trim($Data['IPAdress'])=="") || (!isset($Data['IPAdress'])))){
                $this->form_validation->set_rules('Latitude', 'Latitude', 'trim|required');
                $this->form_validation->set_rules('Longitude', 'Longitude', 'trim|required');
            }else{
                $ipRequiredFlag = FALSE;
            }
            
            if($ipRequiredFlag && ((isset($Data['Latitude']) && trim($Data['Latitude'])=="") || (!isset($Data['Latitude'])) || (isset($Data['Longitude']) && trim($Data['Longitude'])=="") || (!isset($Data['Longitude'])) )){
                $this->form_validation->set_rules('IPAdress', 'IPAdress', 'trim|required|valid_ip');
            }*/
            /*end set validation rules*/
            if(empty($Data['Location']))
                $Data['Location'] = '';

            if ($this->form_validation->run()) {
                if($returnValue = $this->checkUrlExistance($Data)){
                    $Return['ResponseCode']=512;
                    $Return['Message']='Item with this source already exist.';
                    $Return['Data'] = $returnValue;
                    
                }else{
                    $userId = $this->UserID;
                    $currentDateTime = get_current_date_time();

                    /* Brand and style tags handling for keeping records in BrandMaster and StyleTagsMaster tables*/
                    $brand = (isset($Data['Brand']))?trim($Data['Brand']):'';
                    if($brand!=''){
                        /*Check if entered Brand does not exist in our BrandMaster table then enter the new brand name in BrandMaster table*/
                        $resultArray = $this->item_model->fetchData(BRAND_MASTER, array('BrandName' => $brand), array('BrandID'), true);
                        if(empty($resultArray)){
                            $this->item_model->insertData(BRAND_MASTER,array('BrandName' => $brand));
                        }
                        /*End Check if entered Brand does not exist in our BrandMaster table then enter the new brand name in BrandMaster table*/
                    }

                    $styleTags = (isset($Data['StyleTags']))?$Data['StyleTags']:array();
                    $newStyleTags = $styleTags;
                    if(!empty($styleTags)){
                        /*Check all entered styletags, if any styletag entered does not exist in our StyleTagsMaster then enter the new ones in StyleTagsMaster table.*/
                        $styleTagsIn = implode('\',\'', $styleTags);
                        $existingStyleTags = $this->item_model->fetchData(STYLE_TAGS_MASTER, "Name IN ('$styleTagsIn')", array('Name'));
                        foreach ($existingStyleTags as $key => $value) {
                             $newStyleTags = array_diff($newStyleTags, array($value['Name']));
                        }
                        if(!empty($newStyleTags)){
                            $insertStyleTagArray = array();
                            foreach ($newStyleTags as $key => $value){
                                $insertStyleTagArray[] = array(
                                    'StyleTagsMasterGuID'=> uniqid(),
                                    'Name'=> $value,
                                    'CreatedDate'=> $currentDateTime,
                                    'ModifiedDate'=> $currentDateTime,
                                );
                            }

                            $this->item_model->insertBatch(STYLE_TAGS_MASTER, $insertStyleTagArray);
                        }
                        /*End Check all entered styletags, if any styletag entered does not exist in our StyleTagsMaster then enter the new ones in StyleTagsMaster table.*/
                    }

                    /* End Brand and style tags handling for keeping records in BrandMaster and StyleTagsMaster tables*/


                    /*Location detection*/

                    /*Calculate location from Latitude / Longitude and if those are not available then calculate from IPAddress*/
                    /*$cityId = '';
                    if(isset($Data['Location']) && trim($Data['Location'])!=""){
                        $city = $this->item_model->fetchData(CITIES, array('Name'=>$Data['Location']), array('CityID'), true);
                        if(!empty($city))
                            $cityId = $city['CityID'];

                    }*/

                    $IPAddress = '';
                    $Latitude = '';
                    $Longitude = '';

                    if(isset($Data['IPAdress']) && trim($Data['IPAdress'])!="")
                        $IPAddress = $Data['IPAdress'];

                    if(isset($Data['Latitude']) && trim($Data['Latitude'])!="")
                        $Latitude = $Data['Latitude'];

                    if(isset($Data['Longitude']) && trim($Data['Longitude'])!="")
                        $Longitude = $Data['Longitude'];
                    
                    if(empty($Data['IPAdress']))
                        $Data['IPAdress'] = $IPAddress = getRealIpAddr();

                    /*$locationDetails = $this->login_model->getLocationDetails($IPAddress,$Latitude,$Longitude);

                    if(empty($cityId)){
                        $cityId = $locationDetails['CityID'];
                        $cityNameArray = $this->item_model->fetchData(CITIES, array('CityID'=>$cityId), array('Name'), true);
                        if(!empty($cityNameArray) && ((isset($Data['Location']) && trim($Data['Location'])=="") || (!isset($Data['Location'])))){
                            $Data['Location'] = $cityNameArray['Name'];
                        }
                    }*/

                    /*End Calculate location from Latitude / Longitude and if those are not available then calculate from IPAddress*/

                    /*End Location detection*/

                    /*Insert the the records in various tables as per input*/

                    $itemGuid = uniqid();
                    $title = trim($Data['Title']);
                    $description = $brand = $source = $buyLink = $collectionID = '';
                    $price = $noOfSaves = $noOfViews = $NoOfComments = $latitude = $longitude = $sizeID = $countryID =  0;
                    $colorID = array();
                    $MaterialID = array();

                    if(isset($Data['Price']))
                        $price = trim($Data['Price']);

                    if(isset($Data['Description']))
                        $description = trim($Data['Description']);

                    if(isset($Data['Brand']))
                        $brand = trim($Data['Brand']);
					
					$url=$Data['itemUrl'];
					$start=strpos($url,'.');
					$end=strpos($url,'/',$start+1);
					$storeId=ucfirst(substr($url,$start+1,$end-$start-1));
					
                    if(isset($Data['StockStatus']))
                        $StockStatus = $Data['StockStatus'];

                    if(isset($Data['ColorID']))
                        $colorID = $Data['ColorID'];

                    if(isset($Data['SizeID']))
                        $sizeID = $Data['SizeID'];

                    if(isset($Data['CountryID']))
                        $countryID = trim($Data['CountryID']);
                    
                    if(isset($Data['MaterialID']))
                        $MaterialID = $Data['MaterialID'];

                    if(isset($Data['Source']))
                        $source = trim($Data['Source']);
					
                    if(isset($Data['BuyLink']))
                        $buyLink = trim($Data['BuyLink']);

                    if(isset($locationDetails['Latitude']) && $locationDetails['Latitude']!="")
                        $latitude = $locationDetails['Latitude'];

                    if(isset($locationDetails['Longitude']) && $locationDetails['Longitude']!="")
                        $longitude = $locationDetails['Longitude'];

                    if(isset($Data['CollectionGuID']))
                        $CollectionGuID =  $Data['CollectionGuID'];
                    else {
                        $CollectionGuID = '';
                    }
					
                    $collectionData = $this->item_model->fetchData(COLLECTION, array('CollectionGuID' => $CollectionGuID, 'UserID' => $userId), array('CollectionID'), true);

                    if(!empty($collectionData))
                        $collectionID = $collectionData['CollectionID'];

                    // Check if sizeID exists, otherwise insert a new ID, return a sizeID array
                    log_message('debug', "updateSize before ");
                    log_message('debug', implode(',', $sizeID));
                    $sizeIDArray = $this->item_model->updateSize($sizeID);
                    log_message('debug', implode(',', $sizeID));
                    log_message('debug', implode(',', $sizeIDArray));

                    //Insert the data in Items table
                    $itemID = $this->item_model->insertData(ITEM,array(
                            'ItemGuID' => $itemGuid,
                            'UserID' => $userId,
                            'Title' => $title,
                            'StockStatus' => $StockStatus,
                            'Price' => escape_dollar($price),
                            'Description' => $description,
                            'Latitude' => $latitude,
                            'Longitude' => $longitude,
                            'IPAddress' => $IPAddress,
                            'NoOfSaves' => $noOfSaves,
                            'NoOfViews' => $noOfViews,
                            'NoOfComments' => $NoOfComments,
                            'CreatedDate'=> $currentDateTime,
                            'ModifiedDate'=> $currentDateTime
                        ));
        
                    /*add activity*/
                    $this->load->model(array('activity_model'));
                    $ActivityType   = 'Item';
                    $activity['UserID'] = $userId;
                    $activity['EntityID'] = $itemID;
                    $activity['EntityType'] = $ActivityType;
                    $this->activity_model->addActivity($activity,'ItemAdded',array($userId),$ActivityType);
                    /*end add activity*/

                    $itemDetailArray = array(
                            'ItemID' => $itemID,
                            'Brand' => $brand,
							'StoreID' => $storeId,
                            'ColorID' => implode(',', $colorID),
                            'SizeID' => implode(',', $sizeIDArray),
                            'MaterialID' => implode(',', $MaterialID),
                            'CountryID' => $countryID,
                            'Source' => $source,
                            'BuyLink' => $buyLink,
                            'Location' => $Data['Location']
                        );
                    //Insert the extra parameters in ItemDetails table
					
                      if(isset($Data['CategoryMasterGuID'])){
                          $CategoryZeroLevelID=array();
						 $CategoryMasterID=array();
						 $CategoryFirstLevelID=array();
						 $CategorySecondLevelID=array();
						 $CategoryThirdLevelID=array();
						 $CategoryFourthLevelID=array();
						 $CategoryLevel=array();
						 foreach($Data['CategoryMasterGuID'] as $CategoryMasterGuID){
						 	$catData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryGuID' => $CategoryMasterGuID), array('ItemMasterCategoryID','ItemMasterCategoryLevel','ItemMasterCategoryParentID'), true);

						 	if(!empty($catData)){
						 		$CategoryMasterID[] = $catData['ItemMasterCategoryID'];
								$CategoryLevel[]=$catData['ItemMasterCategoryLevel'];

						 		if($catData['ItemMasterCategoryLevel']==0){
									$CategoryZeroLevelID[] = $catData['ItemMasterCategoryID'];
									
						 		}elseif($catData['ItemMasterCategoryLevel']==1){
						 			$CategoryFirstLevelID[] = $catData['ItemMasterCategoryID'];

									$levelZeroCatData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $catData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID'), true);
									$CategoryZeroLevelID[] = $levelZeroCatData['ItemMasterCategoryID'];
									
						 		}elseif($catData['ItemMasterCategoryLevel']==2){
									
									$CategorySecondLevelID[] = $catData['ItemMasterCategoryID'];

									$levelFirstCatData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $catData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID','ItemMasterCategoryLevel','ItemMasterCategoryParentID'), true);
									$CategoryFirstLevelID[] = $levelFirstCatData['ItemMasterCategoryID'];

						 			$levelZeroCatData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $levelFirstCatData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID'), true);
						 			$CategoryZeroLevelID[] = $levelZeroCatData['ItemMasterCategoryID'];
									
						 		}elseif($catData['ItemMasterCategoryLevel']==3){
									
						 			$CategoryThirdLevelID[] = $catData['ItemMasterCategoryID'];
									$levelSecondCatData=$this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $catData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID','ItemMasterCategoryLevel','ItemMasterCategoryParentID'), true);
									
						 			$CategorySecondLevelID[] = $levelSecondCatData['ItemMasterCategoryID'];
						
									$levelFirstCatData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $levelSecondCatData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID','ItemMasterCategoryLevel','ItemMasterCategoryParentID'), true);
									$CategoryFirstLevelID[] = $levelFirstCatData['ItemMasterCategoryID'];

						 			$levelZeroCatData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $levelFirstCatData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID'), true);
						 			$CategoryZeroLevelID[] = $levelZeroCatData['ItemMasterCategoryID'];
									
						 		}elseif($catData['ItemMasterCategoryLevel']==4){
									$CategoryFourthLevelID[] = $catData['ItemMasterCategoryID'];
						 			$levelThirdCatData=$this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $catData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID','ItemMasterCategoryLevel','ItemMasterCategoryParentID'), true);
									
						 			$CategoryThirdLevelID[] = $levelThirdCatData['ItemMasterCategoryID'];
						 			$levelSecondCatData=$this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $levelThirdCatData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID','ItemMasterCategoryLevel','ItemMasterCategoryParentID'), true);
									
						 			$CategorySecondLevelID[] = $levelSecondCatData['ItemMasterCategoryID'];
						
						 			$levelFirstCatData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $levelSecondCatData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID','ItemMasterCategoryLevel','ItemMasterCategoryParentID'), true);
									$CategoryFirstLevelID[] = $levelFirstCatData['ItemMasterCategoryID'];

									$levelZeroCatData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $levelFirstCatData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID'), true);
						 			$CategoryZeroLevelID[] = $levelZeroCatData['ItemMasterCategoryID'];
								}


						 	}
                      }
						$itemDetailArray['CategoryMasterID']=implode(',',$CategoryMasterID);
						$itemDetailArray['CategoryFirstLevelID']=implode(',',$CategoryFirstLevelID);
						$itemDetailArray['CategorySecondLevelID']=implode(',',$CategorySecondLevelID);
						$itemDetailArray['CategoryThirdLevelID']=implode(',',$CategoryThirdLevelID);
						$itemDetailArray['CategoryFourthLevelID']=implode(',',$CategoryFourthLevelID);
						$itemDetailArray['CategoryZeroLevelID']=implode(',',$CategoryZeroLevelID);
						$itemDetailArray['CategoryLevel']=implode(',',$CategoryLevel);
					  }
					//file_put_contents('/var/www/html/uploads/cat.txt', print_r($CategoryLevel,true));
                    $this->item_model->insertData(ITEM_DETAIL,$itemDetailArray);
                    //Insert the collection relation in the CollectionItems table
                    if($collectionID!=''){
                        $this->item_model->insertData(COLLECTION_ITEM,array(
                                'CollectionID'=> $collectionID,
                                'ItemID'=> $itemID,
                                'StatusID'=> 2,
                                'CreatedDate'=> $currentDateTime,
                                'ModifiedDate'=> $currentDateTime
                            ));
                    }


                    //Insert the StyleTags in Tags table
                    if(!empty($styleTags)){
                        $styleTagsInsertArray = array();

                        foreach ($styleTags as $key => $value) {
                            $styleTagsInsertArray[] = array(
                               'TagGuID'=> uniqid(),
                               'EntityType'=> ENTITY_TYPE_ITEM,
                               'EntityTypeID'=> $itemID,
                               'Name'=> $value
                           );
                        }

                        $this->item_model->insertBatch(TAGS, $styleTagsInsertArray);
                    }

                    $mediaSectionId = ITEM_MEDIASECTIONID;
                    //INSERT IMAGES IN THE MEDIA TABLE/SLIDER (This is where images are being placed in editwardrobe item popup) same as wardrobe_controller.js/$scope.editItem set images l-1017) - calls upload_model.php/getMediaVar function - calls upload_model.php/updateMediaUploadParam function)
                    foreach($Data['Images'] as $images){

                        if (isset($Data['DeviceID']) && $Data['DeviceID'] != '')
                            $DeviceID = $Data['DeviceID'];
                        else
                            $DeviceID = '1';

                        if (isset($Data['SocialType']) && $Data['SocialType'] != '')
                            $SocialType = $Data['SocialType'];
                        else
                            $SocialType = 'Web';
                        $SourceID = $this->login_model->GetSourceID($SocialType);

                        $totalSizeInBytes = $images['image_size'] + $images['thumbSizeTotal'];
                        $randomUid = substr(md5(time() . rand()), 0, 10);

                        $mediaVars = $this->upload_model->getMediaVar(array('type' => 'Image', 'image_name' => $images['Imagename'], 'size_in_bytes' => $totalSizeInBytes));

                        $insertArray['UserID'] = $userId;
                        $insertArray['MediaSectionID'] = $mediaSectionId;
                        $insertArray['ImageName'] = $images['Imagename'];
                        $insertArray['ImageUrl'] = $images['Imageurl'];
                        $insertArray['Size'] = $totalSizeInBytes;
                        $insertArray['DeviceID'] = $DeviceID;
                        $insertArray['SourceID'] = $SourceID;
                        $insertArray['MediaExtensionID'] = $mediaVars['MediaExtensionID'] ? $mediaVars['MediaExtensionID'] : 0;
                        $insertArray['MediaSectionReferenceID'] = $itemID;
                        $insertArray['MediaSizeID'] = $mediaVars['MediaSizeID'];
                        $insertArray['CreatedDate'] = date("Y-m-d H:i:s");
                        $insertArray['StatusID'] = 1; /* pending */
                        $insertArray['IsAdminApproved'] = 0; /* Unapproved */
                        $insertArray['AbuseCount'] = 0;
                        $insertArray['MediaGuID'] = $randomUid;

                        $itemIndexArray[] = $this->upload_model->updateMediaUploadParam($insertArray);
                    }

                    /*End Insert the the records in various tables as per input*/
                    
                    /*code for searchItem Data population*/
                    $this->item_model->processItemSearchData(array(
                                'ItemID' => $itemID,
                                'UserID' => $userId,
                                'Title'=>$title,
                                'UserDetail' => trim(($this->session->userdata('FirstName').','.$this->session->userdata('LastName').','.$this->session->userdata('LoginKeyword'))),
                                'Brand' => $brand,
                                'ColorID' => $colorID,
                                'SizeID' => $sizeIDArray,
                                'MaterialID' => $MaterialID,
                                'CategoryIds' => $itemDetailArray,
                                'StyleTags' => $styleTags,
                                'CountryID' => $countryID,
                                'Source' => $source,
                                'Location' => $Data['Location']
                            ));
                    
                    
                    /*end code for searchItem Data population*/

                    $Return['Data'] = array(
                        'ItemGuID'=>$itemGuid,
                        'Title'=>$title,
                        'Description'=>$description,
                        'StyleTags'=>$styleTags,
                        'Source'=>$source,
                        'Location'=>$Data['Location'],
                        'Brand'=>$brand,
                        'Price'=>addDollar($price),
                        'ColorID'=>$colorID,
                        'CollectionID'=>$collectionID,
                        'SizeID'=>$sizeID,
                        'CountryID'=>$countryID,
                        'MaterialID'=>$MaterialID,
                        'BuyLink'=>$buyLink,
                        'Images'=>$Data['Images'],
                        'Saves'=>$noOfSaves,
                        'Views'=>$noOfViews,
                        'NoOfComments'=>$NoOfComments
                    );
                    $Return['Message'] = $this->lang->line('item_created_success');
                }
            } else {
                $Return['ResponseCode'] = 501;
                $error = strip_tags(validation_errors());
                $Return['Message'] = $error;
            }

        } else {
            $Return['ResponseCode']=500;
            $Return['Message']=lang('input_invalid_format');
        }
        $Outputs = $Return;
        ignore_user_abort(TRUE);
        $this->response($Outputs); /* Final Output */
    }
    
    
    /**
     * Function to view wardrobe item
     * @param LoginSessionKey,ItemGuID
     * @return 
     * @author Anoop Singh
     */
    public function viewItem_post() {
        /* Define variables - starts */
        $Return['ResponseCode'] = 200;
        $Return['ServiceName'] = 'viewitem';
        $Return['Message'] = 'Success';
        $Return['Data'] = array();
        
        /* Define variables - ends */

        $Data = $this->post_data;
       
        if (isset($Data)) {

            /* set validation rules*/
            $this->form_validation->set_rules('ItemGuID', 'ItemGuID', 'trim|required|value_existance_in_db[ItemGuID,'.ITEM.']');
            /*end set validation rules*/

            if ($this->form_validation->run()) {
                $loggedInUserId = $userId = $this->UserID;
                $itemGuID = $Data['ItemGuID'];
                $collectionGuID = !empty($Data['CollectionGuID'])?$Data['CollectionGuID']:'';
                $Return['Data'] = $this->item_model->getItem(array('LoggedUserId'=>$loggedInUserId,'UserID'=>$userId,'ItemGuID'=>$itemGuID,'CollectionGuID'=>$collectionGuID));

            }else{
                $error = strip_tags(validation_errors());
                $Return['Message'] = $error;
            }
        } else {
            $Return['ResponseCode']=500;
            $Return['Message']=lang('input_invalid_format');
        }
        $Outputs = $Return;
        $this->response($Outputs); /* Final Output */
    }
    
    /**
     * Function to view wardrobe items
     * @param LoginSessionKey,ItemGuIDs
     * @return 
     * @author Anoop Singh
     */
    public function viewItems_post() {
        /* Define variables - starts */
        $Return['ResponseCode'] = 200;
        $Return['ServiceName'] = 'viewitems';
        $Return['Message'] = 'Success';
        $Return['Data'] = array();
        
        /* Define variables - ends */

        $Data = $this->post_data;
       
        if (isset($Data)) {

            $loggedInUserId = $userId = $this->UserID;
            $itemGuIDs = $Data['ItemGuIDs'];
            $collectionGuID = !empty($Data['CollectionGuID'])?$Data['CollectionGuID']:'';
            
            foreach ($itemGuIDs as $key=>$itemGuID){
                $Return['Data'][] = $this->item_model->getItem(array('LoggedUserId'=>$loggedInUserId,'UserID'=>$userId,'ItemGuID'=>$itemGuID,'CollectionGuID'=>$collectionGuID));
            }
            
        } else {
            $Return['ResponseCode']=500;
            $Return['Message']=lang('input_invalid_format');
        }
        $Outputs = $Return;
        $this->response($Outputs); /* Final Output */
    }
    
    /**
     * Function to view wardrobe item with increment in view count
     * @param LoginSessionKey,ItemGuID
     * @return
     * @author Anoop Singh
     */
    public function viewItemWithIncrement_post() {
        /* Define variables - starts */
        $Return['ResponseCode'] = 200;
        $Return['ServiceName'] = 'viewitemwithincrement';
        $Return['Message'] = 'Success';
        $Return['Data'] = array();
        /* Define variables - ends */

        $Data = $this->post_data;
        if (isset($Data)) {

            /* set validation rules */
            $this->form_validation->set_rules('ItemGuID', 'ItemGuID', 'trim|required|value_existance_in_db[ItemGuID,' . ITEM . ']');
            /* end set validation rules */

            if ($this->form_validation->run()) {
                $loggedInUserId = $userId = $this->UserID;
                $itemGuID = $Data['ItemGuID'];
                $collectionGuID = !empty($Data['CollectionGuID']) ? $Data['CollectionGuID'] : '';
                $Return['Data'] = $this->item_model->getItem(array('LoggedUserId' => $loggedInUserId, 'UserID' => $userId, 'ItemGuID' => $itemGuID, 'CollectionGuID' => $collectionGuID, 'incrementView' => true));
            } else {
                $error = strip_tags(validation_errors());
                $Return['Message'] = $error;
            }
        } else {
            $Return['ResponseCode'] = 500;
            $Return['Message'] = lang('input_invalid_format');
        }
        $Outputs = $Return;
        $this->response($Outputs); /* Final Output */
    }

    /**
     * Function to edit a wardrobe item
     * @param LoginSessionKey,ItemGuID,Title,Images,[Brand,Price,ColorID,CollectionGuID,SizeID,CountryID,Description,StyleTags,Source,BuyLink]
     * @return 
     * @author Anoop Singh
     */
    public function editItem_post($reqData) {
        /* Define variables - starts */
        $Return['ResponseCode'] = 200;
        $Return['ServiceName'] = 'edititem';
        $Return['Message'] = 'Success';
        $Return['Data'] = array();
        
        /* Define variables - ends */

        $Data = $this->post_data;        
        //print_r($Data);die;
       
        if (isset($Data)) {
            
            /*set validation rules*/
            $this->form_validation->set_rules('ItemGuID', 'ItemGuID', 'trim|required|value_existance_in_db[ItemGuID,'.ITEM.']');
            $this->form_validation->set_rules('Title', 'Title', 'trim|required');
            $this->form_validation->set_rules('Images', 'Images', 'required|is_nonempty_array[]');
            $this->form_validation->set_rules('CollectionGuID', 'CollectionGuID', 'value_existance_in_db[CollectionGuID,'.COLLECTION.']');
            $this->form_validation->set_rules('StyleTags', 'StyleTags', 'array_max_length[StyleTags,'.STYLE_TAGS_MAX_LIMIT.']');
            /*end set validation rules*/

            if ($this->form_validation->run()) {
                
                if($returnValue = $this->checkUrlExistance($Data)){
                    
                    $Return['ResponseCode']=512;
                    $Return['Message']='Item with this source already exist.';
                    $Return['Data'] = $returnValue;
                    
                }else{
                    
                    $userId = $this->UserID;
                    $currentDateTime = get_current_date_time();

                    /* Brand and style tags handling for keeping records in BrandMaster and StyleTagsMaster tables*/
                    $brand = (isset($Data['Brand']))?trim($Data['Brand']):'';
                    if($brand!=''){
                        /*Check if entered Brand does not exist in our BrandMaster table then enter the new brand name in BrandMaster table*/
                        $resultArray = $this->item_model->fetchData(BRAND_MASTER, array('BrandName' => $brand), array('BrandID'), true);
                        if(empty($resultArray)){
                            $this->item_model->insertData(BRAND_MASTER,array('BrandName' => $brand));
                        }
                        /*End Check if entered Brand does not exist in our BrandMaster table then enter the new brand name in BrandMaster table*/
                    }

                    $styleTags = (isset($Data['StyleTags']))?$Data['StyleTags']:array();
                    $newStyleTags = $styleTags;
                    if(!empty($styleTags)){
                        /*Check all entered styletags, if any styletag entered does not exist in our StyleTagsMaster then enter the new ones in StyleTagsMaster table.*/
                        $styleTagsIn = implode('\',\'', $styleTags);
                        $existingStyleTags = $this->item_model->fetchData(STYLE_TAGS_MASTER, "Name IN ('$styleTagsIn')", array('Name'));
                        foreach ($existingStyleTags as $key => $value) {
                             $newStyleTags = array_diff($newStyleTags, array($value['Name']));
                        }
                        if(!empty($newStyleTags)){
                            $insertStyleTagArray = array();
                            foreach ($newStyleTags as $key => $value){
                                $insertStyleTagArray[] = array(
                                    'StyleTagsMasterGuID'=> uniqid(),
                                    'Name'=> $value,
                                    'CreatedDate'=> $currentDateTime,
                                    'ModifiedDate'=> $currentDateTime,
                                );
                            }

                            $this->item_model->insertBatch(STYLE_TAGS_MASTER, $insertStyleTagArray);
                        }
                        /*End Check all entered styletags, if any styletag entered does not exist in our StyleTagsMaster then enter the new ones in StyleTagsMaster table.*/
                    }

                    /* End Brand and style tags handling for keeping records in BrandMaster and StyleTagsMaster tables*/


                    /* Update the records in various tables as per input*/

                    $title = trim($Data['Title']);
                    $price = $description = $brand = $source = $buyLink = '';
                    $colorID = $sizeID = $materialID = $countryID =  0;

                    if(isset($Data['Price']))
                        $price = trim($Data['Price']);

                    if(isset($Data['Description']))
                        $description = trim($Data['Description']);

                    if(isset($Data['Brand']))
                        $brand = trim($Data['Brand']);
					
					
                    if(isset($Data['ColorID']))
                        $colorID = $Data['ColorID'];

                    if(isset($Data['SizeID']))
                        $sizeID = trim($Data['SizeID']);
                    
                    if(isset($Data['MaterialID']))
                        $materialID = $Data['MaterialID'];

                    if(isset($Data['CountryID']))
                        $countryID = trim($Data['CountryID']);

                    if(isset($Data['Source']))
                        $source = trim($Data['Source']);

                    if(isset($Data['BuyLink']))
                        $buyLink = trim($Data['BuyLink']);

                    $collectionData = $this->item_model->fetchData(COLLECTION, array('CollectionGuID' => $Data['CollectionGuID'], 'UserID' => $userId), array('CollectionID'), true);
                    $oldCollectionData = $this->item_model->fetchData(COLLECTION, array('CollectionGuID' => $Data['OldCollectionGuID'], 'UserID' => $userId), array('CollectionID'), true);

                    if(!empty($collectionData))
                        $collectionID = $collectionData['CollectionID'];
                    if(!empty($oldCollectionData))
                        $oldCollectionID = $oldCollectionData['CollectionID'];


                    $itemData = $this->item_model->fetchData(ITEM, array('ItemGuID' => $Data['ItemGuID'], 'UserID' => $userId), array('itemID','NoOfSaves','NoOfViews','NoOfComments'), true);

                    if (!empty($itemData)) {
                        $itemID = $itemData['itemID'];
                        $noOfSaves = $itemData['NoOfSaves'];
                        $noOfViews = $itemData['NoOfViews'];
                        $NoOfComments = $itemData['NoOfComments'];

                        $updateItemData = array(
                                'Title' => $title,
                                'ModifiedDate' => $currentDateTime
                            );

                        $price = escape_dollar($price);
                        if($price!='')
                            $updateItemData['Price'] = $price;
                        if($description!='')
                            $updateItemData['Description'] = $description;


                        //Update the data in Items table
                        $this->item_model->updateData(ITEM, 
                            $updateItemData, 
                            array(
                                'itemID' => $itemID
                        ));

                        //Update the extra parameters in ItemDetails table
                        $MasterID = $levelZeroId = $levelFirstId = $levelSecondId =$levelThirdId=$levelFourthId= null;
						
                        if(isset($Data['CategoryMasterGuID'])){
                          $CategoryZeroLevelID=array();
						 $CategoryMasterID=array();
						 $CategoryFirstLevelID=array();
						 $CategorySecondLevelID=array();
						 $CategoryThirdLevelID=array();
						 $CategoryFourthLevelID=array();
						 foreach($Data['CategoryMasterGuID'] as $CategoryMasterGuID){
						 	$catData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryGuID' => $CategoryMasterGuID), array('ItemMasterCategoryID','ItemMasterCategoryLevel','ItemMasterCategoryParentID'), true);

						 	if(!empty($catData)){
						 		$CategoryMasterID[] = $catData['ItemMasterCategoryID'];
								

						 		if($catData['ItemMasterCategoryLevel']==0){
									$CategoryZeroLevelID[] = $catData['ItemMasterCategoryID'];
						 		}elseif($catData['ItemMasterCategoryLevel']==1){
						 			$CategoryFirstLevelID[] = $catData['ItemMasterCategoryID'];

									$levelZeroCatData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $catData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID'), true);
									$CategoryZeroLevelID[] = $levelZeroCatData['ItemMasterCategoryID'];

						 		}elseif($catData['ItemMasterCategoryLevel']==2){
									$CategorySecondLevelID[] = $catData['ItemMasterCategoryID'];

									$levelFirstCatData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $catData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID','ItemMasterCategoryLevel','ItemMasterCategoryParentID'), true);
									$CategoryFirstLevelID[] = $levelFirstCatData['ItemMasterCategoryID'];

						 			$levelZeroCatData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $levelFirstCatData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID'), true);
						 			$CategoryZeroLevelID[] = $levelZeroCatData['ItemMasterCategoryID'];
						 		}elseif($catData['ItemMasterCategoryLevel']==3){
						 			$CategoryThirdLevelID[] = $catData['ItemMasterCategoryID'];
									$levelSecondCatData=$this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $catData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID','ItemMasterCategoryLevel','ItemMasterCategoryParentID'), true);
									
						 			$CategorySecondLevelID[] = $levelSecondCatData['ItemMasterCategoryID'];
						
									$levelFirstCatData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $levelSecondCatData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID','ItemMasterCategoryLevel','ItemMasterCategoryParentID'), true);
									$CategoryFirstLevelID[] = $levelFirstCatData['ItemMasterCategoryID'];

						 			$levelZeroCatData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $levelFirstCatData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID'), true);
						 			$CategoryZeroLevelID[] = $levelZeroCatData['ItemMasterCategoryID'];
									
						 		}elseif($catData['ItemMasterCategoryLevel']==4){
									$CategoryFourthLevelID[] = $catData['ItemMasterCategoryID'];
						 			$levelThirdCatData=$this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $catData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID','ItemMasterCategoryLevel','ItemMasterCategoryParentID'), true);
									
						 			$CategoryThirdLevelID[] = $levelThirdCatData['ItemMasterCategoryID'];
						 			$levelSecondCatData=$this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $levelThirdCatData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID','ItemMasterCategoryLevel','ItemMasterCategoryParentID'), true);
									
						 			$CategorySecondLevelID[] = $levelSecondCatData['ItemMasterCategoryID'];
						
						 			$levelFirstCatData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $levelSecondCatData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID','ItemMasterCategoryLevel','ItemMasterCategoryParentID'), true);
									$CategoryFirstLevelID[] = $levelFirstCatData['ItemMasterCategoryID'];

									$levelZeroCatData = $this->item_model->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $levelFirstCatData['ItemMasterCategoryParentID']), array('ItemMasterCategoryID'), true);
						 			$CategoryZeroLevelID[] = $levelZeroCatData['ItemMasterCategoryID'];
								}


						 	}
                      }
						$MasterID=implode(',',$CategoryMasterID);
						$levelFirstId=implode(',',$CategoryFirstLevelID);
						$levelSecondId=implode(',',$CategorySecondLevelID);
						$levelThirdId=implode(',',$CategoryThirdLevelID);
						$levelFourthId=implode(',',$CategoryFourthLevelID);
						$levelZeroId=implode(',',$CategoryZeroLevelID);
					  
					  }
                        
                        $itemDetailArray = array(
                                'Brand' => $brand,
                                'ColorID' => implode(',', $colorID),
                                'SizeID' => $sizeID,
                                'MaterialID' => implode(',', $materialID),
                                'CountryID' => $countryID,
                                'Source' => $source,
                                'BuyLink' => $buyLink,
                                'Location' => $Data['Location'],
                                'CategoryMasterID' => $MasterID,
                                'CategoryZeroLevelID' => $levelZeroId,
                                'CategoryFirstLevelID' => $levelFirstId,
                                'CategorySecondLevelID' => $levelSecondId,
								'CategoryThirdLevelID' => $levelThirdId,
								'CategoryFourthLevelID' => $levelFourthId
                            );
                                
                        $this->item_model->updateData(ITEM_DETAIL,
                            $itemDetailArray,
                            array(
                                'itemID' => $itemID
                        ));



                        //Update the collection relation in the CollectionItems table
                        /*$colOldData = $this->item_model->fetchData(COLLECTION_ITEM, array('CollectionID' => $collectionID, 'itemID' => $itemID), array('CollectionID'), true);
                        if(!empty($colOldData) && $collectionID != $oldCollectionID) {//delete this record here
                            //echo 'delete';die;
                            $this->item_model->removeData(COLLECTION_ITEM, array('CollectionID' => $collectionID, 'itemID' => $itemID));
                        } else {//simply update
                            //echo 'update';die;
                            $this->item_model->updateData(COLLECTION_ITEM, 
                                array(
                                    'CollectionID' => $collectionID,//13, 2601
                                    'ModifiedDate' => $currentDateTime
                                ), 
                                array(
                                    'itemID' => $itemID,
                                    'CollectionID' => $oldCollectionID
                            ));
                        }*/
                        $colOldData = $this->item_model->fetchData(COLLECTION_ITEM, array('CollectionID' => $collectionID, 'itemID' => $itemID), array('CollectionID'), true);
                        if(!empty($colOldData) && $collectionID != $oldCollectionID) {//delete this record here
                            //echo 'delete';die;
                            $this->item_model->removeData(COLLECTION_ITEM, array('CollectionID' => $collectionID, 'itemID' => $itemID));
                        }
                        if($collectionID != $oldCollectionID) {//simply update the old record itself
                            $this->item_model->updateData(COLLECTION_ITEM, 
                                array(
                                    'CollectionID' => $collectionID,//13, 2601
                                    'ModifiedDate' => $currentDateTime
                                ), 
                                array(
                                    'itemID' => $itemID,
                                    'CollectionID' => $oldCollectionID
                            ));
                        }


                        //Update the StyleTags in Tags table
                        if (!empty($styleTags)) {

                            $styleTagsTempArray = $this->item_model->fetchData(TAGS, array('EntityTypeID' => $itemID, 'EntityType' => ENTITY_TYPE_ITEM), array('TagID', 'Name'));

                            $styleTagsInsertArray = array();
                            $styleTagsRemoveArray = array();

                            foreach ($styleTagsTempArray as $key => $value) {

                                if (in_array($styleTags, array($value['Name']))) {
                                    $styleTags = array_diff($styleTags, array($value['Name']));
                                } else {
                                    $styleTagsRemoveArray[] = $value['TagID'];
                                }
                            }

                            foreach ($styleTags as $key => $value) {
                                $styleTagsInsertArray[] = array(
                                    'TagGuID' => uniqid(),
                                    'EntityType' => ENTITY_TYPE_ITEM,
                                    'EntityTypeID' => $itemID,
                                    'Name' => $value
                                );
                            }

                            /* insert new style tags */
                            if (!empty($styleTagsInsertArray))
                                $this->item_model->insertBatch(TAGS, $styleTagsInsertArray);

                            /* delete style tags not used for item */
                            if (!empty($styleTagsRemoveArray)) {
                                $styleTagsIn = implode('\',\'', $styleTagsRemoveArray);
                                $this->item_model->removeData(TAGS, "TagID IN ('$styleTagsIn')");
                            }
                        } else {
                            /* delete style tags not used for item */
                            $this->item_model->removeData(TAGS, array('EntityTypeID' => $itemID, 'EntityType' => ENTITY_TYPE_ITEM));
                        }

                        //update the Images in Media table
                        /* foreach($Data['Images'] as $images){

                          } */

                        /* End Update the records in various tables as per input */

                        $mediaSectionId = ITEM_MEDIASECTIONID;
                        //update the Images in Media table (this is when editing the item images in the slider) - Also called in wardrobe_controller.js/$scope.editItem function
                        $imageArray = $this->item_model->fetchData(MEDIA.' as media',
                            array('media.MediaSectionReferenceID' => $itemID, 'media.StatusID'=>1),
                            array('media.ImageName', 'media.ImageUrl'),
                            false,
                            array(
                                'join'=>array(
                                    array(
                                        'table_name'=>MEDIA_SECTIONS .' as msections' ,
                                        'condition'=> 'msections.MediaSectionID = media.MediaSectionID AND MediaSectionAlias="'.ENTITY_TYPE_ITEM.'"'
                                    )
                                )
                            )
                        );

                        foreach($Data['Images'] as $images){
                            $imagePresentFlag = 0;
                            foreach($imageArray as $key=>$oldImages){
                                if($images['Imagename']==$oldImages['ImageName']){
                                    $imagePresentFlag = 1;
                                    unset($imageArray[$key]);
                                    break;
                                }
                            }
                            if($imagePresentFlag==0){
                                if (isset($Data['DeviceID']) && $Data['DeviceID'] != '')
                                    $DeviceID = $Data['DeviceID'];
                                else
                                    $DeviceID = '1';

                                if (isset($Data['SocialType']) && $Data['SocialType'] != '')
                                    $SocialType = $Data['SocialType'];
                                else
                                    $SocialType = 'Web';
                                $SourceID = $this->login_model->GetSourceID($SocialType);

                                $totalSizeInBytes = $images['image_size'] + $images['thumbSizeTotal'];
                                $randomUid = substr(md5(time() . rand()), 0, 10);

                                $mediaVars = $this->upload_model->getMediaVar(array('type' => 'Image', 'image_name' => $images['Imagename'], 'size_in_bytes' => $totalSizeInBytes));

                                $insertArray['UserID'] = $userId;
                                $insertArray['MediaSectionID'] = $mediaSectionId;
                                $insertArray['ImageName'] = $images['Imagename'];
                                $insertArray['ImageUrl'] = $images['Imagename'];
                                $insertArray['Size'] = $totalSizeInBytes;
                                $insertArray['DeviceID'] = $DeviceID;
                                $insertArray['SourceID'] = $SourceID;
                                $insertArray['MediaExtensionID'] = $mediaVars['MediaExtensionID'];
                                $insertArray['MediaSectionReferenceID'] = $itemID;
                                $insertArray['MediaSizeID'] = $mediaVars['MediaSizeID'];
                                $insertArray['CreatedDate'] = date("Y-m-d H:i:s");
                                $insertArray['StatusID'] = 1; /* pending */
                                $insertArray['IsAdminApproved'] = 0; /* Unapproved */
                                $insertArray['AbuseCount'] = 0;
                                $insertArray['MediaGuID'] = $randomUid;

                                $this->upload_model->updateMediaUploadParam($insertArray);
                            }


                        }

                        foreach($imageArray as $key=>$oldImages){                      
                            $this->item_model->updateData(MEDIA,
                                array('StatusID' => 3),
                                array('ImageName' => $oldImages['ImageName'],'MediaSectionReferenceID' => $itemID, 'MediaSectionID'=>$mediaSectionId)
                            );
                        }

                        /*End update the Images in Media table*/
                        
                         /*code for searchItem Data population*/
                        $this->item_model->processItemSearchData(array(
                                    'ItemID' => $itemID,
                                    'UserID' => $userId,
                                    'Title'=>$title,
                                    'UserDetail' => trim(($this->session->userdata('FirstName').','.$this->session->userdata('LastName').','.$this->session->userdata('LoginKeyword'))),
                                    'Brand' => $brand,
                                    'ColorID' => $colorID,
                                    'SizeID' => $sizeIDArray,
                                    'MaterialID' => $materialID,
                                    'CategoryIds' => $itemDetailArray,
                                    'StyleTags' => $styleTags,
                                    'CountryID' => $countryID,
                                    'Source' => $source,
                                    'Location' => $Data['Location']
                                ),true);


                        /*end code for searchItem Data population*/

                        $Return['Data'] = array(
                            'ItemGuID' => $Data['ItemGuID'],
                            'Title' => $title,
                            'Description' => $description,
                            'Brand' => $brand,
                            'Price' => addDollar($price),
                            'ColorID' => $colorID,
                            'CollectionID' => $collectionID,
                            'SizeID' => $sizeID,
                            'MaterialID' => $materialID,
                            'CountryID' => $countryID,
                            'Source' => $source,
                            'BuyLink' => $buyLink,
                            'Images' => $Data['Images'],
                            'StyleTags' => $styleTags,
                            'NoOfSaves' => $noOfSaves,
                            'NoOfViews' => $noOfViews,
                            'NoOfComments' => $NoOfComments,
                            'Location' => $Data['Location']
                        );
                        $Return['Message'] = $this->lang->line('item_updated_success');;
                    }
                }
                
            } else {
                $Return['ResponseCode'] = 501;
                $error = strip_tags(validation_errors());
                $Return['Message'] = $error;
            }

        } else {
            $Return['ResponseCode']=500;
            $Return['Message']=lang('input_invalid_format');
        }
        $Outputs = $Return;
        $this->response($Outputs); /* Final Output */
    }
    
    /**
     * Function to delete a wardrobe item
     * @param LoginSessionKey,ItemGuID
     * @return 
     * @author Anoop Singh
     */
    public function deleteItem_post() {
        /* Define variables - starts */
        $Return['ResponseCode'] = 200;
        $Return['ServiceName'] = 'edititem';
        $Return['Message'] = 'Success';
        $Return['Data'] = array();
        
        /* Define variables - ends */

        $Data = $this->post_data;
       
        if (isset($Data)) {
            
            /*set validation rules*/
            $this->form_validation->set_rules('ItemGuID', 'ItemGuID', 'trim|required|value_existance_in_db[ItemGuID,'.ITEM.']');
            /*end set validation rules*/

            if ($this->form_validation->run()) {
                
                $userId = $this->UserID;
                $currentDateTime = get_current_date_time();
                $status = 3;
                
                $itemData = $this->item_model->fetchData(ITEM, array('ItemGuID' => $Data['ItemGuID']), array('itemID','UserID'), true);
                
                $itemOwnerID = '';
                if (!empty($itemData)) {
                    $itemID = $itemData['itemID'];
                    
                    $itemOwnerID = $itemData['UserID'];
                    
                
                
                    $mediasectionData = $this->item_model->fetchData(MEDIA_SECTIONS, array('MediaSectionAlias' => ENTITY_TYPE_ITEM), array('MediaSectionID'), true);
                    if (!empty($mediasectionData)) {
                        $mediaSectionId = $mediasectionData['MediaSectionID'];
                    }
                    
                    
                    /*get loggedIn user collection data*/
                    $collectionData = $this->item_model->fetchData(COLLECTION, array('UserID' => $userId,'StatusID'=>2), array('CollectionID'));
                    $collectionDataArray = array();
                    $collectionDataIn = '';
                    foreach($collectionData as $key=>$val){
                        $collectionDataArray[] = $val['CollectionID'];
                    }
                    
                    $collectionDataIn = implode('\',\'', $collectionDataArray);
                    
                    
                    

                    /*Update the item and all related data to deleted (StatusID = 3)*/
                    
                    //Update the Collection Item table to StatusID = 3 (deleted)
                    if(!empty($collectionDataArray)){
                        $this->item_model->updateData(COLLECTION_ITEM, 
                                array('StatusID' => $status), 
                                "ItemID = ".$itemID." AND CollectionID IN ('$collectionDataIn')"
                            );
                        
                        /* Update the no of saves*/
                        $this->item_model->decrementNoOfSaves($itemID);
                        /* End Update the no of saves*/
                    }

                    if($userId==$itemOwnerID){

                        //Update the Items table to StatusID = 3 (deleted)
                        $this->item_model->updateData(ITEM, 
                                array('StatusID' => $status), 
                                array('itemID' => $itemID)
                            );

                        //Update the related images from the Media table table
                        $this->item_model->updateData(MEDIA,
                                array('StatusID' => $status),
                                array('MediaSectionReferenceID' => $itemID, 'MediaSectionID'=>$mediaSectionId)
                            );


                        //Update the related style tags from the Tags table
                        $this->item_model->updateData(TAGS,
                                array('StatusID' => $status),
                                array('EntityTypeID' => $itemID, 'EntityType' => ENTITY_TYPE_ITEM)
                            );

                        //Update the related comments from the Comments table where EntityTypeID = ItemID and EntityType = "Item" to StatusID = 3
                        $this->item_model->updateData(POSTCOMMENTS,
                                array('StatusID' => $status),
                                array('EntityID' => $itemID, 'EntityType' => ENTITY_TYPE_ITEM)
                            );
                        
                         //update activity
                        $this->item_model->updateData(ACTIVITY,
                                array('StatusID' => $status),
                                array('EntityID' => $itemID, 'EntityType' => ENTITY_TYPE_ITEM)
                            );

                        //update notification data
                        $whereData = array(
                        'type'=>'item',
                        'RefrenceID'=>$itemID
                        );
                        $this->notification_model->deleteNotificationEntity($whereData);
                        
                        
                        //delete item from search table
                        $this->item_model->deleteSearchItem($itemID);
                        
                        
                    }else{
                         //update activity
                        $this->item_model->updateData(ACTIVITY,
                                array('StatusID' => $status),
                                array('EntityID' => $itemID,'UserID' => $userId, 'EntityType' => ENTITY_TYPE_ITEM)
                            );
                    }
                    
                   


                    /*End Update the item and all related data to deleted (StatusID = 3)*/

                    $Return['Message'] = $this->lang->line('item_removed_success');
                }
               
            } else {
                $error = strip_tags(validation_errors());
                $Return['Message'] = $error;
            }

        } else {
            $Return['ResponseCode']=500;
            $Return['Message']=lang('input_invalid_format');
        }
        $Outputs = $Return;
        $this->response($Outputs); /* Final Output */
    }
    
    /**
     * Function to get list of items in frenzy,it provides searching and sorting of items as per popularity and other criteria
     * Parameters : array('UserGuID','PageNo','PageSize')
     * returns: array of categories
     * @author Anoop Singh
     */
    public function listItems_post() {
        /* Define variables - starts */
        $Return['ResponseCode'] = 200;
        $Return['ServiceName'] = 'listitems';
        $Return['Message'] = 'Success';
        $Return['Data'] = array();
        
        /* Define variables - ends */
        $Data = $this->post_data;
        
        if (isset($Data)) {
            $userId = $this->UserID;
            
            if (isset($Data['PageSize']) && $Data['PageSize'] != "")
                $perPage = $Data['PageSize'];
            else
                $perPage = PER_PAGE;


            if (isset($Data['PageNo']) && $Data['PageNo'] != "")
                $PageNo = $Data['PageNo'];
            else
                $PageNo = 1;

            $offset = ($PageNo - 1) * $perPage;

            if (isset($Data['UserGuID']) && $Data['UserGuID']!='') {
                $resultArray = $this->item_model->fetchData(USERS, array('UserGUID' => $Data['UserGuID']), array('UserID'), true);
                if(!empty($resultArray))
                    $userId = $resultArray['UserID'];
                
            } 


            /* Get all items created by the user */
            
            /*$itemDetailArray = $this->item_model->fetchData(ITEM.' as item', 
                        array('item.UserID'=>$userId,'item.StatusID'=>2),
                        array('item.ItemID','item.Title','item.ItemGuID'), 
                        false
                    );*/
            
            
            $itemDetailArray = $this->item_model->fetchData(ITEM .' as i', 
                        array(
                            'i.StatusID'=>2,
                            'c.UserID' => $userId,
                            'c.StatusID' => 2,
                            'ci.StatusID' => 2
                        ), 
                        array('i.ItemID','i.Title','i.ItemGuID'), 
                        false,
                        array(
                            'join'=>array(
                                array(
                                    'table_name'=>COLLECTION_ITEM .' as ci' ,
                                    'condition'=> 'ci.ItemID = i.ItemID',
                                    'join_type'=>'left'
                                ),
                                array(
                                    'table_name'=>COLLECTION .' as c' ,
                                    'condition'=> 'c.CollectionID = ci.CollectionID',
                                    'join_type'=>'left'
                                )
 
                            ),
                            'groupby' => 'i.ItemID'
                        )
                    
                    );
            
            
            /*show item not in any wardrobe*/
            $witemguid = array();
            $whereForUserItem = "item.UserID = $userId AND item.StatusID=2";
            
            foreach ($itemDetailArray as $itemKey => $itemValue) {
                $witemguid[] = $itemValue['ItemGuID'];
            }
            
            if(!empty($witemguid)){
                    $notIn = implode('\',\'', $witemguid);
                    $whereForUserItem .= " AND item.ItemGuID NOT IN ('$notIn')";   
            }
            
            
            $UserItemDetailArray = $this->item_model->fetchData(ITEM.' as item', 
                        $whereForUserItem,
                        array('item.ItemID','item.Title','item.ItemGuID'), 
                        false
                    );
            
            
            $itemDetailArray = array_merge($itemDetailArray, $UserItemDetailArray);
            
            /*end show item not in any wardrobe*/
            
             /*get item images*/
            foreach ($itemDetailArray as $key=>$val){
                $itemDetailArray[$key]['Image'] = '';
                $itemImages = $this->item_model->fetchData(MEDIA,
                        array(
                            'MediaSectionID' => ITEM_MEDIASECTIONID,
                            'MediaSectionReferenceID' => $val['ItemID'],
                            'StatusID' => 1
                        ),
                        array('ImageName', 'ImageUrl', 'Size'),
                        true
                        );
                if(!empty($itemImages)) {
                    $itemDetailArray[$key]['Image'] = $itemImages['ImageName'];
                    $itemDetailArray[$key] = array_merge($itemDetailArray[$key], $itemImages);
                }
                
                unset($itemDetailArray[$key]['ItemID']);
            }
            /*end get item images*/    
            
            if(!empty($itemDetailArray)){
                $Return['Data'] = $itemDetailArray;
            }    

                
            /*End Get the details of the item from Items table and associated tables*/

            $Return['PageSize'] = $perPage;
            $Return['PageNo'] = $PageNo;
            
        } else {
            $Return['ResponseCode']=500;
            $Return['Message']=lang('input_invalid_format');
        }
        $Outputs = $Return;
        $this->response($Outputs); /* Final Output */
    }

    /**
    * Function to get items of same brand 
    * 
    */
    public function SameBrand_post(){
    	  $Return['ResponseCode'] = 200;
    	  $Return['ServiceName'] = 'sameBrand';
    	  $Return['Message'] = 'Success';
    	  $Return['Data'] = array(); 
    	  $Data = $this->post_data;
    	  if(isset($Data) && ( !empty($Data['ItemGuID']))) {
    	  	 
    	  	 $resultArray = $this->item_model->fetchData(ITEM, array('ItemGuID' => $Data['ItemGuID']), array('ItemID','UserID'), true);		  	 
		  	 $temp['Data'] = $this->item_model->getSameBrand($resultArray['ItemID']);
          $loggedInUserId = $userId = $this->UserID;
          $collectionGuID = !empty($Data['CollectionGuID'])?$Data['CollectionGuID']:'';
            
          foreach ($temp['Data'] as $itemGuID){
                $Return['Data'][] = $this->item_model->getItem(array('LoggedUserId'=>$loggedInUserId,'UserID'=>$userId,'ItemGuID'=>$itemGuID['ItemGuID'],'CollectionGuID'=>$collectionGuID));
          }

    	  }
    	  else{
				$Return['ResponseCode'] = 500;
				$Return['Message']=lang('input_invalid_format');    	  
    	  }
    	  $Outputs = $Return;
        $this->response($Outputs);
    	  $this->response($Return);
    }

    /*
    * Function that call getLowerPrices in item_model to fetch items of lower prices
    * Description :- for each itemGuid stored in temp['Data'], call black box getItem() in item_model   
    */
    public function LowerPrices_post(){
		  $Return['ResponseCode'] = 200;
    	  $Return['ServiceName'] = 'lowerPrices';
    	  $Return['Message'] = 'Success';
    	  $Return['Data'] = array();
    	  $temp['Data'] = array();
    	  $Data = $this->post_data;
	     if(isset($Data) && (!empty($Data['ItemGuID']))){
		  	 $resultArray = $this->item_model->fetchData(ITEM, array('ItemGuID' => $Data['ItemGuID']), array('ItemID','UserID'), true);		  	 
		  	 $temp['Data'] = $this->item_model->getLowerPrices($resultArray['ItemID']); 	     
	     	 $loggedInUserId = $userId = $this->UserID;
          $collectionGuID = !empty($Data['CollectionGuID'])?$Data['CollectionGuID']:'';
          //print_r($temp['Data']);
          foreach ($temp['Data'] as $itemGuID){
                $Return['Data'][] = $this->item_model->getItem(array('LoggedUserId'=>$loggedInUserId,'UserID'=>$userId,'ItemGuID'=>$itemGuID['ItemGuID'],'CollectionGuID'=>$collectionGuID));
          }
	     }
	 	  else{
				$Return['ResponseCode'] = 500;
				$Return['Message']=lang('input_invalid_format');    	  
    	  }
	     $this->response($Return);    	
    }
    
    /*
    * Function that calls getSameColorCategory in item_model to fetch items of same category and color
	 * Description :- for each itemGuid stored in temp['Data'], call black box getItem() in item_model    
    */
    public function SameColorCategory_post(){
	 	  $Return['ResponseCode'] = 200;
    	  $Return['ServiceName'] = 'sameColorCategory';
    	  $Return['Message'] = 'Success';
    	  $Return['Data'] = array();
    	  $temp['Data'] = array();
    	  $Data = $this->post_data;
	     if(isset($Data) && (!empty($Data['ItemGuID']))){
		  	 $resultArray = $this->item_model->fetchData(ITEM, array('ItemGuID' => $Data['ItemGuID']), array('ItemID','UserID'), true);		  	 
		  	 $temp['Data'] = $this->item_model->getSameColorCategory($resultArray['ItemID']); 	     
	     	 $loggedInUserId = $userId = $this->UserID;
          $collectionGuID = !empty($Data['CollectionGuID'])?$Data['CollectionGuID']:'';
            
          foreach ($temp['Data'] as $itemGuID){
                $Return['Data'][] = $this->item_model->getItem(array('LoggedUserId'=>$loggedInUserId,'UserID'=>$userId,'ItemGuID'=>$itemGuID['ItemGuID'],'CollectionGuID'=>$collectionGuID));
          }
	     }
	 	  else{
				$Return['ResponseCode'] = 500;
				$Return['Message']=lang('input_invalid_format');    	  
    	  }
	     $this->response($Return);
    } 
    
    /**
     * Function to search wardrobe items (old code)
     * @param array( Sort, StyleTags, ColorID,CountryID, Brand, CategoryMasterListID, SizeID, UseGuID, Title,Location,PageNo, PageSize)
     * @return 
     * @author Sudhir Parmar
     */
    public function SearchItem_post() {
        /* Define variables - starts */
        $Return['ResponseCode'] = 200;
        $Return['ServiceName'] = 'searchitem';
        $Return['Message'] = 'Success';
        $Return['Data'] = array();
        
        /* Define variables - ends */

        $Data = $this->post_data;
        if (isset($Data) && ( !empty($Data['Brand']) || !empty($Data['SearchPage']) || !empty($Data['TopItems']))) {
           $statusID = 2;
            $loggedInUserId = $userId = $this->UserID;
            if (isset($Data['PageSize']) && $Data['PageSize'] != "")
                $perPage = $Data['PageSize'];
            else
                $perPage = PER_PAGE;


            if (isset($Data['PageNo']) && $Data['PageNo'] != "")
                $PageNo = $Data['PageNo'];
            else
                $PageNo = 1;

            $offset = ($PageNo - 1) * $perPage;

            if ($Data['UserGuID']) {
                $resultArray = $this->collection_model->fetchData(USERS, array('UserGUID' => $Data['UserGuID']), array('UserID'), true);
                if(!empty($resultArray))
                    $userId = $resultArray['UserID'];
                
            } 

            $Return['PageSize'] = $perPage;
            $Return['PageNo'] = $PageNo;
            $Return['SearchText'] = $Data['Title'];
            $whereArray['itm.statusID'] = $statusID;
            //$whereArray['colItm.StatusID'] = 2;
            $likeArray = array();

            $itemJoinArr = array(
                    'join'=>array(
                            array(
                                'table_name'=> USERS .' as usr' ,
                                'condition'=> 'usr.UserID = itm.UserID'
                            ),

                            array(
                                'table_name'=> COLLECTION_ITEM .' as colItm' ,
                                'condition'=> 'colItm.ItemID = itm.ItemID AND colItm.StatusID = 2',
                                'join_type'=>'left'
                            ),

                            array(
                                'table_name'=> ITEM_DETAIL .' as itmDtl' ,
                                'condition'=> 'itmDtl.ItemID = itm.ItemID',
                                'join_type'=>'right'
                            ),

                            array(
                                'table_name'=> TAGS .' as tgs',
                                'condition'=> 'tgs.EntityTypeID = itm.ItemID AND tgs.EntityType = "Item"',
                                'join_type'=>'left'
                            ),
                            //$this->db->join(TAGS .' as tgs','tgs.EntityTypeID = art.ArticleID AND tgs.EntityType = "Article"');
                        )
                );


            //if Color given in the param
            /*if(!empty($Data['Color'])){
               $itemJoinArr['join'][] = array( 'table_name'=> COLOR_MASTER.' as clr' ,
                                        'condition'=> 'clr.ColorId = itmDtl.ColorId',
                                        'join_type'=>'left'
                                        );
                $whereArray['clr.Name'] = $Data['Color'];
            }*///end Color if
            //if ColorID given in the param
            if(!empty($Data['ColorID'])){
                $whereArray['itmDtl.ColorId'] = $Data['ColorID'];
            }//end Color if

            //if Category given in the param
            if(isset($Data['ItemMasterCategoryLevel']) && $Data['ItemMasterCategoryLevel']!=''){
                $itemJoinArr['join'][] = array(
                    'table_name' => ITEM_MASTER_CATEGORY . ' as catmaster',
                    'condition' => 'catmaster.ItemMasterCategoryID = itmDtl.CategoryMasterID',
                    'join_type' => 'left'
                );

                if($Data['ItemMasterCategoryLevel']==0){
                   $cateMasterTbl = 'itmDtl.CategoryZeroLevelID';
                }

                else if($Data['ItemMasterCategoryLevel']==1){
                   $cateMasterTbl = 'itmDtl.CategoryFirstLevelID';
                }

                else if($Data['ItemMasterCategoryLevel']==2){
                   $cateMasterTbl = 'itmDtl.CategorySecondLevelID'; 
                }else if($Data['ItemMasterCategoryLevel']==3){
					$cateMasterTbl = 'itmDtl.CategoryThirdLevelID'; 
				}else if($Data['ItemMasterCategoryLevel']==4){
					 $cateMasterTbl = 'itmDtl.CategoryFourthLevelID'; 
				}
                $whereArray[$cateMasterTbl] = $Data['ItemMasterCategoryID'];
            }//end Category if
            
           
                
            
            //if Title given in the param
            if(!empty($Data['Title'])){
                $titleArr = explode(' ', $Data['Title']);

                $itemJoinArr['Like']['itm.Title'] = $titleArr;

                $itemJoinArr['Like']['tgs.Name'] = $titleArr;

                $itemJoinArr['Like']['itmDtl.Location'] = $titleArr;
                $itemJoinArr['Like']['itmDtl.Source'] = $Data['Title'];
                $brandArr = explode(' ', $Data['Title']);
                $itemJoinArr['Like']['itmDtl.Brand'] = $brandArr;

                //Search on the basis of username start
               /* $itemJoinArr['join'][] = array(
                    'table_name' => USERLOGINS . ' as usrLgn',
                    'condition' => 'usrLgn.UserID = itm.UserID',
                    'join_type' => 'left'
                );    
                    
                $itemJoinArr['Like']['usrLgn.LoginKeyword'] = $Data['Title'];
                $itemJoinArr['Like']['usr.FirstName'] = $Data['Title'];
                $itemJoinArr['Like']['usr.LastName'] = $Data['Title'];
                $itemJoinArr['Like']['concat(usr.FirstName," ",usr.LastName)'] = $Data['Title'];
                */
                //Search on the basis of username End

            }//end Title if
            //if Brand given in the param
            if(!empty($Data['Brand'])){
                $whereArray['itmDtl.Brand'] = $Data['Brand'];
                //$itemJoinArr['Like']['itmDtl.Brand'][] = $Data['Brand'];

            }//end Brand if

            //if Description given in the param
           /* if(!empty($Data['Description'])){
                $itemJoinArr['Like']['itm.Description'] = $Data['Description'];
            }/*/
            

            //if Gender given in the param
            if(!empty($Data['ItemGender']) && $Data['ItemGender']!='both'){
                if($Data['ItemGender']=='Women'){
                    $whereArray['itmDtl.CategoryZeroLevelID'] = 1;    
                } else if($Data['ItemGender']=='Men') {
                    $whereArray['itmDtl.CategoryZeroLevelID'] = 49;    
                }
                
            }//end Description if

            //if Price given in the param
            if(!empty($Data['PriceRang'])){
                $priceArr  = explode(' ', $Data['PriceRang']);
                if($priceArr[0]=='under'){
                    $whereArray['itm.Price <'] = (int)$priceArr[1];    
                } else if($priceArr[0]=='over'){
                    $whereArray['itm.Price >'] = (int)$priceArr[1];    
                }else{
                    $priceArr  = explode('-', $Data['PriceRang']);
                    $whereArray['itm.Price >='] = (int)$priceArr[0];
                    $whereArray['itm.Price <='] = (int)$priceArr[1];    
                }
                
            }//end Price if

            /*get total items*/
            
            /*$TotalItem = $this->item_model->fetchData(ITEM .' as itm',
                $whereArray,
                array('count(DISTINCT itm.ItemID) as itmCount'), 
                true, 
                $itemJoinArr
                );
                */

            $TotalItem='';
            /*End of total items*/
            /*
            if(isset($Data['Random']) && $TotalItem['itmCount'] > ($perPage)){
                $remaining = $TotalItem['itmCount']-($perPage);
                $offset = rand ( 0 , $remaining );
            }else{               
                
            }*/
            
            $offset = ($PageNo - 1) * $perPage;

            $itemJoinArr['groupby'] = 'itm.ItemID';
            

            if(!empty($Data['Random'])){
                $itemJoinArr['orderby'] = array(
                    'column'=>'itm.ItemID',
                    'type'=>'RANDOM'
                    );  
            }elseif(!empty($Data['TopItems'])){
                $itemJoinArr['orderby'] = array(
                    'column'=>'itm.NoOfSaves',
                    'type'=>'DESC'
                    );  
            }else{
                $itemJoinArr['orderby'] = 'itm.CreatedDate';    
            }
            
            $ItemArray = $this->item_model->fetchItemData(ITEM .' as itm',
                $whereArray,
                array('itm.ItemID'), 
                array('limit' => $perPage, 'offset' => $offset), 
                $itemJoinArr
                );

            //echo $this->db->last_query();die;
            /*get item images*/
            $finalItemArray = array();
            foreach ($ItemArray as $key=>$val){
                $finalItemArray[] = $this->item_model->getItem(
                    array('LoggedUserId'=>$loggedInUserId,
                        'UserID'=>$userId,
                        'ItemGuID'=>$val['ItemGuID'],
                        'ItemID'=>$val['ItemID'],
                        'incrementView'=>FALSE //dont increase # views in case of search
                        )
                    );
            /*    $itemImages = $this->item_model->fetchData(MEDIA,
                        array(
                            'MediaSectionID' => ITEM_MEDIASECTIONID,
                            'MediaSectionReferenceID' => $val['ItemID'],
                            'StatusID' => 1
                        ),
                        array('ImageName'),
                        true
                        );
                if(!empty($itemImages))
                    $ItemArray[$key]['Images'] = $itemImages;
                
                unset($ItemArray[$key]['ItemID']);
                
                $ItemArray[$key]['Price'] = addDollar($ItemArray[$key]['Price']);
                */
            }
            //print_r($ItemArray);die;
            if(!empty($finalItemArray)){
                $Return['Data'] = $finalItemArray;
            } 

            if(!empty($TotalItem))
                //$Return['TotalRecords'] = $TotalItem['itmCount'];
                $Return['TotalRecords'] = '';

        } else {
            $Return['ResponseCode']=500;
            $Return['Message']=lang('input_invalid_format');
        }
        $this->response($Return); /* Final Output */
    }
    
    /*
     * Function Name: clipitem
     * Description: Function that clips the item to the user wardrobe
     */
    function clipitem_post()
    {
            /* Define variables - starts */
            $Return['ResponseCode'] = 200;
            $Return['Data'] = array();
            $Return['ServiceName'] = 'api/item/clipitem';
            $Return['Message'] = lang('item_clip_success');
            /* Define variables - ends */               

            /* Gather Inputs - starts */            
            $Data = $this->post_data;
            $UserID = $this->UserID;    
            if($Data!=NULL && isset($Data))
            {
                $this->form_validation->set_rules('ItemGuID', 'ItemGuID', 'value_existance_in_db[ItemGuID,'.ITEM.']');
                if ($this->form_validation->run()) {
                    $currentDateTime = get_current_date_time();
                    $itemID = '';
                    $collectionID = '';
                    $itemUserID = '';
                    if (isset($Data['ItemGuID'])) {
                        $resultArray = $this->item_model->fetchData(ITEM, array('ItemGuID' => $Data['ItemGuID']), array('ItemID','UserID'), true);
                        if(!empty($resultArray)){
                            $itemID = $resultArray['ItemID'];
                            $itemUserID = $resultArray['UserID'];
                        }

                    }
                    
                    if (isset($Data['wardrobeForClip'])) {
                        $resultArray = $this->item_model->fetchData(COLLECTION, array('CollectionGuID' => $Data['wardrobeForClip']['CollectionGuID']), array('CollectionID'), true);
                        if(!empty($resultArray))
                            $collectionID = $resultArray['CollectionID'];

                    }

                    if($itemID!='' && $collectionID!=''){
                        /*insert in article usersaves*/
                        $this->db->insert(COLLECTION_ITEM,
                            array(
                                'CollectionID' => $collectionID,
                                'ItemID' => $itemID,
                                'StatusID' => 2,
                                'CreatedDate' => $currentDateTime,
                                'ModifiedDate' => $currentDateTime
                            ) 
                        );
                        /*end insert in article usersaves*/
                        
                        /* Update the no of saves*/
                        $this->item_model->incrementNoOfSaves($itemID);
                        /* End Update the no of saves*/
                    
                        /*add activity*/
                        $this->load->model(array('activity_model'));
                        $ActivityType   = 'Item';
                        $activity['UserID'] = $UserID;
                        $activity['EntityID'] = $itemID;
                        $activity['EntityType'] = $ActivityType;
                        $this->activity_model->addActivity($activity,'ItemClipped',array($UserID),$ActivityType);
                        /*end add activity*/


                        /* Add notification Data Start */
                        $toUserNotification[] = $itemUserID;
                        $parameters[0]['ReferenceID'] = $UserID;
                        $parameters[0]['Type'] = 'User';
                        $parameters[1]['ReferenceID'] = $itemID;
                        $parameters[1]['Type'] = 'Item';
                        $this->notification_model->addNotification(22,$UserID,$toUserNotification,$itemID,$parameters);    
                        /* Add notification Data End */
                    
                    }

                } else {
                    $Return['ResponseCode'] = 502;
                    $error = strip_tags(validation_errors());
                    $Return['Message'] = $error;
                }
            }
            else 
            {
                $Return['ResponseCode']=500;
                $Return['Message']=lang('input_invalid_format');
            }
            $Outputs=$Return;
            $this->response($Outputs);/* Final Output */            
    }

    //ITEMFROMWEB FUNCTION (Called in wrdrobe_controller.js/$scope.getItemFromWeb) (calls scrapping_model.php/getDataFromURL function)
     /* Function to get item details from the provided url
     * @param string (url of the item)
     * @return array
     * @author Sudhir Parmar
     */
    public function ItemFromWeb_post( ){
        $this->load->model('scrapping_model');
        /* Define variables - starts */
        $Return['ResponseCode'] = 200;
        $Return['Data'] = array();
        $Return['ServiceName'] = 'itemfromweb';
        $Return['Message'] = 'Success';
        /* Define variables - ends */               

        /* Gather Inputs - starts */            
        $Data = $this->post_data;
        
        $UserID = $this->UserID;    
        if ($Data!=NULL && isset($Data['ItemUrl'])){
            //call model method to extractt data from url -is data being downloaded or just pulled here?
            $Return['Data'] = $this->scrapping_model->getDataFromUrl($Data['ItemUrl']);
            $Return['Data']['debug'] = 0;
        }
        else 
        {
            $Return['ResponseCode']=500;
            $Return['Message']=lang('input_invalid_format');
        }
        $this->response($Return);/* Final Output */
    }
    
     /**
     * Function to get list of users who have clipped the item
     * Parameters : ItemGuID
     * returns: array of users
     * @author Anoop Singh
     */
    public function clipedItemUsers_post() {
        /* Define variables - starts */
        $Return['ResponseCode'] = 200;
        $Return['ServiceName'] = 'clipeditemusers';
        $Return['Message'] = 'Success';
        $Return['Data'] = array();
        
        /* Define variables - ends */
        $Data = $this->post_data;
        
        if (isset($Data)) {
            
            $itemID = '';
            $itemOwnerID = '';
            
            if (isset($Data['ItemGuID'])) {
                $resultArray = $this->item_model->fetchData(ITEM, array('ItemGuID' => $Data['ItemGuID']), array('ItemID','UserID'), true);
                if(!empty($resultArray)){
                    $itemID = $resultArray['ItemID'];
                    $itemOwnerID =  $resultArray['UserID'];
                    
                }
                

            }
            
            if($itemID!=''){
                
                $userDetail = $this->item_model->fetchData(COLLECTION_ITEM.' as colItm', 
                        array('colItm.ItemID'=>$itemID,'colItm.StatusID'=>2,'col.StatusID'=>2,'usr.StatusID'=>2),
                        array('usr.FirstName','usr.LastName','usr.UserGuID','usr.UserID','usr.ProfilePicture','ul.LoginKeyword as username'), 
                        false,
                        array(
                            'join'=>array(
                                        array(
                                            'table_name'=> COLLECTION.' as col' ,
                                            'condition'=> 'col.CollectionID = colItm.CollectionID'
                                        ),
                                        array(
                                            'table_name'=> USERS .' as usr' ,
                                            'condition'=> "usr.UserID = col.UserID AND usr.UserID !=$itemOwnerID"
                                        ),
                                        array(
                                            'table_name'=> USERLOGINS .' as ul' ,
                                            'condition'=> "ul.UserID = usr.UserID"
                                        )
                                
                                    ),
                            'groupby'=> 'usr.UserID'
                        )
                    );
                //echo $this->db->last_query();die;
                if(!empty($userDetail))
        {
            foreach($userDetail as $key=>$value)
            {
                $userDetail[$key]['ProfilePicURL']=get_full_path('profile_image','',$value['ProfilePicture'],'192','192','192'); 
                $userDetail[$key]['ProfileLink']=get_entity_url($value['UserID']);
                                unset($userDetail[$key]['UserID']);
                                
                                if(trim($userDetail[$key]['FirstName'])=='' && trim($userDetail[$key]['LastName'])=='')
                                    $userDetail[$key]['FirstName'] = ucfirst($userDetail[$key]['username']) ;
                                }
                        
                        $Return['Data'] = $userDetail;
        }
                
            }
            
        } else {
            $Return['ResponseCode']=500;
            $Return['Message']=lang('input_invalid_format');
        }
        $Outputs = $Return;
        $this->response($Outputs); /* Final Output */
    }
    
    /*
     * Function Name: checkUrlExistance
     * Description: Function that checks 
     */
    function checkUrlExistance($param){
            
        if(isset($param['Source']) && $param['Source']!=""){

            $whereArray = array('itemd.Source'=>$param['Source'],'item.StatusID'=>2);

            if(isset($param['ItemGuID']) && $param['ItemGuID']!=""){
                $whereArray['item.ItemGuID != '] = $param['ItemGuID'];
            }

            $itemDetail = $this->item_model->fetchData(ITEM_DETAIL.' as itemd ', 
                    $whereArray, 
                    array('item.ItemGuID','item.Title','itemd.Brand'),
                    true,
                    array(
                        'join'=>array(
                            array(
                                'table_name'=>ITEM .' as item' ,
                                'condition'=> 'item.ItemID = itemd.ItemID'
                            )
                        )
                    ));

            if(!empty($itemDetail)){
                return $itemDetail;
            } else {
                return false;
            }

        }

        return false;
    }
    
    /*
     * Function Name: flagItem
     * Description: Flag an item
     */
    function flagItem_post(){
        /* Define variables - starts */
        $Return['ResponseCode'] = 200;
        $Return['ServiceName'] = 'flagitem';
        $Return['Message'] = 'Item Flagged Successfully';
        $Return['Data'] = array();
        
        /* Define variables - ends */
        $Data = $this->post_data;
        $UserID = $this->UserID;
        if (isset($Data) ) {
            $itemID = $this->getItemIDFromGuID($Data['ItemGuID']);
            $this->item_model->flagItem($itemID, $UserID);
        }else{
            $Return['ResponseCode']=500;
            $Return['Message']=lang('input_invalid_format');
        }
        return $this->response($Return);
    }
    function array_utf8_encode($dat)
	{
		if (is_string($dat))
			return utf8_encode($dat);
		if (!is_array($dat))
			return $dat;
		$ret = array();
		foreach ($dat as $i => $d)
			$ret[$i] = self::array_utf8_encode($d);
		return $ret;
	}

    /*
     * Function Name: getItemIDFromGuID
     * Description: get item ID from item GUID
     */
    function getItemIDFromGuID($ItemGuID){
        $itemDetail = $this->item_model->fetchData(ITEM.' as itm ', 
        array('itm.ItemGuID'=>$ItemGuID),
        array('itm.ItemID'),
        true
        );
        //print_r($itemDetail);die;
        
        return $itemDetail['ItemID'];
    }
    
    /**
     * Function to search wardrobe items (new code)
     * @param array( Sort, StyleTags, ColorID,CountryID, Brand, CategoryMasterListID, SizeID, UseGuID, Title,Location,PageNo, PageSize)
     * @return 
     * @author Anoop SIngh
     */
    public function SearchItemNew_post() {
        /* Define variables - starts */
        $Return['ResponseCode'] = 200;
        $Return['ServiceName'] = 'searchitemnew';
        $Return['Message'] = 'Success';
        $Return['Data'] = array();
        
        /* Define variables - ends */

        $Data = $this->post_data;
        if (isset($Data) && ( !empty($Data['Brand']) || !empty($Data['SearchPage']) || !empty($Data['TopItems']))) {
           $statusID = 2;
            $loggedInUserId = $userId = $this->UserID;
            if (isset($Data['PageSize']) && $Data['PageSize'] != "")
                $perPage = $Data['PageSize'];
            else
                $perPage = PER_PAGE;


            if (isset($Data['PageNo']) && $Data['PageNo'] != "")
                $PageNo = $Data['PageNo'];
            else
                $PageNo = 1;

            $offset = ($PageNo - 1) * $perPage;

            if ($Data['UserGuID']) {
                $resultArray = $this->collection_model->fetchData(USERS, array('UserGUID' => $Data['UserGuID']), array('UserID'), true);
                if(!empty($resultArray))
                    $userId = $resultArray['UserID'];
                
            } 

            $Return['PageSize'] = $perPage;
            $Return['PageNo'] = $PageNo;
            $Return['SearchText'] = $Data['Title'];
            $whereArray['itm.statusID'] = $statusID;
            //$whereArray['colItm.StatusID'] = 2;
            $likeArray = array();

            $itemJoinArr = array(
                    'join'=>array(
                            array(
                                'table_name'=> USERS .' as usr' ,
                                'condition'=> 'usr.UserID = itm.UserID'
                            ),

                            array(
                                'table_name'=> COLLECTION_ITEM .' as colItm' ,
                                'condition'=> 'colItm.ItemID = itm.ItemID AND colItm.StatusID = 2',
                                'join_type'=>'left'
                            ),

                            array(
                                'table_name'=> ITEM_DETAIL .' as itmDtl' ,
                                'condition'=> 'itmDtl.ItemID = itm.ItemID',
                                'join_type'=>'right'
                            ),
                            array(
                                'table_name'=> ITEM_SEARCH .' as isearch' ,
                                'condition'=> 'isearch.ItemID = itm.ItemID'
                            ),
                            array(
                                'table_name'=> TAGS .' as tgs',
                                'condition'=> 'tgs.EntityTypeID = itm.ItemID AND tgs.EntityType = "Item"',
                                'join_type'=>'left'
                            ),
                            //$this->db->join(TAGS .' as tgs','tgs.EntityTypeID = art.ArticleID AND tgs.EntityType = "Article"');
                        )
                );

            //if ColorID given in the param
            if(!empty($Data['ColorID'])){
                $itemJoinArr['join'][] = array(
                    'table_name' => ITEM_COLOR_RELATION.' as itmColor',
                    'condition' => 'itm.ItemID = itmColor.ItemID'
                );
                $whereArray['itmColor.ColorId'] = $Data['ColorID'];
            } else if(!empty($Data['Color'])) {
                //if Color given in the param
                $itemJoinArr['join'][] = array(
                    'table_name' => ITEM_COLOR_RELATION.' as itmColor',
                    'condition' => 'itm.ItemID = itmColor.ItemID'
                );
                $itemJoinArr['join'][] = array(
                    'table_name' => COLOR_MASTER.' as clr',
                    'condition' => 'itmColor.ColorID = clr.ColorID'
                );
                $whereArray['clr.Name'] = $Data['Color'];
            }//end Color if

            //if Category given in the param
            if(!empty($Data['ItemMasterCategoryID'])){
                $itemJoinArr['join'][] = array(
                    'table_name' => ITEM_CATEGORY_RELATION.' as itmCategory',
                    'condition' => 'itm.ItemID = itmCategory.ItemID'
                );
                $whereArray['itmCategory.ItemMasterCategoryID'] = $Data['ItemMasterCategoryID'];
            }//end Category if
            
            //if Title given in the param
            if(!empty($Data['Title'])){
              
                $itemJoinArr['FullText'] = $Data['Title'];

            }
            //end Title if
            //if Brand given in the param
            if(!empty($Data['Brand'])){
                $Data['Brand'] = urldecode($Data['Brand']);
                $whereArray['itmDtl.Brand'] = urldecode($Data['Brand']);
                
                if(empty($Data['Title'])){
                    $itemJoinArr['FullText'] = $Data['Brand'];
                }
                //$itemJoinArr['Like']['itmDtl.Brand'][] = $Data['Brand'];

            }//end Brand if
            
            //Madein if
            if(!empty($Data['Madein'])){
                $Data['Madein'] = urldecode($Data['Madein']);
                $itemJoinArr['join'][] = array( 'table_name'=> COUNTRYMASTER.' as country' ,
                                        'condition'=> 'country.country_id = itmDtl.CountryID',
                                        'join_type'=>'left'
                                        );
                $whereArray['country.country_name'] = $Data['Madein'];


            }//end Madein if
            
            //Size if
            if(!empty($Data['Size'])){
                $Data['Size'] = urldecode($Data['Size']);
                $itemJoinArr['join'][] = array(
                    'table_name' => ITEM_SIZE_RELATION.' itmSize',
                    'condition' => 'itm.ItemID = itmSize.ItemID'
                );
                $itemJoinArr['join'][] = array( 'table_name'=> SIZE_MASTER.' as size' ,
                                        'condition'=> 'size.SizeID = itmSize.SizeID',
                                        'join_type'=>'left'
                                        );
                $whereArray['size.Name'] = $Data['Size'];
                

            }//end Size if
            
            //Material if
            if(!empty($Data['Material'])){
                $itemJoinArr['join'][] = array(
                    'table_name' => ITEM_MATERIAL_RELATION. ' itmMaterial',
                    'condition' => 'itm.ItemID = itmMaterial.ItemID'
                );
                $itemJoinArr['join'][] = array(
                    'table_name' => MATERIAL_MASTER. ' as material',
                    'condition' => 'material.MaterialID = itmMaterial.MaterialID',
                    'join_type' => 'left'
                );
                $whereArray['material.Name'] = $Data['Material'];
            }//end Material if

            //if Description given in the param
           /* if(!empty($Data['Description'])){
                $itemJoinArr['Like']['itm.Description'] = $Data['Description'];
            }/*/


            //if Gender given in the param
            if(!empty($Data['ItemGender']) && $Data['ItemGender']!='both'){
                if($Data['ItemGender']=='Women'){
                    $whereArray['itmDtl.CategoryZeroLevelID'] = 1;    
                } else if($Data['ItemGender']=='Men') {
                    $whereArray['itmDtl.CategoryZeroLevelID'] = 49;    
                }
                
            }//end Description if

            //if Price given in the param
            if(!empty($Data['PriceRang'])){
                $priceArr  = explode(' ', $Data['PriceRang']);
                if($priceArr[0]=='under'){
                    $whereArray['itm.Price <'] = (int)$priceArr[1];    
                } else if($priceArr[0]=='over'){
                    $whereArray['itm.Price >'] = (int)$priceArr[1];    
                }else{
                    $priceArr  = explode('-', $Data['PriceRang']);
                    $whereArray['itm.Price >='] = (int)$priceArr[0];
                    $whereArray['itm.Price <='] = (int)$priceArr[1];    
                }
                
            }//end Price if

            /*get total items*/
            
            /*$TotalItem = $this->item_model->fetchData(ITEM .' as itm',
                $whereArray,
                array('count(DISTINCT itm.ItemID) as itmCount'), 
                true, 
                $itemJoinArr
                );
                */

            $TotalItem='';
            /*End of total items*/
            /*
            if(isset($Data['Random']) && $TotalItem['itmCount'] > ($perPage)){
                $remaining = $TotalItem['itmCount']-($perPage);
                $offset = rand ( 0 , $remaining );
            }else{               
                
            }*/
            
            $offset = ($PageNo - 1) * $perPage;

            $itemJoinArr['groupby'] = 'itm.ItemID';
            

            if(!empty($Data['Random'])){
                $itemJoinArr['orderby'] = array(
                    'column'=>'itm.ItemID',
                    'type'=>'RANDOM'
                    );  
            }elseif(!empty($Data['TopItems'])){
                $itemJoinArr['orderby'] = array(
                    'column'=>'itm.NoOfSaves',
                    'type'=>'DESC'
                    );  
            }else{
                $itemJoinArr['orderby'] = 'itm.CreatedDate';    
            }

            if (isset($Data['NoFullText']) && $Data['NoFullText']) {
                unset($itemJoinArr['FullText']);
            }
            
            $ItemArray = $this->item_model->fetchItemDataFullTextSearch(ITEM .' as itm',
                $whereArray,
                array('itm.ItemID'), 
                array('limit' => $perPage, 'offset' => $offset), 
                $itemJoinArr
                );

            //echo $this->db->last_query();die;
            /*get item images*/
            $finalItemArray = array();
            foreach ($ItemArray as $key=>$val){
                $finalItemArray[] = $this->item_model->getItem(
                    array('LoggedUserId'=>$loggedInUserId,
                        'UserID'=>$userId,
                        'ItemGuID'=>$val['ItemGuID'],
                        'ItemID'=>$val['ItemID'],
                        'incrementView'=>FALSE //dont increase # views in case of search
                        )
                    );
            /*    $itemImages = $this->item_model->fetchData(MEDIA,
                        array(
                            'MediaSectionID' => ITEM_MEDIASECTIONID,
                            'MediaSectionReferenceID' => $val['ItemID'],
                            'StatusID' => 1
                        ),
                        array('ImageName'),
                        true
                        );
                if(!empty($itemImages))
                    $ItemArray[$key]['Images'] = $itemImages;
                
                unset($ItemArray[$key]['ItemID']);
                
                $ItemArray[$key]['Price'] = addDollar($ItemArray[$key]['Price']);
                */
            }
            //print_r($ItemArray);die;
            if(!empty($finalItemArray)){
                $Return['Data'] = $this->array_utf8_encode($finalItemArray);
            } 

            if(!empty($TotalItem))
                //$Return['TotalRecords'] = $TotalItem['itmCount'];
                $Return['TotalRecords'] = '';

        } else {
            $Return['ResponseCode']=500;
            $Return['Message']=lang('input_invalid_format');
        }
        $this->response($Return); /* Final Output */
    }


}
