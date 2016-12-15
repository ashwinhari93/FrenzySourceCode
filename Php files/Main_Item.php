<?php
class Main_Item extends Common_API_Controller {


    function __construct() {
        parent::__construct();
        $this->load->model(array('login_model', 'item_model', 'settings_model'));

        if ($this->settings_model->isDisabled(16)) {
            $Return['Message'] = 'The resource that is being accessed is blocked';
            $Return['Data'] = array();
            $Return['ResponseCode'] = 508;
            $Return['ServiceName'] = $this->uri->uri_string();
            $this->response($Return);
        }

        $logged_user_data = $this->login_model->activeLoginAuth($this->post_data);
        $method = $this->router->method;
        $this->UserID = '';
         

        if ($logged_user_data['ResponseCode'] != 200 && $method!='mostPopular' && $method!='lowerPrices' && $method!='sameBrand' && $method!='sameColorCategory' && $method!='viewItem' && $method!='viewItemWithIncrement' && $method!='clipedItemUsers'&& $method!='searchItem'&& $method!='searchItemNew' && $method!='viewItems') {
            $this->response($logged_user_data);
            
        }elseif($logged_user_data['ResponseCode'] == 200){
            $this->UserID = $logged_user_data['Data']['UserID'];
        }

    }

}

?>