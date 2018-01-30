

import Vue from 'vue'
import home from './home.vue'

import 'swiper/dist/css/swiper.css';

const VueResource = require('vue-resource');

Vue.use(VueResource);
var vm = new Vue({
    el:'#home',
    data:{
      hello:'aaa'
    },
    template: '<home/>',
    components: {home}

})