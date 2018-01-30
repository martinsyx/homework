import http from '../utils/http'
import common from '../utils/common'
import config from 'config'

export default {
    getActivityShelfByCode(code,itemsort,st){ 
        return new Promise((resolve,reject)=>{
            var url = common.getAppBaseUrl() + "/activities/ActivityShelf?newshow=true&isShowTwo="+(st=='true' || st=='2')+"&code="+code+(itemsort!=null?("&itemsort="+itemsort):"");
            http.get(url).then(function(result){
                resolve(result)
            },function(error){
                reject(error)
            });
        })
    },
    getDiscountByactivityId(activityId){        
        return new Promise((resolve,reject)=>{
            var url = config.appUrl + "/activities/discount?activityId="+activityId;
            http.get(url).then(function(result){
                resolve(result)
            },function(error){
                reject(error)
            });
        })
    },
    getNormalDiscount(code){        
        return new Promise((resolve,reject)=>{
            var url =config.appUrl + "/activities/NormalDiscount?code="+code;
            http.get(url).then(function(result){
                if(result && result.InnerData==null){
                    reject(result.Message)
                    return;
                }
                resolve(result)
            },function(error){
                reject(error)
            });
        })
    },
    getNormalDiscountItemData(url){        
        return new Promise((resolve,reject)=>{
            url = common.getAppBaseUrl() +url
            http.get(url).then(function(result){
                resolve(result)
            },function(error){
                reject(error)
            });
        })
    }
}
