function startMoving(img) {
    var img$ = $(img);
    var imgWidth = img$.width();
    var screenWidth = $(window).width();
    var amount = screenWidth - (parseInt(img$.css("right"), 10) || 0);
    // if already past right edge, reset to 
    // just left of left edge
    if (amount <=0 ) {
        img$.css("right", -imgWidth);
        amount = screenWidth + imgWidth;
    }

    var moveRate = 75;   // pixels per second to move
    var time = amount * 1000 / moveRate;
    img$.stop(true)
        .animate({
            right: "+=" + amount,
            top: "+=" + amount
        }, time, "linear", function() {
            // when animation finishes, start over
            swimmingUp(this);
        })
}

function swimmingUp(img) {
    var img$ = $(img);
    var imgHeight = img$.height();
    var screenHeight = $(window).height();
    var amount = screenHeight;

    $(img$).css({
        "top":screenHeight,
        "right":"75%",
        "-webkit-transform":"rotate(90deg)",
        "-moz-transform":"rotate(90deg)",
        "-ms-ransform":"rotate(90deg)",
        "-o-transform":"rotate(90deg)",
        "transform":"rotate(90deg)"
    });
   
    if (amount >= screenHeight ) {
        img$.css("top", + screenHeight);
        amount = screenHeight + imgHeight;
    }
    var moveRate = 90;   // pixels per second to move
    var time = amount * 1000 / moveRate;
    img$.stop(true)
        .animate({
            top: "-=" + amount
        }, time, "linear", function() {
            // when animation finishes, start over
            // Dillon put your popup here
            animation();
            $(img$).css({
                "display":"none"
            });
        })
}

function animation(){
    $(function(){
        $("#starfish_key").fadeIn(3000);
        $("#starfish_key").hide("explode", {pieces: 81});
        $("#chest").delay(3000).fadeIn(1500);
        var win = document.getElementById("win");
        setTimeout(function() {
            win.play();
        }, 3000);
        $("#chest").delay(5000).fadeOut(2000);
        setTimeout("location.href='/rollcredits';", "12000")
    });
    
}
        
$(document).ready(function() {
    // readjust if window changes size
    $(window).resize(function() {
        $("#scuba_steve").each(function() {
            startMoving(this);
        });
    });
});