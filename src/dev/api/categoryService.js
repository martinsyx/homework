import http from '../utils/http'
import common from '../utils/common'
import cache from '../utils/cache'

export default {
  getCategoryData: function (cid, hascache) {
    if (hascache == null)
      hascache = true;
    return new Promise((resolve, reject) => {
      var cacheKey = "categories_Category_" + cid;
      if (hascache) {
        var data = cache.get(cacheKey)
        if (data) {
          return resolve(data)
        }
      }
      var url = common.getAppBaseUrl() + "/Categories/Category?itemIndexId=" + cid;
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
  getCategoryDataBySort: function (cid, sort, filterIds) {
    return new Promise((resolve, reject) => {
      var cacheKey="chanel_sort_"+cid+'_'+sort+'_'+filterIds.join('_');
      var data=cache.get(cacheKey);
      if(data){
        return resolve(data);
      }
      var url = common.getAppBaseUrl() + "/Categories/Category?itemIndexId=" + cid;
      if (sort !== 0 || filterIds.length > 0)
        url += '&sort=' + sort + '&filter=' + filterIds.join(',');
      http.get(url).then(function (result) {
        resolve(result)
      }, function (error) {
        reject(error)
      });
    })
  },
  getAllCategory: function () {
    return new Promise((resolve, reject) => {
      var cacheKey = "categories_allCategory"
      var data = cache.get(cacheKey)
      if (data) {
        return resolve(data)
      }

      var url = common.getAppBaseUrl() + "/categories/allCategory";
      http.get(url).then(function (result) {
        if (result.Result) {
          cache.set(cacheKey, result)
        }

        resolve(result)
      }, function (error) {
        reject(error)
      });
    })
  }
}
