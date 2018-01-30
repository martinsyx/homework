import Vue from 'vue'
// import home from './page/home/home.vue'
// import category from './page/category/category.vue';
// import 'swiper/dist/css/swiper.css';

// import 'element-ui/lib/theme-chalk/index.css';
//根据页面的DOM Id加载vueJs文件
const VueResource = require('vue-resource');
Vue.use(VueResource);
import loader from './dev/api/loader.js';
//全部商品
loader('category',function(){require('./page/category/app.js')});

loader('home',function(){require('./page/home/home.js')});
//全部商品
loader('activity',function(){require('./page/activity/activity.js')});