window.addEventListener('load', function () {
  function adjustFontSize() {
    //以320px为原型设计，重置根目录font-size:100px;   最大宽度为640px;
    if (document.documentElement.clientWidth <= 640)
      document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.2 + 'px';
    else
      document.documentElement.style.fontSize = 200 + 'px';
  }

  adjustFontSize();
  window.addEventListener('resize', adjustFontSize, false);
});


