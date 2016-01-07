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
