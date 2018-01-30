import Vue from 'vue';

import VueResource from 'vue-resource';//http请求
import VueLazyload from "vue-lazyload"; //懒加载
// import ElementUI from 'element-ui';
import channelwash from '../channel/channel.vue';
import channelItem from '../channel/channelItem.vue';
import config from '../../config/config.js';
Vue.component("v-channel-item", channelItem);

Vue.use(VueLazyload, {
  loading: config.loadingImg
});
Vue.use(VueResource);

var vm = new Vue({
	  el:'#channelwash',
	  data:{
		  url:"http://app.lifevc.com/1.0/v_h5_5.1.2_33/Categories/Category?itemIndexId=3526&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true"
	  },
	  template: '<channelwash :path="url"/>',
	  components: {channelwash}

})