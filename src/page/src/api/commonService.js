import config from 'config'
import $ from 'jquery'
import http from '../utils/http'
import common from '../utils/common'
import cache from '../utils/cache'

export default {
  getRegions: function () {
    return new Promise((resolve, reject) => {
      var cacheKey = "contents_allregion"
      var data = cache.get(cacheKey)
      if (data) {
        return resolve(data)
      }

      var url = common.getAppBaseUrl() + "/contents/allregion"
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
  getDeliver: function (itemId, regionId) {
    return new Promise((resolve, reject) => {
      var url = common.getApiBaseUrl() + "/usercenters/deliver?itemInfoId=" + itemId + "&regionId=" + regionId;
      http.get(url).then(function (result) {
        resolve(result)
      }, function (error) {
        reject(error)
      });
    })
  },
  getMemberpromotions: function (itemId, token) {
    return new Promise((resolve, reject) => {
      var url = common.getApiBaseUrl() + "/usercenters/memberpromotion?itemInfoId=" + itemId + "&si=" + encodeURI(token);
      http.get(url).then(function (result) {
        resolve(result)
      }, function (error) {
        reject(error)
      });
    })
  },
  sendLoginCode: function (token, mobile) {
    return new Promise((resolve, reject) => {
      var url = common.getApiBaseUrl() + "/accounts/SendLoginVerifyCodeV2?si=" + encodeURI(token);
      var data = {Mobile: mobile};

      http.postString(url, data).then(function (result) {
        resolve(result)
      }, function (error) {
        reject(error)
      });
    })
  },
  sendRegisterCode: function ( mobile,captcha) {
    return new Promise((resolve, reject) => {
      var url = common.getApiBaseUrl() + "/accounts/SendSmsCaptchaByRegister";
      var data = {Mobile: mobile,CheckCode:Date.now(),Captcha:captcha};

      http.postString(url, data).then(function (result) {
        resolve(result)
      }, function (error) {
        reject(error)
      });
    })
  },
  uploadImg: function (formData) {
    return new Promise((resolve, reject) => {
      var url = common.getApiBaseUrl() + "/FileUpload/Image/UploadOnlineReturnsImg"
      http.ajax({
        url: url,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false
      }).then(function (result) {
        resolve(result)
      }, function (error) {
        reject(error)
      });

    })
  },
}
