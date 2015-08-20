
function scrollToElement(elementStr){
	var targetOffset = $(elementStr).offset().top;
	$("html,body").animate({scrollTop: targetOffset}, 400);
}
function toComments() {

	$(".nav-bottom")
		.fadeTo(500, '0.25')
		.hover(function(){
			$(this).stop().fadeTo(300, '0.9');
		}, function(){
		$(this).stop().fadeTo(300, "0.25");														});
		
	if($("#to_comments").length > 0) {
		$("#site-bottom").hide();
		$("#site-comment").css("border-bottom","none");
	} else {
		$("#site-comment").hide()
	}

	// set scroll to top
	$('#site-top').click(function(){
		scrollToElement("#header");
	});

	// set scroll to bottom
	$('#site-bottom').click(function(){
		scrollToElement("#footer");
	});

	// set scroll to comment
	$("#site-comment").click(function(){
		scrollToElement("#to_comments");
	});

		
}
