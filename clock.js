// Pass by reference of an object
var o = { totalSec: 10000*60*60 };

// Call every second
var timeInterval = setInterval(function(){myTimer(o)}, 1000);

var myTimer = function(o){
    o.totalSec--;
    $("#hours").html(Math.floor(o.totalSec / 3600));
    $("#minutes").html(Math.floor(o.totalSec / 60) % 60);
    $("#seconds").html(o.totalSec % 60);
}

// Stop timer
$("#pause").on("click", function(){
    if ($(this).html() === "Pause"){
        clearInterval(timeInterval);
        $(this).html("Resume");
    } else {
        timeInterval;
        $(this).html("Pause");
    }
});
