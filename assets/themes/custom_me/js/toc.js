
function tocEffect() {

	if (window.innerWidth >= 460) {
		var menu = $("<div class='menu' title='点击展开/收起,Shift+Z 隐藏或打开'>目录</div>");
		var toc = $("ul#markdown-toc");
		
		//wrap toc into div which class is 'tocWrap'
		toc.wrap('<div class="tocWrap">');
		//set mouseenter and mouseout function for '.tocWrap'
		$('.tocWrap').prepend(menu)
			.delay(500)
			.fadeTo(500, '0.25')
			.hover(function(){
//				$("#site-top").stop().fadeTo(300,"0.9");
				$(this).stop().fadeTo(300, '0.9');
			}, function(){
//				$("#site-top").stop().fadeTo(300,"0.2");
				$(this).stop().fadeTo(300, "0.25");
		});
	

		//Press key Shift+Z to close and open Menu
		//Press key Shift+V to close and open head
		$("html").keypress(function(e) {
			if (e.shiftKey && (e.charCode || e.keyCode) == '90') {
			e.preventDefault();
			$('div.tocWrap').toggle(200);
			} 
			if (e.shiftKey && (e.charCode || e.keyCode) == '86') {
				e.preventDefault();
				$('#header').toggle(200);
			} 

		});
	
		// slideUp or slideDown the menu by clicking
		menu.click(function() {
			$('ul#markdown-toc').slideToggle(300);
		});
		
		// when the link doesn't my site, so open it in a new tab
		$('a[href]').each(function() {
			if(this.href.indexOf(window.location.host) == -1) {
				$(this).attr({target: '_blank', title: this.title || this.href});
			}
		});
	
		// set page top as  the positon of the local link '# ' when clicking them
		$('a[href^=#][href!=#]').click(function() {
			var target = document.getElementById(this.hash.slice(1));

			if(!target) return ;

			var targetOffset = $(target).offset().top;
			$('html,body').animate({scrollTop: targetOffset}, 400);

			return false;
		})
		
		// set scroll to top
		// adjust the height dynamically
		adjustTocScrollbarByWinH("ul#markdown-toc", 0.74);

		// set scroll bar for toc
		$("ul#markdown-toc").mCustomScrollbar({
			theme: "rounded-dots"
		});

	}
}

function adjustTocScrollbarByWinH(nodeStr, percent) {
		// adjust the height dynamically
		if($(nodeStr).length) {
			var $tocNode = $(nodeStr);
			var originH = $tocNode[0].offsetHeight;
			var curH = originH;
			var windowH = window.innerHeight;

			var cssH = $tocNode.css('height');

			if(originH > windowH*percent) {
				curH = windowH*percent;
				$tocNode.animate({height: curH});
			} 
			

			$(window).resizeEnd({
				delay: 500
				},function(){

				windowH = window.innerHeight;
				console.log(windowH);
				if(originH > windowH*percent) {
					curH = windowH*percent;
					$tocNode.animate({height: curH});
				} 
				else {
					$tocNode.animate({height: originH});
				}
			})

		}// end markdwon-toc size

}
