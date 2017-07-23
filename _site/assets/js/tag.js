/* global IfMicro: true */

IfMicro.tag = {
  getTagHash: function() {
    var $tag_name_list = $('.js-tag-list h2');
    var $tag_post_list = $('.js-tag-list ul').clone();
    var tag_hash = {};

    for (var i = 0; i < $tag_name_list.length; i++) {
      var tag_name = $tag_name_list.eq(i).text().trim();
      var $single_tag_post_list = $tag_post_list.eq(i).find('li');

      tag_hash[tag_name] = $single_tag_post_list;
    }

    return tag_hash;
  },
  getTagName: function($li) {
    return $li.children('a').clone().children().remove().end().text().trim();
  },
  getTagNameList: function() {
    var tag_name_list = [],
      tag_name;
    var that = this;
    $('.tag-name-selected').each(function(index, li) {
      tag_name = that.getTagName($(li)).trim();
      tag_name_list.push(tag_name);
    });
    return tag_name_list;
  },
  intersectionArray: function($arr1, $arr2) {
    var common_list = [];

    for (var i = 0; i < $arr1.length; i++) {
      for (var j = 0; j < $arr2.length; j++) {
        if ($arr1.eq(i).text() == $arr2.eq(j).text()) {
          common_list.push($arr1[i]);
        }
      }
    }

    return $(common_list);
  },
  getTagPostList: function(tag_name_list) {
    var $tag_post_list = this.tag_hash[tag_name_list[0]];

    if (tag_name_list.length == 1) {
      return $tag_post_list;
    }

    for (var i = 1; i < tag_name_list.length; i++) {
      var $tag_post_list_next = this.tag_hash[tag_name_list[i]];
      $tag_post_list = this.intersectionArray($tag_post_list, $tag_post_list_next);
    }

    return $tag_post_list;
  },
  displayTagList: function(tag_name_list, $tag_post_list) {
    var $tag_search_list = $('.js-tag-search-list');
    var $tag_list = $('.js-tag-list');

    $tag_search_list.empty();

    if (tag_name_list.length == 0) {
      $tag_list.show();
      return;
    } else {
      $tag_list.hide();
    }
    $tag_search_list.append('<h2>' + tag_name_list.join(' ,') + '</h2>');
    var $tag_list_post = $("<ul></ul>").append($tag_post_list);
    $tag_search_list.append($tag_list_post);
  },
  updateTagListDisplay: function(tag_name_list) {
    this.displayTagList(tag_name_list, this.getTagPostList(tag_name_list));
  },
  updateUrlQuery: function(key, value_list) {
    if (history.pushState) {
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      if (value_list.length > 0) {
        newurl = newurl + '?' + key + '=' + encodeURI(value_list.join(','));
      }

      window.history.pushState({
        path: newurl
      }, '', newurl);
    }
  },
  updateAllSelectedState: function(tag_name_list) {
    var that = this;
    $('.js-tag-name-list li').each(function(index, element) {
      var $li = $(element);
      if (tag_name_list.indexOf(that.getTagName($li)) > -1) {
        $li.toggleClass('tag-name-selected');
      }
    });
  },
  initTagList: function() {
    var tags_string = IfMicro.utils.getURLQuery('names');
    var tag_name_list = [];
    if (tags_string != undefined) {
      if (this.combine_tag_filter) {
        tag_name_list = decodeURI(tags_string).split(',');
      } else {
        tag_name_list = [decodeURI(tags_string)];
      }
    }

    if (tag_name_list.length > 0) {
      this.updateAllSelectedState(tag_name_list);
      this.updateTagListDisplay(tag_name_list);
    }
  },
  start: function(combine_tag_filter) {
    var that = this;

    this.combine_tag_filter = !!combine_tag_filter;

    this.tag_hash = this.getTagHash();

    this.initTagList();

    $('.js-tag-name-list a').removeAttr('href');

    $('.js-tag-name-list li').click(function(e) {
      var $ele = $(this);
      var cur_selected = $ele.hasClass('tag-name-selected');
      if (!that.combine_tag_filter) {
        $('.js-tag-name-list li').removeClass('tag-name-selected');
        cur_selected && $ele.addClass('tag-name-selected');
      }

      $ele.toggleClass('tag-name-selected');

      var tag_name_list = that.getTagNameList();

      that.updateTagListDisplay(tag_name_list);

      that.updateUrlQuery('names', tag_name_list);
    });

    window.onpopstate = function() {
      $('.js-tag-name-list li').removeClass('tag-name-selected');
      that.initTagList();
    }
  }
}
