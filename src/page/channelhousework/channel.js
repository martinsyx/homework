import Vue from 'vue';

import VueResource from 'vue-resource';//http请求
import VueLazyload from "vue-lazyload"; //懒加载
// import ElementUI from 'element-ui';
import channelhousework from '../channel/channel.vue';
import channelItem from '../channel/channelItem.vue';
import config from '../../config/config.js';
Vue.component("v-channel-item", channelItem);

Vue.use(VueLazyload, {
  loading: config.loadingImg
});
Vue.use(VueResource);

var vm = new Vue({
	  el:'#channelhousework',
	  data:{
		  url:
		//   "http://app.lifevc.com/1.0/v_h5_5.1.2_33/Categories/Category?itemIndexId=2860&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true"
			  "http://app.lifevc.com/1.0/v_h5_5.1.2_33/Categories/Category?itemIndexId=2861&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true"
		},
	  template: '<channelhousework :path="url"/>',
	  components: {channelhousework}

})