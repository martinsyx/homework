<template v-once>
  <div id="all-container" style="position: relative;">

    <v-loading :show-loading="showloading"></v-loading>
    <div id="content-wrap" v-stop-bottom-drag>
      <div class="life-module">
        <!--产品-->
        <div class="life-goodsAll">
          <div class="life-goodsBox" v-for="item in allData">
            <img v-if="item.AnBanners != null" v-lazy-src="{src:$options.filters.imgAuto(item.AdBanners),loading:$options.filters.imgAuto(),error:$options.filters.imgAuto()}">
            <div class="life-goodsTip">
              <dl class="life-goodsMark">{{item.Name}}</dl>
              <dl v-if="item.CategoryTag != null">{{item.CategoryTag}}</dl>
            </div>
            <ul class="life-goodsUl clearFix onlyStyle">
              <router-link v-liHeight :to="{name:'channelsub',params: { itemIndexId:item.ItemIndexId, fliterId:child.ItemIndexId}}"
                           tag="li" v-for="child in item.Children">
                <img v-lazy-src="{src:$options.filters.imgAuto(child.Icon),loading:$options.filters.imgAuto(),error:$options.filters.imgAuto()}">
                <dl>{{child.Name}}</dl>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <v-download :showDownload="showDownload" @hideDownload="hideDownload"></v-download>
  </div>
</template>
<script>
  import Vue from 'vue'
  import categoryService from '../api/categoryService'

  import store from '../store'
  import common from '../utils/common'
 
  import goodsService from '../api/goodsService'
  import ucenterService from '../api/ucenterService'
  import shoppingCartService from '../api/shoppingCartService'
  // import router from '../router'
  // import {Toast} from 'mint-ui'
  // import Download from '../components/Download'
  var search_key = null;

  // var ScrollFix = function (elem) {
  //   // Variables to track inputs
  //   var startY, startTopScroll;

  //   // elem = elem || document.querySelector(elem);

  //   // If there is no element, then do nothing
  //   // if (!elem)
  //   //   return;

  //   // Handle the start of interactions
  //   elem.addEventListener('touchstart', function (event) {
  //     startY = event.touches[0].pageY;
  //     startTopScroll = elem.scrollTop;

  //     if (startTopScroll <= 0)
  //       elem.scrollTop = 1;

  //     console.log(startTopScroll);
  //     console.log(elem.offsetHeight);
  //     console.log(elem.scrollHeight);

  //     if (startTopScroll + elem.offsetHeight >= elem.scrollHeight)
  //       elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
  //   }, false);
  // };

  export default {
    name: 'all',
    data() {
      return {
        allData: [],
        inputVal: "",
        rearchResult: [],
        rearchResultState: false,
        isChange: false,
        showloading: false
      }
    },
    methods: {
      onfocus(){
        this.isChange = true;
      },
      keyupHandle() {
        var self = this;
        var keywords = self.inputVal;

        if (search_key) {
          clearTimeout(search_key);
        }
        search_key = setTimeout(function () {
          goodsService.getSearchList(keywords).then(function (result) {
            var list = result.InnerData.split(",");
            var arr = [];
            for (var i = 0; i < list.length - 1; i++) {
              var shortArr = list[i].split('|');
              var searchName = shortArr[0];
              var searchCount = shortArr[1];
              var json = {name: searchName, count: searchCount};
              arr.push(json);
            }
            self.rearchResult = arr;
            self.rearchResultState = true;
          })
        }, 400);
      },
      searchStart(e) {
        var self = this;
        var keywords = self.inputVal;

        $(".searchinput").blur();

        goodsService.getKeyWordSearchList(keywords).then(function (result) {
          if (result && result.InnerData && result.InnerData.length > 0) {
            router.push({name: 'search', params: {keyword: keywords}})
          }
          else {
            Toast(result.Message)
          }
        });
      },
      searchSubmit(e) {
        var self = $(".searchinput");
        var keywords = self.val();

        $(".searchinput").blur();

        goodsService.getKeyWordSearchList(keywords).then(function (result) {
          if (result && result.InnerData && result.InnerData.length > 0) {
            router.push({name: 'search', params: {keyword: keywords}})
          }
          else {
            Toast(result.Message)
          }
        });
      },
      deleteSearchResult() {
        var self = this;
        self.isChange = false;
        self.inputVal = "";
        self.rearchResultState = false;
      },
      hideDownload(){
        store.dispatch('showDownload_all')
      }
    },
    beforeDestroy(){
      clearTimeout(search_key);
      //解决ios8以下，webview的position:fixed;的bug
      // $('#topbar').css({position: 'fixed', top: 0});
      // $('.footer').css({position: 'fixed', bottom: 0});
      $('#app').css({
        height: 'auto',
        overflow: 'visible'
      });

    },
    created() {
      var self = this;
      self.showloading = true;
      self.inputVal = "";

      categoryService.getAllCategory().then(function (result) {
        self.allData = result.InnerData;
        self.showloading = false;
      }, error => {
        Toast(error);
        self.showloading = false;
      });
      this.$nextTick(function () {
      });

    },
    mounted(){

    },

    directives: {
      liHeight: {
        inserted: function (el) {
          var liH = Math.floor($(window).width() / 3 / 0.9);
          $(el).height(liH);
        }
      }
    }
  }
</script>
<style scoped>

  .life-module {
    overflow: hidden;
  }

  .life-goodsUl h1 {
    line-height: 5rem;
  }

  .searchList ul li {
    width: 94%;
    height: 40px;
    background: #fff;
    font-size: 1.5em;
    line-height: 40px;
    padding-left: 3%;
    padding-right: 3%;
    border-bottom: 1px solid #ccc;
    position: relative;
  }

  /*.searchList ul li:after{*/
  /*content: '';*/
  /*display: block;*/
  /*clear: both;*/
  /*}*/

  .searchList ul li span:nth-child(1) {
    /*float: left;*/
    position: absolute;
    left: 3%;
  }

  .searchList ul li span:nth-child(2) {
    /*float: right;*/
    position: absolute;
    right: 3%;
  }

  .changeStyle {
    width: 88% !important;
    background-position: .4rem .5rem !important;
    text-align: left !important;
  }

  header {
    position: absolute;
  }

  input.searchinput:focus {
    text-align: left;
    background-position: 4% .5rem;
  }
</style>
