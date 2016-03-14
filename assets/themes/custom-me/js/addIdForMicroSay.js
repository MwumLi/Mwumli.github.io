// 给每一次微语，添加一个 id, 便于分享

var plist = $("#micro_say").children("p");
var i = 0;
var nums = plist.size();
for(i=0; i < nums; i++) 
{
	$(plist[nums-i-1]).attr("id", i+1);
}
