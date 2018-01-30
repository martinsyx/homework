import Vue from 'vue';

import VueResource from 'vue-resource';//http请求
import VueLazyload from "vue-lazyload"; //懒加载
// import ElementUI from 'element-ui';
import returnOrder from './returnOrder.vue';
import config from '../../config/config.js';

Vue.use(VueLazyload, {
  loading: config.loadingImg
});
Vue.use(VueResource);
var vm = new Vue({
	  el:'#returnOrder',
	  data:{
	  },
	  template: '<return-Order/>',
	  components: {returnOrder}

})