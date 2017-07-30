/* global IfMicro: true */

IfMicro.utils = {
  /**
   * Wrap images with fancybox support.
   */
  wrapImageWithFancyBox: function() {
    if (!$.fn.fancybox) return;
    $('img')
      .each(function() {
        var $image = $(this);
        var imageTitle = $image.attr('title');
        var $imageWrapLink = $image.parent('a');

        if ($imageWrapLink.size() < 1) {
          var imageLink = ($image.attr('data-original')) ? this.getAttribute('data-original') : this.getAttribute('src');
          $imageWrapLink = $image.wrap('<a href="' + imageLink + '"></a>').parent('a');
        }

        $imageWrapLink.addClass('fancybox fancybox.image');
        $imageWrapLink.attr('rel', 'group');

        if (imageTitle) {
          $imageWrapLink.append('<p class="image-caption">' + imageTitle + '</p>');

          //make sure img title tag will show correctly in fancybox
          $imageWrapLink.attr('title', imageTitle);
        }
      });

    $('.fancybox').fancybox({
      helpers: {
        overlay: {
          locked: false
        }
      }
    });
  },

  lazyLoadPostsImages: function() {
    if (!$.fn.lazyload) return;
    $('img').lazyload({
      //placeholder: '/images/loading.gif',
      effect: 'fadeIn',
      threshold: 0
    });
  },

  registerESCKeyEvent: function() {
    $(document).on('keyup', function(event) {
      var shouldDismissSearchPopup = event.which === 27 &&
        $('.search-popup').is(':visible');
      if (shouldDismissSearchPopup) {
        $('.search-popup').hide();
        $('.search-popup-overlay').remove();
        $('body').css('overflow', '');
      }
    });
  },

  registerBackToTop: function() {
    var THRESHOLD = 50;
    var $top = $('.back-to-top');

    $(window).on('scroll', function() {
      $top.toggleClass('back-to-top-on', window.pageYOffset > THRESHOLD);
    });

    $top.on('click', function() {
      $("html,body").animate({scrollTop: $('body').offset().top}, 200);
    });
  },

  /**
   * Transform embedded video to support responsive layout.
   * @see http://toddmotto.com/fluid-and-responsive-youtube-and-vimeo-videos-with-fluidvids-js/
   */
  embeddedVideoTransformer: function() {
    var $iframes = $('iframe');

    // Supported Players. Extend this if you need more players.
    var SUPPORTED_PLAYERS = [
      'www.youtube.com',
      'player.vimeo.com',
      'player.youku.com',
      'music.163.com',
      'www.tudou.com'
    ];
    var pattern = new RegExp(SUPPORTED_PLAYERS.join('|'));

    $iframes.each(function() {
      var iframe = this;
      var $iframe = $(this);
      var oldDimension = getDimension($iframe);
      var newDimension;

      if (this.src.search(pattern) > 0) {

        // Calculate the video ratio based on the iframe's w/h dimensions
        var videoRatio = getAspectRadio(oldDimension.width, oldDimension.height);

        // Replace the iframe's dimensions and position the iframe absolute
        // This is the trick to emulate the video ratio
        $iframe.width('100%').height('100%')
          .css({
            position: 'absolute',
            top: '0',
            left: '0'
          });


        // Wrap the iframe in a new <div> which uses a dynamically fetched padding-top property
        // based on the video's w/h dimensions
        var wrap = document.createElement('div');
        wrap.className = 'fluid-vids';
        wrap.style.position = 'relative';
        wrap.style.marginBottom = '20px';
        wrap.style.width = '100%';
        wrap.style.paddingTop = videoRatio + '%';

        // Add the iframe inside our newly created <div>
        var iframeParent = iframe.parentNode;
        iframeParent.insertBefore(wrap, iframe);
        wrap.appendChild(iframe);

        // Additional adjustments for 163 Music
        if (this.src.search('music.163.com') > 0) {
          newDimension = getDimension($iframe);
          var shouldRecalculateAspect = newDimension.width > oldDimension.width ||
            newDimension.height < oldDimension.height;

          // 163 Music Player has a fixed height, so we need to reset the aspect radio
          if (shouldRecalculateAspect) {
            wrap.style.paddingTop = getAspectRadio(newDimension.width, oldDimension.height) + '%';
          }
        }
      }
    });

    function getDimension($element) {
      return {
        width: $element.width(),
        height: $element.height()
      };
    }

    function getAspectRadio(width, height) {
      return height / width * 100;
    }
  },

  /**
   * Add `menu-item-active` class name to menu item
   * via comparing location.path with menu item's href.
   */
  addActiveClassToMenuItem: function() {
    var path = window.location.pathname;
    path = path === '/' ? path : path.substring(0, path.length - 1);
    $('.menu-item a[href="' + path + '"]').parent().addClass('menu-item-active');
  },

  hasMobileUA: function() {
    var nav = window.navigator;
    var ua = nav.userAgent;
    var pa = /iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g;

    return pa.test(ua);
  },

  isTablet: function() {
    return window.screen.width < 992 && window.screen.width > 767 && this.hasMobileUA();
  },

  isMobile: function() {
    return window.screen.width < 767 && this.hasMobileUA();
  },

  isDesktop: function() {
    return !this.isTablet() && !this.isMobile();
  },

  /**
   * Escape meta symbols in jQuery selectors.
   *
   * @param selector
   * @returns {string|void|XML|*}
   */
  escapeSelector: function(selector) {
    return selector.replace(/[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, '\\$&');
  },

  displaySidebar: function() {
    if (!this.isDesktop()) {
      return;
    }
    $('.sidebar-toggle').trigger('click');
  },

  isMist: function() {
    return CONFIG.scheme === 'Mist';
  },

  getScrollbarWidth: function() {
    var $div = $('<div />').addClass('scrollbar-measure').prependTo('body');
    var div = $div[0];
    var scrollbarWidth = div.offsetWidth - div.clientWidth;

    $div.remove();

    return scrollbarWidth;
  },

  /*
   * cdn:
   *	http://cdn.bootcss.com/zclip/1.1.2/jquery.zclip.min.js
   *  http://cdn.bootcss.com/zclip/1.1.2/ZeroClipboard.swf
   *
   * @container -- is a tag include the text that will be copied(default `pre`)
   * @copyClass -- is copy link's class which make your css style(default `copy`)
   * @copyText -- is copy link's content, which is a text string(default `Copy`)
   *
   */
  addCopy: function(container, copyClass, copyText) {

    if (!copyText)
      copyText = "Copy";
    if (!copyClass)
      copyClass = "copy";
    if (!container)
      container = "pre";

    var copy = $('<div><a href="javascript:void(0)"></div>');
    copy.find("a").addClass(copyClass);

    $(container).prepend(copy);

    //use copy plugin
    $("." + copyClass).zclip({
      path: CONFIG.zclip_swf,
      copy: function() {
        var copyNode = $("a." + copyClass + ".hover");
        console.log(copyNode);
        var node = copyNode.parents(container);
        node = copyNode.parent().next(); //pre --> code
        copyNode.parent().slideUp();
        copyNode.text("");
        return node.text();
      }
    });

    $("." + copyClass).parent().hide();

    var old = null;

    $(container).dblclick(function(event) {

      var ev = event.target;
      if (ev.tagName != container.toUpperCase())
        ev = $(ev).parents(container);
      else
        ev = $(ev);

      //miss old copy link
      if (old && old !== ev) {
        old.find("a." + copyClass).text("");
        old.find('div').slideUp();
      }
      //make current as old
      old = ev;

      ev.find("a." + copyClass).text(copyText);
      ev.find('div').slideDown();
      event.stopPropagation();

    });

    $(container).click(function(event) {
      $(this).find("a." + copyClass).text("");
      $(this).find('div').slideUp();
      event.stopPropagation();
    });
  },
  scrollToElement: function(elementStr) {
    var targetOffset = $(elementStr).offset().top;
    $("html,body").animate({
      scrollTop: targetOffset
    }, 400);
  },
  scrollToTop: function() {
    this.scrollToElement('header');
  },
  // 给每一次微语，添加一个 id, 便于分享
  addIdToMicroSay: function() {
    var plist = $(".micro-say").children("p");
    var i = 0;
    var nums = plist.size();
    for (i = 0; i < nums; i++) {
      $(plist[nums - i - 1]).attr("id", i + 1);
    }
  },
  getURLQuery: function(queryKey) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == queryKey) {
        return sParameterName[1];
      }
    }
  },
  getCssText: function(obj) {
    var text = "";
    for (var key in obj) {
      text += key + ":" + obj[key] + ";";
    }
    return text;
  },
  pageProgressPercent: function() {
    var pageHeight = document.body.offsetHeight - document.documentElement.clientHeight;
    return Math.round((pageYOffset / pageHeight) * 100) + '%';
  },
  scrollProgress: function(color) {
    var dom = document.createElement('div');
    var _this = this;
    var css = this.getCssText({
      position: "fixed",
      left: 0,
      top: 0,
      height: "5px",
      "z-index": 999999,
      background: color || 'red',
      transition: "width 0.3s ease-out",
      "-moz-transition": "width 0.3s ease-out",
      "-webkit-transition": "width 0.3s ease-out"
    })
    dom.style.cssText = css;
    document.body.appendChild(dom);
    window.addEventListener('scroll', function() {
      dom.style.width = _this.pageProgressPercent();
    }, false);
  }
};
