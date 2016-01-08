$(document).ready(function(){
    loadTasks();

    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $('.btn-floating').leanModal();

    $('select').material_select();
});

$("#createTask").submit(function(e){
    appendCollapsibleItem($("#color").val(), $("#title").val(), $("#description").val());

    $('#modal1').closeModal();

    updateTasks();

    // Clear form inputs
    $(this)[0].reset();

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
            appendCollapsibleItem(entry.color, entry.title, entry.description);
        });
    });
}

function appendCollapsibleItem(color, title, description){
    $("#todo ul").append( '<li><div class="collapsible-header"><i class="fa fa-circle-o" style="color: ' + color + '"></i>' + title + '<i class="fa fa-times right"></i></div><div class="collapsible-body"><p>' + description + '</p></div></li>' );
}
