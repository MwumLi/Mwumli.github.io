/* global IfMicro: true */

IfMicro.sidebar = {
  activeSidebar: function(activeSelector) {
    $('.' + activeSelector).addClass('sidebar-active');
  },
  updateTOCHeight: function(height) {
    height = height || 'auto';
    $('#markdown-toc').css('max-height', height);
  },
  initScrollSpy: function() {
    var _this = this;
    var tocSelector = '.js-sidebar-toc-spy';
    var $tocElement = $(tocSelector);
    var activeCurrentSelector = '.active-current';

    $tocElement
      .on('activate.bs.scrollspy', function() {
        var $currentActiveElement = $(tocSelector + ' .active').last();

        removeCurrentActiveClass();
        $currentActiveElement.addClass('active-current');
      })
      .on('clear.bs.scrollspy', removeCurrentActiveClass);

    $('body').scrollspy({
      target: tocSelector
    });

    function removeCurrentActiveClass() {
      $(tocSelector + ' ' + activeCurrentSelector)
        .removeClass(activeCurrentSelector.substring(1));
    }
  },
  initTOCWrap: function() {
    var $toc  = $('#markdown-toc');
    $toc.remove().addClass('nav');
    $('section.js-sidebar-toc').append($toc);
  },
  initToc: function() {
    var _this = this;
    // 生成 sidebar-toc
    this.initTOCWrap();

    // 首次更新 sidebar-toc max-height
    var tocWrapperHeight = $('#body-div').height() - 150;
    this.updateTOCHeight(tocWrapperHeight);

    // 当窗口大小变化时, 更新 toc max-height 
    $(window).on('resize', function() {
      // $("#body-div") 的高度为页面可视区域高度
      var tocWrapperHeight = $('#body-div').height() - 150;
      _this.updateTOCHeight(tocWrapperHeight);
    });

    // 点击侧边栏 toc 进行滚动到指定锚
    $('#markdown-toc a').click(function() {
      var $target = $($(this).attr('href'));
      var targetOffset = $target.offset().top;
      $('html,body').animate({
        scrollTop: targetOffset
      }, 400);
      return false;
    })

    // 随着页面滚动更新 sidebar-toc active
    _this.initScrollSpy();

    // 切换 sidebar-toc 和 sidebar-pverview
    $('.sidebar-nav li').click(function(e) {
      var $ele = $(e.target || e.srcElement);
      if ($ele.hasClass('sidebar-active')) return false;
      $('.sidebar-active').removeClass('sidebar-active');
      _this.activeSidebar($(this).data('nav'));
    })
    $('.sidebar-active').removeClass('sidebar-active');
    this.activeSidebar('js-sidebar-toc')
  },
  start: function() {
    var _this = this;
    this.hasToc = !!$("#markdown-toc").length;

    // 切换侧边栏
    $('.sidebar-toggle').click(function() {
      $('body').toggleClass('body-sidebar');
    })


    if (this.hasToc) {
      this.initToc();
    } else {
      this.activeSidebar('js-sidebar-overview');
      $('.js-sidebar-toc').remove();
    }
  }
}
