
function toComments() {

	$(".nav-bottom")
		.fadeTo(500, '0.25')
		.hover(function(){
			$(this).stop().fadeTo(300, '0.9');
		}, function(){
		$(this).stop().fadeTo(300, "0.25");														});
	
	// set scroll to top
	$('#site-top').click(function(){
		var targetOffset = $("#header").offset().top;
		$("html,body").animate({scrollTop: targetOffset}, 400);

	});

	if($("#to_comments").length > 0) {
		$("#site-bottom").hide();
		$("#site-comment").css("border-bottom","none");
	} else {
		$("#site-comment").hide()
	}
	// set scroll to bottom
	$('#site-bottom').click(function(){
		var targetOffset = $("#footer").offset().top;
		$("html,body").animate({scrollTop: targetOffset}, 400);

	});

	$("#site-comment").click(function(){
		var targetOffset = $("#to_comments").offset().top;
		$("html,body").animate({scrollTop: targetOffset}, 400);
	});

	$("nav-bottom-comment").click(function(){
		var e = $(this).children("a");
		var target = document.getElementById(e.attr("href").slice(1));
		var targetOffset = $(target).offset().top;
		$("html,body").animate({scrollTop: targetOffset}, 400);
	});
		
}
