angular.module('App')
        .factory('articleService', function ($http, $q, appInfo) {
            var hoverArticleItem = null;
            var searchItemReq = null;
            return {
                addarticle: function (reqData) {
                    var d = $q.defer();

                    $http.post(base_url + 'api/article/addarticle', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },
                editarticle: function (reqData) {
                    var d = $q.defer();

                    $http.post(base_url + 'api/article/updatearticle', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },
                get_articleDetail: function (reqData) {
                    var d = $q.defer();
                    $http.post(base_url + 'api/article/viewArticle', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },
                get_userAllWardrobes: function (reqData) {
                    var d = $q.defer();

                    $http.post(base_url + 'api/collection/listUserAllCollections.json', reqData).success(function (data) {
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

                    $http.post(base_url + 'api/collection/listCollectionItems.json', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },
                saveArticle: function (reqData) {
                    var d = $q.defer();

                    $http.post(base_url + 'api/article/savearticle', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },

                 get_tagedItemArticle: function (reqData) {
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
                get_userArticle: function (reqData) {
                    var d = $q.defer();

                    $http.post(base_url + 'api/article/userarticle', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },
                getSavedArticleUsers: function (reqData) {
                    var d = $q.defer();

                    $http.post(base_url + 'api/article/savedArticleUsers', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },
                get_ArticlefromWeb:function (reqData) {
                    var d = $q.defer();
                    $http.post(base_url + 'api/article/articlefromweb', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },

                //get article data for search text on Search page
                get_SearchArticle: function (reqData) {
                    var d = $q.defer();

                    $http.post(base_url + 'api/article/searcharticlenew', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },

                //get article data for search text on Search page
                get_SearchArticleTest: function (reqData) {
                    var d = $q.defer();
                    
                    $http.post(base_url + 'api/article/searcharticletest', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },

                //get item data for search text on Search page
                get_SearchItem: function (reqData) {
                    var d = $q.defer();

                    $http.post(base_url + 'api/item/searchitem', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },
                  get_RunwayTabs:function (reqData) {
                    var d = $q.defer();
                    $http.post(base_url + 'api/article/runwaytabs', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },

                get_RunwayData:function (reqData) {
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

                get_SearchItem:function (reqData) {
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
                get_SearchItemNew:function (reqData) {
                    var d = $q.defer();
                    $http.post(base_url + 'api/item/searchItemNew', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },
               
                get_SearchItemAb:function (reqData) {
                    var deferredAbort = $q.defer();
                    var request = $http({
						method: "post",
						url: base_url + 'api/item/searchItemNew',
                        data:reqData,
						timeout: deferredAbort.promise
					});
                    var promise = request.then(
						function( response ) {
							return( response.data );
						},
						function( response ) {
							return( $q.reject( "Something went wrong" ) );
						}
					);
                    
                    
                    promise.abort = function() {
						deferredAbort.resolve();
					};
                    
                    promise.finally(
						function() {
							console.info( "Cleaning up object references." );
							promise.abort = angular.noop;
							deferredAbort = request = promise = null;
						}
					);
					return( promise );
                },

                get_AllBrands:function (reqData) {
                    var d = $q.defer();
                    $http.post(base_url + 'api/common/allbrand', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },

                get_SearchUsers:function (reqData) {
                    var d = $q.defer();
                    $http.post(base_url + 'api/users/searchusers', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },

                delete_article: function (reqData) {
                    var d = $q.defer();
                    $http.post(base_url + 'api/article/deletearticle', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },

                followUser : function(reqData){
                    var d = $q.defer();
                    $http.post(appInfo.serviceUrl + 'users/follow',reqData).success(function (data) {
                        d.resolve(data);
                       // alert("success" + data) return ; 
                    }).error(function (data) {
                        d.reject(data);
                        //alert("error")
                    });
                    return d.promise;
                },

                  get_topUsers:function (reqData) {
                    var d = $q.defer();
                    $http.post(appInfo.serviceUrl +'users/gettopusers', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },
                get_TopArticles:function (reqData) {
                    var d = $q.defer();
                    $http.post(appInfo.serviceUrl +'article/gettoparticles', reqData).success(function (data) {
                        d.resolve(data);
                        //console.log("Success: "+data);
                    }).error(function (data) {
                        d.reject(data);
                        //console.log("Error: "+data);
                    });
                    return d.promise;
                },
                set_flagArticle: function (reqData) {
                    var d = $q.defer();

                    $http.post(base_url + 'api/article/flagarticle', reqData).success(function (data) {
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
            };
        });