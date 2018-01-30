import Vue from 'vue';

import VueResource from 'vue-resource';//http请求
import VueLazyload from "vue-lazyload"; //懒加载
// import ElementUI from 'element-ui';
import channelSub from './channelSub.vue';
import channelItem from './channelItem.vue';
import config from '../../config/config.js';
Vue.component("v-channel-item", channelItem);

Vue.use(VueLazyload, {
  loading: config.loadingImg
});
Vue.use(VueResource);

var vm = new Vue({
	  el:'#channelSub',
	  data:{
	  },
	  template: '<channel-Sub/>',
	  components: {channelSub}

})