<template>
    <div>
      hello word!
        <!-- <div class="clearFix stroll-container"  >
          <div class="stroll-all-item">
            <v-stroll-item :item="item" v-for="(item,index) in allStrollListData"  v-if="index%2==0 && index!=2" >{{index}}</v-stroll-item>
          </div>
          <div class="stroll-all-item">
            <v-stroll-item :item="item" v-for="(item,index) in allStrollListData" v-if="index%2==1 || index==2" ></v-stroll-item>
          </div>
        </div> -->
      <!-- </div> -->
  </div>
</template>

<script>
import tool from "../../utils/tools.js";
export default {
  name: "stroll",
  props: ['path'],
  data() {
    return {
      canLoadMore: true,
      loadText: "加载中",
      currentPage: 1,
      isLoadData: false,
      showLoading: true,
      showError: false,
      cdnRUL: "http://i1.lifevccdn.com/",
      loadingImg: "./static/images/itemdefault1.png",
      heiderHeight: "4rem",
      strollScrollTop: 0,
      initEnd: false,
      allStrollListData: []
    };
  },
  computed: {
    //   ...mapState({
    //     showDownload: state => !common.isApp() && state.app.showDownload_stroll
    //   })
  },
  components: {},
  created() {
    let self = this;
    self.getActiveData(self.path).then(function(result) {
      console.log(result.body.InnerData);
      debugger;

      // self.allStrollListData = result.body.InnerData.StrollItemList;
    });
    // window.addEventListener("scroll", this.scrollHandler);
    this.showLoading = true;
  },
  beforeDestroy() {
    // window.removeEventListener("scroll", this.scrollHandler);
  },
  mounted() {
  },
  methods: {
    getActiveData(url) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.$http.get(url).then(
                function (result) {
                    resolve(result);
                },
                function (error) {
                    reject(error);
                }
            );
        });
    },
    scrollHandler() {
      var self = this;
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let parentNode;
      if (this.container !== global) {
        parentNode = this.$el;
      } else {
        parentNode = this.$el.parentNode;
      }
      if (parentNode) {
        const rect = parentNode.getBoundingClientRect();
        if (window.innerHeight + 100 >= rect.bottom) {
          self.currentPage = self.currentPage + 1;
          this.getActiveData(self.currentPage).then(function(result) {
            self.allStrollListData = self.allStrollListData.concat(
              result.body.InnerData.StrollItemList
            );
          });
        }
      }
      self.strollScrollTop = scrollTop;
    },
    SkipAppItem(itemId) {
      this.saveData();
      router.push({ name: "item", params: { id: itemId } });
    },
    SkipAppUrl(url) {
      if (url == "null" || url == null) {
        return;
      }
      this.saveData();
    },
    hideDownload() {
      store.dispatch("showDownload_stroll");
    }
  }
};
</script>
<style scoped>
.stroll-container {
  background-color: #eaeaea;
  padding: 10px 0px 10px 10px;
}
.stroll-all-item {
  width: 50%;
  float: left;
}
</style>
