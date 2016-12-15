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

class Userprofile extends Common_Controller {

    public $page_name = 'userprofile';
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
        if ($this->session->userdata('LoginSessionKey') == '' && !$this->isPublicPage ) {
            redirect('/');
        }
        $this->load->model(array('login_model','friend_model'));
    }

    /*
     * All user registration and sign in process
     * Controller class for sign up and login  user of cnc
     * @package    signup
     * @author     Jay Hardia (jay@viscus.com)
     * @version    1.0
     */

    public function indexold() {
        $this->data['title'] = 'Profile';
        $this->dashboard = 'profile';
        $this->data['content_view'] = 'userProfile/user_wall';
        $this->load->view($this->layout, $this->data);
    }

    /**
     * [index used to check if the url exist then show the respective entity type page]
     */
    public function entityProfile() {
        $profileUrl = $this->uri->segment(1);
        if($profileUrl && $row = $this->login_model->checkProfileUrl($profileUrl)){
          $EntityType = $row['EntityType'];
          $EntityID   = $row['EntityID'];
          $Module     = $this->uri->segment(2);
          $Module     = (!empty($Module)) ? ucfirst($Module) : 'Profile';
          if($EntityType == 'User') { 

            $this->loadUserModule($EntityID, $Module);
          }          
        } else {
            if($this->session->userdata('redirectToCurrent')==""){
                redirect('/');
            }else{
                redirect($this->session->userdata('redirectToCurrent'));
            }
            
          //$this->data['title'] = '404 Page Not Found';        
          //$this->data['content_view'] = '404-page';
          //$this->load->view($this->layout, $this->data);
        }
    }
    /**
     * [loadUserModule description]
     * @param  [type] $UserID [User Id]
     * @param  [type] $Module [Moduel name like, profile, friend, followers]
     */
    public function loadUserModule($UserID, $Module){  
      if (!empty($UserID)) {
        $this->data['title'] = $Module;
        $this->data['Type'] = $Module;
        $this->data['UID'] = $UserID;
        $this->data['UserID'] = $UserID;
        $this->data['EntityID'] = $UserID; 
        if($UserID != $this->session->userdata('UserID')){
            $this->data['wall_url'] = get_entity_url($UserID);

            $resultArray = $this->friend_model->fetchData(USERS, array('UserID' => $UserID), array('UserGuID','StatusID'), true);
            if($resultArray['StatusID']!=2){
               redirect('wall');
            }
            if(!empty($resultArray))
                $this->data['UserGUID'] = $resultArray['UserGuID'];

        }
        switch($Module){
          case 'Friends':
            $this->data['content_view'] = 'users/friend_list'; 
            break;
          case 'Followers':
            $this->data['content_view'] = 'users/followers_list';
            break;
          case 'Following':
            $this->data['content_view'] = 'users/following_list';
            break;    
          default:
            $this->data['IsFriend'] = 1;
            $this->data['WallType'] = '';                     
            if($UserID != $this->session->userdata('UserID')){
              $this->data['WallType'] = 'Friend Wall';
              $this->data['IsFriend'] = $this->friend_model->checkFriendStatus($this->session->userdata('UserID'),$UserID);              
            }
            $this->data['content_view'] = 'userProfile/user_wall_new'; 
            break;                  
        }
        $this->data['titlephone'] = 'Profile';
        $this->load->view($this->layout, $this->data); 
      } else {
        redirect();
      }        
    }
    
    public function index($ActivityGuID = '') {
        $this->data['IsFriend'] = '1';
        $this->data['title'] = 'Profile';
        $this->dashboard = 'profile';
        $this->data['ActivityGuID'] = $ActivityGuID;
        $this->data['UserID'] = $this->session->userdata('UserID');
        $this->data['WallType'] = '';
        $this->data['EntityID'] = $this->session->userdata('UserID');
        $this->data['profile_url'] = get_entity_url($this->data['EntityID']);
        $this->data['content_view'] = 'userProfile/user_wall_new';
        $this->load->view($this->layout, $this->data);
    }

    public function dashboard() {
      $this->dashboard = 'profile';
      $this->data['WallType'] = '';
      $this->data['title'] = 'Profile';
      $this->data['UserID'] = $this->session->userdata('UserID');
      $this->data['EntityID'] = $this->session->userdata('UserID');
      $this->data['AllActivity'] = '1';          
      $this->data['content_view'] = 'userProfile/user_wall_new';
      $this->load->view($this->layout, $this->data);
    }

    public function myzone() {
        $this->session->set_userdata('CurrentSection', 'myzone');
        /* $this->dashboard = 'myzone';
          $header = array('title' => 'Vcommonsocial - Dashboard');
          $this->load->view('include/header', $header);
          $this->load->view('userProfile/user_wall');
          $this->load->view('include/footer'); */

        $this->data['title'] = 'Dashboard';
        $this->dashboard = 'myzone';
        $this->data['content_view'] = 'userProfile/user_wall';
        $this->load->view($this->layout, $this->data);
    }

    public function profile($UserID) {
        $this->dashboard = 'profile';
        /*$UserID = $this->login_model->GetUserIDFromProfileName($ProfileName);
        if($UserID==''){
          $UserID = $this->login_model->GetUserIDFromGuID($ProfileName);
        }*/
        if (!empty($UserID)) {
          $this->data['WallType'] = 'Friend Wall';
          $IsFriend = $this->friend_model->checkFriendStatus($this->session->userdata('UserID'),$UserID);
          if($UserID == $this->session->userdata('UserID')){
            $IsFriend = 1;
            $this->data['WallType'] = '';
          } else {
            $this->data['wall_url'] = get_entity_url($UserID);
          }

            $this->data['IsFriend'] = $IsFriend;
            $this->data['title'] = 'Profile';
            $this->data['UserID'] = $UserID;
            $this->data['EntityID'] = $UserID;            
            $this->data['content_view'] = 'userProfile/user_wall_new';
            $this->load->view($this->layout, $this->data);
        } else {
            redirect("dashboard");
        }
    }   
    

}
