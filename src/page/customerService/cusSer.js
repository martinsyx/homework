import Vue from 'vue';

import VueResource from 'vue-resource';//http请求
import VueLazyload from "vue-lazyload"; //懒加载
// import ElementUI from 'element-ui';
import cusser from './cusSer.vue';
import cusSerItem from './cusSerItem.vue';
import config from '../../config/config.js';
Vue.component("v-custome-item", cusSerItem);

Vue.use(VueLazyload, {
  loading: config.loadingImg
});
Vue.use(VueResource);
var vm = new Vue({
	  el:'#cusSer',
	  data:{
	  },
	  template: '<cusser/>',
	  components: {cusser}

})