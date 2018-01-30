import $ from 'jquery';
import store from '../store'
import config from 'config'
import common from './common'
import wxhelper from './wxhelper'
return;
class Http {
    constructor() {
        $.ajaxSetup({
            crossDomain: true,
            global: true,
            dataType: 'json'
        })

        $.support.cors = true;

        $(document).ajaxStart(function (e) {
            //console.log('ajaxStart')

        })

        $(document).ajaxComplete(function () {
            //console.log('ajaxComplete')
        })
    }

    get(url, data,cache) {
        data = data || {}
        data.o = config.origin;
        data.NewCartVersion = true;//标识为新版
        let headers = common.getHeaders();
        let self = this;
        url = common.changeUrlsi(url);
        return new Promise((resolve, reject) => {
            if(cache==false){
                self.ajax({ type: 'GET', url: url, data: data, headers: headers,cache:false}).then(result => {
                    resolve(result)
                }, error => {
                    reject(error)
                })
            }
            else{
                self.ajax({ type: 'GET', url: url, data: data, headers: headers}).then(result => {
                    resolve(result)
                }, error => {
                    reject(error)
                })
            }
        })
    }

    post(url, data) {
        data = data || {}
        // if(common.isWeixin()){
        //     data.openId=wxhelper.getOpenId();
        // }
        data.o = config.origin;
        let headers = common.getHeaders();
        let self = this;
        url = common.changeUrlsi(url);
        return new Promise((resolve, reject) => {
            self.ajax({ type: 'POST', url: url, data: data, headers: headers }).then(result => {
                resolve(result)
            }, error => {
                reject(error)
            })
        })
    }

    postString(url, data) {
        data = data || {}
        // if(common.isWeixin()){
        //     data.openId=wxhelper.getOpenId();
        // }
        data.o = config.origin;
        data = "=" + JSON.stringify(data);
        let headers = common.getHeaders();
        let self = this;
        url = common.changeUrlsi(url);
        return new Promise((resolve, reject) => {
            self.ajax({ type: 'POST', url: url, data: data, headers: headers }).then(result => {
                resolve(result)
            }, error => {
                reject(error)
            })
        })
    }

    ajax(data) {
        return new Promise((resolve, reject) => {
            data.timeout = 10000; //10s
            $.ajax(data).then(result => {
                resolve(result)
            }, error => {
                reject(error)
            })
        })
    }
}

let http = new Http();
export default http;