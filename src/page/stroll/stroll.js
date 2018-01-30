import Vue from 'vue';

import VueResource from 'vue-resource';//http请求
import VueLazyload from "vue-lazyload"; //懒加载
// import ElementUI from 'element-ui';
import stroll from './stroll.vue';
import StrollItem from './StrollItem.vue'

Vue.component("v-stroll-item", StrollItem);
Vue.use(VueLazyload, {
  loading: "../../images/itemdefault1.png"
});
Vue.use(VueResource);
var vm = new Vue({
	  el:'#stroll',
	  data:{
	  },
	  template: '<stroll/>',
	  components: {stroll}

})