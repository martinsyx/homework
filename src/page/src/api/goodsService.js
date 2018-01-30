import http from '../utils/http'
import common from '../utils/common'
import cache from '../utils/cache'
import store from '../store'
export default {
    getGoodsAttr: function (promotion, item) {
        return new Promise((resolve, reject) => {
            var url = common.getAppBaseUrl() + "/items/goodsAttr?Iteminfoid=" + item.ItemId;
            if(item.Type == 1){
                url += "&promotionId=" + promotion.PromotionId;
                url += "&childPromotionId=" + promotion.ChildPromotionId;
                url += "&currRuleId=" + promotion.CurrRuleId;
                url += "&platform=" +common.getPm();
                url += "&ck=" +store.state.app.cartKey;
                url += "&sitoken=" +common.getUserToken();
            }
            console.log(url)
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getItemById: function (itemId) {
        return new Promise((resolve, reject) => {
            var url = common.getAppBaseUrl() + "/items/itemview?Iteminfoid=" + itemId 
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getItemHeaderById: function (itemId) {
        return new Promise((resolve, reject) => {
            var url = common.getAppBaseUrl() + "/items/itemheader?Iteminfoid=" + itemId
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getItemComment: function (itemId, page) {
        return new Promise((resolve, reject) => {
            var url = common.getAppBaseUrl() + "/items/reviewlist?itemInfoId=" + itemId  + "&page=" + page
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getSearchList:function (keyword) {
        return new Promise((resolve, reject) => {
            var url = common.getAppBaseUrl()+"/contents/SearchAutoSuggest?keywords="+keyword;
            http.get(url).then(function (result) {
                resolve(result);
            },function (error) {
                reject(error);
            })
        })
    },
    getKeyWordSearchList:function (keyword) {
        return new Promise((resolve, reject) => {
            var url = common.getAppBaseUrl()+"/contents/search?keywords="+keyword;
            http.get(url).then(function (result) {
                resolve(result);
            },function (error) {
                reject(error);
            })
        })
    },
    clearSubCache:function(){
        cache.clear('product_channelsub')
    },
    getListDetails:function (itemIndexId,fliterId) {
        return new Promise((resolve,reject) => {
            var cacheKey = "product_channelsub_" + itemIndexId+"_"+fliterId;
            var data = cache.get(cacheKey)
            if (data){
                return resolve(data)
            }
            var url=common.getAppBaseUrl()+"/Categories/Category?itemindexid="+itemIndexId+"&filter="+fliterId;
            http.get(url).then(function (result) {
                if (result.Result) {
                    cache.set(cacheKey, result)
                }
                resolve(result);
            },function (error) {
                reject(error);
            })
        })
    },
    getNewProductSellingSortList:function(itemIndexId,fliterId,sort){
        return new Promise((resolve,reject) =>{
            var cacheKey = "product_channelsub_sort_" + itemIndexId+"_"+fliterId+"_"+sort;
            var data = cache.get(cacheKey)
            if (data){
                return resolve(data)
            }
            var url=common.getAppBaseUrl()+"/Categories/Category?itemindexid="+itemIndexId+"&filter="+fliterId+"&sort="+sort;
            http.get(url).then(function (result) {
                if (result.Result) {
                    cache.set(cacheKey, result)
                }
                resolve(result);
            },function (error) {
                reject(error);
            })
        })
    },
    addCollection(iteminfoids){        
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/addCollection?si=" + common.getUserToken();
            http.postString(url, {"iteminfoid":iteminfoids,"returndetail":false,showLayer:false}).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    removeCollection(iteminfoids){
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/removeCollection?si=" + common.getUserToken();
            http.postString(url, {"iteminfoid":iteminfoids,"returndetail":false,showLayer:false}).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    setBrowseLog(id) {
        let logIds=localStorage.getItem('goodsBrowseLog')||"";
        if(logIds.indexOf(id+',')>-1){
            logIds=logIds.replace(id+',','')
        }
        let ids=logIds.split(',')
        if(ids[0]==id)
        {
            return
        }
        if(ids.length<11){
            ids.unshift(id)
            localStorage.setItem('goodsBrowseLog',ids)
        }
        else{
            ids.pop()
            ids.unshift(id)
            localStorage.setItem('goodsBrowseLog',ids)        
        }
    },
    getBrowseLog () {
        return localStorage.getItem('goodsBrowseLog')
    }
}