import Vue from 'vue';

import VueResource from 'vue-resource';//http请求
import VueLazyload from "vue-lazyload"; //懒加载
import ElementUI from 'element-ui';
import activity from './activity.vue';
// debugger;
// Vue.use(ElementUI)

Vue.use(VueLazyload, {
  loading: "../../images/itemdefault1.png"
});
Vue.use(VueResource);
var vm = new Vue({
	  el:'#activity',
	  data:{
		hello:'aaa'
	  },
	  template: '<activity/>',
	  components: {activity}

})