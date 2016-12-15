<?php

class Item_model extends Common_Model {

    public function __construct() {
        parent::__construct();
    }
    
    /**
     * [insertBatchData insert/update data in batch]
     * @param tableName, dataArray
     * @author Anoop Singh
     */
    function insertBatch($tableName, $dataArray) {
        if (!empty($dataArray)) {
            $this->db->insert_batch($tableName, $dataArray);
        }
    }
    
     /**
     * [Update data]
     * @param tableName, dataArray, $whereArray
     * @author Anoop Singh
     */
    function updateData($tableName, $dataArray, $whereArray) {
        if (!empty($dataArray)) {
            $this->db->where($whereArray);
            $this->db->update($tableName, $dataArray);
        }
    }
    
    /**
     * [Remove data]
     * @param tableName, $whereArray
     * @author Anoop Singh
     */
    function removeData($tableName, $whereArray) {
        $this->db->where($whereArray);
        $this->db->delete($tableName);
    }
    
    
    /**
     * [Increment number of views by one]
     * @param ItemID
     * @author Anoop Singh
     */
    function incrementNoOfViews($itemID) {
        
        $this->db->where('ItemID', $itemID);
        $this->db->set('NoOfViews', '`NoOfViews`+ 1', FALSE);
        $this->db->update(ITEM);
    }
    
    /**
     * [Increment number of saves by one]
     * @param ItemID
     * @author Anoop Singh
     */
    function incrementNoOfSaves($itemID) {

        $this->db->where('ItemID', $itemID);
        $this->db->set('NoOfSaves', '`NoOfSaves`+ 1', FALSE);
        $this->db->update(ITEM);
    }
    
    /**
     * [decrement number of saves by one]
     * @param ItemID
     * @author Anoop Singh
     */
    function decrementNoOfSaves($itemID) {

        $this->db->where('ItemID', $itemID);
        $this->db->set('NoOfSaves', '`NoOfSaves`- 1', FALSE);
        $this->db->update(ITEM);
    }
    
    /**
     * [update sizeID if it doesn't exist in SizeMaster]
     * @param sizeID
     * @author Xingchen Liao
     */
    function updateSize($sizeID) {
        $sizeIDArray = array();
        asort($sizeID);

        foreach ($sizeID as $size) {
            $this->db->select('*');
            $this->db->from(SIZE_MASTER);
            $this->db->where('Name', $size);
            $query = $this->db->get();

            if ( $query->num_rows() > 0 ) {
                foreach ($query->result() as $row) {
                log_message('debug', 'Size found!!!!!!!!!');
                    $sizeIDArray[$row->SizeID] = $row->SizeID;
                }
            } else {
                log_message('debug', 'Size not found!!!!!!!!!');
                $data = array ('Name' => $size);
                $this->db->insert(SIZE_MASTER, $data);
                $id = $this->db->insert_id();
                $sizeIDArray[$id] = $id;
            }
        }

        return $sizeIDArray;
    }
    /*
    * Function Name: getSameCategoryColor
    * Description: get items of a particular color and size
    * 
    */
    function getSameColorCategory($itemID){
	 		$this->db->select('*');
	 		$this->db->from(ITEM_SEARCH);
	 		$this->db->where('ItemID',$itemID);
	 		$query = $this->db->get();
	 		$color_category = $query->result_array();
			$whereClauseSameCategoryColor = array('Color' => $color_category[0]['Color'], 'Category' => $color_category[0]['Category']);	 		
	 		$this->db->select('ItemGuID');
	 		$this->db->from(ITEM_SEARCH);
	 		$this->db->join(ITEM,'ItemSearch.ItemID = Item.ItemID','left');
			$this->db->where($whereClauseSameCategoryColor);
			$this->db->where('Item.ItemID !=',$itemID);    		
			$this->db->limit(10);
    		$query = $this->db->get();   		
    		return $query->result_array();
    }
    /*
    *	Function Name: getLowerPrices
    * Description: get items of Lower Prices
    */
	function getLowerPrices($itemID){
		   $this->db->select('*');
	 		$this->db->from(ITEM);
	 		$this->db->where('ItemID',$itemID);
	 		$query = $this->db->get();
	 		$this->db->select('*');
	 		$this->db->from(ITEM_SEARCH);
	 		$this->db->where('ItemID',$itemID);
	 		$query2 = $this->db->get();
	 		$price = $query->result_array();
	 		$category1 = $query2->result_array();
			$category = $category1[0]['Category'];		   
		   //print_r($price[0]['Price']);
	 		$six = $price[0]['Price'];
	 		$five = $six*7/8;
    		$four = $six*3/4;
    		$three = $six/2; // this range needs to be dynamic, as median should also be product cost density dependent
    		$two = $six/4;
    		$one = $six/8;
    		$query = $this->db->query("(Select * FROM ebdb.Item Left Join ItemSearch on ItemSearch.ItemID = Item.ItemID  
												WHERE Item.Price > '$five' AND Item.Price < '$six' AND ItemSearch.Category='$category' AND Item.ItemID != '$itemID' LIMIT 1 )
                              UNION
                               ( SELECT * FROM Item Left Join ItemSearch on ItemSearch.ItemID = Item.ItemID Where Item.Price > '$four' AND Item.Price < '$five' AND ItemSearch.Category='$category' LIMIT 1 )
                               UNION
                               ( SELECT * FROM Item Left Join ItemSearch on ItemSearch.ItemID = Item.ItemID  Where Item.Price > '$three' AND Item.Price < '$four' AND ItemSearch.Category='$category' LIMIT 3 )
                                UNION
                               ( SELECT * FROM Item Left Join ItemSearch on ItemSearch.ItemID = Item.ItemID Where Item.Price > '$two' AND Item.Price < '$three' AND ItemSearch.Category='$category' LIMIT 3 )
                                 UNION
                               ( SELECT * FROM Item Left Join ItemSearch on ItemSearch.ItemID = Item.ItemID Where Item.Price > '$one' AND Item.Price < '$two' AND ItemSearch.Category='$category' LIMIT 1 )
                                  UNION
                               ( SELECT * FROM Item Left Join ItemSearch on ItemSearch.ItemID = Item.ItemID Where Item.Price > 0 AND Item.Price < '$one' AND ItemSearch.Category='$category' LIMIT 1 );
");
	      return $query->result_array();
	}    

    /*
    *	Function Name: getSameBrand
    * Description: get items of a Particular Brand
    */
   function getSameBrand($itemID){
			 $this->db->select('Brand');
			 $this->db->from(ITEM_DETAIL);
			 $this->db->where('ItemID',$itemID);
			 $query = $this->db->get();
			 $brand = $query->result_array();
			 $this->db->select('*');
			 $this->db->from(ITEM_SEARCH);
			 $this->db->where('ItemID',$itemID);
			 $query1 = $this->db->get();
			 $category = $query1->result_array();			
			 $this->db->select('ItemGuID','Brand');
			 $this->db->from(ITEM_DETAIL);
			 $whereClauseSameBrandCategory = array('ItemDetail.Brand' => $brand[0]['Brand'], 'Category' => $category[0]['Category']);
			 $this->db->join(ITEM.' as itm','ItemDetail.ItemID = itm.ItemID','left');
			 $this->db->join(ITEM_SEARCH.' as itmSearch','ItemDetail.ItemID = itmSearch.ItemID','left');
			 $this->db->limit(10);
			 $this->db->where($whereClauseSameBrandCategory);
			 $this->db->where('itm.ItemID !=',$itemID);		 
			 $query = $this->db->get();			 
			 return $query->result_array();
	}

    /*
     * Function Name: getItem
     * Description: get item details
     */
    function getItem($paramArray = array()){
                
               
        
        $loggedInUserId = '';
        if(isset($paramArray['LoggedUserId'])){
            $loggedInUserId = $paramArray['LoggedUserId'];
        }
        
        if(isset($paramArray['UserID'])){
            $userId = $paramArray['UserID'];
        }else{
            $userId = $paramArray['LoggedUserId'];
        }
        if(isset($paramArray['ItemGuID'])){
            $where = array('item.ItemGuID' => $paramArray['ItemGuID']);
        }else{
            $where = array('item.ItemID' => $paramArray['ItemID']);
        }
        
        if(isset($paramArray['CollectionGuID'])){
             $collectionGuID = $paramArray['CollectionGuID'];
        }else{
            $collectionGuID = '';
        }
        
        $flagCheck = '';
        if (!empty($loggedInUserId)) {
            $flagCheck = ' AND flag.UserID= ' . $loggedInUserId;
        }
        
        if($collectionGuID != '') {
            $where['collection.CollectionGuID'] = $collectionGuID;
        }
        //($collectionGuID != '' ? ' AND collection.CollectionGuID = \'' . $collectionGuID . '\'' : '')
        
        /* Get the details of the item from Items table and associated tables */
        $itemDetailArray = $this->fetchData(ITEM . ' as item', $where, array('country.country_name as countryname', 
            'isearch.color as colorname','item.StockStatus','isearch.material as materialname','isearch.size as sizename', 'catmaster.ItemMasterCategoryLevel', 
            'catmaster.ItemMasterCategoryGuID', 'catmaster.Name as CategoryName', 'item.ItemID', 'item.Title', 
            'item.Description', 'item.Price', 'item.NoOfSaves', 'item.NoOfViews', 'item.NoOfComments', 
            'idetail.CategoryMasterID','idetail.MaterialID','idetail.CategoryZeroLevelID', 'idetail.CategoryFirstLevelID',
            'idetail.CategorySecondLevelID','idetail.CategoryThirdLevelID','idetail.CategoryFourthLevelID','idetail.CategoryLevel','idetail.Location', 'idetail.Brand', 'idetail.ColorID', 
            'idetail.SizeID','idetail.CountryID', 'idetail.Source', 'idetail.BuyLink', 
            'collection.CollectionGuID', 'users.UserGUID', 'users.FirstName', 'users.LastName', 
            'users.ProfilePicture', 'users.UserID','item.NoOfViews', 'item.CreatedDate', 'item.ModifiedDate',
            'item.itemGuID','flag.FlagID'), true, array(
            'join' => array(
                array(
                    'table_name' => ITEM_DETAIL . ' as idetail',
                    'condition' => 'idetail.itemID = item.itemID'
                ),
                array(
                    'table_name' => ITEM_SEARCH . ' as isearch',
                    'condition' => 'isearch.itemID = item.itemID',
                    'join_type' => 'left'
                ),
                array(
                    'table_name' => COLLECTION_ITEM . ' as citem',
                    'condition' => 'citem.ItemID = idetail.itemID AND citem.StatusID=2',
                    'join_type' => 'left'
                ),
                array(
                    'table_name' => COLLECTION . ' as collection',
                    //'condition' => 'collection.CollectionID = citem.CollectionID AND collection.StatusID=2' . ($collectionGuID != '' ? ' AND collection.CollectionGuID = \'' . $collectionGuID . '\'' : ''),
                    'condition' => 'collection.CollectionID = citem.CollectionID AND collection.StatusID=2',
                    'join_type' => 'left'
                ),
                array(
                    'table_name' => USERS . ' as users',
                    'condition' => 'users.userID = item.userID'
                ),
                array(
                    'table_name' => ITEM_MASTER_CATEGORY . ' as catmaster',
                    'condition' => 'catmaster.ItemMasterCategoryID = idetail.CategoryMasterID',
                    'join_type' => 'left'
                ),
                array(
                    'table_name' => SIZE_MASTER . ' as sizemaster',
                    'condition' => 'sizemaster.SizeID = idetail.SizeID',
                    'join_type' => 'left'
                ),
                // array(
                //     'table_name' => COLOR_MASTER . ' as color',
                //     'condition' => 'color.ColorID = idetail.ColorID',
                //     'join_type' => 'left'
                // ),
                array(
                    'table_name' => COUNTRYMASTER . ' as country',
                    'condition' => 'country.country_id = idetail.CountryID',
                    'join_type' => 'left'
                ),
                array(
                    'table_name' => FLAG . ' as flag',
                    'condition' => 'flag.TypeID = item.ItemID AND flag.Type="Item"' . $flagCheck,
                    'join_type' => 'left'
                )
            )
        )
        );
		$CategoryMix=array();
		//file_put_contents("/var/www/html/uploads/cat.txt",print_r($itemDetailArray,true),FILE_APPEND);

        //print_r($this->db->last_query());die;
        if(!empty($itemDetailArray)){
            $itemGuID = $itemDetailArray['itemGuID'];

            //get the extra parameters in ItemDetails table
            if (isset($itemDetailArray['CategoryMasterID'])) {
				$CategoryMasterID=explode(',',$itemDetailArray['CategoryMasterID']);
				$ItemMasterCategoryLevel=explode(',',$itemDetailArray['CategoryLevel']);
				$CategoryFirstLevelID=explode(',',$itemDetailArray['CategoryFirstLevelID']);
				$CategorySecondLevelID=explode(',',$itemDetailArray['CategorySecondLevelID']);
				$CategoryThirdLevelID=explode(',',$itemDetailArray['CategoryThirdLevelID']);
				$CategoryFourthLevelID=explode(',',$itemDetailArray['CategoryFourthLevelID']);
				$CategoryZeroLevelID=explode(',',$itemDetailArray['CategoryZeroLevelID']);

                // Handle corrupted category data
                $categoryCount = min(count($CategoryMasterID), count($ItemMasterCategoryLevel));

				$CategoryName=array();
				
                //Note: Logic for diff level is seperated for ease of future changes
				for($i=0;$i<$categoryCount;$i++){
					$tmpCategory=$this->fetchData(ITEM_MASTER_CATEGORY,array('ItemMasterCategoryID' => $CategoryMasterID[$i]),array('ItemMasterCategoryLevel'),true);
					if(isset($tmpCategory['ItemMasterCategoryLevel'])){					
					if ($tmpCategory['ItemMasterCategoryLevel'] ==1) {

						$levelZeroCatData = $this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $CategoryZeroLevelID[0]), array('Name'), true);
						//$itemDetailArray['CategoryZeroLevelName'] = $levelZeroCatData['Name'];
						$levelFirstCatData = $this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $CategoryFirstLevelID[0]), array('Name'), true);
						array_splice($CategoryZeroLevelID, 0, 1); 
						array_splice($CategoryFirstLevelID, 0, 1); 
						
						$CategoryName[] = $levelZeroCatData['Name']. ' > ' . $levelFirstCatData['Name'];
						
					} elseif ($tmpCategory['ItemMasterCategoryLevel'] == 2) {

						$levelZeroCatData = $this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $CategoryZeroLevelID[0]), array('Name'), true);
						$levelFirstCatData= $this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $CategoryFirstLevelID[0]), array('Name'), true);
						array_splice($CategoryZeroLevelID, 0, 1); 
						array_splice($CategoryFirstLevelID, 0, 1); 
						//$itemDetailArray['CategoryZeroLevelName'] = !empty($levelZeroCatData['Name'])?$levelZeroCatData['Name']:'';
						$levelSecondCatData= $this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $CategorySecondLevelID[0]), array('Name'), true);
						array_splice($CategorySecondLevelID, 0, 1); 
						$CategoryName[] = $levelZeroCatData['Name'] . ' > ' . $levelFirstCatData['Name'].' > '.$levelSecondCatData['Name'];
						
					}elseif($tmpCategory['ItemMasterCategoryLevel'] == 3){
						
						$levelZeroCatData = $this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $CategoryZeroLevelID[0]), array('Name'), true);
						$levelFirstCatData= $this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $CategoryFirstLevelID[0]), array('Name'), true);
						$levelSecondCatData=$this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $CategorySecondLevelID[0]), array('Name'), true);
						array_splice($CategoryZeroLevelID, 0, 1); 
						array_splice($CategoryFirstLevelID, 0, 1); 
						array_splice($CategorySecondLevelID, 0, 1); 
						$levelThirdCatData=$this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $CategoryThirdLevelID[0]), array('Name'), true);
						array_splice($CategoryThirdLevelID, 0, 1); 
						$CategoryName[] = $levelZeroCatData['Name'] . ' > ' . $levelFirstCatData['Name'].' > '.$levelSecondCatData['Name'].' > ' .$levelThirdCatData['Name'];
						
						
					}elseif($tmpCategory['ItemMasterCategoryLevel'] == 4){
						$levelZeroCatData = $this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $CategoryZeroLevelID[0]), array('Name'), true);
						$levelFirstCatData= $this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $CategoryFirstLevelID[0]), array('Name'), true);
						$levelSecondCatData=$this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $CategorySecondLevelID[0]), array('Name'), true);
						$levelThirdCatData=$this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $CategoryThirdLevelID[0]), array('Name'), true);
						array_splice($CategoryZeroLevelID, 0, 1); 
						array_splice($CategoryFirstLevelID, 0, 1); 
						array_splice($CategorySecondLevelID, 0, 1); 
						array_splice($CategoryThirdLevelID, 0, 1); 
						$levelFourthCatData=$this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $CategoryFourthLevelID[0]), array('Name'), true);
						array_splice($CategoryFourthLevelID, 0, 1); 
						$CategoryName[] = $levelZeroCatData['Name'] . ' > ' . $levelFirstCatData['Name'].' > '.$levelSecondCatData['Name'].' > ' .$levelThirdCatData['Name'].' > ' .$levelFourthCatData['Name'];
						//file_put_contents("/var/www/html/uploads/cat.txt",print_r($CategoryThirdLevelID,true),FILE_APPEND);
					}
				}
				}
                $CategoryName = array_pad($CategoryName, $categoryCount, '');
				for($k=0;$k<$categoryCount;$k++){
					$CategoryMix[]=array(
						'CategoryName'=>$CategoryName[$k],
						'ItemMasterCategoryLevel'=>$ItemMasterCategoryLevel[$k],
						'CategoryMasterID'=>$CategoryMasterID[$k]
						
					);	
					
				}
				$itemDetailArray['CategoryName']=implode(';',$CategoryName);
				
            }
            $styleTagsArray = $this->fetchData(TAGS, array('EntityType' => ENTITY_TYPE_ITEM, 'EntityTypeID' => $itemDetailArray['ItemID'], 'StatusID' => 2), array('Name'));
            $styleTags = array();
            foreach ($styleTagsArray as $styleTag) {
                $styleTags[] = $styleTag['Name'];
            }

            $imageArray = $this->fetchData(MEDIA . ' as media', 
                    array('media.MediaSectionReferenceID' => $itemDetailArray['ItemID'], 'media.StatusID' => 1), 
                    array('media.ImageName','media.ImageUrl', 'media.Size'), false, 
                    array('join' => array(
                        array(
                            'table_name' => MEDIA_SECTIONS . ' as msections',
                            'condition' => 'msections.MediaSectionID = media.MediaSectionID AND MediaSectionAlias="' . ENTITY_TYPE_ITEM . '"'
                        )
                     )
                 )
            );

            /* End Get the details of the item from Items table and associated tables */

            /* check for clipped items */
            $itemDetailArray['isclip'] = 0;
            $itemDetailArray['Icon'] = '';
            $itemIdTocheckFor = $itemDetailArray['ItemID'];
            if ($loggedInUserId != '') {

                

                $CollectionItemArray = $this->fetchData(COLLECTION . ' as coln', array(
                    'coln.UserID' => $loggedInUserId,
                    'coln.StatusID' => 2,
                    'ci.StatusID' => 2
                        ), array('ci.CollectionID', 'ci.CollectionItemID','coln.Icon'), true, array(
                    'join' => array(
                        array(
                            'table_name' => COLLECTION_ITEM . ' as ci',
                            'condition' => "ci.CollectionID = coln.CollectionID AND ci.ItemID = $itemIdTocheckFor"
                        )
                    )
                        )
                );
                
                if (!empty($CollectionItemArray)) {
                    $itemDetailArray['isclip'] = 1;
                    $itemDetailArray['Icon'] = get_icon($CollectionItemArray['Icon']);
                }
                
                if($loggedInUserId==$itemDetailArray['UserID']){
                    $itemDetailArray['isclip'] = 1;
                }
            }

                $CollectionItemArray2 = $this->fetchData(COLLECTION . ' as coln', array(
                    'coln.StatusID' => 2,
                    'ci.StatusID' => 2
                        ), array('ci.CollectionID', 'ci.CollectionItemID','coln.Icon'), true, array(
                    'join' => array(
                        array(
                            'table_name' => COLLECTION_ITEM . ' as ci',
                            'condition' => "ci.CollectionID = coln.CollectionID AND ci.ItemID = $itemIdTocheckFor"
                        )
                    )
                        )
                );
                if (!empty($CollectionItemArray2) && $itemDetailArray['Icon'] == '') {
                    $itemDetailArray['Icon'] = get_icon($CollectionItemArray2['Icon']);
                }


            /* end check for clipped items */

            if(isset($paramArray['incrementView']) && $paramArray['incrementView']){
                /* Update the views */
                $this->incrementNoOfViews($itemDetailArray['ItemID']);
                /* End Update the views */
                $itemDetailArray['NoOfViews'] += 1;
            }
            
            if (!empty($itemDetailArray['FlagID']) && !empty($loggedInUserId)) {
                $flagged = 1;
            } else {
                $flagged = 0;
            }
			
            return array(
                'StockStatus' => $itemDetailArray['StockStatus'],
                'isFlagged'=> $flagged,
                'ItemGuID' => $itemGuID,
                'UserGuID' => $itemDetailArray['UserGUID'],
                'ProfilePicture' => get_full_path('profile_thumb_image', '', $itemDetailArray['ProfilePicture'], $height = '36', $width = '36', $size = '36'),
                'ProfileLink' => get_entity_url($itemDetailArray['UserID'], 'user'),
                'FirstName' => $itemDetailArray['FirstName'],
                'LastName' => $itemDetailArray['LastName'],
                'Title' => $itemDetailArray['Title'],
                'Description' => $itemDetailArray['Description'],
                'DescriptionArray' => str_split($itemDetailArray['Description'], TEXT_PAGINATION_SIZE),
                'Brand' => $itemDetailArray['Brand'],
                'NoOfViews' => $itemDetailArray['NoOfViews'],
			       'PriceFloat' => floatval($itemDetailArray['Price']),
                'Price' => addDollar($itemDetailArray['Price']),
                'ColorID' => $itemDetailArray['ColorID'],
                'Colors' => explode(',', $itemDetailArray['ColorID']),
                'CollectionGuID' => $itemDetailArray['CollectionGuID'],
                'SizeID' => $itemDetailArray['SizeID'],
                'CountryID' => $itemDetailArray['CountryID'],
                'Source' => addhttp($itemDetailArray['Source']),
                'BuyLink' => addhttp($itemDetailArray['BuyLink']),
                'CreatedDate' => $itemDetailArray['CreatedDate'],
                'ModifiedDate' => time_elapsed_string(strtotime($itemDetailArray['ModifiedDate'])),
                'Images' => $imageArray,
                'StyleTags' => $styleTags,
                'NoOfSaves' => $itemDetailArray['NoOfSaves'],
                'NoOfViews' => $itemDetailArray['NoOfViews'],
                'NoOfComments' => $itemDetailArray['NoOfComments'],
                'CategoryName' => $itemDetailArray['CategoryName'],
				'Categories' => $CategoryMix,
				'CategoryLevel' => $itemDetailArray['CategoryLevel'],
                'MaterialID' => $itemDetailArray['MaterialID'],
                'Material' => explode(',',$itemDetailArray['MaterialID']),
                'sizename' => $itemDetailArray['sizename'],
                'colorname' => !empty($itemDetailArray['colorname'])?$itemDetailArray['colorname']:'',
                'countryname' => $itemDetailArray['countryname'],
                'CategoryMasterGuID' => $itemDetailArray['ItemMasterCategoryGuID'],
                'Location' => $itemDetailArray['Location'],
                'isclip' => $itemDetailArray['isclip'],
                'Icon' => !empty($itemDetailArray['Icon'])?$itemDetailArray['Icon']:'',
                'ItemMasterCategoryLevel' => !empty($itemDetailArray['ItemMasterCategoryLevel'])?$itemDetailArray['ItemMasterCategoryLevel']:'',
                'CategoryMasterID' => !empty($itemDetailArray['CategoryMasterID'])?$itemDetailArray['CategoryMasterID']:'',

            );
        }else{
            return array();
        }
    }
    

    /* Search Items on the basis of title, category, Description
    * Brand, color, category (Man, Woman, Both) etc
    * @param Array
    * @return Array
    * @Author Sudhir Parmar
    */
    function getSearchedItems($Data = '', $offset='', $limit=''){
        $this->db->select('itm.ItemID', 'itm.ItemGuID','itm.Title','itm.NoOfSaves','itm.NoOfViews','itm.NoOfComments',
                 'itm.Description', 'itmDtl.Brand', 'itm.Price', 'itmDtl.ColorID',
                 'colItm.CollectionID', 'itmDtl.SizeID', 'itmDtl.CountryID', 'itmDtl.Source', 'itmDtl.BuyLink');
        $this->db->from(ITEM);
        $this->db->join(ITEM_DETAIL.' as itmDtl','itmDtl.ItemID = itmDtl.itemID','left');
        $this->db->join(COLLECTION_ITEM .' as colItm','colItm.ItemID = itm.ItemID','left');
        
        //if title given in the param
        if(!empty($Data['title'])){
            $titileBreaks = explode(' ',$data['title']);
            if(!empty($titileBreaks)){
                foreach($titileBreaks as $key=>$titlePart){
                    if ($key==0){
                        $this->db->like('itm.Title',$titlePart);
                    } else {
                        $this->db->or_like('itm.Title',$titlePart);
                    }
                }
            }
        }//end title if

        //if Description given in the param
        if(!empty($Data['Description'])){
           $this->db->like('itm.Description',$Data['Description']);
        }//end Description if

        //if Brand given in the param
        if(!empty($Data['Brand'])){
           $this->db->like('itmDtl.Brand',$Data['Brand']);
        }//end Brand if

        //if Color given in the param
        if(!empty($Data['Color'])){
           $this->db->join(COLOR.' as clr','clr.ColorId = itmDtl.ColorId','left');
           $this->db->like('clr.Name',$Data['Color']);
        }//end Color if
        
        //if Color given in the param
        if(!empty($Data['Category'])){
           $this->db->join(ITEM_MASTER_CATEGORY . ' as catmaster','catmaster.ItemMasterCategoryID = itmDtl.CategoryMasterID','left');
           $this->db->where('catmaster.Name',$Data['Category']);
        }//end Color if

        if(!empty($Data['excludeID'])){
            $this->db->where_not_in('itm.ItemID',$Data['excludeID']);
        }
        $this->db->group_by('itm.ItemID');
        
        if(!empty($limit)){
            $this->db->limit($limit,$offset);
            $res = $this->db->get();
            if($res->num_rows() > 0){
                return $res->result_array();
            }else{
                return FALSE;
            }   
        }else{
            $res = $this->db->get();
            return $res->num_rows();
        }
    } //End of getSearchedItems method
    
    /*
     * Function Name: fetchItemData
     * Description: get item data
     */
    function fetchItemData($tableName, $whereArray = array(), $selectArray = '*', $fetchRow = false, $paramArray=array()) {

        $this->db->select($selectArray);
        $this->db->from($tableName);
        $this->db->where($whereArray);
        
        if(!empty($paramArray) && isset($paramArray['join'])){
            foreach($paramArray['join'] as $join){
                if(isset( $join['join_type']))
                    $this->db->join($join['table_name'], $join['condition'], $join['join_type']);
                else
                    $this->db->join($join['table_name'], $join['condition']);
            }
        }
        
        if(!empty($paramArray) && isset($paramArray['orderby'])){

            if(is_array($paramArray['orderby'])){
              $this->db->order_by($paramArray['orderby']['column'],$paramArray['orderby']['type']);  
            }else{
              $this->db->order_by($paramArray['orderby']);
            }
           
        }

        if(!empty($paramArray) && isset($paramArray['groupby'])){
             $this->db->group_by($paramArray['groupby']);
        }

        if(!empty($paramArray) && isset($paramArray['Like'])){
          $LikeQ = '';
          //print_r($paramArray['Like']);die;
          foreach($paramArray['Like'] as $key=>$likes){
            //   if($i==0){
            //     $this->db->like($key,$likes,'both');
            //   }else{
            //     $this->db->or_like($key,$likes,'both');
            //   }
            //   $i++;
            // }

            if(is_array($likes)){
              $newLikeWhere='';
              foreach($likes as $newKey=>$newVal){
                if($key=='tgs.Name'){
                    $newLikeWhere .= "(SELECT GROUP_CONCAT(tgs.Name) FROM ".TAGS." as tgs 
                    WHERE itm.ItemID=tgs.EntityTypeID and tgs.EntityType='Item' and StatusID=2)
                    LIKE '%".$newVal."%' AND ";
                } else if($key == 'itmDtl.Brand') {
                    $newLikeWhere .= $key." LIKE '%".$newVal."%' OR ";
                } else {
                    $newLikeWhere .= $key." LIKE '%".$newVal."%' AND ";
                }
              }

              $newLikeWhere = trim($newLikeWhere,' AND ');
              $newLikeWhere = trim($newLikeWhere,' OR ');
              $LikeQ .= '('.$newLikeWhere.') OR ';
            }else{
              $LikeQ .=$key." LIKE '%".$likes."%' OR "; 
            }
          }
          $LikeQ  = trim($LikeQ,' OR ');
          $this->db->where('('.$LikeQ.')',null, FALSE);
        }

        //condition for grouped where clause

        if(!empty($paramArray) && isset($paramArray['groupedWhere'])){
          $i=0;
          $WhereQ = '';
          foreach($paramArray['groupedWhere'] as $key=>$wheres){
            if($i==0){
              $WhereQ = $key.'="'.$wheres.'" ';
            }else{
              $WhereQ .= ' AND '.$key.'="'.$wheres.'" ';
            }
            $i++;
          }
          $this->db->where('('.$WhereQ.')',null, FALSE);
        }

        if ($fetchRow && !is_array($fetchRow))
            $this->db->limit(1);
        elseif(is_array($fetchRow) && isset ($fetchRow['limit']) && trim($fetchRow['limit'])!= '' && isset ($fetchRow['offset']) && trim($fetchRow['offset'])!='')
            $this->db->limit($fetchRow['limit'], $fetchRow['offset']);

        $query = $this->db->get();
        //echo $this->db->last_query();
        
        if(!empty($paramArray) && isset($paramArray['count']) && $paramArray['count']){
            return $query->num_rows();
        }

        if ($query->num_rows() > 0) {
            if ($fetchRow && !is_array($fetchRow))
                return $query->row_array();
            else
                return $query->result_array();
        } else {
            return array();
        }
    }
    /*
     * Function Name: flagItem
     * Description: flag an item
     */
    function flagItem($ItemID, $UserID)
    {
        $FlagData = array(
            'UserID' => $UserID,
            'TypeID' => $ItemID,
            'Type' => 'Item',
            'DateTime' => date("Y-m-d H:i:s"),
            'FlagReason' => 'User Flagged',
            'StatusID' => 0 //0 for flagged and 1 for admin remove flag
        );
        $this->db->insert(FLAG, $FlagData);
        return TRUE;
    }
    
    /**
     * [Process Item Search Data]
     * @param $paramArray,$updateFlag
     * @author Anoop Singh
     */
    function processItemSearchData($paramArray,$updateFlag = false){
        $searchItemData = array();
        
        $itemID = $searchItemData['ItemID'] = $paramArray['ItemID'];
        $searchItemData['UserID'] = $paramArray['UserID'];
        $searchItemData['Title'] = $paramArray['Title'];
        $searchItemData['UserDetail'] = $paramArray['UserDetail'];
        
        if(isset($paramArray['Brand']) && $paramArray['Brand']!=""){
            $searchItemData['Brand'] = $paramArray['Brand'];
        }
        
        if(isset($paramArray['ColorID']) && !empty($paramArray['ColorID']) && $paramArray['ColorID']!=0 ){
            $colorID = $paramArray['ColorID'];
            if (!is_array($colorID)) {
                $colorID = array($colorID);
            }

            $colorRows = $this->db->query(sprintf('SELECT Name FROM %s WHERE ColorID IN (\'%s\')', COLOR_MASTER, implode('\',\'', $colorID)));
            $colorNames = array_column($colorRows->result_array(), 'Name');
            $searchItemData['Color'] = implode(',', $colorNames);
        }

        
        if(isset($paramArray['SizeID']) && !empty($paramArray['SizeID']) && $paramArray['SizeID']!=0 ){
            $SizeID = $paramArray['SizeID'];
            if (!is_array($SizeID)) {
                $SizeID = array($SizeID);
            }

            $sizeRows = $this->db->query(sprintf('SELECT Name FROM %s WHERE SizeID IN (\'%s\')', SIZE_MASTER, implode('\',\'', $SizeID)));
            $sizeNames = array_column($sizeRows->result_array(), 'Name');
            $searchItemData['Size'] = implode(',', $sizeNames);
        }
        
        
        if(isset($paramArray['MaterialID']) && !empty($paramArray['MaterialID']) && $paramArray['MaterialID'] != 0) {
            $MaterialID = $paramArray['MaterialID'];
            if (!is_array($MaterialID)) {
                $MaterialID = array($MaterialID);
            }
            
            $materialRows = $this->db->query(sprintf('SELECT Name FROM %s WHERE MaterialID IN (\'%s\')', MATERIAL_MASTER, implode('\',\'', $MaterialID)));
            $materialNames = array_column($materialRows->result_array(), 'Name');
            $searchItemData['Material'] = implode(',', $materialNames);
        }
        

        if(isset($paramArray['CategoryIds'])){
			$CategoryMasterID=explode(',',$paramArray['CategoryIds']['CategoryMasterID']);
			$CategoryZeroLevelID=explode(',',$paramArray['CategoryIds']['CategoryZeroLevelID']);
			$CategoryFirstLevelID=explode(',',$paramArray['CategoryIds']['CategoryFirstLevelID']);
			$CategorySecondLevelID=explode(',',$paramArray['CategoryIds']['CategorySecondLevelID']);
			$CategoryThirdLevelID=explode(',',$paramArray['CategoryIds']['CategoryThirdLevelID']);
			$CategoryFourthLevelID=explode(',',$paramArray['CategoryIds']['CategoryFourthLevelID']);
			$CategoryLevel=explode(',',$paramArray['CategoryIds']['CategoryLevel']);
			$Category=array();
			//file_put_contents("/var/www/html/uploads/cat.txt",print_r($paramArray['CategoryIds'],true));
			
            $allCategoryIds = array();

            for($i=0;$i<count($CategoryMasterID);$i++){
                
				$level=$CategoryLevel[$i];
				if (isset($CategoryMasterID[$i])) {
					$catIds = array();
					if($level===0){
						$catIds[] = $CategoryZeroLevelID[0];
						array_splice($CategoryZeroLevelID, 0, 1); 
					}
					else if($level===1){
						$catIds[] = $CategoryZeroLevelID[0];
						$catIds[] = $CategoryFirstLevelID[0];
						array_splice($CategoryZeroLevelID, 0, 1); 
						array_splice($CategoryFirstLevelID, 0, 1); 
					}else if($level==2){
						$catIds[] = $CategoryZeroLevelID[0];
						$catIds[] = $CategoryFirstLevelID[0];
						$catIds[] = $CategorySecondLevelID[0];
						array_splice($CategoryZeroLevelID, 0, 1); 
						array_splice($CategoryFirstLevelID, 0, 1); 
						array_splice($CategorySecondLevelID, 0, 1); 
					}else if($level==3){
						$catIds[] = $CategoryZeroLevelID[0];
						$catIds[] = $CategoryFirstLevelID[0];
						$catIds[] = $CategorySecondLevelID[0];
						$catIds[] = $CategoryThirdLevelID[0];
						array_splice($CategoryZeroLevelID, 0, 1); 
						array_splice($CategoryFirstLevelID, 0, 1); 
						array_splice($CategorySecondLevelID, 0, 1); 
						array_splice($CategoryThirdLevelID, 0, 1); 
					}else if($level==4){
						$catIds[] = $CategoryZeroLevelID[0];
						$catIds[] = $CategoryFirstLevelID[0];
						$catIds[] = $CategorySecondLevelID[0];
						$catIds[] = $CategoryThirdLevelID[0];
						$catIds[] = $CategoryFourthLevelID[0];
						array_splice($CategoryZeroLevelID, 0, 1); 
						array_splice($CategoryFirstLevelID, 0, 1); 
						array_splice($CategorySecondLevelID, 0, 1); 
						array_splice($CategoryThirdLevelID, 0, 1); 
						array_splice($CategoryFourthLevelID, 0, 1); 
					}
					/* if($CategoryZeroLevelID[$i]){
						$catIds[] = $CategoryZeroLevelID[$i];
					}
					if($CategoryFirstLevelID[$i]){
						$catIds[] = $CategoryFirstLevelID[$i];
					}
					if($CategorySecondLevelID[$i]){
						$catIds[] = $CategorySecondLevelID[$i];
					} 
					if($CategoryThirdLevelID[$i]){
						$catIds[] = $CategoryThirdLevelID[$i];
					} 
					if($CategoryFourthLevelID[$i]){
						$catIds[] = $CategoryFourthLevelID[$i]; */
					}
					//$catIds[]=$CategoryMasterID[$i];
					$catIdIn = implode(',', $catIds);
                    $allCategoryIds = array_merge($allCategoryIds, $catIds);
					
					if($catIdIn!=''){
						$CatData = $this->fetchData(ITEM_MASTER_CATEGORY, "ItemMasterCategoryID IN ($catIdIn) order by find_in_set(ItemMasterCategoryID,('$catIdIn'))", array('Name'));
					}else{
						$CatData = array();
					}
					
					$tempArray = array();
					foreach ($CatData as $key => $CatArray) {
						$tempArray[] = $CatArray['Name'];
					}
					
					$Category[] = implode(',', $tempArray);
                
				}
			
			 $searchItemData['Category']=implode(';',$Category);
			//file_put_contents("/var/www/html/uploads/cat.txt",print_r($searchItemData['Category'],true));	
			
        }

        if(isset($paramArray['StyleTags']) && !empty($paramArray['StyleTags'])){
            $searchItemData['StyleTags'] = implode(',', $paramArray['StyleTags']);
        }else{
             $searchItemData['StyleTags'] = '';
        }
       
        if(isset($paramArray['Location'])){
            $searchItemData['Location'] = $paramArray['Location'];
        }
        
        if(isset($paramArray['Source']) && $paramArray['Source']!=""){
            $searchItemData['Source'] = $paramArray['Source'];
        }
        
        
        if($updateFlag){
            
            /*to update in article search*/
            $this->processItemForArticleSearch(array('ItemID'=>$itemID,'searchItemData'=>$searchItemData));
            
            
            $this->update(ITEM_SEARCH,$searchItemData,array('ItemID'=>$itemID));
            $this->delete(ITEM_CATEGORY_RELATION, array('ItemID' => $itemID));
            $this->delete(ITEM_COLOR_RELATION, array('ItemID' => $itemID));
            $this->delete(ITEM_SIZE_RELATION, array('ItemID' => $itemID));
            $this->delete(ITEM_MATERIAL_RELATION, array('ItemID' => $itemID));
        }else{
            $this->insertData(ITEM_SEARCH,$searchItemData);
            
        }

        // Insert multivalued properties into relation tables
        if (isset($allCategoryIds) && count($allCategoryIds)) {
            $categoryRelations = array_map(function($id) use($itemID) {
                return array('ItemID' => $itemID, 'ItemMasterCategoryID' => $id);
            }, array_unique($allCategoryIds));
            $this->insertBatch(ITEM_CATEGORY_RELATION, $categoryRelations);
            log_message('debug', 'item_model: category relation query='.$this->db->last_query());
        }
        if (isset($colorID) && count($colorID)) {
            $colorRelations = array_map(function($id) use($itemID) {
                return array('ItemID' => $itemID, 'ColorID' => $id);
            }, $colorID);
            $this->insertBatch(ITEM_COLOR_RELATION, $colorRelations);
            log_message('debug', 'item_model: color relation query='.$this->db->last_query());
        }
        if (isset($SizeID) && count($SizeID)) {
            $sizeRelations = array_map(function($id) use($itemID) {
                return array('ItemID' => $itemID, 'SizeID' => $id);
            }, $SizeID);
            $this->insertBatch(ITEM_SIZE_RELATION, $sizeRelations);
            log_message('debug', 'item_model: size relation query='.$this->db->last_query());
        }
        if (isset($MaterialID) && count($MaterialID)) {
            $materialRelations = array_map(function($id) use($itemID) {
                return array('ItemID' => $itemID, 'MaterialID' => $id);
            }, $MaterialID);
            $this->insertBatch(ITEM_MATERIAL_RELATION, $materialRelations);
            log_message('debug', 'item_model: material relation query='.$this->db->last_query());
        }
    }
    
    /**
     * [Process Item For Article Search]
     * @param $paramArray
     * @author Anoop Singh
     */
    function processItemForArticleSearch($paramArray){
        
        $newDataForUpdate = $this->refineItemData($paramArray['searchItemData']);
        
        $articles = $this->getArticlesAssocWithItem(array('ItemID'=>$paramArray['ItemID']));
        
        foreach ($articles as $article) {
            
            $itemData = $this->fetchData(ARTICLE_SEARCH, array('ArticleID'=>$article['ArticleID']), array('ItemData'), true);
            if(!empty($itemData)){
                $itemsStr = $itemData['ItemData'];
                $artItemsArr = array();
                if($itemsStr!=""){
                    $artItemsArr = explode(';;;,', $itemsStr);
                    foreach ($artItemsArr as $key => $artItemStr) {
                        $artItemArr = explode(',', $artItemStr);
                        if($artItemArr[0]==$paramArray['ItemID']){
                            $artItemsArr[$key] = $newDataForUpdate;
                           
                        }
                        
                    }
                    
                    
                }
                
                $itemsStr = implode(';;;,', $artItemsArr);
                $this->update(ARTICLE_SEARCH,array('ItemData'=>$itemsStr),array('ArticleID'=>$article['ArticleID']));

            }
            
            
        }

    }
    
    
    
    /**
     * [Get Articles Associated with Items]
     * @param $paramArray
     * @author Anoop Singh
     */
    function getArticlesAssocWithItem($paramArray){
        
        $articleJoinArray = array(
	                        'join'=>array(
	                                
	                                //Item as itm on itm.itemID= itg.itemID
	                                array(
	                                    'table_name'=> ITEM .' as itm' ,
	                                    'condition'=> 'itm.itemID= itg.itemID',
	                                    'join_type'=>'left'

	                                ),
	                                //left join Media as md on md.MediaID = itg.MediaID 
	                                array(
	                                    'table_name'=> MEDIA .' as md' ,
	                                    'condition'=> 'md.MediaID = itg.MediaID',
	                                    'join_type'=>'left'

	                                ),
	                                //Left join MediaSections as mds on mds.MediaSectionID = md.MediaSectionID 
	                                array(
	                                    'table_name'=> MEDIA_SECTIONS .' as mds' ,
	                                    'condition'=> 'mds.MediaSectionID = md.MediaSectionID',
	                                    'join_type'=>'left'
	                                ),

	                                array(
	                                    'table_name'=> ARTICLE .' as art' ,
	                                    'condition'=> 'art.ArticleID = md.MediaSectionReferenceID',
	                                    'join_type'=>'left'
	                                ),
	                                array(
	                                    'table_name'=> USERS .' as usr' ,
	                                    'condition'=> 'usr.UserID = art.UserID',
	                                    'join_type'=>'left'

	                                )

	                            ),

	                    );
        
        
        $this->db->select('art.ArticleID');
        $this->db->from(IMAGETAGS .' as itg');
        $this->db->where('itm.ItemID', $paramArray['ItemID']);
        $this->db->where('art.StatusID', 1);
        $this->db->group_by('art.ArticleID');

        foreach($articleJoinArray['join'] as $join){
            if(isset( $join['join_type']))
                $this->db->join($join['table_name'], $join['condition'], $join['join_type']);
            else
                $this->db->join($join['table_name'], $join['condition']);
        }
        $res = $this->db->get();
        return $res->result_array();
        
    }
    
    
    /**
     * [Serialize the item array]
     * @param $paramArray
     * @author Anoop Singh
     */
    function refineItemData($itemDetailArray){
        
        $returnArray = array(
                'ItemID' => $itemDetailArray['ItemID'],
                'Title' => $itemDetailArray['Title']
            );

        if(isset($itemDetailArray['Brand']) && $itemDetailArray['Brand']!=""){
            $returnArray['Brand'] = $itemDetailArray['Brand'];
        }

        if(isset($itemDetailArray['StyleTags']) && $itemDetailArray['StyleTags']!=""){
            $returnArray['StyleTags'] = $itemDetailArray['StyleTags'];
        }

        if(isset($itemDetailArray['Category'])){
            $returnArray['Category'] = $itemDetailArray['Category'];
        }

        if(isset($itemDetailArray['Color'])){
            $returnArray['Color'] = $itemDetailArray['Color'];
        }

        if(isset($itemDetailArray['Location'])){
            $returnArray['Location'] = $itemDetailArray['Location'];
        }
        
        if(isset($itemDetailArray['Source'])){
            $returnArray['Source'] = $itemDetailArray['Source'];
        }
        
        if(isset($itemDetailArray['UserDetail'])){
            $returnArray['UserDetail'] = $itemDetailArray['UserDetail'];
        }


        
        $returnStr = implode(',', $returnArray);
        return $returnStr;
       

        
    }
    
    
    /**
     * [fetch item deatil from full text]
     * @param 
     * @author Anoop Singh
     */
    function fetchItemDataFullTextSearch($tableName, $whereArray = array(), $selectArray = '*', $fetchRow = false, $paramArray=array()) {

        $this->db->select($selectArray);
        $this->db->from($tableName);
        $this->db->where($whereArray);
        
        if(!empty($paramArray) && isset($paramArray['join'])){
            foreach($paramArray['join'] as $join){
                if(isset( $join['join_type']))
                    $this->db->join($join['table_name'], $join['condition'], $join['join_type']);
                else
                    $this->db->join($join['table_name'], $join['condition']);
            }
        }
        
        /*if(!empty($paramArray) && isset($paramArray['orderby'])){

            if(is_array($paramArray['orderby'])){
              $this->db->order_by($paramArray['orderby']['column'],$paramArray['orderby']['type']);  
            }else{
              $this->db->order_by($paramArray['orderby']);
            }
           
        }*/

        if(!empty($paramArray) && isset($paramArray['groupby'])){
             $this->db->group_by($paramArray['groupby']);
        }
        
        if(!empty($paramArray) && isset($paramArray['FullText'])){
            $textArr = explode(' ', trim($paramArray['FullText']));
            $plurals = getCommonWords();

            foreach($plurals as $key=> $val){
                if(in_array(strtolower($key), $textArr) != FALSE){
                    $textArr[] = $val;
                }elseif(in_array(strtolower($val), $textArr) != FALSE){
                    $textArr[] = $key;
                }
            }
            
            $paramArray['FullText'] = implode(' ', $textArr);
            
            
            $paramArray['FullText'] = addslashes($paramArray['FullText']);
            $this->db->where('MATCH (isearch.Title,isearch.UserDetail,isearch.Brand,isearch.Color,isearch.Category,isearch.StyleTags,isearch.Location,isearch.Source,isearch.ArticleData) AGAINST ("'.$paramArray['FullText'].'" IN BOOLEAN MODE)', NULL, FALSE);
        
            $this->db->select('MATCH (isearch.Brand) AGAINST ("'.$paramArray['FullText'].'" IN BOOLEAN MODE) as relevance_1' , false);
            $this->db->select('MATCH (isearch.Title) AGAINST ("'.$paramArray['FullText'].'" IN BOOLEAN MODE) as relevance_2' , false);
            $this->db->select('MATCH (isearch.Category) AGAINST ("'.$paramArray['FullText'].'" IN BOOLEAN MODE) as relevance_3' , false);
            $this->db->select('MATCH (isearch.StyleTags) AGAINST ("'.$paramArray['FullText'].'" IN BOOLEAN MODE) as relevance_4' , false);
            $this->db->select('MATCH (isearch.Location) AGAINST ("'.$paramArray['FullText'].'" IN BOOLEAN MODE) as relevance_5' , false);
            $this->db->select('MATCH (isearch.Source) AGAINST ("'.$paramArray['FullText'].'" IN BOOLEAN MODE) as relevance_6' , false);
            $this->db->select('MATCH (isearch.UserDetail) AGAINST ("'.$paramArray['FullText'].'" IN BOOLEAN MODE) as relevance_7' , false);
            $this->db->select('MATCH (isearch.Color) AGAINST ("'.$paramArray['FullText'].'" IN BOOLEAN MODE) as relevance_8' , false);
            $this->db->select('MATCH (isearch.ArticleData) AGAINST ("'.$paramArray['FullText'].'" IN BOOLEAN MODE) as relevance_9' , false);
            
            $this->db->order_by('(relevance_1 * 9) + (relevance_2 * 8) + (relevance_3 * 7) + (relevance_4 * 6) + (relevance_5 * 5) + (relevance_6 * 4) + (relevance_7 * 3) + (relevance_8 * 2) + (relevance_9)','DESC');
            
        }else{
            $this->db->order_by('itm.CreatedDate','DESC');
        }

        if ($fetchRow && !is_array($fetchRow))
            $this->db->limit(1);
        elseif(is_array($fetchRow) && isset ($fetchRow['limit']) && trim($fetchRow['limit'])!= '' && isset ($fetchRow['offset']) && trim($fetchRow['offset'])!='')
            $this->db->limit($fetchRow['limit'], $fetchRow['offset']);

        $query = $this->db->get();
        log_message('debug', 'search query sql: '.$this->db->last_query());
        
        if(!empty($paramArray) && isset($paramArray['count']) && $paramArray['count']){
            return $query->num_rows();
        }

        if ($query->num_rows() > 0) {
            if ($fetchRow && !is_array($fetchRow))
                return $query->row_array();
            else
                return $query->result_array();
        } else {
            return array();
        }
    }
    
    /**
     * [delete item from item search table and article search table]
     * @param  ItemID
     * @author Anoop Singh
     */
    public function deleteSearchItem($ItemID){
        $this->removeData(ITEM_SEARCH,array('ItemID'=>$ItemID));
        $this->removeItemForArticleSearch($ItemID);
    }
    
    /**
     * [Remove Item From Article Search]
     * @param ItemID
     * @author Anoop Singh
     */
    function removeItemForArticleSearch($ItemID){
        
        $articles = $this->getArticlesAssocWithItem(array('ItemID'=>$ItemID));
        
        foreach ($articles as $article) {
            
            $itemData = $this->fetchData(ARTICLE_SEARCH, array('ArticleID'=>$article['ArticleID']), array('ItemData'), true);
            if(!empty($itemData)){
                $itemsStr = $itemData['ItemData'];
                $artItemsArr = array();
                if($itemsStr!=""){
                    $artItemsArr = explode(';;;,', $itemsStr);
                    foreach ($artItemsArr as $key => $artItemStr) {
                        $artItemArr = explode(',', $artItemStr);
                        if($artItemArr[0]==$ItemID){
                            $artItemsArr[$key] = '';
                           
                        }
                        
                    }
                    
                    
                }
                $artItemsArr = array_values(array_filter($artItemsArr));
                $itemsStr = implode(';;;,', $artItemsArr);
                $this->update(ARTICLE_SEARCH,array('ItemData'=>$itemsStr),array('ArticleID'=>$article['ArticleID']));

            }
            
            
        }

    }
    
    /*
     * Function Name: getItemTemp
     * Description: get item details
     */
    function getItemTemp($paramArray = array()){
                
               
        
        $loggedInUserId = '';
        if(isset($paramArray['LoggedUserId'])){
            $loggedInUserId = $paramArray['LoggedUserId'];
        }
        
        if(isset($paramArray['UserID'])){
            $userId = $paramArray['UserID'];
        }else{
            $userId = '';
        }
        if(isset($paramArray['ItemGuID'])){
            $where = array('item.ItemGuID' => $paramArray['ItemGuID']);
        }else{
            $where = array('item.ItemID' => $paramArray['ItemID']);
        }
        
        if(isset($paramArray['CollectionGuID'])){
             $collectionGuID = $paramArray['CollectionGuID'];
        }else{
            $collectionGuID = '';
        }
        
        $flagCheck = '';
        if (!empty($loggedInUserId)) {
            $flagCheck = ' AND flag.UserID= ' . $loggedInUserId;
        }
        
        /* Get the details of the item from Items table and associated tables */
        $itemDetailArray = $this->fetchData(ITEM . ' as item', $where, array('country.country_name as countryname', 
            'color.Name as colorname', 'sizemaster.Name as sizename', 'catmaster.ItemMasterCategoryLevel', 
            'catmaster.ItemMasterCategoryGuID', 'catmaster.Name as CategoryName', 'item.ItemID', 'item.Title', 
            'item.Description', 'item.Price', 'item.NoOfSaves', 'item.NoOfViews', 'item.NoOfComments', 
            'idetail.CategoryMasterID', 'idetail.CategoryZeroLevelID', 'idetail.CategoryFirstLevelID', 
            'idetail.CategorySecondLevelID', 'idetail.Location', 'idetail.Brand', 'idetail.ColorID', 
            'idetail.SizeID', 'idetail.CountryID', 'idetail.Source', 'idetail.BuyLink', 
            'collection.CollectionGuID', 'users.UserGUID', 'users.FirstName', 'users.LastName', 
            'users.ProfilePicture', 'users.UserID', 'item.CreatedDate', 'item.ModifiedDate',
            'item.itemGuID','flag.FlagID','ul.LoginKeyword as username'), true, array(
            'join' => array(
                array(
                    'table_name' => ITEM_DETAIL . ' as idetail',
                    'condition' => 'idetail.itemID = item.itemID'
                ),
                array(
                    'table_name' => COLLECTION_ITEM . ' as citem',
                    'condition' => 'citem.ItemID = idetail.itemID AND citem.StatusID=2',
                    'join_type' => 'left'
                ),
                array(
                    'table_name' => COLLECTION . ' as collection',
                    'condition' => 'collection.CollectionID = citem.CollectionID AND collection.StatusID=2' . ($collectionGuID != '' ? ' AND collection.CollectionGuID = \'' . $collectionGuID . '\'' : ''),
                    'join_type' => 'left'
                ),
                array(
                    'table_name' => USERS . ' as users',
                    'condition' => 'users.userID = item.userID'
                ),
                array(
                    'table_name' => ITEM_MASTER_CATEGORY . ' as catmaster',
                    'condition' => 'catmaster.ItemMasterCategoryID = idetail.CategoryMasterID',
                    'join_type' => 'left'
                ),
                array(
                    'table_name' => SIZE_MASTER . ' as sizemaster',
                    'condition' => 'sizemaster.SizeID = idetail.SizeID',
                    'join_type' => 'left'
                ),
                array(
                    'table_name' => COLOR_MASTER . ' as color',
                    'condition' => 'color.ColorID = idetail.ColorID',
                    'join_type' => 'left'
                ),
                array(
                    'table_name' => COUNTRYMASTER . ' as country',
                    'condition' => 'country.country_id = idetail.CountryID',
                    'join_type' => 'left'
                ),
                array(
                    'table_name' => FLAG . ' as flag',
                    'condition' => 'flag.TypeID = item.ItemID AND flag.Type="Item"' . $flagCheck,
                    'join_type' => 'left'
                ),
                array(
                    'table_name'=> USERLOGINS .' as ul' ,
                    'condition'=> "ul.UserID = users.UserID AND ul.SourceID = 1",
                    'join_type' => 'left'
                )
            )
        )
        );

//print_r($itemDetailArray);
        if(!empty($itemDetailArray)){
            $itemGuID = $itemDetailArray['itemGuID'];

            //get the extra parameters in ItemDetails table
            if (isset($itemDetailArray['CategoryMasterID'])) {

                //Note: Logic for diff level is seperated for ease of future changes
                if ($itemDetailArray['ItemMasterCategoryLevel'] == 1) {

                    $levelZeroCatData = $this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $itemDetailArray['CategoryZeroLevelID']), array('Name'), true);
                    
                    if(!empty($levelZeroCatData))
                        $itemDetailArray['CategoryZeroLevelName'] = $levelZeroCatData['Name'];
                    else
                        $itemDetailArray['CategoryZeroLevelName'] = '';

                    $itemDetailArray['CategoryName'] = $itemDetailArray['CategoryZeroLevelName'] . ' > ' . $itemDetailArray['CategoryName'];
                } elseif ($itemDetailArray['ItemMasterCategoryLevel'] == 2) {

                    $levelZeroCatData = $this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $itemDetailArray['CategoryZeroLevelID']), array('Name'), true);
                    $itemDetailArray['CategoryZeroLevelName'] = !empty($levelZeroCatData['Name'])?$levelZeroCatData['Name']:'';

                    $itemDetailArray['CategoryName'] = $itemDetailArray['CategoryZeroLevelName'] . ' > ' . $itemDetailArray['CategoryName'];
                }elseif ($itemDetailArray['ItemMasterCategoryLevel'] == 3||$itemDetailArray['ItemMasterCategoryLevel'] == 4) {
					$levelZeroCatData = $this->fetchData(ITEM_MASTER_CATEGORY, array('ItemMasterCategoryID' => $itemDetailArray['CategoryZeroLevelID']), array('Name'), true);
                    $itemDetailArray['CategoryZeroLevelName'] = !empty($levelZeroCatData['Name'])?$levelZeroCatData['Name']:'';

                    $itemDetailArray['CategoryName'] = $itemDetailArray['CategoryZeroLevelName'] . ' > ' . $itemDetailArray['CategoryName'];
				}
            }
            $styleTagsArray = $this->fetchData(TAGS, array('EntityType' => ENTITY_TYPE_ITEM, 'EntityTypeID' => $itemDetailArray['ItemID'], 'StatusID' => 2), array('Name'));
            $styleTags = array();
            foreach ($styleTagsArray as $styleTag) {
                $styleTags[] = $styleTag['Name'];
            }

            $imageArray = $this->fetchData(MEDIA . ' as media', 
                    array('media.MediaSectionReferenceID' => $itemDetailArray['ItemID'], 'media.StatusID' => 1), 
                    array('media.ImageUrl','media.ImageUrl as ImageName'), false, 
                    array('join' => array(
                        array(
                            'table_name' => MEDIA_SECTIONS . ' as msections',
                            'condition' => 'msections.MediaSectionID = media.MediaSectionID AND MediaSectionAlias="' . ENTITY_TYPE_ITEM . '"'
                        )
                     )
                 )
            );

            /* End Get the details of the item from Items table and associated tables */

            /* check for clipped items */
            $itemDetailArray['isclip'] = 0;
            $itemDetailArray['Icon'] = '';
            $itemIdTocheckFor = $itemDetailArray['ItemID'];
            if ($loggedInUserId != '') {

                

                $CollectionItemArray = $this->fetchData(COLLECTION . ' as coln', array(
                    'coln.UserID' => $loggedInUserId,
                    'coln.StatusID' => 2,
                    'ci.StatusID' => 2
                        ), array('ci.CollectionID', 'ci.CollectionItemID','coln.Icon'), true, array(
                    'join' => array(
                        array(
                            'table_name' => COLLECTION_ITEM . ' as ci',
                            'condition' => "ci.CollectionID = coln.CollectionID AND ci.ItemID = $itemIdTocheckFor"
                        )
                    )
                        )
                );
                
                if (!empty($CollectionItemArray)) {
                    $itemDetailArray['isclip'] = 1;
                    $itemDetailArray['Icon'] = get_icon($CollectionItemArray['Icon']);
                }
            }

                $CollectionItemArray2 = $this->fetchData(COLLECTION . ' as coln', array(
                    'coln.StatusID' => 2,
                    'ci.StatusID' => 2
                        ), array('ci.CollectionID', 'ci.CollectionItemID','coln.Icon'), true, array(
                    'join' => array(
                        array(
                            'table_name' => COLLECTION_ITEM . ' as ci',
                            'condition' => "ci.CollectionID = coln.CollectionID AND ci.ItemID = $itemIdTocheckFor"
                        )
                    )
                        )
                );
                if (!empty($CollectionItemArray2) && $itemDetailArray['Icon'] == '') {
                    $itemDetailArray['Icon'] = get_icon($CollectionItemArray2['Icon']);
                }


            /* end check for clipped items */

            if(isset($paramArray['incrementView']) && $paramArray['incrementView']){
                /* Update the views */
                $this->incrementNoOfViews($itemDetailArray['ItemID']);
                /* End Update the views */
                $itemDetailArray['NoOfViews'] += 1;
            }
            
            if (!empty($itemDetailArray['FlagID']) && !empty($loggedInUserId)) {
                $flagged = 1;
            } else {
                $flagged = 0;
            }
            
            return array(
                'isFlagged'=> $flagged,
                'ItemGuID' => $itemGuID,
                'UserGuID' => $itemDetailArray['UserGUID'],
                'ProfilePicture' => get_full_path('profile_thumb_image', '', $itemDetailArray['ProfilePicture'], $height = '36', $width = '36', $size = '36'),
                'ProfileLink' => get_entity_url($itemDetailArray['UserID'], 'user'),
                'FirstName' => $itemDetailArray['FirstName'],
                'LastName' => $itemDetailArray['LastName'],
                'Title' => $itemDetailArray['Title'],
                'Description' => $itemDetailArray['Description'],
                'DescriptionArray' => str_split($itemDetailArray['Description'], TEXT_PAGINATION_SIZE),
                'Brand' => $itemDetailArray['Brand'],
                'Price' => addDollar($itemDetailArray['Price']),
                'ColorID' => $itemDetailArray['ColorID'],
                'CollectionGuID' => $itemDetailArray['CollectionGuID'],
                'SizeID' => $itemDetailArray['SizeID'],
                'CountryID' => $itemDetailArray['CountryID'],
                'Source' => addhttp($itemDetailArray['Source']),
                'BuyLink' => addhttp($itemDetailArray['BuyLink']),
                'CreatedDate' => $itemDetailArray['CreatedDate'],
                'ModifiedDate' => time_elapsed_string(strtotime($itemDetailArray['ModifiedDate'])),
                'Images' => $imageArray,
                'StyleTags' => $styleTags,
                'NoOfSaves' => $itemDetailArray['NoOfSaves'],
                'NoOfViews' => $itemDetailArray['NoOfViews'],
                'NoOfComments' => $itemDetailArray['NoOfComments'],
                'CategoryName' => $itemDetailArray['CategoryName'],
                'sizename' => $itemDetailArray['sizename'],
                'colorname' => !empty($itemDetailArray['colorname'])?$itemDetailArray['colorname']:'',
                'countryname' => $itemDetailArray['countryname'],
                'CategoryMasterGuID' => $itemDetailArray['ItemMasterCategoryGuID'],
                'Location' => $itemDetailArray['Location'],
                'isclip' => $itemDetailArray['isclip'],
                'Icon' => !empty($itemDetailArray['Icon'])?$itemDetailArray['Icon']:'',
                'ItemMasterCategoryLevel' => !empty($itemDetailArray['ItemMasterCategoryLevel'])?$itemDetailArray['ItemMasterCategoryLevel']:'',
                'CategoryMasterID' => !empty($itemDetailArray['CategoryMasterID'])?$itemDetailArray['CategoryMasterID']:'',
                'itemDetailArray' => $itemDetailArray,
                'ItemID' => $itemDetailArray['ItemID'],
                'UserID' => $itemDetailArray['UserID'],
                'username' => $itemDetailArray['username']

            );
        }else{
            return array();
        }
    }
    
    
}
