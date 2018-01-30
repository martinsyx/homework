import $ from 'jquery'
+function () {
  $.fn.slidDel = function () {
    this.each(function () {
      var $this = $(this);
      $this.on('touchstart', function (event) {
        //记录滑动开始的位置
        $this.data('sd-startclientx', event.touches[0].clientX);
        $this.data('sd-startclienty', event.touches[0].clientY);
      });
      $this.on('touchmove', function (event) {
        //计算x轴和y轴的滑动距离，用以推断滑动方向
        //如果左右滑动，则停止事件冒泡，并作出响应。
        //如果上下滑动，则放弃本次监听，并冒泡。
        var offsetX = event.touches[0].clientX - $this.data('sd-startclientx');
        var offsetY = event.touches[0].clientY - $this.data('sd-startclienty');
        $this.data('sd-offsetx', offsetX);
        $this.data('sd-offsety', offsetY);
        if (Math.abs(offsetY) > Math.abs(offsetX))
          return;
        event.stopPropagation();
        //最大滑动距离
        var maxWidth = $this.find('.sd-btn').length * 50;
        var _maxWidth = 0 - maxWidth;
        if (offsetX < 0) {
          offsetX = offsetX < _maxWidth ? _maxWidth : offsetX;
          //左滑
          if ($this.find('.sd-btns').css('margin-right') !== '0px') {
            $this.find('.sd-del-content').css('margin-left', offsetX + 'px');
            $this.find('.sd-btns').css('margin-right', _maxWidth - offsetX + 'px');
          }
        } else {
          offsetX = offsetX > maxWidth ? maxWidth : offsetX;
          //右滑
          if ($this.find('.sd-del-content').css('margin-left') !== '0px') {
            $this.find('.sd-del-content').css('margin-left', _maxWidth + offsetX + 'px');
            $this.find('.sd-btns').css('margin-right', -offsetX + 'px');
          }
        }
      });
      $this.on('touchend', function (event) {
        var offsetX = $this.data('sd-offsetx');
        var offsetY = $this.data('sd-offsety');
        if (Math.abs(offsetY) > Math.abs(offsetX)) {
          var marginLeft = $this.data('sd-content-left');
          var marginRight = $this.data('sd-btn-right');
          if (marginLeft !== undefined)
            $this.find('.sd-del-content').css('margin-left', marginLeft + 'px');
          if (marginRight !== undefined)
            $this.find('.sd-btns').css('margin-right', marginRight + 'px');
          return;
        }
        event.stopPropagation();
        //最大滑动距离
        var maxWidth = $this.find('.sd-btn').length * 50;
        var _maxWidth = 0 - maxWidth;
        if (offsetX <= (_maxWidth / 2)) {
          $this.find('.sd-del-content').css('margin-left', _maxWidth + 'px');
          $this.find('.sd-btns').css('margin-right', 0);

          $this.data('sd-content-left', _maxWidth);
          $this.data('sd-btn-right', 0);
        } else if (offsetX < 0) {
          $this.find('.sd-del-content').css('margin-left', 0);
          $this.find('.sd-btns').css('margin-right', _maxWidth + 'px');

          $this.data('sd-content-left', 0);
          $this.data('sd-btn-right', _maxWidth);
        } else if (offsetX < (maxWidth / 2)) {
          $this.find('.sd-del-content').css('margin-left', _maxWidth + 'px');
          $this.find('.sd-btns').css('margin-right', 0);

          $this.data('sd-content-left', _maxWidth);
          $this.data('sd-btn-right', 0);
        } else if (offsetX >= (maxWidth / 2)) {
          $this.find('.sd-del-content').css('margin-left', 0);
          $this.find('.sd-btns').css('margin-right', _maxWidth + 'px');

          $this.data('sd-content-left', 0);
          $this.data('sd-btn-right', _maxWidth);
        }
      });
    });
  }

}();
