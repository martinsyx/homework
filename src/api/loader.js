// 根据页面的DOM Id加载vueJs文件
export default function(module,fn){
    var s = module.replace(new RegExp('\\.',"g"),'-');
    if(document.getElementById(s)) {
        return fn();
    } else {
        return false;
    }
 };