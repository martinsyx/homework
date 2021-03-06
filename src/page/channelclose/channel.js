import Vue from 'vue';

import VueResource from 'vue-resource';//http请求
import VueLazyload from "vue-lazyload"; //懒加载
// import ElementUI from 'element-ui';
import channelclose from '../channel/channel.vue';
import channelItem from '../channel/channelItem.vue';
import config from '../../config/config.js';
Vue.component("v-channel-item", channelItem);

Vue.use(VueLazyload, {
  loading: config.loadingImg
});
Vue.use(VueResource);

var vm = new Vue({
	  el:'#channelclose',
	  data:{
		url:"http://app.lifevc.com/1.0/v_h5_5.1.2_33/Categories/Category?itemIndexId=2865&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true"
		// 	'http://app.lifevc.com/1.0/v_h5_5.1.2_33/Categories/Category?itemIndexId=2859&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true'

	  },
	  template: '<channelclose :path="url"/>',
	  components: {channelclose}

})