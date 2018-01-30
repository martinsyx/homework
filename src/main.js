import Vue from 'vue'
// import home from './page/home/home.vue'
// import category from './page/category/category.vue';
// import 'swiper/dist/css/swiper.css';

// import 'element-ui/lib/theme-chalk/index.css';
//根据页面的DOM Id加载vueJs文件


// const VueResource = require('vue-resource');
// Vue.use(VueResource);
import loader from './dev/api/loader.js';
//全部商品
loader('category',function(){require('./page/category/app.js')});
//闲逛
loader('stroll',function(){require('./page/stroll/stroll.js')});

loader('home',function(){require('./page/home/home.js')});
//全部商品
loader('activity',function(){require('./page/activity/activity.js')});

//新品
loader('newpage',function(){require('./page/new/new.js')});
//channel
loader('channel',function(){require('./page/channel/channel.js')});
loader('channelBed',function(){require('./page/channelBed/channel.js')});
loader('channelcooking',function(){require('./page/channelcooking/channel.js')});
loader('channelwash',function(){require('./page/channelwash/channel.js')});
loader('channelhousework',function(){require('./page/channelhousework/channel.js')});
loader('channelclose',function(){require('./page/channelclose/channel.js')});
loader('credits',function(){require('./page/usercenterCredits/credits.js')});


//channelSub channelwash

// loader('channelSub',function(){require('./page/channelSub/channelSub.js')});

// 售后服务
loader('cusSer',function(){require('./page/customerService/cusSer.js')});
//channel returnOrder
//退货进程
// loader('returnOrder',function(){require('./page/returnOrder/returnOrder.js')});
