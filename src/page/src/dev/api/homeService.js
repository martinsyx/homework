import http from '../utils/http'
import common from '../utils/common'
import cache from '../utils/cache'
import store from '../store'
import config from 'config'

var navsData = {
    "Result": true,
    "Status": 1,
    "Message": "保存成功！",
    "InnerData": {
        "IndexNav": [
            { "ItemIndexId": 0, "Name": "首页", "Code": "home", "Uri": null },
            { "ItemIndexId": 0, "Name": "新品", "Code": "newArrival", "Uri": null },
            { "ItemIndexId": 2860, "Name": "家务", "Code": "mainCategory", "Uri": null },
            { "ItemIndexId": 2859, "Name": "下厨", "Code": "mainCategory", "Uri": null },
            { "ItemIndexId": 2865, "Name": "家居服", "Code": "mainCategory", "Uri": null },
            { "ItemIndexId": 2861, "Name": "生活", "Code": "mainCategory", "Uri": null },
            { "ItemIndexId": 3260, "Name": "软装", "Code": "mainCategory", "Uri": null },
            { "ItemIndexId": 2862, "Name": "床品", "Code": "mainCategory", "Uri": null },
            { "ItemIndexId": 2863, "Name": "工作和旅行", "Code": "mainCategory", "Uri": null },
            { "ItemIndexId": 2866, "Name": "婴童", "Code": "mainCategory", "Uri": null },
            { "ItemIndexId": 0, "Name": "了解LifeVC", "Code": "webpage", "Uri": "http://m.lifevc.com/home/help?c=service&n=commitment" }]
    },
    "ResultCode": null
}

export default {
    getNavs: function () {
        return new Promise((resolve, reject) => {
            var cacheKey = "contents_NavgitaionCategories_V2"
            var data = cache.get(cacheKey)
            if (data) {
                return resolve(data)
            }

            var url = common.getAppBaseUrl() + "/contents/NavgitaionCategories";
            http.get(url).then(function (result) {
                var navs=result.InnerData.IndexNav;
                navs.forEach(function(nav){
                    if(nav.Code=="home"){
                    nav.linkUrl = "/";
                    } else if(nav.Code=="newArrival"){
                    nav.linkUrl = "/new";
                    } else if(nav.Code=="mainCategory"){
                    nav.linkUrl = "/channel/" + nav.ItemIndexId;
                    } else if(nav.Code=="webpage"){
                    nav.linkUrl = "/webpage/" + encodeURIComponent(nav.Name) + "/" + encodeURIComponent(nav.Uri);
                    }
                });
                cache.set(cacheKey, navs)
                resolve(navs)
            }, function (error) {
                navsData.InnerData.IndexNav.forEach(function(nav){
                    if(nav.Code=="home"){
                    nav.linkUrl = "/";
                    } else if(nav.Code=="newArrival"){
                    nav.linkUrl = "/new";
                    } else if(nav.Code=="mainCategory"){
                    nav.linkUrl = "/channel/" + nav.ItemIndexId;
                    } else if(nav.Code=="webpage"){
                    nav.linkUrl = "/webpage/" + encodeURIComponent(nav.Name) + "/" + encodeURIComponent(nav.Uri);
                    }
                });
                resolve(navsData.InnerData.IndexNav)
            });
        })
    },
    getContents: function (hascache) {
        if (hascache == null)
            hascache = true;
        return new Promise((resolve, reject) => {
            var cacheKey = "contents_home_v2"
            if (hascache) {
                var data = cache.get(cacheKey)
                if (data) {
                    return resolve(data)
                }
            }
            
            var url = common.getAppBaseUrl() + "/contents/home_v2";
            http.get(url).then(function (result) {
                if (result.Result) {
                    cache.set(cacheKey, result)
                }

                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getNewarrivalByCode: function (code, hascache) {
        if (hascache == null)
            hascache = true;

        return new Promise((resolve, reject) => {
            var cacheKey = "contents_newarrival_" + code
            if (hascache) {
                var data = cache.get(cacheKey)
                if (data) {
                    return resolve(data)
                }
            }
            var url = common.getAppBaseUrl() + "/contents/newarrival?code=" + code
            http.get(url).then(function (result) {
                if (result.Result) {
                    cache.set(cacheKey, result)
                }

                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getStrollData: function (page) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/Stroll/StrollItemList?pageNo=" + page;
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    postadTrackflow: function (ad) {
        return new Promise((resolve, reject) => {
            var url = config.apiUrl + '/track/AdTrack/flow?ad=' + encodeURIComponent(ad);
            http.postString(url, {}).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getStartScreenBars: function (size) {
        return new Promise((resolve, reject) => {
            var url = common.getAppBaseUrl() + "/contents/StartScreenBars";
            if(size)
            {
                url+="?size=" + size;
            }
            http.get(url).then(function (result) {
                if (result.Status == 1) {
                    resolve(result);
                } else {
                    reject(result.Message);
                }
            }, function (error) {
                reject(error)
            });
        })
    },
    getAppUpdate: function (ver) {
        return new Promise((resolve, reject) => {
            var type=common.isAndroid()?1:2;
            var url=common.getAppBaseUrl() + "/contents/IosOrAndUpdate?type="+type+"&newver="+ver;//+"&v="+Date.now();
            http.get(url,null,false).then(function (result) {
                if (result.Status == 1) {
                    resolve(result);
                } else {
                    reject(result.Message);
                }
            }, function (error) {
                reject(error)
            });
        })
    },
}
