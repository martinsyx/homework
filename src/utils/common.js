import config from 'config'
import store from '../store'
import tools from './tools'
import { Toast } from 'mint-ui'
import $ from 'jquery';
import versionConfig from '../config/version'
import http from './http.js';
export default {
  getVerInfo() {
    let platform = 'h5';
    if (this.isAndroid()) {
      platform = 'and'
    }
    else if (this.isIos()) {
      platform = 'ios';
    }

    return 'v_' + platform + '_' + versionConfig.ver + '_' + versionConfig.buildVer
  },
  getAdid() {
    if (this.isIos()) {
      return 'AppStore';
    }
    else if (this.isAndroid()) {
      return localStorage.AdId;
    }
    else {
      return 'h5';
    }
  },
  initVisitInfo() {
    if (localStorage.AdId && localStorage.DeviceId && localStorage.Uuid) {//表示已经初始化完成
      return;
    }
    if (versionConfig.ver != '5.0.0' && this.isApp() && window.LifePlugin) {
      LifePlugin.getDeviceid(function (re) {
        localStorage.DeviceId = (re || '')
      }, function () {
        localStorage.DeviceId = '';
      });
      LifePlugin.getUuid(function (re) {
        localStorage.Uuid = (re || '')
      }, function () {
        localStorage.Uuid = ''
      });
      if (this.isIos()) {
        localStorage.AdId = 'AppStore';
      }
      else if (this.isAndroid()) {
        LifePlugin.getChannelid(function (re) {
          localStorage.AdId = (re || 'site')
        }, function () {
          localStorage.AdId = 'site';
        });
      }
      else {
        localStorage.AdId = 'h5';
      }
    }
    else {
      if (this.isIos()) {
        localStorage.AdId = 'AppStore';
      }
      else if (this.isAndroid()) {
        localStorage.AdId = 'site';
      }
      else {
        localStorage.AdId = 'h5';
      }
      localStorage.DeviceId = tools.genGuid().replace(/-/g, "");
      localStorage.Uuid = tools.genGuid().replace(/-/g, "");
    }
  },
  fillTraceData(data) {
    var result = {};
    for (var i in data) {
      if (data.hasOwnProperty(i)) {
        result[i] = data[i];
      }
    }
    result.DeviceId = localStorage.DeviceId
    result.Uuid = localStorage.Uuid
    result.AdId = this.getAdid();//获取渠道ID device.platform// "h5";
    result.Version = versionConfig.ver;// '4.5.0';
    return result;
  },
  getApiBaseUrl() {
    return config.apiUrl + '/' + this.getVerInfo();
  },
  getAppBaseUrl() {
    return config.appUrl + '/' + this.getVerInfo();
  },
  getUserToken() {
    return encodeURI(store.state.user && store.state.user.token ? store.state.user.token : '');
  },
  isLogin() {
    return (store.state.user && store.state.user.token) ? true : false;
  },
  checkSuccess(res) {
    if (res == null) {
      return false;
    }
    if (!res.Result) {
      Toast(res.Message);
      return false;
    }
    return res;
  },
  coords(w, h, t) {
    // var imageWidth = (window.innerWidth * 0.96);
    var imageWidth = (window.innerWidth);
    var imageHeight = imageWidth / parseFloat(w) * parseFloat(h);
    return parseInt(t.BeginXP * imageWidth / 100.0) + "," + parseInt(t.BeginYP * imageHeight / 100.0) + "," + parseInt(t.EndXP * imageWidth / 100.0) + "," + parseInt(t.EndYP * imageHeight / 100.0);
  },
  isIos() {
    let device = window.device;
    if (!device || !device.platform)
      return false;

    return device.platform.toLowerCase() == 'ios';
  },
  getIosTopHeight() {
    return this.isIos() ? 20 : 0;
  },
  isAndroid() {
    let device = window.device;
    if (!device || !device.platform)
      return false;

    return device.platform.toLowerCase() == 'android';
  },
  getPm() {
    var pm = 8;
    if (this.isIos()) {
      pm = 2
    } else if (this.isAndroid()) {
      pm = 4
    }

    return pm;
  },
  isApp() {
    return this.isAndroid() || this.isIos();
  },
  isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  },
  isMobile(m) {
    return /^1[3|4|5|7|8][0-9]\d{8}$/.test(m);
  },
  isEmail(content) {
    return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(content);
  },
  isPassword(pwd) {
    if (!pwd) {
      return false
    }
    if ($.trim(pwd).length < 6 || $.trim(pwd).length > 20) {
      return false
    }

    if (/[\u4e00-\u9fa5]/.test(pwd)) {
      return false
    }
    if (/^([0-9]+|[a-zA-Z]+)$/.test(pwd)) {
      return false
    }
    if (/[^\x20-\x7E]/.test(pwd)) {
      return false;
    }
    return true;
  },
  toHalf(txt) {
    if (!txt) {
      return txt;
    }
    var tmp = "";
    for (var i = 0; i < txt.length; i++) {
      if (txt.charCodeAt(i) > 65280 && txt.charCodeAt(i) < 65375) {
        tmp += String.fromCharCode(txt.charCodeAt(i) - 65248);
      }
      else if (txt.charCodeAt(i) == 12288) {
        tmp += String.fromCharCode(32);
      }
      else {
        tmp += String.fromCharCode(txt.charCodeAt(i));
      }
    }
    return tmp;
  },
  toRem(px) {
    var scopeTest = $('<div style="display: none; font-size: 1rem; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo('body'),
      scopeVal = scopeTest.height();
    scopeTest.remove();
    return (px / scopeVal).toFixed(3) + 'rem';
  },
  getHeaders() {
    let headers = {}
    if (this.isApp()) {
      let session = this.getUserToken();
      let token = '';
      if (this.isAndroid()) {
        token = 'deeba9c799e64a4bb8ab4280d1be5111'  //4
      }
      else if (this.isIos()) {
        token = 'f9ff90b69aa842fbaedc78b94e2b378a'; //3
      }
      if (session) {
        headers.session = session;
      }
      if (token) {
        headers.token = token;
      }
    }
    return headers;
  },
  changeUrlsi(url) {

    if (this.isApp()) {
      let si = this.getUserToken();
      if (url.indexOf(si) > 0) {
        url = url.replace('si=' + si, 'si2=')
      }
    }
    return url;
  },
  addTrack(func) {
    if (this.isApp()) {
      return;
    }
    if (typeof (ga) != 'undefined') {
      ga('create', 'UA-85918028-1', 'auto');
      ga('send', 'pageview');
      if (typeof (func) == 'function') {
        func(ga);
      }
      return;
    }
    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
      a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    if (typeof (ga) != 'undefined') {
      ga('create', 'UA-85918028-1', 'auto');
      ga('send', 'pageview');
      if (typeof (func) == 'function') {
        func(ga);
      }
      return;
    }

  },
  addTrack2() {

  },
  setStorageItem(key, data) {
    sessionStorage.setItem(key, data);
  },
  getStorageItem(key) {
    return sessionStorage.getItem(key);
  },
  setCookie(name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays)
    var domain = location.host.indexOf('life') > -1 ? ('.' + location.host.split('.')[1] + '.com') : location.hostname;
    var cookie = name + "=" + value + ';path=/;domain=' + domain + ';' + ((expiredays == null) ? "" : "expires=" + exdate.toGMTString());
    console.log(document.cookie);
    document.cookie = cookie;
    console.log(document.cookie);
  },
  getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
  dynamicLoadJs(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = script.onreadystatechange = function () {
      if (typeof (callback) != 'function') {
        return;
      }
      if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
        callback();
        script.onload = script.onreadystatechange = null;
      }
    };
    script.src = url;
    head.appendChild(script);
  },
  dynamicLoadIframe(url, callback) {
    var body = document.getElementsByTagName('body')[0];
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style = 'display:none;width:0px;height:0px;';
    iframe.onload = iframe.onreadystatechange = function () {
      if (typeof (callback) != 'function') {
        return;
      }
      if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
        callback();
        iframe.onload = iframe.onreadystatechange = null;
      }
    };
    body.appendChild(iframe);
  },
  setScrollTop(el) {
    let ctop = $(el || window).scrollTop() || 0;
    console.log('首页位置记录：' + ctop);
    store.dispatch('updateScrollTop', ctop)
  },
  changeScrollTop(el) {
    if (store.state.app.fromRouterKey != 'item') {
      $('body,html').animate({ scrollTop: 0 }, 100);
      return;
    }
    let ctop = store.state.app.bodyScrollTop;
    console.log('首页位置读取：' + ctop);
    $(el || 'body,html').animate({ scrollTop: ctop }, 100);
    // console.log(store.state.app.bodyScrollTop);
    store.dispatch('updateScrollTop', 0)
    // console.log(store.state.app.bodyScrollTop);
  },
  jsonTryParse(_jsonString) {
    try {
      if (!_jsonString)
        return null;
      return JSON.parse(_jsonString) || null;
    } catch (e) {
      return null;
    }
  },
  openApp(downloadUrl) {
    var ua = navigator.userAgent.toLowerCase();
    var wx = ua.indexOf("micromessenger") > -1;
    var ip = /iphone|ipad|ipod/.test(ua);
    var and = /android/.test(ua);

    if (ip) {
      window.location.href = downloadUrl;
      console.log("iphone", downloadUrl);
    } else if (wx) {
      window.location.href = downloadUrl;
      console.log("wechat", downloadUrl);
    } else if (and) {
      var su = "lifevc://home";
      var n = setTimeout(function () {
        console.log('setTimeout', downloadUrl)
        window.location.href = "http://d.lifevc.cn/android";
      }, 500);

      var r = document.createElement("iframe");
      r.onload = function () {
        console.log('iframe load')
        clearTimeout(n);
        r.parentNode.removeChild(r);
        window.location.href = su;
      };

      r.src = su;
      r.setAttribute("style", "display:none;");
      document.body.appendChild(r);
      console.log("android");
    } else {
      window.location.href = "http://d.lifevc.cn/";
    }
  },
  cloneAndEncode(data, isencode) {
    var result = {};
    for (var i in data) {
      if (data.hasOwnProperty(i)) {
        if (isencode) {
          result[i] = encodeURIComponent(data[i]);
        }
        else {
          result[i] = data[i];
        }
      }
    }
    return result;
  },
  //点击统计
  clickAction(option) {
    try {
      var data;
      option = option || {};
      var platform = 'h5';
      if (this.isAndroid()) {
        platform = 'android';
      } else if (this.isIos()) {
        platform = 'ios';
      }
      data = {
        name: option.name || '',
        type: option.type || -1,
        userid: store.state.user.userId || 0,
        platform: platform,
        targeturl: option.targeturl || ''
      };
      http.postString(config.appUrl + '/v_h5_5.1.2_33/clicklocation/log', data, function (result) {
        console.log(result);
      });
    } catch (error) {
      console.log('==========================');
      console.log('首页统计接口请求失败，参数：');
      console.log(data);
      console.log("错误信息：");
      console.log(error);
      console.log('==========================');
    }

  }
}
