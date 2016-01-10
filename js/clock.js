// Pass by reference of an object
var o = { totalSec: 10000*60*60 };


function loadSeconds() {

    chrome.storage.sync.get('seconds', function (obj) {
        o.totalSec = obj["seconds"];
        displayTime(o);
    });

}

function displayTime(o){
    $("#hours").html(thousandsSeparator(Math.floor(o.totalSec / 3600)));
    $("#minutes").html(Math.floor(o.totalSec / 60) % 60);
    $("#seconds").html(o.totalSec % 60);
}

// Call every second
var timeInterval = setInterval(function(){myTimer(o)}, 1000);

function myTimer(o){
    o.totalSec--;
    displayTime(o);
}

// Adds commas in thousands place using regex
function thousandsSeparator(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(function(){
    loadSeconds();

    myTimer(o);
});

// Stop timer
$("#pause").on("click", function(){
    if ($(this).html() === "Pause"){
        clearInterval(timeInterval);
        $(this).html("Resume in background");
        $("#clockdiv div").addClass("pause")
        // Saves to chrome storage
        chrome.storage.sync.set({'seconds': o.totalSec});
        console.log("Saved");
    } else {
        timeInterval = setInterval(function(){myTimer(o)}, 1000);
        $(this).html("Pause");
        $("#clockdiv div").removeClass("pause")
    }
});
