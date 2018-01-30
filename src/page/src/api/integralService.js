import http from '../utils/http'
import common from '../utils/common'

export default {
    getIntegrals: function (pageNo, pageSize) {
        pageNo = pageNo || 1;
        pageSize = pageSize || 20;
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/MyIntegrals?pageNo=" + pageNo + "&pageSize=" + pageSize + "&si=" + common.getUserToken();
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    postSignIn: function (pageNo) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/DoSignIn?si=" + common.getUserToken();
            http.post(url, {}).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    resetIntegralPassword: function () {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/ResetIntegralPassword?si=" + common.getUserToken();
            http.post(url, {}).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    },
    changeIntegralPassword: function (data) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/ChangeIntegralPassword?si=" + common.getUserToken();
            http.postString(url, data).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    }
}