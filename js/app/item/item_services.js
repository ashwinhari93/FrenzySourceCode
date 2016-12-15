angular.module('App')
.factory('itemDetailService', function ($http, $q, appInfo) {
    var e = {};
    return {
        get_itemDetail:function (reqData) {
            var d = $q.defer();
            $http.post(base_url + 'api/item/viewItem', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_itemSameBrand:function(reqData){
        		var d = $q.defer();
            $http.post(base_url + 'api/item/sameBrand', reqData).success(function (data) {
                d.resolve(data);
                console.log("Success: "+data);
            	 $('.loader-signup').hide();    
            }).error(function (data) {
                d.reject(data);
                console.log("Error: "+data);
            });
            return d.promise;
        },
        get_itemLowerPrices:function(reqData){
        		var d = $q.defer();
            $http.post(base_url + 'api/item/lowerPrices', reqData).success(function (data) {
                d.resolve(data);
                console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                console.log("Error: "+data);
            });
            return d.promise;
        },
        get_itemSameCategoryColor:function(reqData){
        		var d = $q.defer();
            $http.post(base_url + 'api/item/sameColorCategory', reqData).success(function (data) {
                d.resolve(data);
                console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                console.log("Error: "+data);
            });
            return d.promise;
        },
        get_itemsDetail:function (reqData) {
            var d = $q.defer();
            $http.post(base_url + 'api/item/viewItems', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_itemDetailInView:function (reqData) {
            var d = $q.defer();
            $http.post(base_url + 'api/item/viewItemWithIncrement', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_BrandItem:function (reqData) {
            var d = $q.defer();
            $http.post(base_url + 'api/item/searchItem', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        clipItem: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/item/clipitem', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_ItemArticles:function (reqData) {
            var d = $q.defer();
            $http.post(base_url + 'api/article/searcharticle', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_uesrWardrobeList: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/collection/userWardrobes', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },


        set_event: function(event){
            e = event;
        },
        get_event: function(){
            return e;
        },
        getClipedItemUsers: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/item/clipedItemUsers', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        
        set_flagItem: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/item/flagitem', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
    };

});