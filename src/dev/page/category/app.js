import Vue from 'vue'

import category from './category.vue'

// import 'swiper/dist/css/swiper.css';
// require('lifeStyle.css');

const VueResource = require('vue-resource');
Vue.use(VueResource);
var vm = new Vue({
	  el:'#category',
	  data:{
		hello:'aaa'
	  },
	  template: '<category/>',
	  components: {category}

})