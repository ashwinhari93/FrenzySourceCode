<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
/*
 * All user registration and sign in process
 * Controller class for sign up and login  user of cnc
 * @package    signup
 * @author     Jay Hardia (jay@viscus.com)
 * @version    1.0
 */

class Article extends Common_Controller {

    public $page_name = 'article';
    public $access_token = '';
    public $dashboard = '';

    /*
     * All user registration and sign in process
     * Controller class for sign up and login  user of cnc
     * @package    signup
     * @author     Jay Hardia (jay@viscus.com)
     * @version    1.0
     */

    public function __construct() {
        parent::__construct();
        if ($this->session->userdata('LoginSessionKey') != '') {
            $this->access_token = $this->session->userdata('LoginSessionKey');
        } elseif(!$this->isPublicPage) {
            redirect('/');
        }
    }

    /*
     * All user registration and sign in process
     * Controller class for sign up and login  user of cnc
     * @package    signup
     * @author     Jay Hardia (jay@viscus.com)
     * @version    1.0
     */

    public function index() {
        
        //$this->article();
         $this->runway();/*runway as default page*/
        
    }

    public function article() {
        /* $header=array('title'=>'Vcommonsocial - Article');
          $this->load->view('include/header',$header);
          $this->load->view('article/articles');
          $this->load->view('include/footer'); */

        $this->data['title'] = 'Article';
        $this->data['titlephone'] = 'Article';
        $this->page_name = 'article';
        $this->dashboard = '';
        $this->data['content_view'] = 'article/articles';
        $this->load->view($this->layout, $this->data);
    }

    public function article_detail($articleName, $ArticleGuID) {
        /* $header=array('title'=>'Vcommonsocial - Article Detail');
          $data['articleid'] = $articleid ;
          $this->load->view('include/header',$header);
          $this->load->view('article/article_detail',$data);
          $this->load->view('include/footer'); */
        /*temp code remove after merge with mvp6 branch and use model to get fns*/
        $this->load->model('article_model');
        $articleDetailArray['ArticleID'] = $this->article_model->getArticleId($ArticleGuID);
        //$ArticleDetails = $this->article_model->getArticleDetails(array('ArticleID' => $ArticleID));
        
        
        
        $imageArray = $this->article_model->fetchData(MEDIA.' as media',
                           array('media.MediaSectionReferenceID' => $articleDetailArray['ArticleID'], 'media.StatusID'=>2),
                           array('media.ImageUrl','media.MediaID'),
                           false,
                           array(
                               'join'=>array(
                                   array(
                                       'table_name'=>MEDIA_SECTIONS .' as msections' ,
                                       'condition'=> 'msections.MediaSectionID = media.MediaSectionID AND MediaSectionAlias="'.ENTITY_TYPE_ARTICLE.'"'
                                   )
                               )
                           )
                       );

        
       
        $articleData = $this->article_model->fetchData(ARTICLE,
                    array('ArticleGuID' => $ArticleGuID, 'StatusID' => 1),
                    array('Title','ArticleGuID'),
                    true
                );
        //print_r($articleData);
        if(count($articleData)<=0) {
            redirect(base_url());
        }
        
         /*end temp code remove after merge with mvp6 branch and use model to get fns*/
        
        $this->data['firstImage'] = !empty($imageArray[0]['ImageUrl']) ? $imageArray[0]['ImageUrl'] :'';
        $this->data['articleURL'] = getArticleUrl($articleData);
        $this->session->set_userdata('redirectToCurrent', current_url());
        $this->data['title'] = ucwords($articleData['Title']);
        $this->data['titlephone'] = 'Article';
        $this->data['articleGuID'] = $ArticleGuID;
        $this->page_name = 'articledetail';
        $this->dashboard = '';
        $this->data['content_view'] = 'article/article_detail';
        $this->load->view($this->layout, $this->data);
    }

    public function create_article($articleid) {
        /* $header=array('title'=>'Vcommonsocial - Create Article');
          $data['articleid'] = $articleid ;
          $this->load->view('include/header',$header);
          $this->load->view('article/create_article',$data);
          $this->load->view('include/footer'); */

        $this->data['title'] = 'Create Article';
        $this->data['articleid'] = $articleid;
        $this->page_name = 'article';
        $this->dashboard = '';
        $this->data['content_view'] = 'article/create_article';
        $this->load->view($this->layout, $this->data);
    }

    public function edit_article($articleid) {
        /* $header=array('title'=>'Vcommonsocial - Update Article');
          $data['articleid'] = $articleid ;
          $this->load->view('include/header',$header);
          $this->load->view('article/edit_article',$data);
          $this->load->view('include/footer'); */

        $this->data['title'] = 'Update Article';
        $this->data['articleid'] = $articleid;
        $this->page_name = 'article';
        $this->dashboard = '';
        $this->data['content_view'] = 'article/edit_article';
        $this->load->view($this->layout, $this->data);
    }

    public function runway(){
        /* Get fetured articl data Start */
        $this->load->model('article_model');
        $this->data['featuredData'] = $this->article_model->getFeaturedArticles();
        /* Get fetured articl data End */
        
 
        $this->data['title'] = 'Runway';
        $this->data['titlephone'] = 'Runway';
        $this->data['page_name'] = 'runway';
        $this->page_name = 'runway';
        $this->dashboard = '';
        $this->data['content_view'] = 'article/article_runway';
        $this->load->view($this->layout, $this->data);
    }

    /*Search page for article
     * @param post array
     * @return 
     * @author Sudhir Parmar
     */
    public function search_article(){
        $this->data['title'] = 'Search Article';
        $this->page_name = 'articledetail';
        $this->dashboard = '';
        $this->data['content_view']  = 'search/search_article';
        $this->data['SearchSection'] = 'searcharticle';
        $this->data['SearchText']    = $this->input->post('SearchText');
        $this->data['content_view']  = 'search/search_article';
        $this->load->view($this->data['content_view'], $this->data);
    }

    public function search_item(){
        $this->data['title'] = 'Search Item';
        $this->page_name = 'articledetail';
        $this->dashboard = '';
        $this->data['SearchSection'] = 'clothings';
        $this->data['SearchText']    = $this->input->post('SearchText');
        $this->data['content_view']  = 'search/search_item';        
        $this->load->view($this->data['content_view'], $this->data);
    }

    public function search_user(){
        $this->data['title'] = 'Feshion Web';
        $this->page_name = 'articledetail';
        $this->dashboard = '';
        $this->data['SearchSection'] = 'fashionweb';
        $this->data['SearchText']    = $this->input->post('SearchText');
        $this->data['content_view']  = 'search/search_fashionweb';        
        $this->load->view($this->data['content_view'], $this->data);
    }

    public function search($param=''){
        $this->data['title'] = 'Search Article';
        $this->data['titlephone'] = 'Search';
        $this->page_name = 'searcharticlepage';
        $this->dashboard = '';
        $this->data['SearchText']  = $this->input->post('SearchText');
        $SearchSection = '';
        if($this->input->post()){
          $SearchSection = $this->input->post('SearchSection');  
        }
        $this->data['SearchSection'] = $SearchSection;
        if($param != '')
            $this->data['SearchSection'] = $param;
            


        /*
          if($SearchSection == 'searcharticle'){
          $this->data['content_view']  = 'search/search_article';
        } else if($SearchSection == 'clothings') {
          $this->data['content_view']  = 'search/search_item';  
        } else if($SearchSection == 'fashionweb') {
          $this->data['content_view']  = 'search/search_user';
        } else {
        */



        $this->data['content_view']  = 'search/search';
        $this->load->view($this->layout, $this->data);
    }
    
    /* page for stylemap
     * @param post array
     * @return 
     * @author Anoop Singh
     */
    public function stylemap(){
        /* Get fetured articl data Start*/
        $this->load->model('article_model');
        $this->data['featuredData'] = $this->article_model->getFeaturedArticles();
        /* Get fetured articl data End */
        
        $this->data['title'] = 'Style Map';
        $this->data['titlephone'] = 'Style Map';
        $this->page_name = 'stylemap';
        $this->dashboard = '';
        $this->data['content_view']  = 'article/article_stylemap'; //for comming Soon
        //$this->data['content_view']  = 'article/article_stylemap2';
        $this->load->view($this->layout, $this->data);
    }

    /* Notification
     * @param 
     * @return 
     * @author Sudhir Parmar
     */
    public function alerts(){
        $this->data['title'] = 'Alerts';
        $this->data['titlephone'] = 'Alerts';
        $this->data['page_name'] = 'alerts';
        $this->page_name = 'alerts';
        $this->dashboard = '';
        $this->data['content_view']  = 'alerts/alerts';
        $this->load->view($this->layout, $this->data);
    }
}
