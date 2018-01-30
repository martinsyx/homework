import http from '../utils/http'
import config from 'config'
import common from '../utils/common'
import store from '../store'
import versionConfig from '../config/version'
export default {
    subscribeArrivalNotice(mobile, itemId, mod) {
        return new Promise((resolve, reject) => {
            var data = {
                cellphone: mobile,
                infoId: itemId,
                mod: mod
            }

            var url = common.getApiBaseUrl() + "/usercenters/subscribeArrivalNotice?si=" + common.getUserToken();
            http.postString(url, data).then(function(result) {
                if (result.Result) {
                    resolve(result)
                } else {
                    reject(result.Message)
                }
            }, function(error) {
                reject('网络异常')
            });
        })
    },
    getDashboard() {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/Dashboard?si=" + common.getUserToken();
            http.get(url).then(function(result) {
                let tpNum = 0
                if (result && result.InnerData && result.InnerData.OrderWaitToPay > 0) {
                    tpNum = result.InnerData.OrderWaitToPay
                }
                store.dispatch('updateWaitToPayNum', tpNum)
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    getUsercenter() {
        return new Promise((resolve, reject) => {
            var url = common.getAppBaseUrl() + "/contents/usercenter?si=" + common.getUserToken();
            http.get(url).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    getCustomerInfo() {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/CustomerInfo?si=" + common.getUserToken();
            http.get(url).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    logout(model) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/accounts/logout?si=" + common.getUserToken();
            http.postString(url, model).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    giftsExchange(model) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/giftsexchange?si=" + common.getUserToken();
            http.postString(url, model).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    updateCustomerInfo(model) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/updateCustomerInfo?si=" + common.getUserToken();
            http.postString(url, model).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    sendVerifyUserCode(model) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/SendVerifyUserCode?si=" + common.getUserToken()
            http.postString(url, model).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    checkAndUpdateCellPhone(model) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/CheckAndUpdateCellPhone?si=" + common.getUserToken();
            http.postString(url, model).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    checkVerifyUserCode(model) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/CheckVerifyUserCode?si=" + common.getUserToken();
            http.postString(url, model).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    validaddress() {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/validaddress?si=" + common.getUserToken();
            http.get(url).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    addaddress(model) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/addaddress?si=" + common.getUserToken();
            http.postString(url, model).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    updateAddress(model) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/UpdateAddress?si=" + common.getUserToken();
            http.postString(url, model).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    validExpressCompany(regionId) {
        return new Promise((resolve, reject) => {
            var url = common.getAppBaseUrl() + "/contents/validExpressCompany?regionId=" + regionId;
            http.get(url).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    delAddress(model) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/DelAddress?si=" + common.getUserToken();
            http.postString(url, model).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    getUserdiff() {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/userdiff?si=" + common.getUserToken();
            http.get(url).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    userdiffapply(model) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/userdiffapply?OrderCode=" + model.ordercode + "&si=" + common.getUserToken();
            http.postString(url, model).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    resetIntegralPassword() {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/ResetIntegralPassword?si=" + common.getUserToken();
            http.postString(url).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    getAllcollection() {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/Allcollection?si=" + common.getUserToken();
            http.get(url).then(function(resp) {
                var collects = []
                if (resp.Result && resp.InnerData.item) {
                    resp.InnerData.item.forEach(item => {
                        collects.push(item.ItemInfoId);
                    })
                }
                store.dispatch('setCollections', collects)
                resolve(resp)
            }, function(error) {
                reject(error)
            });
        })
    },
    getGoodsInfosByIds(ids) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/GoodsInfos?goodsId=" + ids + "&si=" + common.getUserToken();
            http.get(url).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    getCouponsByPage: function(pageIndex) {
        return new Promise((resolve, reject) => {
            var params = { si: common.getUserToken(), pageIndex: pageIndex };
            http.get(config.cartUrl + "/GetCouponsList", params).then(function(result) {
                if (result.Status == 1) {
                    resolve(result);
                } else {
                    reject(result.Msg);
                }
            }, function() {
                reject("网络异常");
            });
        });
    },
    getCouponsCanUseNum: function() {
        return new Promise((resolve, reject) => {
            var params = { si: common.getUserToken() };
            http.get(config.cartUrl + "/GetCouponsCanUseNum", params).then(function(result) {
                if (result.Status == 1) {
                    resolve(result);
                } else {
                    reject(result.Msg);
                }
            }, function() {
                reject("网络异常");
            });
        });
    },
    setUserFace:function(model){
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/SetUserFace?si=" + common.getUserToken();
            http.postString(url,model).then(function(result) {
                resolve(result)
            }, function(error) {
                reject(error)
            });
        })
    },
    visitHome:function(){
        if(versionConfig.ver=='5.0.0' || common.isApp()==false){
            return;
        }
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl()+ '/usercenters/VisitHome?si='+common.getUserToken();
            var isfirst=false;
            if(localStorage.getItem('FirstTime')==null){
                localStorage.setItem('FirstTime',false);
                isfirst=true;
            }
            var data=common.fillTraceData({FirstTime:isfirst});
            http.postString(url, data).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    visitItem:function(itemInfoId){
        if(versionConfig.ver=='5.0.0'){
            return;
        }
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl()+ '/usercenters/visitItem?si='+ common.getUserToken();
            var data=common.fillTraceData({ItemInfoId:itemInfoId});
            http.postString(url, data).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    }
}