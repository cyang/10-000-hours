$(document).ready(function(){
    loadTasks();

    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $('.btn-floating').leanModal();

    $('select').material_select();
});

$("#createTask").submit(function(e){

    $("#todo ul").append( '<li><div class="collapsible-header"><i class="fa fa-circle-o" style="color: ' + $("#color").val() + '"></i>' + $("#title").val() + '</div><div class="collapsible-body"><p>' + $("#description").val() + '</p></div></li>' );

    $('#modal1').closeModal();

    updateTasks();

    // Prevent refresh
    return false;
});

function updateTasks(){
    var task = {
        title: $("#title").val(),
        color: $("#color").val(),
        description: $("#description").val()
    };

    chrome.storage.sync.get('tasks', function (obj) {
        obj['tasks'].push(task);

        chrome.storage.sync.set(obj, function(){
            console.log("Saved a new array item");
        });
    });
}

function loadTasks(){
    chrome.storage.sync.get('tasks', function (obj) {
        obj["tasks"].forEach(function(entry) {
            $("#todo ul").append( '<li><div class="collapsible-header"><i class="fa fa-circle-o" style="color: ' + entry.color + '"></i>' + entry.title + '</div><div class="collapsible-body"><p>' + entry.description + '</p></div></li>' );
        });
    });
}
