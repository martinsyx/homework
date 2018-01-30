<template>
  <div class="container">
 <div style="max-width: 640px;margin: 0 auto;">
        <!-- 图片轮播 -->
         <swiper :options="swiperOption" ref="mySwiper" style="min-height: 250px;">
               <div class="swiper-slide" v-for="banner in banners" >
              <img v-bind:src="cdnRUL+banner.ImageUrl" @click="gotobannerUrl(banner)" style="width:100%;min-height:270px;">
               </div>
              <div class="swiper-pagination" slot="pagination" ></div>
              <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
              <!-- <div class="swiper-button-next" slot="button-next"></div> -->
            </swiper> 

              <div>
                 <img v-lazy="cdnRUL+ShortCuts.ImageUrl" usemap="#ShortCuts" style="width:100%;">
                 <map name="ShortCuts" id="ShortCuts" >
                  <area shape="rect" :coords="coords(ShortCuts.ImageWidth,ShortCuts.ImageHeight,item)" @click="openChart(item)" v-for="item in ShortCuts.TouchElem" />
                </map>
               </div>

               <div v-for="(content,index) in contents" >
                 
                 <img v-bind:src="cdnRUL+content.ImageUrl" style="width: 100%;" :usemap="'#CombinationChart'+index">
                  <map :name="'CombinationChart'+index" :id="'CombinationChart'+index" >
                  <area shape="rect" :coords="coords(content.ImageWidth,content.ImageHeight,itme)" @click="openChart(itme)" v-for="itme in content.TouchElem" />
                </map>
                </div>

      <!-- <div id="loadingAlert" v-if="loading">
        <span id="homeLoadMoreLoadingText">数据加载中...</span>
      </div>
      <div id="__beianInfo__" v-if="!isApp" style="text-align:center;padding-bottom:6px;color:#999;display:none;">
        <p>上海丽芙家居用品有限公司版权所有&nbsp;&nbsp;沪ICP备11014656号</p>
        <p>
          <img src="../assets/images/beianbgs.png" alt="" width="14" style="vertical-align: -3px;padding-right: 2px;">沪公网安备&nbsp;31010402002103号</p>
      </div> -->

</div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';//轮播组件
import VueResource from 'vue-resource';//http请求
import VueLazyload from 'vue-lazyload';//懒加载

Vue.use(VueLazyload,{
  loading: "../../../images/itemdefault1.png",
})
Vue.use(VueResource);
Vue.use(VueAwesomeSwiper);

import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  name: 'home',
  data() {
    return {
      cdnRUL:'http://i1.lifevccdn.com/',
      //轮播图
      banners: [],
      //swiper组件配置项
      swiperOption: {
        autoHeight: true, //enable auto height
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      // 快捷入口
      ShortCuts:[],
      //组合图
      contents: [ ],
    }
  },
  mounted() {
    var vm=this;
    vm.contents=[];
    
    // var data=results.InnerData;
    // for(let i=0 ;i<data.length;i++){
    //   if(data[i].Type=='banner'){
        
    //     this.banners=data[i].InnerData;
    //   }
    //   if(data[i].Type=='ShortCut_2'){
    //     this.ShortCuts=data[i].InnerData;
    //   }
    //   if(data[i].Type=='CombinationChart'){
    //       this.contents.push(data[i].InnerData);
    //   }
    // };
    var url='http://app.lifevc.com/1.0/v_h5_5.1.2_33/contents/home_v2?o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true';
    this.$http.get(url).then((response) => {
        vm.contents=[];
        var data=response.body.InnerData;
        for(let i=0 ;i<data.length;i++){
          if(data[i].Type=='banner'){
            
            vm.banners=data[i].InnerData;
          }
          if(data[i].Type=='ShortCut_2'){
            vm.ShortCuts=data[i].InnerData;
          }
          if(data[i].Type=='CombinationChart'){
              vm.contents.push(data[i].InnerData);
          }
        };
      }, (response) => {
        // error callback
      });  
  },
  methods: {
    gotobannerUrl:function(item){
    // alert(item.Uri)
    // console.log(item);
    location.href = item.Uri; 
    },
    coords: function(w, h, t) {
      console.log(w, h, t);
      var imageWidth = (window.innerWidth);
      var imageHeight = imageWidth / parseFloat(w) * parseFloat(h);
      console.log(parseInt(t.BeginXP * imageWidth / 100.0) + "," + parseInt(t.BeginYP * imageHeight / 100.0) + "," + parseInt(t.EndXP * imageWidth / 100.0) + "," + parseInt(t.EndYP * imageHeight / 100.0))
      return parseInt(t.BeginXP * imageWidth / 100.0) + "," + parseInt(t.BeginYP * imageHeight / 100.0) + "," + parseInt(t.EndXP * imageWidth / 100.0) + "," + parseInt(t.EndYP * imageHeight / 100.0);
    },
    openChart(item) {
      // alert(item.Uri)
      location.href = item.Uri; 
    }
  },
   computed: {

      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
  components: {
    swiper,
    swiperSlide
  }
}

</script>
<style>
.container{
  margin:0;
}
</style>
