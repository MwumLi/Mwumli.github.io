//Author: MwumLi
//Date: 2015-04-13 10:17:48
// use jquery.zclip.js
//CDN:
//	http://cdn.bootcss.com/zclip/1.1.2/jquery.zclip.min.js
//  http://cdn.bootcss.com/zclip/1.1.2/ZeroClipboard.swf

/*
 * @container -- is a tag include the text that will be copied(default `pre`)
 * @copyClass -- is copy link's class which make your css style(default `copy`)
 * @copyText -- is copy link's content, which is a text string(default `Copy`)
 * */

function addCopy(container, copyClass, copyText) {

	if(!copyText) 
	  copyText = "Copy";
	if(!copyClass)
	  copyClass = "copy";
	if(!container)
	  container = "pre";

	var copy = $('<div><a href="javascript:void(0)"></div>');	
	copy.find("a").addClass(copyClass);
	$(container).prepend(copy);

	//use copy plugin
	$("."+copyClass).zclip({
		path: 'http://cdn.bootcss.com/zclip/1.1.2/ZeroClipboard.swf',
		copy: function() {
		var copyNode = $("a."+copyClass+".hover");
		var node = copyNode.parents(container);
		copyNode.parent().slideUp();
		copyNode.text("");
		return node.text();
		}	
	});

	$("."+copyClass).parent().hide();

	var old = null;
	
	$(container).dblclick(function(event){
	
		var ev = event.target;
		if(ev.tagName != container.toUpperCase())
			ev = $(ev).parents(container);
		else 
			ev = $(ev);
		
		//miss old copy link
		if(old && old !== ev) {
			old.find("a."+copyClass).text("");
			old.find('div').slideUp();
		}
		//make current as old
		old = ev;

		ev.find("a."+copyClass).text(copyText);
		ev.find('div').slideDown();
		event.stopPropagation();

	});

	$(container).click(function(event){
		$(this).find("a."+copyClass).text("");
		$(this).find('div').slideUp();
		event.stopPropagation();
	});

}







