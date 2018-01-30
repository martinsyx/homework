import http from '../utils/http'
import common from '../utils/common'
import config from 'config'

export default {
    getMyOrders: function () {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/MyOrders_20150817?si=" + common.getUserToken();
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getOrderInfo:function(orderCode){        
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/OrderCode?OrderCode="+orderCode+"&si=" + common.getUserToken();
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getViewOrderInfo:function(orderCode){        
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/ViewOrder?OrderCode="+orderCode+"&si=" + common.getUserToken();
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    confirmOrderReceipt:function(data){
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/ConfirmOrderReceipt_20150817?si=" + common.getUserToken()+"&v="+'h5_1.0_1';
            http.postString(url,data).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getSignOrderView:function(orderCode){
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/SignOrderView?OrderCode="+orderCode+"&si=" + common.getUserToken();
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    hideOrder:function(data){   
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/hideorder?si=" + common.getUserToken()+"&v="+'h5_1.0_1';
            http.postString(url,data).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    shareOrder:function(data){   
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/shareorder?si=" + common.getUserToken()+"&v="+'h5_1.0_1';
            http.postString(url,data).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    cancelSalesOrder:function(data){        
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/cancelsalesorder?si=" + common.getUserToken();
            http.postString(url,data).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    updateOrder:function(data){        
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/updateOrder?si=" + common.getUserToken();
            http.postString(url,data).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    rebuyOrder:function(orderCode){
        return new Promise((resolve, reject) => {
            var url = config.cartUrl + "/ReBuy";
            let params={
                si:common.getUserToken(),
                orderCode:orderCode
            }
            http.get(url,params).then(function (result) {
                if (result.Status == 1) {
                    resolve(result);
                } else {
                    reject(result.Msg);
                }
            }, function () {
                reject("网络异常");
            });
        });
    },
    getOrderComments:function(orderCode){        
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/viewComments?ordercode="+orderCode+"&si=" + common.getUserToken();
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    createItemComment:function(data){        
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/createItemComment?si=" + common.getUserToken();
            http.postString(url,data).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    createServiceComment:function(data){        
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/CreateServiceComment?si=" + common.getUserToken();
            http.postString(url,data).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getViewDelivery:function(orderCode){           
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/viewdelivery?ordercode="+orderCode+"&si=" + common.getUserToken();
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getAbleReturnOrders:function(pageNo){
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/AbleReturnOrders?pageNum="+pageNo+"&si=" + common.getUserToken();
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getReturnsAppliedOrders:function(pageNo){
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/ReturnsAppliedOrders?pageNum="+pageNo+"&si=" + common.getUserToken();
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    returnsApply:function(data){
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/ReturnsApply?si=" + common.getUserToken();
            http.postString(url,data).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    cancleReturnsOrder:function(data){
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/CancleReturnsOrder?si=" + common.getUserToken();
            http.postString(url,data).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getApplyReason:function(){
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/ApplyReason?si=" + common.getUserToken();
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    getPaySuccessCarts:function(orderCode){
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/salesorders/PaySuccessCarts?orderCode="+orderCode+"&si=" + common.getUserToken();
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    }
    

}