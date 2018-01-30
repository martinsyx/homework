import Vue from 'vue';
var app =new Vue();
export default {
    genGuid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    },

    getActiveData(url) {
        var self = app;
        debugger;
        return new Promise((resolve, reject) => {
            self.$http.get(url).then(
                function (result) {
                    resolve(result);
                },
                function (error) {
                    reject(error);
                }
            );
        });
    },

}