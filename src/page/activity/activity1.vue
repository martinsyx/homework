<template>
  <div style="position: relative;">
    <!-- <article v-fix-ios class="middle middle-commoditylist" id="activitycontent"> -->
      <!-- 两列 -->
      <div class="wrap_bot" v-if="showItemType==2" style="position: absolute; width: 100%;  height: 581.531px; overflow-y: scroll;">
        <!-- 两列组合图 -->
        <!-- <img style="width: 100%" v-for="item in data.HeaderBanners" v-lazy="cdnRUL+item.ImageUrl" />  -->
        <div>
          <ul style="list-style-type: none;padding: 0;margin: 0;display:block;overflow: hidden;white-space:nowrap">
            <li v-for="shelf,index in menuList" style="display: inline-block;margin-left:15px;list-style: none;">{{shelf.Text}}</li>
          </ul>
        </div>
        <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
          </el-menu> -->
        <!-- <div v-for="shelf,index in data.Shelves" :id="'idfor'+shelf.ShelfId"> -->
          <!-- {{shelf.CombinationChart}} -->
          <!-- <div class="head_banner" v-for="item in shelf.HeaderBanners"> -->
            <!-- <img :src="$options.filters.imgAuto(item.ImageUrl)"> -->
            <!-- {{item.CombinationChart}} -->
          <!-- </div> -->

          <div v-for="(shelf,index) in currentList">
              <div v-if="shelf.CombinationChart==0">
              <div  v-for="item in shelf.Items"  class="wrap_item">
                 <!-- {{item.ImageUrl}} -->
                <a  class="item-pic-bx">
                 
                    <img v-lazy="cdnRUL+item.ImageUrl" class="item-pic" />
                    <div v-show="item.IsEmpty" class="item-status-empty">
                        {{item.IsPotter ? "售罄" : "热卖脱销"}}
                    </div>
                </a>
                <div class="item-panel">
                    <div class="title clearFix">
                    </div>
                    <div class="item-price">
                        <div class="price-cont">
                            <span class="act-tag" v-show="item.ActivityTag">{{item.ActivityTag}}</span>
                            <span class="">￥</span>
                            <span class="">{{(item.ActivityPrice>0?item.ActivityPrice:item.SalePrice) }}</span>&nbsp;
                            <span class="original-price">{{(item.ActivityPrice>0?"￥"+item.SalePrice:"") }}</span>
                            <span class="promo-lable" v-show="item.PriceTag && item.ActivityTag!=item.PriceTag">{{item.PriceTag}}</span>
                        </div>
                        <div class="item-comment">评论：{{item.CommentCount}}</div>
                    </div>
                </div>
              </div>
              </div>
          </div>

          <!-- <div class="wrap_list clearfixed">
            <ul>
              <li v-for="item in shelf.Items" @click="openItem(item.ItemInfoId)">
                <div class="picture">
                  <img  :style="{height:imgHeight}">
                  <p class="promt_state" v-show="item.IsEmpty" v-text="item.IsPotter?'售罄':'热卖脱销'"></p>
                  <p class="promt_state_mask" v-show="item.IsEmpty"></p>
                </div>
                <p class="commodity_name">{{item.Name}}</p>
                <p class="price">
                  <span class="present">￥
                    <span>{{(item.ActivityPrice > 0 ? item.ActivityPrice : item.SalePrice) }}</span>
                  </span>
                  <del class="original">{{(item.ActivityPrice > 0 ? "￥" + item.SalePrice : "") }}</del>
                  <span class="discount" v-show="item.ActivityTag&&!item.PriceTag">{{item.ActivityTag}}</span>
                  <span class="give" v-show="item.PriceTag!=''">{{item.PriceTag}}</span>
                </p>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
      <!-- <v-gotop></v-gotop> -->
    <!-- </article> -->
  <!-- </div> -->
</template>
<script>
// import activityService from '../../api/activityService'
// import $ from 'jquery'
// import bus from '../../utils/IframeBus'//新增 分享回调
// import cache from '../../utils/cache.js'
// import common from '../../utils/common'//app判断 新增
// import share from '../../components/Share'//分享组件调用 新增
// import {
//   mapState
// } from 'vuex'//信息管理 新增
import Vue from "vue";
export default {
  data() {
    return {
      code: "",
      data: {},
      showLoading: true,
      showItemType: 2,
      cdnRUL: "http://i1.lifevccdn.com/",
      menuList: [],
      menuwith: "25%",
      currentType: "",
      currentList:[],
      //   isApp: common.isApp(),//新增
    };
  },
  // computed: mapState({
  //   shareData: state => state.app.shareData//新增
  // }),
  created() {
    let self = this;
    // this.fetchData();
    this.getActiveData().then(
      function(result) {
        self.data = result.body.InnerData;
        self.showloading = false;
        self.menuList = self.getMenu(self.data.Shelves);
        self.currentType = self.getInitType(self.data.Shelves);
        self.currentList = self.getCuttentList(self.data.Shelves,self.currentType);
        console.log('self.currentList',self.currentList);


        // debugger;
        switch (self.menuList.length) {
          case 2:
            self.menuwith = "50%";
            break;
          case 3:
            self.menuwith = "33.3%";
            break;
          case 4:
            self.menuwith = "25%";
            break;
          default:
            self.menuwith = "20%";
            break;
        }
      },
      error => {
        // Toast(error);
        self.showloading = false;
      }
    );
  },
  watch: {
    $route: "fetchData"
  },
  mounted() {
    //新增
    let that = this;
    this.$nextTick(() => {
      let data = {
        description: "",
        imageUrl: "",
        title: "",
        url: ""
      };
      // this.$store.dispatch('showShareInner', data);
    });
  },
  methods: {
    getMenu(arr) {
      let list = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].CombinationChartType == 0) {
          list.push(arr[i].Title);
        }
      }
      return list;
    },
    getInitType(arr){
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].CombinationChartType == 0) {
          return arr[i].ShelfId;
        }
      }
    },
    getCuttentList(arr,currentType){
      let list = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].ShelfId == currentType) {
          list.push(arr[i]);
        }
      }
      return list;
    },
    getActiveData() {
      var self = this;
      // debugger;
      return new Promise((resolve, reject) => {
        var url =
          "http://app.lifevc.com/1.0/v_h5_5.1.2_33/activities/ActivityShelf?newshow=true&isShowTwo=false&code=ExhTopicYearendcoupons&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true";
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
    appShareInfo() {
      //新增
      let that = this;
      //   let data = {
      //     description: document.title||'丽芙家居',
      //     imageUrl: 'http://i.lifevccdn.com' + that.data.HeaderBanners[0].ImageUrl || '',
      //     title: document.title||'丽芙家居',
      //     url: "http:///w1.lifevc.com/h5/#/activity/activityshelfv2/" + this.code,
      //   }
      //   console.log(data, 1111)
      //   this.$store.dispatch('showShareInner', data);
      var shareInfo = this.shareData;
      var shareLink = shareInfo.url;
      var shareTitle = shareInfo.title;
      var shareContent = shareInfo.description;
      var shareimageLink = shareInfo.imageUrl;

      helper.setShare({
        showMask: false,
        link: shareLink,
        shareTitle: shareTitle,
        shareContent: shareContent,
        imagelink: shareimageLink
      });
    },
    openItem(id) {
      // common.setScrollTop(this.scrollEl);
      this.$options.filters.openItem(id);
    },
    fetchData() {
      let self = this;
      self.data = {};
      self.showLoading = true;
      self.code = this.$route.params.code;
      console.log(self.code);
      if (self.$options.filters.checkOldApp() == false) {
        self.$nextTick(() => {
          if (document.getElementById("headerid"))
            document.getElementById("headerid").style.display = "block";
          if (document.getElementById("activitycontent"))
            document.getElementById("activitycontent").style["margin-top"] =
              "4rem";
        });
      } else {
        if (document.getElementById("activitycontent"))
          document.getElementById("activitycontent").style["margin-top"] =
            "0rem";
      }
      activityService
        .getActivityShelfByCode(self.code, null, self.$route.query.st)
        .then(
          resp => {
            self.showLoading = false;
            self.showItemType = resp.InnerData.ShowItemType;
            if (resp && resp.InnerData) {
              self.data = resp.body.InnerData;
              document.title = self.data.Title;
              var scrollTop = cache.get("activityshelf2ScrollTop" + self.code);
              console.log("滚动距离：" + scrollTop);
              if (scrollTop != -999) {
                self.$nextTick(function() {
                  $("body,html").animate({ scrollTop: scrollTop }, 100);
                  cache.set("activityshelf2ScrollTop" + self.code, -999);
                });
              } else {
                // common.changeScrollTop();
              }
            }
          },
          error => {
            self.showLoading = false;
          }
        );
      //   if (common.isWeixin()) {
      //     self.appShareInfo()
      //   }
    },
    coords: function(w, h, t) {
      return common.coords(w, h, t);
    },
    openChart(item) {
      var self = this;
      // common.setScrollTop();
      // console.log('滚动距离90909：' + $(window).scrollTop() + 'activityshelf2ScrollTop' + self.code)
      cache.set("activityshelf2ScrollTop" + self.code, $(window).scrollTop());
      this.$options.filters.open(item.Uri);
    }
  }
};
</script>
<style scoped>
#headerid {
  display: none;
}

/* 一行两列 */

.clearfixed {
  overflow: hidden;
}

.head_banner {
  width: 100%;
  height: auto;
}

.head_banner img {
  width: 100%;
}

.wrap_bot {
  padding-bottom: 2rem;
  width: 100%;
  height: auto;
}

.wrap_list {
  width: 100%;
  height: auto;
}

.wrap_list ul {
  width: 98%;
  height: auto;
  margin-left: 0.5%;
}

.wrap_list ul li {
  position: relative;
  height: auto;
  width: 48%;
  float: left;
  margin-left: 1.4%;
  height: auto;
  border: 1px solid #ccc;
  margin-top: 2.6%;
}

.wrap_list .picture {
  width: 100%;
  height: auto;
  position: relative;
}

.wrap_list .picture img {
  width: 100%;
  height: 176px;
}

@media screen and (max-width: 320px) {
  .wrap_list .picture img {
    height: 150px;
  }
}

@media screen and (min-width: 414px) {
  .wrap_list .picture img {
    height: 194px;
  }
}

.wrap_list .promt_state {
  position: absolute;
  width: 100%;
  height: 2.4rem;
  bottom: 0;
  left: 0;
  color: #fff;
  text-align: center;
  line-height: 2.4rem;
  z-index: 2;
  font-size: 1.4rem;
}

.wrap_list .promt_state_mask {
  position: absolute;
  width: 100%;
  height: 2.4rem;
  bottom: 0;
  z-index: 1;
  background: #000;
  opacity: 0.5;
}

.wrap_list .commodity_name {
  font-size: 1.4rem;
  color: #333;
  line-height: 1.6rem;
  margin: 0 auto;
  width: 92%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.6rem;
  margin-bottom: -2px;
}

.wrap_list .price {
  font-size: 1.4rem;
  margin-left: 2.4%;
  font-weight: normal;
  position: relative;
  height: 26px;
  overflow: hidden;
}

.wrap_list .price .present {
  color: #000;
  font-size: 1.4rem;
}

.wrap_list .price .present span {
  margin-left: -2px;
  font-size: 1.4rem;
}

.wrap_list .price .original {
  color: #999;
  margin-left: 2px;
  font-size: 1.4rem;
}

.wrap_list .price .discount {
  background: #ffd312;
  margin-left: 2px;
  padding: 0 2px;
  font-size: 1.18rem;
}

.wrap_list .price .give {
  background: #cc0000;
  color: #fff;
  margin-left: 2px;
  padding: 0 2px;
  font-size: 1.18rem;
}

@media screen and (min-width: 414px) {
}

@media screen and (max-width: 320px) {
  .wrap_list ul li {
    width: 47.8%;
  }
  .wrap_list .promt_state {
    font-size: 1.2rem;
  }
  .wrap_list .commodity_name {
    font-size: 1.2rem;
  }
  .wrap_list .price {
    font-size: 1.2rem;
  }
  .wrap_list .price .discount {
    font-size: 1rem;
  }
  .wrap_list .price .give {
    font-size: 1rem;
  }
}

.nav-panel .nav li a {
  height: 100%;
}
 .shelf-item .item-layer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 8;
    }
    
    .shelf-item .item-layer label {
        display: block;
        width: 100%;
        height: 100%;
    }
    
    .item-r1 {
        margin: 1rem;
    }

    .wrap_item {
        position: relative;
        width: 48%;
        float: left;
        margin-left: 1.4%;
        height: auto;
        border: 1px solid #ccc;
        margin-top: 2.6%;
    }
</style>