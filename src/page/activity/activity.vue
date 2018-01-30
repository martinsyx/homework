<template>
  <div class="container-bc" style="position: relative;">
      
      <div class="wrap_bot" v-if="showItemType==2" style="position: absolute; width: 100%;  overflow-y: scroll;">
        <!-- banner -->
        <div >
          <img v-lazy="cdnRUL+banner.ImageUrl" usemap="#banner" style="width:100%;" />
        <!-- <img src="planets.jpg" border="0" usemap="#banner" alt="Planets" /> -->

          <map name="banner" id="banner" >
            <area shape="rect" :coords="coords(bannerModel.ImageWidth,bannerModel.ImageHeight,item)" @click="openChart(item)" v-for="item in bannerModel.TouchElem" />
          </map>
        </div>
        <!-- 导航栏 -->
        <div id="selmenuDay" class="nav-classification nav-panel-nest" style="    margin-bottom: 1rem;" >
            <div id="MenusDay" class="nav-panel j-nav-panel">
              <ul class="nav j-nav" style="white-space:nowrap;overflow:hidden;">
                <li v-for="s in menuList" >
                  <a href="javascript:void(0);" @click="setCurrentType(s)">{{s.Text}}</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 两列组合图 -->
          <div v-for="(shelf,index) in currentList">
              <div v-if="shelf.CombinationChart==0">
              <div  v-for="item in shelf.Items"  class="wrap_item" >
                    <img v-lazy="cdnRUL+item.ImageUrl" class="item-pic" />
                    <div v-show="item.IsEmpty" class="item-status-empty">
                        {{item.IsPotter ? "售罄" : "热卖脱销"}}
                    </div>
              <div class="item-panel" @click="openItem(item.ItemInfoId)">
                <div class="title" style="margin: 5px 0px 5px;font-size:1.3rem;">{{item.Name}}</div>
                <div class="give-style">
                   <!-- <span class="act-give" v-if="item.PriceTag!=''">新</span> -->
                   <span class="act-tag" v-if="item.ActivityTag">{{item.ActivityTag}}</span>
                   <span class="act-give" v-if="item.PriceTag!=''">{{item.PriceTag}}</span>
                </div>
                
                <div class="item-price">
                  <div class="price-cont">
                    <!-- <span class="act-tag" v-if="item.ActivityTag">{{item.ActivityTag}}</span> -->
                    <!-- <span class="act-tag"  v-if="item.PriceTag">{{item.PriceTag}}</span> -->
                    <div class='price-item'>
                    <span class="" style="padding-left:0px; font-size:1.3rem">￥</span>
                    <span class="" style="font-size:1.3rem">{{(item.ActivityPrice > 0 ? item.ActivityPrice : item.SalePrice) }}</span>&nbsp;
                     <div class="item-comment" style="float:right;padding-right:5px;">评论：{{item.CommentCount}}</div>

                    <!-- <button class="addtochart" style="float:right;padding-right:35px;" onclick=""></button> -->
                    </div>
                  </div>
                </div>
              </div>
              <div style='clear:both'></div>
              </div>
              </div>
          </div> 

        </div>
      </div>
</template>
<script>
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
      banner:{},
      bannerModel:"",
    };
  },
  created() {
    let self = this;
    this.getActiveData().then(
      function(result) {
        self.data = result.body.InnerData;
        self.showloading = false;
        self.menuList = self.getMenu(self.data.Shelves);
        self.currentType = self.getInitType(self.data.Shelves);
        self.currentList = self.getCuttentList(self.data.Shelves,self.currentType);
        self.banner=self.getBanner(self.data.Shelves);
        self.bannerModel=self.banner.CombinationChartActivityViewModel;
        // self.bannerModel.TouchElem[0].Uri="www.baidu.com";
        // console.log('self.banner',self.banner);

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
        self.showloading = false;
      }
    );
  },
  watch: {
    $route: "fetchData",
    // banner:{
    //   deep:true
    // }
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
            arr[i].Title.ShelfId=arr[i].ShelfId;
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
    getBanner(arr){
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].CombinationChartType == 1) {
          arr[i].ImageUrl=arr[i].CombinationChartActivityViewModel.ImageUrl;
         
          
          return arr[i];
        }
      }
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
    setCurrentType(type){
        console.log(type,this.currentType);
        if(this.currentType!=type.ShelfId)
        {
          this.currentType=type.ShelfId
           this.currentList = this.getCuttentList(this.data.Shelves,type.ShelfId);

        }
        console.log(this.currentList);
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
      // var shareimageLink = shareInfo.imageUrl;

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
            // self.showLoading = false;
            // self.showItemType = resp.InnerData.ShowItemType;
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
      console.log(w, h, t);
      var imageWidth = (window.innerWidth);
      var imageHeight = imageWidth / parseFloat(w) * parseFloat(h);
      console.log(parseInt(t.BeginXP * imageWidth / 100.0) + "," + parseInt(t.BeginYP * imageHeight / 100.0) + "," + parseInt(t.EndXP * imageWidth / 100.0) + "," + parseInt(t.EndYP * imageHeight / 100.0)) 
      return parseInt(t.BeginXP * imageWidth / 100.0) + "," + parseInt(t.BeginYP * imageHeight / 100.0) + "," + parseInt(t.EndXP * imageWidth / 100.0) + "," + parseInt(t.EndYP * imageHeight / 100.0);
    },
    openChart(item) {
      // alert(1);
      // var self = this;
      // console.log(item);
      // common.setScrollTop();
      // console.log('滚动距离90909：' + $(window).scrollTop() + 'activityshelf2ScrollTop' + self.code)
      // cache.set("activityshelf2ScrollTop" + self.code, $(window).scrollTop());
      // this.$options.filters.open(item.Uri);
      location.href = item.Uri; 
      // window.
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
.item-panel{
  padding-left: 5px;
  padding-top: 5px;
}
.give-style{

}
.item-panel .give-style .give {
  /* padding: 5px; */
  background: #cc0000;
  color: #fff;
  margin-left: 2px;
  /* padding: 0 2px; */
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

/* .nav-panel .nav li a {
  height: 100%;
} */
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
        /* height: 100%; */
    }
    
    .item-r1 {
        margin: 1rem;
    }

    .wrap_item {
        position: relative;
        width: 50%;
        float: left;
        /* margin-left: 1.4%; */
        height: auto;
        /* border: 1px solid #ccc; */
        /* margin-top: 2.6%; */
        background-color: #fff;
        height:300px;
        /* padding-bottom: 10px; */
        border-bottom: 1px solid #eee;

    }

    .nav-classification{
      position: '-webkit-sticky';
      top: 0;
      /* z-index: 3; */
    }
    .nav-panel, .nav-panel-nest {
    width: 100%;
    /* height: 3.5rem; */
    
    }
    .nav-panel {
    text-align: center;
    overflow: hidden;
    overflow-x: auto;
    background-color: #fff;
    /* border-bottom: 1px solid #e9e9e9; */
    margin: 0 auto 10px;
    position: relative;
    left: 0;
    top: 0;
    padding-bottom: 10px;
    }
    .nav-panel .nav {
    /* height: 3.5rem; */
    overflow: hidden;
    float: left;
    /* line-height: 3.5rem; */
    position: relative;
    z-index: 19;
}
.nav-panel .nav li {
    /* height: 3.5rem; */
    display: inline-block;
    font-size: 1.6rem;
}
/*11111*/

.col {
  margin-bottom: 1rem;
}

.page-content {
  margin-top: 0;
  padding-bottom: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: relative;
  z-index: 1;
  width: 100%;
}

.countdown-wrap-nest {
  z-index: 9999;
  width: 100%;
  /*-webkit-transform: translateZ(0px);*/
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
  margin-left: .5%;
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
  opacity: .5;
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
  margin-top: .6rem;
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

@media screen and (min-width: 414px) {}

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
.wrap_list .price .give {
    background: #c00;
    color: #fff;
    margin-left: 2px;
    padding: 0 2px;
    font-size: 1.18rem;
}

.item-status-empty {
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
/* .j-nav-panel{
    overflow: hidden;
} */
::-webkit-scrollbar{
  display:none;
}

.nav>li>a:hover {
    text-decoration: none;
    background-color:rgba(255,255,255,0);
    color: #659983;
}

.nav>li>a{
  padding-top: 0;
  padding-bottom: 0;
}

.nav>li {
    border-right: #eee solid 2px
}
.wrap_bot{
  background-color: #eee!important;
}
.list-container{
  background-color: #ffffff!important;
}
.addtochart{
  background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTVENkI2REFFODhGMTFFNzhFNTNCNjMyNDQyODhBMzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTVENkI2REJFODhGMTFFNzhFNTNCNjMyNDQyODhBMzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNUI2ODE4OUU4OEYxMUU3OEU1M0I2MzI0NDI4OEEzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNUI2ODE4QUU4OEYxMUU3OEU1M0I2MzI0NDI4OEEzMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrZ+qOAAAAFbSURBVHjaYqzYo8GABcgDcQQQewGxChCLAPEbIL4LxFuBeAUQP0TXxIhmGCcQtwJxDhCzMuAGv4F4KhBXA/E3mCATkgJRID4KxIUEDGKAyhcA8RGoPhTD2IB4MxAbMpAGDKH62JEN6wRic2yqOVh4GVyUcvAZCNLXATNMDhpGWAEnCx+Ds2I2IReC9CuADEsCYhYGygBIfyLIMBcG6gBXkIlK6GEE8hoM8HNIgGlBDmkUnd//fGL48eczspA6KJ39hMYmGIACm4gwYth7fyrDnntTMBLtMyAtiUsTyEVl1nsYKvdqEjL/HSjM7lEpzG6CDNtLJcN2gwybC8R/KDQIpH8+yLBHQDwFlypQrIECmwAAKXgAKzVAsXkIV5YiAE4CsT0Q/4TlzV9A7AvE50k06DxU30/0Iug1ENsA8SQiwvAPVJ0NVB/WwhEGFKAlrTcQK+MoaR+gawIIMADTEU4NkfT4BQAAAABJRU5ErkJggg==)
}
.act-tag{
    display: inline-block;
    background-color: #fff000;
    padding: 1px 3px;
}
.act-give{
    color: #fff;    
    display: inline-block;
    background-color: #ac2c2b;
    padding: 1px 3px;
}
.price-item{
  margin-top: 5px;

}
.item-comment{
  color: #aeaeae;
  font-size: 1rem;
}
.item-pic{
  padding: 10px;
  border-radius: 18px;
}
</style>