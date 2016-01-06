var app = angular.module("app", []);

$(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $('.btn-floating').leanModal();

    $('select').material_select();
});

$("#createTask").submit(function(e){
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/create",
        data: {"title": $("#title").val(), "color": $("#color").val(), "description": $("#description").val()},
        dataType: "json",
        success: function(response){
            console.log("success");
        },
        error: function(response){
            console.log("error");
        }
    });
});
