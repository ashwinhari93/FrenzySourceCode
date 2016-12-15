$(function () {
    getLocationOnStylemap();
});
var finalLocations = new Array();
var mapzindex = 0;
var isLocationEnabled = false;
$(window).on('load',function(){
    setTimeout(function(){ 
        var location = getUrlParameter('location');
        console.log
        if(!isLocationEnabled && (typeof location == 'undefined' || location == '')) {
        
            $('#locationsOnStylemap').val('The World');
            $('#latestInText').html('Latest in The World');
            $('#selectLocationManual input').val('The World');
            finalLocations = new Array();
            finalLocations[0] = ['The World'];
            processManualLocationDetail();
        }
    }, 500);
});
    /*google map logic*/
    /*
     * Function Name: initialize
     * Description: Google Map initialization code
     */
    function initialize(articleData) {
        
        var latitudeCenter = parseFloat($("#latitudeOnStylemap").val());
        var longitudeCenter = parseFloat($("#longitudeOnStylemap").val());
 



        var mapOptions = {
            center: {lat: latitudeCenter, lng: longitudeCenter},
            zoom: 13,
            minZoom: 3,
            panControl: false,
            zoomControl: false,
            scaleControl: false,
            mapTypeControl: false

        };
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        

        var customMarker = {
            path: 'M 3 45 C 3 21.8037 21.8037 3 45 3 C 68.1963 3 87 21.8037 87 45 C 87 68.1963 68.1963 87 45 87 C 21.8037 87 3 68.1963 3 45 ZM 0 44.7797 C 0 67.2702 16.6635 85.8887 38.3737 89.078 L 45.0118 99 L 51.6544 89.0724 C 73.3518 85.8719 90 67.2612 90 44.7797 C 90 20.0483 69.8531 0 45 0 C 20.147 0 0 20.0483 0 44.7797 Z',
            //path: site_url + "assets/img/stylemap-shadow-img.png",
            scale: 1,
            strokeColor: '#ffffff',
            fillColor: '#ffffff',
            fillOpacity: 1,
            strokeWeight: 11,
            anchor: new google.maps.Point(45, 101)
        };
        
        var infowindow = new google.maps.InfoWindow({ maxWidth: 280 });
        
        if(typeof articleData != 'undefined' && typeof articleData.Data != 'undefined' && articleData.Data.length > 0){
            mapzindex = articleData.Data.length * 2;
            //var myLatlng = new google.maps.LatLng(parseFloat(articleData.Data[0].Latitude), parseFloat(articleData.Data[0].Latitude));
            var latitudeCenter = parseFloat(articleData.Data[0].Latitude);
            var longitudeCenter = parseFloat(articleData.Data[0].Longitude);
            
            map.setCenter({lat: latitudeCenter, lng: longitudeCenter}); 
            
            articleData.Data.forEach(function(article) {
                
                if(article.Latitude != null && article.Longitude != null){
                    
                    /*info window*/
                    var iconSaveClass= 'icon-save';
                    var saveSaved = '<a onclick="saveArticleFromMap('+"'"+article.ArticleGuID+"'"+')" class="save-block save-stylemap" href="javascript:void(0)" ><i class="icon-add-small"></i><span>Save</span></a>'
                    
                    if(article.saveArticle == 1){
                        iconSaveClass = 'icon-right';
                        saveSaved = '<a class="save-block save-stylemap" href="javascript:void(0)"><i class="icon-check"></i><span> Saved</span></a>'
                    }
                    
                    var contentString = '<section class="open-box-map-info-window c-store girl-info-2">' +
                       '<div class="user-box-top">' +
                       '<figure><a href="'+article.ProfileLink+'" target="_blank"><img alt="" src="' + article.ProfilePicture + '" title="'+article.FirstName+' '+article.LastName+'"></a></figure>' +
                       '<a class="heading-top" href="'+article.Source+'" target="_blank">Via  <i class="icon-link-white"></i>   '+article.Source+'</a> </div>' +
                       '<section class="box-wrap"> <a class="mapInfoWindowAnchor" href="'+article.URL+'" target="_blank"><span class="mar10btm">'+article.Title+'</span></a> '+saveSaved+' </section>' +
                       '<table class="bottom-table">' +
                       '<tbody><tr>' +
                       '<td><a href="javascript:void(0)" onclick="getSavedArticleUsersFromMap('+"'"+article.ArticleGuID+"'"+",'"+article.NoOfSaves+"'"+')"><i class="'+iconSaveClass+'"></i><span>'+article.NoOfSaves+'</span></a></td>' +
                       '<td><span><i class="icon-comment cursor-default"></i><span>'+article.NoOfComments+'</span></span></td>' +
                       '<td><span><i class="icon-eye-blk cursor-default"></i><span>'+article.NoOfViews+'</span></span></td>'
                       '</tr>' +
                       '</tbody></table>' +
                       '</section>';

                    /*info window*/
                
                    var myPos = new google.maps.LatLng(parseFloat(article.Latitude), parseFloat(article.Longitude));
                    
                    var articlePicUrl;
                    if (article.Images[0].Size > 0) {
                        var pngImage = article.Images[0].ImageName.beforeLastIndex('.')+'.png';
                        articlePicUrl = image_server_path + 'uploads/article/circle/' + pngImage;
                    } else {
                        articlePicUrl = article.Images[0].ImageUrl;
                    }
                    
                    
                    var ArticlePic = {
                        url: articlePicUrl,
                        anchor: new google.maps.Point(57, 100),
                        scaledSize: new google.maps.Size(85, 85, 'px', 'px')
                    };
                    //var mapzindex = 0;
                    //console.log(ArticlePic);
                    var myMarker = new google.maps.Marker({position: myPos, map: map, icon: site_url + "assets/img/stylemap-shadow-img.png", zIndex: mapzindex - 1});
                    var myMarker3 = new google.maps.Marker({position: myPos, map: map, icon: site_url + "assets/img/stylemap-shadow-img-t.png", zIndex: mapzindex});
                    var myMarker2 = new google.maps.Marker({position: myPos, map: map, icon: ArticlePic, zIndex: mapzindex - 1});
                    mapzindex = mapzindex - 2;

                    //console.log(article.Title + ' '+mapzindex);
                    
                    google.maps.event.addListener(myMarker, 'click', function () {
                        infowindow.setContent(contentString);       
                        infowindow.open(map, myMarker);
                        $('.gm-style-iw').parent().parent().css({left: '-15px'});
                        $('.gm-style-iw').parent('div').children().first().children().first().css({'z-index': '1', 'border-top-color':'#ffffff','margin-top':'-1px'});
   
                    });
                    google.maps.event.addListener(myMarker2, 'click', function () {
                        infowindow.setContent(contentString);       
                        infowindow.open(map, myMarker);
                        $('.gm-style-iw').parent().parent().css({left: '-15px'});
                         $('.gm-style-iw').parent('div').children().first().children().first().css({'z-index': '1', 'border-top-color':'#ffffff','margin-top':'-1px'});
                    });
                    google.maps.event.addListener(myMarker3, 'click', function () {
                        infowindow.setContent(contentString);       
                        infowindow.open(map, myMarker);
                        $('.gm-style-iw').parent().parent().css({left: '-15px'});
                         $('.gm-style-iw').parent('div').children().first().children().first().css({'z-index': '1', 'border-top-color':'#ffffff','margin-top':'-1px'});
                    });
                }
            });
            
            
        }

    }
    //google.maps.event.addDomListener(window, 'load', initialize);

    /*end google map logic*/



    /*
     * Function Name: getLocationOnStylemap
     * Description: logic to handle location given by user
     */
    function getLocationOnStylemap() {
        var location = getUrlParameter('location');
        
        
        if(typeof location == 'undefined' || location == ''){
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPositionOnStylemap, handle_errors);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            } 
        }else{
            $('#locationsOnStylemap').val(location);
            $('#latestInText').html('Latest in '+location);
            $('#selectLocationManual input').val(location);
            processManualLocationDetail();
        }
    }
    
    /*
     * Function Name: getLocationOnStylemap2
     * Description: logic to handle location given by near me button
     */
    function getLocationOnStylemap2() {
        var location = getUrlParameter('location');
        
        
        if(typeof location == 'undefined'){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPositionOnStylemap, handle_errors);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            } 
        }else{
            $('#locationsOnStylemap').val(location);
            $('#latestInText').html('Latest in '+location);
            $('#selectLocationManual input').val(location);
            processManualLocationDetail();
        }
    }

    /*
     * Function Name: getPreSelectedLocation
     * Description: set some basicc view varibles and then hit the DB to get articles as per location
     */
    function getPreSelectedLocation(location) {
        $('#locationsOnStylemap').val(location);
        $('#latestInText').html('Latest in '+location);
        if(location == 'The World') {
            $('#selectLocationManual input').val('The World');
            finalLocations = new Array();
            finalLocations[0] = ['The World'];
            isLocationEnabled = false;
        }
        else
            $('#selectLocationManual input').val(location);
            
        processManualLocationDetail();
    }

    /*
     * Function Name: handle_errors
     * Description: handle browser shared location errors if any
     */
    function handle_errors(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED: //alert("The Location tracking services of this device has been turned off. Please turn it on going into the settings.");
                break;
            case error.POSITION_UNAVAILABLE: //alert("could not detect current position");
                break;
            case error.TIMEOUT: //alert("retrieving position timed out");
                break;
            default: //alert("unknown error");
                break;
        }
    }

    /*
     * Function Name: showPositionOnStylemap
     * Description: hit the API to get the final article list
     */
    function showPositionOnStylemap(position) {
        isLocationEnabled = true;
        $("#latitudeOnStylemap").val(position.coords.latitude);
        $("#longitudeOnStylemap").val(position.coords.longitude);

        $.ajax({
            url: site_url + 'api/common/getLocation',
            type: 'post',
            data: "latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude,
            dataType: 'json',
            success: function (result) {
                $('#locationsOnStylemap').val(result.Data);
                $('#latestInText').html('Latest in '+result.Data);
                $('#selectLocationManual input').val(result.Data);
                finalLocations = result.locations;
                getArticleForStylemap(true,true);
            }
        });
    }
    
    String.prototype.beforeLastIndex = function (delimiter) {
        return this.substr(0,this.lastIndexOf(delimiter)) || this + ""
    }
    

    $("#near-me").click(function () {
        getLocationOnStylemap2();

    });

    $("#selectLocationManual input").geocomplete().bind("geocode:result", function(event, result){
        processManualLocationDetail();
    });

    /*$("#selectLocationManual input").on('blur', function () {

        setTimeout(function () {
            processManualLocationDetail();
        }, 700);

    });*/
    
    /*
     * Function Name: processManualLocationDetail
     * Description: get lat long detail for exact location search
     */
    function processManualLocationDetail(){
        var newLocation = $("#selectLocationManual input").val();
        if(newLocation != '' && newLocation != 'The World') {
            $.ajax({
                url: site_url + 'api/common/getLatLngDetail',
                type: 'post',
                data: "location="+newLocation,
                dataType: 'json',
                success: function (result) {
                    $('#locationsOnStylemap').val(result.Data.location);
                    $("#latitudeOnStylemap").val(result.Data.lat);
                    $("#longitudeOnStylemap").val(result.Data.lng);
                    finalLocations = result.Data.locations;

                    $('#latestInText').html('Latest in '+result.Data.location);


                    getArticleForStylemap(true,true);
                }
            }); 
        } else {
            //finalLocations[0] = newLocation;
            getArticleForStylemap(true,true);
        }
    }
    

    
    /*
     * Function Name: getArticleForStylemap
     * Description: function that gets the final article result
     */
    function getArticleForStylemap(updateGridFlag, updateMapFlag){
        //console.log('get articles');
        $('#searchAddress span').html($('#locationsOnStylemap').val());
        $('.locationdropdown').hide();
        $('#imageDetail').slideUp('fast');            
        $('.expander-grid > li').removeClass('active');
        $('.expander-grid > li').removeAttr('style');
        $('.gm-style').hide();

        
        //var reqData = {Locations:$('#locationsOnStylemap').val(),SearchPage:1,RecentAdded: 1,LoginSessionKey:$('#LoginSessionKey').val()}
        var reqData = {Locations:finalLocations,SearchPage:1,RecentAdded: 1,LoginSessionKey:$('#LoginSessionKey').val(),PageNo:-1}

        $.ajax({
            url: site_url + 'api/article/searcharticle',
            type: 'post',
            data: reqData,
            dataType: 'json',
            success: function (result) {
                
                if(reqData.Locations[0][0] == 'The World' && isLocationEnabled) {
                    return;
                }
                
                LatestDate = result.LatestDate;
                //$("#stylemapUpdateCount").html('No Updates');
                var wardrobeCtrlInStylemap = angular.element($('#wardrobeCtrlInStylemap')).scope();
                wardrobeCtrlInStylemap.$apply(function(){
                    wardrobeCtrlInStylemap.StylemapArticleCount = '';
                });
                
                
                if(updateMapFlag){
                   setTimeout(function(){
                    initialize(result);
                   },1000);
                }
                
                if(updateGridFlag){
                    
                    var articleData = [];

                    if(result.Data.length > 0){
                        $.each(result.Data, function(key) {
                            articleData.push(result.Data[key]);
                        });

                        var scope = angular.element($('#articleCtrl')).scope();
                        scope.$apply(function(){
                            scope.SearchedArticles = articleData;
                        });

                        /*AUTO CLICK ON FIRST ARTICLE TAB*/
                        /*setTimeout(function(){
                            $('.expanderGrid.runway-grid > li:first > a .product-img').trigger('click');
                        },2000);*/
                        /*END AUTO CLICK ON FIRST ARTICLE TAB*/

                    } else {

                        var scope = angular.element($('#articleCtrl')).scope();
                        scope.$apply(function(){
                            scope.SearchedArticles = articleData;
                        });
                        $("#imageDetail").hide();

                    }
                }
            }
        });
        
    }
    
    /*
     * Function Name: saveArticleFromMap
     * Description: function that saves the article when save is clicked on the map
     */
    function saveArticleFromMap(articleGuID){
        
        $('.loader-signup').show();
        var reqData = {LoginSessionKey: $('#LoginSessionKey').val(), articleGuID: articleGuID};
        
        $.ajax({
            url: site_url + 'api/article/savearticle',
            type: 'post',
            data: reqData,
            context: this,
            dataType: 'json',
            success: function (response) {
                if(response.ResponseCode==200){
                    alertify.success(response.Message); 
                        
                    /*$(this).remove(); */
                    
                    /*update values in other places of grid*/
                    getArticleForStylemap(true,true);
                    /*update values in other places of grid*/
                    
                }else if(response.ResponseCode==501){
                    
                    openPopDiv('signin', 'bounceInDown');
                
                }else{

                    alertify.error(response.Message);
                }
                
                $('.loader-signup').hide();
                
            }
        });    
        
    }
    
    /*
     * Function Name: getSavedArticleUsersFromMap
     * Description: list people who have saved this article from the map
     */
    function getSavedArticleUsersFromMap(articleGuID, noOfSaves){
        angular.element(document.getElementById('articleCtrl')).scope().getSavedArticleUsers(articleGuID, noOfSaves);
        
    }
    
    /*
     * Function Name: getUrlParameter
     * Description: get URL parameter for stylemap search when clicked on location for article
     */
    function getUrlParameter(sParam)
    {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) 
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) 
            {
                return sParameterName[1];
            }
        }
    }  
    
    

    /*end logic to handle location given by user*/
    
    setInterval(function () {
    	getNewUpdateOnStylemap();
    }, 30000);


    /*
     * Function Name: getNewUpdateOnStylemap
     * Description: get new stylemap added article as per searched location
     */
    function getNewUpdateOnStylemap(){
        //var reqData = {Location:$('#locationsOnStylemap').val(),CreatedDate: LatestDate,TabName:'RunwayTab2Name',LoginSessionKey:$('#LoginSessionKey').val()}
        var reqData = {Locations:finalLocations,CreatedDate: LatestDate,TabName:'Stylemap',LoginSessionKey:$('#LoginSessionKey').val()}
        
        $.ajax({
            url: site_url + 'api/article/checkRunwayUpdate',
            type: 'post',
            async:true,
            data: reqData,
            context: this,
            dataType: 'json',
            success: function (response) {
                if(response.Data > 0){
                    
                    if(parseInt(response.Data)==1){
                        var update = response.Data+' New Update';
                    }else{
                         var update = response.Data+' New Updates';
                    }
                    
                    var wardrobeCtrlInStylemap = angular.element($('#wardrobeCtrlInStylemap')).scope();
                    wardrobeCtrlInStylemap.$apply(function(){
                        wardrobeCtrlInStylemap.StylemapArticleCount = update;
                    });
                    
                    //$("#stylemapUpdateCount").html(update);
                    
                }
            }
        });
        
    }