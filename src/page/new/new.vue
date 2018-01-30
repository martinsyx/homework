<template>
  <div>
      <div class="wrap-shelf">
          <div class="subcat-title" v-show="weeklyItems.length>0">最新上架</div>
        <div class="down-line"></div>
          <v-new-item v-for="item in weeklyItems" :item="item" style="width:100%">1</v-new-item>
          <div class="subcat-title" v-show="monthItems.length>0">本月最新上架</div>
          <v-new-item v-for="item in monthItems" :item="item" style="width:100%">1</v-new-item>
        </div>
  </div>
</template>
<script>

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
      weeklyItems:[],
      monthItems:[],
    };
  },
  created() {
    let self = this;
    var monthUrl="http://app.lifevc.com/1.0/v_h5_5.1.2_33/contents/newarrival?code=monthly&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true"
    var weekUrl = "http://app.lifevc.com/1.0/v_h5_5.1.2_33/contents/newarrival?code=weekly&o=http%3A%2F%2Fm.lifevc.com&NewCartVersion=true";

    this.getActiveData(monthUrl).then(
      function(result) {
        self.data = result.body.InnerData;
        self.monthItems=result.body.InnerData;
      },
      error => {
        self.showloading = false;
      }
    );
    this.getActiveData(weekUrl).then(
      function(result) {
        self.data = result.body.InnerData;
        self.weeklyItems=result.body.InnerData;
      },
      error => {
        self.showloading = false;
      }
    );

  },
  methods:{
    getActiveData(pathurl) {
      var self = this;
      // debugger;
      return new Promise((resolve, reject) => {
        var url =pathurl;
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
    border-bottom: 1px solid #e8e8e8;
}
.subcat-title {
  max-width: 96%;
  text-align: center;
  font-size: 1.8em;
  color: #000;
  line-height: 2.2em;
  margin: 0 auto 0px;
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
</style>