<template>
  <div>
      <div class="wrap-shelf">
          <v-channel-item v-for="item in Items" :item="item" style="width:100%"></v-channel-item>
        </div>
  </div>
</template>
<script>
import config from '../../config/config.js';
export default {
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
      Items:[],
      ceoTitle:{},
      DesignerMessageImg:"",
      Categories:[],
    };
  },
  created() {
      console.log('config.url',config.cndURL);
    let self = this;
    this.getActiveData().then(
      function(result) {
        
        self.data = result.body.InnerData;
          self.Items=result.body.InnerData.CEORecommends;
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
    getActiveData() {
      var self = this;
      return new Promise((resolve, reject) => {
        var url =
          // "http://app.lifevc.com/1.0/v_h5_5.1.2_33/Categories/Category?itemIndexId=2859&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true";
          "http://app.lifevc.com/1.0/v_h5_5.1.2_33/Categories/Category?itemindexid=2859&filter=3576&sort=2&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true"
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
.subcat-title {
  max-width: 96%;
  text-align: center;
  font-size: 1.9em;
  color: #000;
  line-height: 2em;
  margin: 0 auto -1.2em;
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
.life-goodsUl {
    background: #fff;
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
</style>