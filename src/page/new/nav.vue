<template v-once>
    <div class="wrap-menuNavNewProduct" title="分类导航条">
        <div id="navPanelDiv" class="menuNavNewProductPanel">
            <ul id="navUL" class="menuNavNewProduct" style="width:1000px">
                <template v-for="(nav,index) in navs">
                    <li v-if="nav.Code!='webpage'" class="font-large" :class="{'selected':currentPath==nav.linkUrl}" @click="openChanel(nav.linkUrl,index)">
                        <a>{{nav.Name}}</a>
                    </li>
                    <li v-if="nav.Code == 'webpage'" @click="$options.filters.open(nav.Uri,nav.Name)" class="font-large">
                        <a>{{nav.Name}}</a>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
    // import homeService from '../api/homeService'
    // import common from '../utils/common'
    // import $ from 'jquery';
    // import router from '../router';

    export default {
        data() {
            return {
                navs: window.navMenus || [],
                currentPath: '/home'
            }
        },
        methods: {
            openChanel(url, index) {
                // window.scroll(0,0);
                $('#navUL li').each(function (i, e) {
                    if (i == index) {
                        $(e).addClass('selected');
                    }
                    else {
                        $(e).removeClass('selected');
                    }
                });
                this.initOffset();
                router.push({ path: url });
            },
            initOffset() {
                let $sel = $("#navUL li.selected");
                let index = $sel.index();
                if (index > 0)
                    index = index - 1;
                let left = 1;
                for (var i = 0; i < index; i++) {
                    left += $("#navUL li").eq(index).outerWidth(true);
                }
                $("#navPanelDiv").animate({ scrollLeft: left }, 200);
            },
            changeWidth() {
                let w = 0;
                $("#navUL").children().each(function () {
                    w += $(this).outerWidth(true);
                })
                // w=w+10;
                $("#navUL").width(w);
            }
        },
        created() {
            var self = this;
            // self.currentPath = self.$route.path;
            // if (self.navs.length == 0) {
            //     homeService.getNavs().then(function (navs) {
            //         window.navMenus = navs;
            //         self.navs = navs;
            //         self.$nextTick(() => {
            //             self.changeWidth();
            //             self.initOffset();
            //         });
            //     });
            // }
            // else {
            //     self.$nextTick(() => {
            //         self.changeWidth();
            //         self.initOffset();
            //     });
            // }
        },
        mounted() {
            return;
            // $('#footermenuNav').find('li').eq(0).find('a').addClass('selected');
        }
    }
</script>