import http from '../utils/http'
import common from '../utils/common'

let checkCode=Date.now()
export default {
    login: function (data) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/accounts/loginV2";
            var ndata =common.cloneAndEncode(data,true);
            http.postString(url, common.fillTraceData(ndata)).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    register: function (data) {
        return new Promise((resolve, reject) => {
            var url = common.getAppBaseUrl() + "/contents/usercenter";
            var ndata =common.cloneAndEncode(data,true);
            http.postString(common.getApiBaseUrl() + "/accounts/RegisterByPhone?checkCode="+checkCode, common.fillTraceData(ndata)).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    changepassword: function (model) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/accounts/changepassword?checkCode="+checkCode+"&si=" + common.getUserToken();
            var ndata =common.cloneAndEncode(model,true);
            http.postString(url,ndata).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    initPassword: function (model) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/accounts/initPassword?checkcode="+checkCode+"&si="+common.getUserToken();
            var ndata =common.cloneAndEncode(model,true);
            http.postString(url,ndata).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    checkResetPassword:function(model){        
        return new Promise((resolve, reject) => {
            var ndata =common.cloneAndEncode(model,true);
            var url = common.getApiBaseUrl() + "/accounts/checkResetPassword?checkcode="+checkCode;
            http.postString(url,ndata).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    resetPassword:function(model){        
        return new Promise((resolve, reject) => {
            var ndata =common.cloneAndEncode(model,true);
            var url = common.getApiBaseUrl() + "/accounts/resetPassword?checkcode="+checkCode;
            http.postString(url,ndata).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    sendSmsVerifyCode:function(model){ 
        return new Promise((resolve, reject) => {
            var ndata =common.cloneAndEncode(model,true);
            var url = common.getApiBaseUrl() + "/accounts/sendsmsverifycode?checkcode="+checkCode
            http.postString(url,ndata).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })

    }

}
