<template>
    <div class="stroll-item">
        <!-- <div> -->
        <div v-if="item.Type==1" style="background-color:#fff;" class="stroll-type-item" @click="SkipAppItem(item.ItemInfoID)">
            <div class="stroll-item-layer"  @click="gotoItem(item)">
                <img v-lazy="cdnRUL+item.ImageUrl" class="stroll-item-img"/>
                <span class="tag-new" v-if="item.Type == 1">New</span>
            <div class="Appeal" v-if="item.Appeal">{{item.Appeal}}</div>
            </div>
            
            <p class="stroll-item-title">
                <a href="javascript:void(0);" @click="gotoItem(item)">{{item.Name}}</a>
            </p>
            <div class="stroll-price-bar">
                <span class="price" v-if="item.ActivityPrice > 0">￥<span>{{item.ActivityPrice}}</span>
                <!-- <span class="original">￥{{item.SalePrice}}</span> -->
                </span>
                <span class="price" v-else>￥<span>{{item.SalePrice}}</span></span>
                <span class="comment">月销 {{item.SaleQty}}</span>
                <!-- <button class="addtochart" style="float:right;padding-right:35px;" onclick=""></button> -->
            </div>
        </div>

        <div v-if="item.Type==2" class="stroll-type-item" style="background-color:#fff;">
            <div @click="SkipAppUrl(item.ActLinkUrl)">
                <img :src="$options.filters.imgAuto(item.ImageUrl)" class="stroll-item-img"/>
            </div>
        </div>
        <!-- 快捷广告 -->
        <div v-if="item.Type==3"  class="stroll-type-item shutTitle clearFix">
            <div v-for="item2 in item.ConfigerList" class="cat-menu-a  clearFix" @click="SkipAppUrl(item2.LinkUrl)" >
                <span>{{item2.Title}}</span>
            </div>
        </div>
    </div>
</template>
<script>    

// import router from '../router'
export default {
     props:['item'],
     data() {
         return {
            cdnRUL:'http://i1.lifevccdn.com/',
            loadingImg:'./static/images/itemdefault1.png',
         }
     },
     methods:{
         gotoItem(item){
// console.log(item)
        // window.location.href=item.ItemLinkURL;
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
            //   alert('isAndroid'+item.ItemLinkURL);
                window.OCmodel.gotoItem(item.ItemLinkURL);//调用原生方法
            }
            if (isiOS) {
            //   alert('isiOS'+item.ItemLinkURL);
                OCmodel.gotoItem(item.ItemLinkURL);//调用原生方法
            }
         },
        SkipAppItem(itemId) {
            this.$emit('openDetailHandler');
            // router.push({ name: 'item', params: { id: itemId } })
        },
        SkipAppUrl(url) {
            if (url == "null" || url == null) {
                return;
            }
            this.$emit('openDetailHandler');
            this.$options.filters.openInner(url);
        },
     }

}
</script>
<style>

    .stroll-item {
        margin: 0;
        width: 96%;
        clear: both;
        margin-bottom: 10px;
        /* background-color:#fff; */
        border-radius: 8px;
    }
    
    .stroll-type-item {
        margin:0 1%;
        padding-bottom: 8px;
        border-radius: 3px;
    }
    
    .stroll-item-layer {
        position: relative;
        border-radius: 3px;
    }
    
    .stroll-item-img {
        margin-bottom: 4px;
        /* border-radius: 8px; */
    }
    
    .stroll-item-title {
        /* margin-top:5px!important;; */
        margin: 0;
        font-size: 1.8rem;
        padding-bottm:0;
        /* padding-bottm: .1rem 0 .1rem; */
        /* margin-top: .1rem!important; */
        overflow: hidden;
        white-space: nowrap;
        word-break: keep-all;
        text-overflow: ellipsis;
        margin-left: 10px;
    }

    .stroll-item-title{
        margin-top: 8px!important;
        margin-bottom: 3px;
    }
    .stroll-item-title a {
        color: #333;
        text-decoration: none;
        font-size: 16px;
    }
    
    .stroll-item .tag-new {
        background-color: #009D42;
        max-width: 94%;
        overflow: hidden;
        display: inline-block;
        text-align: left;
        font-size: .8rem;
        color: #fff;
        line-height: 1.4rem;
        text-transform: uppercase;
        padding: 0 .5rem;
        position: absolute;
        left: 0;
        top: .8rem;
        z-index: 6;
        white-space: nowrap;
        word-break: keep-all;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
    }
    
    .stroll-price-bar {
            text-align: left;
            width: 100%;
            font-size: 16px;
            height: 1.5rem;
            overflow: hidden;
            /* margin-bottom: 10px; */
    }
    
    .stroll-price-bar .price {
        font-size: 1.5rem;
        line-height: 1.5rem;
        display: inline-block;
        color: #333;
        font-weight: 400;
        overflow: hidden;
        text-align: left;
        width: auto;
        padding-left: 10px;
    }
    .stroll-price-bar .original{
        font-size: 1.5rem;
        display: inline-block;
        color: #888;
        text-decoration: line-through;
        margin-left: 5px;
    }
    .stroll-price-bar .comment{ 
        font-size: 12px;
        line-height: 1.5rem; 
        width: auto;
         max-width: none; 
         overflow: hidden; 
         float:right;padding-right: 10px;
display: inline-block; 
text-align: right; 
color: #999; 
white-space: nowrap; word-break: keep-all; text-overflow: ellipsis;
-o-text-overflow: ellipsis; 
}
    .cat-menu-span{
        
    }
    .cat-menu-a{
        /* width: 47%; */
        /* padding:  */
        min-height: 3rem;
        background-color: #fff;
        border: 0;
        border-radius: 3px;
        text-align: center;
        vertical-align: middle;
        font-size: 1.35rem;
        color: #e74618;
        vertical-align: center;
        padding: 8px 8px;
        display: inline-block;
        margin: 1%;
        float: left;
        display: -webkit-flex;
        text-align: center;
    }
    .cat-menu-a span{
        margin: auto;
        /* display: block;
       height: 3rem;
        overflow: hidden;
        line-height: 3rem; */
    }
    .addtochart{
        background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTVENkI2REFFODhGMTFFNzhFNTNCNjMyNDQyODhBMzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTVENkI2REJFODhGMTFFNzhFNTNCNjMyNDQyODhBMzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNUI2ODE4OUU4OEYxMUU3OEU1M0I2MzI0NDI4OEEzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNUI2ODE4QUU4OEYxMUU3OEU1M0I2MzI0NDI4OEEzMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrZ+qOAAAAFbSURBVHjaYqzYo8GABcgDcQQQewGxChCLAPEbIL4LxFuBeAUQP0TXxIhmGCcQtwJxDhCzMuAGv4F4KhBXA/E3mCATkgJRID4KxIUEDGKAyhcA8RGoPhTD2IB4MxAbMpAGDKH62JEN6wRic2yqOVh4GVyUcvAZCNLXATNMDhpGWAEnCx+Ds2I2IReC9CuADEsCYhYGygBIfyLIMBcG6gBXkIlK6GEE8hoM8HNIgGlBDmkUnd//fGL48eczspA6KJ39hMYmGIACm4gwYth7fyrDnntTMBLtMyAtiUsTyEVl1nsYKvdqEjL/HSjM7lEpzG6CDNtLJcN2gwybC8R/KDQIpH8+yLBHQDwFlypQrIECmwAAKXgAKzVAsXkIV5YiAE4CsT0Q/4TlzV9A7AvE50k06DxU30/0Iug1ENsA8SQiwvAPVJ0NVB/WwhEGFKAlrTcQK+MoaR+gawIIMADTEU4NkfT4BQAAAABJRU5ErkJggg==)
    }
    .Appeal {
    font-size:12px;
    position: relative;
    margin-top: -27px;
    height: 24px;
    width: 100%;
    filter: alpha(opacity=50);
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    opacity: 0.8;
    text-align: center;
    background-color: #ebe4e4;
    color: #906b6b;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-top: .4rem;
}

.profile {
  width: 100%;
  overflow: hidden;
  background-color: #ebe4e4;
  /* background: rgba(0, 0, 0, .4); */
  text-align: left;
  font-size: 1.35rem;
  color: #906b6b;
  line-height: 2.6rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;
  padding: 0 3%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 5
}
.shutTitle{
    padding-bottom:0px!important;
}
</style>