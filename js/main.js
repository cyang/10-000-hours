$(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $('.btn-floating').leanModal();

    $('select').material_select();
});

$("#createTask").submit(function(e){

    $("#todo ul").append( '<li><div class="collapsible-header"><i class="fa fa-circle-o" style="color: ' + $("#color").val() + '"></i>' + $("#title").val() + '</div><div class="collapsible-body"><p>' + $("#description").val() + '</p></div></li>' );

    $('#modal1').closeModal();

    // Prevent refresh
    return false;
});

function saveChanges() {
        // Get a value saved in a form.
        var theValue = textarea.value;
        // Check that there's some code there.
        if (!theValue) {
          message('Error: No value specified');
          return;
        }
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'value': theValue}, function() {
          // Notify that we saved.
          message('Settings saved');
        });
      }
