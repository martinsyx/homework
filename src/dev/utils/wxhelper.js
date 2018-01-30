import config from 'config'
import common from './common'
var _state="wxAuthUrl2";
var _openIdKey='openId';
var _enableWxPayKey='isEnableWxJsApiPay2';
export default {
    initWeiXin:function(callback){
        // var wxmoment='https://wximg.qq.com/wxp/libs/wxmoment/0.0.6/wxmoment.min.js';
        // common.dynamicLoadJs(wxmoment,function(){
        //     new WxMoment.OrientationTip();
        // })
        //注册微信js
        sessionStorage.removeItem('wxConfig');
        var initwxurl=config.mobileSite+'/WeChat/InitWx?v='+Date.now()
        common.dynamicLoadJs(initwxurl,callback)
        // var wxsdkurl="http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
        // var initwxurl=config.mobileSite+'/WeChat/InitWx?v='+Date.now()
        // common.dynamicLoadJs(wxsdkurl,function(){
        //     common.dynamicLoadJs(initwxurl,function(){
        //     })
        // })
    },  
    configWx(obj){
        let self=this;
            var wxconfig=JSON.parse(sessionStorage.getItem('wxConfig'));
            if(wxconfig!=null){
                wx.config(wxconfig);                
                setTimeout(()=>{
                    wx.ready(function(){
                        wx.onMenuShareTimeline(obj);
                        wx.onMenuShareAppMessage(obj);
                    })
                    
                },500)
            }
            else{
                setTimeout(()=>{
                    wxconfig=JSON.parse(sessionStorage.getItem('wxConfig'))
                    if(wxconfig==null){
                        self.initWeiXin(function(){
                            self.configWx(obj);
                        })
                    }
                    else{
                        wx.config(wxconfig);
                        setTimeout(()=>{
                            wx.ready(function(){
                                wx.onMenuShareTimeline(obj);
                                wx.onMenuShareAppMessage(obj);
                            })
                        },500)
                        
                    }
                },500)
            }
    },  
    getOpenId(){
        return common.getCookie(_openIdKey)||'';
    },
    setOpenId(openId,state){
        common.setCookie(_openIdKey,openId,null);
        var url=common.getCookie(_state)||'/';
        if(url.indexOf('/inner/')==0){
            url='/inner/'+encodeURIComponent(url.replace('/inner/',''))
        }
        common.setCookie(_state,'none',null);
        return url=='none'?'/':url;
    },
    goAuth(){
        if(!common.isWeixin()){
            return;
        }
        if(!this.isEnableWxJsApiPay()){
            return;
        }
        if(location.host.split('.')[1]!='lifevc'){
            return;
        }
        if(common.getCookie(_openIdKey)){
            return;
        }
        if(common.getCookie(_state)=='none'){
            return;
        }
        var _hash = window.location.hash;
        if (_hash) {
            var substr = _hash.substr(1);
            substr = substr.split("#")[0]||'/';
            common.setCookie(_state,substr,null);
            //创建授权
            if(window!=parent){
                parent.location.href='http://m.lifevc.com/WeChat/WxSign?state='+_state;
            }
            else{
                window.location.href='http://m.lifevc.com/WeChat/WxSign?state='+_state;
            }
        }
    },
    setEnableWxJsApiPay(enable){        
        common.setCookie(_enableWxPayKey,enable,null);
    },
    isEnableWxJsApiPay(){
        return common.getCookie(_enableWxPayKey)=='true'
    },
    chooseWXPay(wxData,successCallback,errorCallback){
        if(typeof(wx)=='undefinde')
            return;
         wx.chooseWXPay({
            "appId":wxData.appId,     //公众号名称，由商户传入     
            "timestamp":wxData.timeStamp,         //时间戳，自1970年以来的秒数     
            "nonceStr":wxData.nonceStr, //随机串     
            "package":wxData.package,
            "signType":"MD5",         //微信签名方式：     
            "paySign":wxData.paySign,//微信签名 
            success:function (res) {
                if(res.errMsg=="chooseWXPay:ok"){
                    if(typeof(successCallback)=='function')
                        successCallback(res);
                }
                else{
                    if(typeof(errorCallback)=='function')
                        errorCallback(res)
                }
            }
        })
    },
    setWxPayRedirect(url){
        common.setCookie('usertoken',common.getUserToken(),null)
        common.setCookie('wxPayRedirect',url,null);
    }
}