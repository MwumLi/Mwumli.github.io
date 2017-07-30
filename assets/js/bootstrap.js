$(document).ready(function () {

  $.bigfoot({ preventPageScroll: true });

  if( IfMicro.sidebar ) {
    $('.site-nav-toggle').hide(); // hide old toggle
    IfMicro.sidebar.start();
  } else if ( IfMicro.utils.isDesktop()) {
    IfMicro.toc && IfMicro.toc.tocEffect();
  } else {
    $('.sidebar-toggle').hide();
  }

  if (CONFIG.page.type != "micro_say") {
    IfMicro.utils.addCopy && IfMicro.utils.addCopy("pre", "copy", "Copy");
  }

  if (CONFIG.page.type == "micro_say") {
    IfMicro.utils.addIdToMicroSay && IfMicro.utils.addIdToMicroSay();
  }

  IfMicro.utils.lazyLoadPostsImages && IfMicro.utils.lazyLoadPostsImages();

  IfMicro.utils.wrapImageWithFancyBox && IfMicro.utils.wrapImageWithFancyBox();

  var progress_color = 'yellow';
  IfMicro.utils.scrollProgress && IfMicro.utils.scrollProgress(progress_color);

  $('.site-nav-toggle').click(function(e) {
    $('.site-nav').slideToggle('fast');
  });

  IfMicro.tag && IfMicro.tag.start(CONFIG.page.type == 'tags')
});
