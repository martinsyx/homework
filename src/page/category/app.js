import Vue from 'vue';
import category from './category.vue';
import VueResource from 'vue-resource';//http请求
import VueLazyload from "vue-lazyload"; //懒加载
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueLazyload, {
  loading: "../../images/itemdefault1.png"
});
Vue.use(VueResource);
var vm = new Vue({
	  el:'#category',
	  data:{
		hello:'aaa'
	  },
	  template: '<category/>',
	  components: {category}

})