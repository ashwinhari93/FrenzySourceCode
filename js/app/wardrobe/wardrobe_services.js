angular.module('App')
.factory('wardrobeService', function ($http, $q, appInfo) {
    var e = {};
    var clipItemCliked = false;
    return {
        
        edititem: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/item/editItem', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
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
        delete_item:function (reqData) {
            var d = $q.defer();
            $http.post(base_url + 'api/item/deleteItem', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        delete_collection:function (reqData) {
            var d = $q.defer();
            $http.post(base_url + 'api/collection/deleteCollection', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_wardrobeList:function (reqData) {
            var d = $q.defer();
            $http.post(base_url + 'api/common/categoryMasterList', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_itemCategoryList:function (reqData) {
            var d = $q.defer();
            $http.post(base_url + 'api/common/itemCategoryMasterList', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_categoryMasterDetail:function (reqData) {
            var d = $q.defer();
            $http.post(base_url + 'api/common/getCategoryMasterDetail', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_ItemsList: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/item/listItems', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        save_wardrobeDetails: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/collection/createCollection', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_userWardrobes: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/collection/listCollections', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_wardrobeItems: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/collection/listCollectionItems', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_CollectionAndRemainingItemsList: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/collection/listCollectionAndRemainingItems', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        update_wardrobeDetails: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/collection/editCollection', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_itemSize: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/common/sizeMasterList', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_itemColor: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/common/colorMasterList', reqData).success(function (data) {
                d.resolve(data);
                //console.log("Success: "+data);
            }).error(function (data) {
                d.reject(data);
                //console.log("Error: "+data);
            });
            return d.promise;
        },
        get_countries: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/common/countryMasterList', reqData).success(function (data) {
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
        additem: function (reqData) {
            var d = $q.defer();

            $http.post(base_url + 'api/item/addItem', reqData).success(function (data) {
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

        get_ItemfromWeb:function (reqData) {
            var d = $q.defer();
            console.log("in promise: ");
            $http.post(base_url + 'api/item/itemfromweb', reqData).success(function (data) {
                d.resolve(data);
                console.log("Success in promise: "+data);
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
        set_clipItemCliked: function(value){
            clipItemCliked = value;
        },
        get_clipItemCliked: function(){
            return clipItemCliked;
        }
        

    };

});