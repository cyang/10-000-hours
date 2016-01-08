$(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $('.btn-floating').leanModal();

    $('select').material_select();

    loadTasks();
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

    var tasksList = [];
    chrome.storage.sync.get('tasks', function (obj) {
        tasksList = obj["tasks"];
    });

    tasksList.push(task);

    chrome.storage.sync.set({'tasks': tasksList});
}

function loadTasks(){

}
