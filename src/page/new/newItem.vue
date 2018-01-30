<template>
    <div class="stroll-item">
        <!-- <div> -->
        <div class="stroll-type-item">
            <div class="stroll-item-layer">
                <img v-lazy="cdnRUL+item.ImageUrl" @click="toDetailPage(item)" class="stroll-item-img"/>
                <span class="tag-new" v-if="item.ItemType == 1">New</span>
            </div>
            <div class="item-panel">
                <span class="stroll-item-title">
                    {{item.Name}}
                </span>
                <div class="stroll-price-bar">
                    <span class="price" v-if="item.ActivityPrice > 0">￥<span class="item-ActivityPrice">{{item.ActivityPrice}}</span>
                        </span>
                    <span class="price" v-else>￥<span>{{item.SalePrice}}</span></span>
                     <span class="original">￥{{item.SalePrice}}</span>
                    <div class="give-style">
                    <span v-if="item.ActivityTag" class="act-tag">{{item.ActivityTag}}</span>

                    <span class="give" v-show="item.PriceTag!=''">{{item.PriceTag}}</span>
                    </div>
                    <div class="item-comment" style="float:right;padding-right:5px;">评论：{{item.CommentCount}}</div>

                </div>
            </div>
            <div class="itembottom-line"></div>
        </div>
        <div v-if="item.Type==2" class="stroll-type-item">
            <div @click="SkipAppUrl(item.ActLinkUrl)">
                <img :src="$options.filters.imgAuto(item.ImageUrl)" class="stroll-item-img"/>
            </div>
        </div>
        <div v-if="item.Type==3" class="stroll-type-item  clearFix">
            <div v-for="item2 in item.ConfigerList" class="cat-menu-a" @click="SkipAppUrl(item2.LinkUrl)" >
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
        SkipAppItem(itemId) {
            this.$emit('openDetailHandler');
            // router.push({ name: 'item', params: { id: itemId } })
        },
        //这里处理专挑到商品详情页
        toDetailPage(item){
            console.log(item);
            // debugger;
            
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
            //   alert('isAndroid'+item.ItemInfoId);
                window.OCmodel.gotoItem(item.ItemInfoId);//调用原生方法
            }
            if (isiOS) {
            //   alert('isiOS'+item.ItemInfoId);
                OCmodel.gotoItem(item.ItemInfoId);//调用原生方法
            }
            // window.location.href=this.cdnRUL+item.Uri;
            // window.location.href=item.Uri;
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
    .itembottom-line{
        margin-top: 12px;
        border-bottom: 1px solid #E8e8e8;
    }
    .stroll-item {
        width: 96%;
        /* padding: 0 10px; */
        
        /* padding-top: 15px; */

        margin: 15px auto 0;
        /* margin: 3%; */
        /* width: 94%; */
        /* clear: both; */
        /* margin-bottom: 15px; */
    }
    
    .stroll-type-item {
        margin:0 10px;
        /* padding-bottom: 10px; */
        
    }
    
    .stroll-item-layer {
        position: relative;
        border-radius: 8px;
    }
    
    .stroll-item-img {
            border-radius: 3px;
            width: 100%;
            display: block;
            vertical-align: top;
            margin: 0 auto;
            position: static;
    }
    
    .stroll-item-title a{
        width: 94%;
        overflow: hidden;
        margin: 0 auto;
        text-align: left;
        font-size: 1.35rem;
        color: #333;
        line-height: 2.6rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-top: .5rem;
        /* font-size: .95rem;
        padding: .4rem 0 .2rem;
        overflow: hidden;
        white-space: nowrap;
        word-break: keep-all;
        text-overflow: ellipsis; */
    }
    
    /* .stroll-item-title a {
        color: #333;
        text-decoration: none;
        font-size: 1.35rem;
    } */
    
    .stroll-item .tag-new {
        background-color: #79da87;
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
        overflow: hidden;
        padding-top: 5px;
    }
    
    .stroll-price-bar .price {
        font-size: 16px;
        /* font-weight: 400; */
        /* overflow: hidden; */
        text-align: left;
        width: auto;
    }
    .stroll-price-bar .original{
        font-size: 15px;
        display: inline-block;
        color: #888;
        text-decoration: line-through;
        margin-left: 5px;
    }
    .stroll-price-bar .comment{ font-size: 1.4rem; line-height: 1.5rem; width: auto; max-width: none; overflow: hidden; float:right;
display: inline-block; text-align: right; color: #999; white-space: nowrap; word-break: keep-all; text-overflow: ellipsis;
-o-text-overflow: ellipsis; }
    .cat-menu-span{
        
    }
    .cat-menu-a{
        width: 47%;
        min-height: 3rem;
        background-color: #eaeaea;
        border: 0;
        border-radius: 8px;
        text-align: center;
        vertical-align: middle;
        font-size: 1.35rem;
        color: #4a4a4a;
        vertical-align: center;
        padding: .95rem .5%;
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

    .give-style{
        height:1rem;
        display: inline;
        }
    .give-style .give {
        display: inline-block;
        background: #cc0000;
        color: #fff;
        padding: 1px 3px;
        font-size: 1.18rem;
    }
    .item-panel{
        width: 100%;
        background: #fff;
        color: #333;
        /* padding-bottom: .3rem; */
        margin-top: 10px;
    }
    .act-tag{
        display: inline-block;
        background-color: #fff000;
        padding: 1px 3px;
        font-size: 1.18rem;
    }
.item-comment{
    color: #999;
    float:right;
    padding-right:5px;
    font-size: 12px;
    /* font-size: .8rem; */
}
.stroll-item-title{
    font-size:16px;
    /* margin-bottom: 5px; */
}
.item-ActivityPrice{
    padding-left: -5px;
}
</style>