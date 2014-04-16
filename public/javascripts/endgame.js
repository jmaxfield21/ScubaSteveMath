function animation(){
	$(function(){
		$("#stafish_key").fadeIn(4000s);
		$("#starfish_key").css({
                "display":"inline"
            });
        $("#starfish_key").toggle("explode");
        $("#starfish_key").css({
        	"display":"none";
        });
	});
	
}