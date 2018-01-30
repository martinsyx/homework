<template>
  <!-- <div> -->
    <div>
        <!-- <div> -->
            <!-- <div> -->
      <!-- <v-pull-down @load="loadNewData" ref="pulldown"> -->
        <div class="clearFix stroll-container"  >
          <div class="stroll-all-item">
              <!-- <div>
              <div v-for="(item,index) in allStrollListData">{{item.Type}}</div> -->
            <v-stroll-item :item="item" v-for="(item,index) in allStrollListData" v-bind:key="index"  v-if="index%2==0 && index!=2" >{{index}}</v-stroll-item>
          </div>
          <div class="stroll-all-item">
            <v-stroll-item :item="item" v-for="(item,index) in allStrollListData" v-bind:key="index" v-if="index%2==1 || index==2" ></v-stroll-item>
          </div>
        </div>
        <!-- <div class="stroll-bottom" v-show="currentPage>1">
          <div class="stroll-loading" v-show="showError==false && canLoadMore"><span class="cont"></span><span class="snakehead"></span></div>
          <div class="stroll-bottom-txt" v-show="loadText">{{loadText}}</div>
        </div> -->
      <!-- </v-pull-down> -->
    </div>
  </div>
</template>

<script>


  export default {
    name: "stroll",
    data() {
      return {
        canLoadMore: true,
        loadText: '加载中',
        currentPage: 1,
        isLoadData: false,
        showLoading: true,
        showError: false,
        cdnRUL: "http://i1.lifevccdn.com/",
        loadingImg: './static/images/itemdefault1.png',
        // isIos: common.isIos(),
        heiderHeight: '4rem',
        strollScrollTop: 0,
        initEnd: false,
        allStrollListData: [],
      }
    },
    computed: {
    //   ...mapState({
    //     showDownload: state => !common.isApp() && state.app.showDownload_stroll
    //   })
    },
    components: {},
    created() {
    let self = this;
    this.getActiveData(self.currentPage).then(
      function(result) {
          self.allStrollListData=result.body.InnerData.StrollItemList;
      })
      window.addEventListener('scroll', this.scrollHandler);
      this.showLoading = true;
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.scrollHandler)
    },
    mounted() {
    },
    methods: {
        getActiveData(page) {
            console.log(page);
        var self = this;
        return new Promise((resolve, reject) => {
            var url =
            "http://10.99.66.34:5000/Stroll/";
            // if(!page)page=1;
            self.$http.get(url+page).then(
            function(result) {
                resolve(result);
            },
            function(error) {
                reject(error);
            }
            );
        });
        },
      loadNewData(){
        let self = this;
        cache.clear('scrollData');
        // sessionStorage.removeItem('scrollData');
        // self.currentPage = 1;
        self.loadData();
      },
      loadSaveData(initScroll){return;
        // var scrollData=sessionStorage.getItem('scrollData')
        var scrollData = cache.get('scrollData')
        if (scrollData) {
          let self = this;
          // var data=JSON.parse(scrollData);
          var data = scrollData
          data.data.forEach(function (stroll, index) {
            self.allStrollListData.push(stroll);
          })
          self.isLoadData = false
          if (initScroll) {
            data.scrollTop = 0;
          }
          self.showLoading = false;
        //   self.currentPage = data.page
          self.$nextTick(() => {
            // $('body,html').animate({scrollTop: data.scrollTop}, 100);
          })
        } else {
          this.loadData();
        }

      },
      saveData(){
        var saveData = {
          data: this.allStrollListData,
          page: this.currentPage,
          scrollTop: window.scrollY //this.strollScrollTop
        }
        // sessionStorage.setItem('scrollData',JSON.stringify(saveData))
        cache.set('scrollData', saveData);
      },
      scrollHandler(){
        // console.log(this.currentPage)
        var self = this;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        let parentNode
        if (this.container !== global) {
          parentNode = this.$el
        } else {
          parentNode = this.$el.parentNode
        }
         if (parentNode) {
          const rect = parentNode.getBoundingClientRect()
        if (window.innerHeight+100 >= rect.bottom) {
            self.currentPage=self.currentPage+1;
            this.getActiveData(self.currentPage).then(
                function(result) {
                    self.allStrollListData=self.allStrollListData.concat(result.body.InnerData.StrollItemList);
               })
        }
        }

        self.strollScrollTop = scrollTop;
      },
    //   loadData() {
    //     let self = this
    //     self.loadText = '加载中'
    //     self.showError = false;
    //     self.isLoadData = true;
    //     self.canLoadMore = true;
    //     homeService.getStrollData(self.currentPage).then(d => {
    //       if (d == null || d.InnerData == null || d.Result == false) {
    //         self.showError = true;
    //         self.showLoading = false;
    //         return;
    //       }
    //       if (d && d.InnerData && d.Result) {
    //         if (d.InnerData.StrollList.length == 0) {
    //           self.canLoadMore = false;
    //           self.loadText = "没有更多了"
    //           return;
    //         }
    //         if (self.currentPage == 1) {
    //           self.showLoading = false;
    //           self.allStrollListData = [];
    //         }
    //         var winnerList = d.InnerData.StrollList;
    //         winnerList.forEach(function (stroll, index) {
    //           self.allStrollListData.push(stroll);
    //         })
    //       }
    //       self.isLoadData = false
    //       if (self.$refs.pulldown)
    //         self.$refs.pulldown.onTopLoaded();
    //     }, error => {
    //       self.loadText = '网络不给力，请稍候重试'
    //       self.showError = true;
    //       self.showLoading = false;
    //       if (self.$refs.pulldown)
    //         self.$refs.pulldown.onTopLoaded();
    //     });
    //   },
      SkipAppItem(itemId) {
        this.saveData();
        router.push({name: 'item', params: {id: itemId}})
      },
      SkipAppUrl(url) {
        if (url == "null" || url == null) {
          return;
        }
        this.saveData();
        // this.$options.filters.openInner(url);
      },
      hideDownload(){
        store.dispatch('showDownload_stroll')
      }
    }
  }
</script>
<style scoped>
.stroll-container{
    background-color:#eaeaea;
    padding: 10px 0px 10px 10px;
}
.stroll-all-item {
    width: 50%;
    float: left;
    
}
</style>
