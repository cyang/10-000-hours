// Pass by reference of an object
var o = { totalSec: 10000*60*60 };


function loadSeconds() {
    o.totalSec = localStorage["seconds"];
    displayTime(o);
}

loadSeconds();

function displayTime(o){
    $("#hours").html(thousandsSeparator(Math.floor(o.totalSec / 3600)));
    $("#minutes").html(Math.floor(o.totalSec / 60) % 60);
    $("#seconds").html(o.totalSec % 60);
}


// Call every second
var timeInterval = setInterval(function(){myTimer(o)}, 1000);

var myTimer = function(o){
    // Saves to local storage
    localStorage["seconds"] = o.totalSec;

    o.totalSec--;
    displayTime(o);
}

// Adds commas in thousands place using regex
function thousandsSeparator(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Stop timer
$("#pause").on("click", function(){
    if ($(this).html() === "Pause"){
        clearInterval(timeInterval);
        $(this).html("Resume");
    } else {
        timeInterval = setInterval(function(){myTimer(o)}, 1000);
        $(this).html("Pause");
    }
    $(this).trigger('create');
});
