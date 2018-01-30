<template v-once>
  <div id="all-container" style="position: relative;">
    <div id="content-wrap">
      <div class="life-module">
        <!--产品-->
        <div class="life-goodsAll">
            <div class="life-goodsBox" v-for="item in allData">
           <img v-lazy="cdnRUL+item.AdBanners">
            <div class="life-goodsTip">
              <dl class="life-goodsMark">{{item.Name}}</dl>
              <dl v-if="item.CategoryTag != null">{{item.CategoryTag}}</dl>
            </div>
            <ul class="life-goodsUl clearFix onlyStyle">
              <a tag="li" v-for="child in item.Children">
                <img v-lazy="cdnRUL+child.Icon">
                <dl>{{child.Name}}</dl>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
</div>
</template>
<script>
  import Vue from 'vue'
  import VueLazyload from 'vue-lazyload';//懒加载
// require ('../../css2/lifeStyle.css');
  Vue.use(VueLazyload,{
    loading: './dev/images/itemdefault1.png',
  })
  var search_key = null;

  export default {
    name: 'all',
    data() {
      return {
        cdnRUL:'http://i1.lifevccdn.com/',
        allData: [],
        inputVal: "",
        rearchResult: [],
        rearchResultState: false,
        isChange: false,
        showloading: false
      }
    },
    methods: {
      getAllCategory: function () {
        return new Promise((resolve, reject) => {
          var url = 'http://app.lifevc.com/1.0/v_h5_5.1.2_33/categories/allCategory';
        this.$http.get(url).then(function (result) {
            // if (result.Result) {
            //   cache.set(cacheKey, result)
            // }

            resolve(result)
          }, function (error) {
            reject(error)
          });
        })
      },  
    },
    beforeDestroy(){
    },
    created() {
      var self = this;
      self.showloading = true;
      self.inputVal = "";

      this.getAllCategory().then(function (result) {
        // debugger;
        self.allData = result.body.InnerData;
        self.showloading = false;
      }, error => {
        // Toast(error);
        self.showloading = false;
      });
      this.$nextTick(function () {
      });

    },
    mounted(){

    },

    // directives: {
    //   liHeight: {
    //     inserted: function (el) {
    //       var liH = Math.floor($(window).width() / 3 / 0.9);
    //       $(el).height(liH);
    //     }
    //   }
    // }
  }
</script>
<style scoped>

  .life-module {
    overflow: hidden;
  }

  .life-goodsUl h1 {
    line-height: 5rem;
  }


</style>
