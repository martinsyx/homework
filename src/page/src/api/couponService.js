import http from '../utils/http'
import common from '../utils/common'

export default {
    getCoupons: function (pageNo) {
        return new Promise((resolve, reject) => {
            var url = common.getApiBaseUrl() + "/usercenters/MyCoupons?pageNo=" + pageNo + "&pageSize=12&si=" + common.getUserToken();
            http.get(url).then(function (result) {
                resolve(result)
            }, function (error) {
                reject(error)
            });
        })
    }
}