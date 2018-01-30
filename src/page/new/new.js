import Vue from 'vue';

import VueResource from 'vue-resource';//http请求
import VueLazyload from "vue-lazyload"; //懒加载
// import ElementUI from 'element-ui';
import newpage from './new.vue';
import newItem from './newItem.vue';
import config from '../../config/config.js';
Vue.component("v-new-item", newItem);

Vue.use(VueLazyload, {
  loading: config.loadingImg
});
Vue.use(VueResource);
var vm = new Vue({
	  el:'#newpage',
	  data:{
	  },
	  template: '<newpage/>',
	  components: {newpage}

})