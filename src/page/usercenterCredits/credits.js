import Vue from 'vue';

import VueResource from 'vue-resource';//http请求
import VueLazyload from "vue-lazyload"; //懒加载
// import ElementUI from 'element-ui';
import credits from './credits.vue';
// import channelItem from './channelItem.vue';
import config from '../../config/config.js';
// Vue.component("v-channel-item", channelItem);

Vue.use(VueLazyload, {
  loading: config.loadingImg
});
Vue.use(VueResource);

var vm = new Vue({
	  el:'#credits',
	  data:{
		  url: 'http://newapi.lifevc.com/1.0/v_h5_5.1.2_33/usercenters/MyIntegrals?pageNo=1&pageSize=20&si=WohAuMXMSgcUzHDUw47d69TiWzGip0AupXhALgZ+V+1dh+BUaqDFDklGO5zPzSMiZzDQvmBKgl0=&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true',
	  },
	  template: '<credits :path="url"/>',
	  components: {credits}

})