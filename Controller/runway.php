<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
/*
 * All User related views rendering functions
 * @package    runway
 * @author     Sudhir Parmar
 * @version    1.0
 */

class Runway extends MY_Controller {

    public $page_name = "";

    public function __construct() {
        parent::__construct();
        $this->base_controller = get_class($this);
    }


     /**
     * Function for show Runway Config Listing page in admin section
     * Parameters : 
     * Return : Load View files
     */
    public function index() {
       $this->tab_settings();
    }
    /**
     * Function for show Runway Config Listing page in admin section
     * Parameters : 
     * Return : Load View files
     */
    public function tab_settings() {
        if ($this->session->userdata('AdminLoginSessionKey') == '')
            redirect('admin');

        $data = array();
        $data['global_settings'] = $this->config->item("global_settings");

        /* Call helper function for intilize CKEditor for comunicate popup */
        $path = base_url('assets/admin/js') . '/ckfinder';
        editor($path);

        /* View File */
        $data['content_view'] = 'admin/runway/runway_config';
        $this->page_name = "runway_config";

        $this->load->view($this->layout, $data);
    }
}

//End of file runway.php