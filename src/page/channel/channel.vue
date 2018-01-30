<template>
  <div>
      <ul class="life-goodsUl clearFix life-child-thank" id="blockcartegory">
        <li v-for="c in Categories" >
          <a @click="setCategory(c)" class="categroy-link">
              <img class="DesignerMessageImg" :src="cdnRUL+c.CategoryImageUrl" alt="">
            <!-- <img v-lazy-src="{src:$options.filters.imgAuto(c.CategoryImageUrl),loading:$options.filters.imgAuto(),error:$options.filters.imgAuto()}"> -->
            <p class="titleName">{{c.Title}}</p>
          </a>
        </li>
      </ul>
      <div class="ceoRecommon">
      </div>
      <!-- <img :src="DesignerMessageImg" alt=""> -->
      <div class="wrap-shelf">
          <img class="DesignerMessageImg tite-img" :src="cdnRUL+DesignerMessageImg" alt="">
          <div class="subcat-title" v-show="Recommends.length>0"><p>{{ceoTitle.Text}}</p></div>
          <div class="down-line"></div>
          <v-channel-item v-for="item in Recommends" :item="item" style="width:100%"></v-channel-item>
          <!-- <div class="subcat-title" v-show="itemList.length>0"><p>{{ceoTitle.Text}}</p></div> -->
          <v-channel-item v-for="item in itemList" :item="item" style="width:100%"></v-channel-item>
        </div>
  </div>
</template>
<script>
import config from '../../config/config.js';
export default {
  props:['path'],
  data() {
    return {
      code: "",
      data: {},
      showLoading: true,
      showItemType: 2,
      cdnRUL: config.cndURL,
      menuList: [],
      menuwith: "25%",
      currentType: "",
      currentList:[],
      banner:{},
      bannerModel:"",
      weeklyItems:[],
      ceoTitle:{},
      DesignerMessageImg:"",
      Categories:[],
      Recommends:[],
      itemList:[],
    };
  },
  created() {
    // console.log(111,this.path);
    // debugger;
      // console.log('config.url',config.cndURL);
      let self = this;
      this.getActiveData().then(
      function(result) {
          self.data = result.body.InnerData;
          self.Recommends=result.body.InnerData.CEORecommends;
          self.ceoTitle = result.body.InnerData.CEORecommendTitle;
          self.DesignerMessageImg=result.body.InnerData.DesignerMessageImg;
          self.Categories = result.body.InnerData.Categories;
      },
      error => {
        self.showloading = false;
      }
    );
  },
  methods:{
    setCategory(item){
      // debugger;
      // console.log(item);
      // location.href = item.Uri; 
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      var obj={
        id:item.ItemIndexId,
        title:item.Title
      }
      if (isAndroid) {
      //   alert('isAndroid'+item.Code);
          window.OCmodel.gotoItem(obj);//调用原生方法
      }
      if (isiOS) {
      //   alert('isiOS'+item.Code);
          OCmodel.gotoItem(obj);//调用原生方法
      }
    },
    getActiveData(id) {
      var self = this;
      if(!this.path)
      {
        var url =
          "http://app.lifevc.com/1.0/v_h5_5.1.2_33/Categories/Category?itemIndexId=2859&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true";
      }else{
        var url = this.path;
      }
      return new Promise((resolve, reject) => {
        // var url =
        //   "http://app.lifevc.com/1.0/v_h5_5.1.2_33/Categories/Category?itemIndexId=2859&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true";
        self.$http.get(url).then(
          function(result) {
            resolve(result);
          },
          function(error) {
            reject(error);
          }
        );
      });
    },
  },
}
</script>
<style scoped>
.down-line{
    width:100%;
    background-color: white;
    border-top: 1px solid #e8e8e8;
    padding-top: 15px;

}
.subcat-title {
  /* margin-bottom: 12px; */
  background-color: white;;
  max-width: 100%;
  text-align: center;
  font-size: 1.9em;
  color: #000;
  line-height: 2em;
  /* margin: 0 auto -1.2em; */
  /* padding-bottom: 10px; */
  /* border-bottom: 1px solid #ddd; */
}

#loadingAlert {
  text-align: center;
  color: #888;
  ;
  padding-bottom: 16px;
}

.home-loadmore-spinner {
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
}
.DesignerMessageImg{
    width: 100%;
}
.titleName{
    line-height: 1.4rem;
    font-size: 1.4rem;

}
.life-goodsUl {
    background: #fff;
    margin-bottom: 10px;
    padding: 0 12px;
}
li, p, ul {
    padding: 0;
    margin: 0;
}
.life-child-thank li {
    width: 25%!important;
    margin: 1rem 0;
}
.life-goodsUl li {
    float: left;
    width: 33.3333%;
    text-align: center;
}
.life-goodsUl li a {
    display: block;
}
.life-goodsUl li a img {
    width: 80%;
    margin: auto;
}
.life-goodsUl li a dl {
    height: 2rem;
    line-height: 2rem;
    font-size: 1.3rem;
}
li, ul {
    list-style: none;
}

.clearFix:after {
    clear: both;
    overflow: hidden;
}
.clearFix:after, .clearFix:before {
    content: "";
    display: table;
}
a:not(.md-button):not(.md-bottom-bar-item):hover{
  text-decoration: none;
}
.categroy-link{
  color: #666;
  text-decoration: none!important;
} 

a:focus, a:hover {
    color: #222;
    text-decoration: none!important;
}
.tite-img{
  margin-bottom: 10px;
}
</style>