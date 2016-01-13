$(document).ready(function() {
    loadTasks();

    $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $('#addButton').leanModal();

    $('select').material_select();
});

$(window).unload(function() {
    // Saves to chrome storage
    chrome.storage.sync.set({
        'seconds': o.totalSec
    });
    console.log("Saved");
});

$("#createTask").submit(function(e) {
    appendCollapsibleItem($("#color").val(), $("#title").val(), $("#description").val());

    $('#modal1').closeModal();

    updateTasks();

    // Clear form inputs
    $(this)[0].reset();

    // Prevent refresh
    return false;
});

$("#removeButton").on("click", function(e) {
    if (confirm("Are you sure you want to delete all notes/tasks?")){
        chrome.storage.sync.remove('tasks');
        $("#todo ul").html("");
        loadTasks();
    }
});

function updateTasks() {
    var task = {
        title: $("#title").val(),
        color: $("#color").val(),
        description: $("#description").val()
    };


    chrome.storage.sync.get('tasks', function(obj) {
        if (obj['tasks'] === undefined) {
            obj['tasks'] = [];
        }

        obj['tasks'].push(task);

        chrome.storage.sync.set(obj, function() {
            console.log("Saved a new array item");
        });
    });

}

function loadTasks() {
    chrome.storage.sync.get('tasks', function(obj) {

        try {
            obj["tasks"].forEach(function(entry) {
                appendCollapsibleItem(entry.color, entry.title, entry.description);
            });
        } catch (err) {
            console.log(err.message);
        }
    });
}

function appendCollapsibleItem(color, title, description) {
    $("#todo ul").append('<li><div class="collapsible-header"><i class="fa fa-circle-o" style="color: ' + color + '"></i>' + title + '</div><div class="collapsible-body"><p>' + description + '</p></div></li>');
}
