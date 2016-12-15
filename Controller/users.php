<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');
/*
 * All User related views rendering functions
 * @package    Users
 * @author     Ashwin kumar soni : 01-10-2014
 * @version    1.0
 */

class Users extends MY_Controller {

    public $page_name = "";

    public function __construct() {
        parent::__construct();
        $this->base_controller = get_class($this);
        $this->load->model('admin/users_model');
    }

    /**
     * Function for show Users Listing page in admin section
     * Parameters : 
     * Return : Load View files
     */
    public function index() {
        if ($this->session->userdata('AdminLoginSessionKey') == '')
            redirect('admin');

        $data = array();
        $data['global_settings'] = $this->config->item("global_settings");

        /* Call helper function for intilize CKEditor for comunicate popup */
        $path = base_url('assets/admin/js') . '/ckfinder';
        editor($path);

        /* View File */
        $data['content_view'] = 'admin/users/users';
        $this->page_name = "users";

        $this->load->view($this->layout, $data);
    }

    /**
     * Function for set session for selected date 
     * from Top Right Corner filter in admin
     * Parameters : Post_data
     * Return : Status, StartDate, EndDate
     */
    public function set_session() {
        $global_settings = $this->config->item("global_settings");

        if ($this->input->is_ajax_request()) {
            if ($this->input->post()) {
                $JSONInput = $this->post();
            } else {
                $Handle = fopen('php://input', 'r');
                $JSONInput = fgets($Handle);
            }
            $this->post_data = @json_decode($JSONInput, true);

            $dateFilter = $this->post_data['filter']['DateFilter'];
            $startDate = '';
            $endDate = '';

            /* Different Cases */
            switch ($dateFilter) {
                case 'today':
                    $startDate = date($global_settings['date_format'], strtotime('today'));
                    $endDate = date($global_settings['date_format'], strtotime('today'));
                    break;

                case 'yesterday':
                    $startDate = date($global_settings['date_format'], strtotime('-1 days'));
                    $endDate = date($global_settings['date_format'], strtotime('today'));
                    break;

                case 'tomorrow':
                    $startDate = date($global_settings['date_format'], strtotime('today'));
                    $endDate = date($global_settings['date_format'], strtotime('tomorrow'));
                    break;

                case 'thisweek':
                    $startDate = date($global_settings['date_format'], strtotime('previous monday'));
                    $endDate = date($global_settings['date_format'], strtotime('today'));
                    break;

                case 'thismonth':
                    $startDate = date($global_settings['date_format'], strtotime(date('m') . '/01/' . date('Y')));
                    $endDate = date($global_settings['date_format'], strtotime('today'));
                    break;

                case 'threemonths':
                    $startDate = date($global_settings['date_format'], strtotime('-3 months'));
                    $endDate = date($global_settings['date_format'], strtotime('today'));
                    break;

                case 'thisyear':
                    $startDate = date($global_settings['date_format'], strtotime('01/01/' . date('Y')));
                    $endDate = date($global_settings['date_format'], strtotime('today'));
                    break;

                case 'custom':
                    $startDate = $this->post_data['filter']['startDate'];
                    $endDate = $this->post_data['filter']['endDate'];
                    break;
                
                case 'all':
                    $startDate = date($global_settings['date_format'], strtotime('12/01/2014'));
                    $endDate = date($global_settings['date_format'], strtotime('today'));
                    break;

                default;
            }

            if ($this->session->userdata('startDate')) {
                /* Remove already make session */
                $this->session->unset_userdata('startDate');
                $this->session->unset_userdata('endDate');

                /* Now set session for particular Date filter */
                $this->session->set_userdata('startDate', $startDate);
                $this->session->set_userdata('endDate', $endDate);
            } else {
                /* Now set new session for particular Date filter */
                $this->session->set_userdata('startDate', $startDate);
                $this->session->set_userdata('endDate', $endDate);
            }

            $retrun = array('status' => 1, 'startDate' => $startDate, 'endDate' => $endDate);
            $retrun = json_encode($retrun);
            echo $retrun;
        }
    }

    /**
     * Function for show user_profile in admin
     * Parameters : user_guid : Get from URL query string
     * Return : Load User profile view files
     */
    public function user_profile() {
        if ($this->session->userdata('AdminLoginSessionKey') == '') {
            redirect('admin');
        } elseif ($this->uri->segment(4) == '') {
            redirect('admin');
        }

        $data = array();
        $data['user_guid'] = $this->uri->segment(4);
        /* Get user_id using UserGUID and then use it further */
        $user_data = $this->users_model->single_profile_info($data['user_guid']);
        if (empty($user_data))
            redirect('admin');

        /* Assign values to $data */
        $data['user_id'] = $user_data['UserID'];
        $data['user_status'] = $user_data['StatusID']; //$this->input->get('UserStatus');
        $data['userroleid'] = $user_data['RoleID'];
        $data['global_settings'] = $this->config->item("global_settings");
        $data['usertypeid'] = $user_data['UserTypeID'];

        /* Call helper function for intilize CKEditor for comunicate popup */
        $path = base_url('assets/admin/js') . '/ckfinder';
        editor($path);

        /* View File */
        $data['content_view'] = 'admin/users/user_profile';
        $this->page_name = "user_profile";

        $this->load->view($this->layout, $data);
    }

    /**
     * Function for Load change password view 
     * Parameters : AdminLoginSessionKey :Get from session
     * Return : Load Admin change password view files
     */
    public function change_password() {
        if ($this->session->userdata('AdminLoginSessionKey') == '')
            redirect('admin');

        $data = array();
        $data['global_settings'] = $this->config->item("global_settings");

        /* View File */
        $data['content_view'] = 'admin/users/change_password';

        $this->load->view($this->layout, $data);
    }

    /**
     * Function for download a csv file when download button pressed
     * Parameters : last_query, hdnFileName : Get from session
     * Return : Download a csv file
     */
    public function download_csv() {
        $file_name = str_replace(' ', '', $this->input->post('hdnFileName'));

        $results = $this->users_model->download_csv();

        /* Download CSV Header */
        header("Pragma: public");
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Cache-Control: private", false);
        header("Content-Type: application/octet-stream");
        header("Content-Disposition: attachment; filename=\"$file_name.csv\";");
        header("Content-Transfer-Encoding: binary");

        /* Download CSV */
        echo($results);
    }

    /**
     * Function for show most active users list
     * Parameters : 
     * Return : Load View files
     */
    public function most_active_users() {
        if ($this->session->userdata('AdminLoginSessionKey') == '')
            redirect('admin');

        $data = array();
        $data['global_settings'] = $this->config->item("global_settings");

        /* Call helper function for intilize CKEditor for comunicate popup */
        $path = base_url('assets/admin/js') . '/ckfinder';
        editor($path);

        /* View File */
        $data['content_view'] = 'admin/users/most_active_users';
        $this->page_name = "most_active_user";

        $this->load->view($this->layout, $data);
    }
}

//End of file users.php