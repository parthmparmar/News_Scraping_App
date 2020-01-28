
$(document).ready(function(){

    if(window.location.pathname == "/mypodcasts"){
        $("#home").removeClass("active");
        $("#mypodcasts").addClass("active");
    };
    $.ajax({
        url :"/saved",
        type: "GET"
    }).then(function(response){
        $(".save").each(function(){
            var id = $(this).data("id")
            var found = false;
            for (var i = 0; i < response.length; i++){
                if (id == response[i].podcastId._id){
                    found = true;
                    break;
                };
            };
            if (found){
                $(this).addClass("d-none");
            };
            
        });
    });
});

$(".scrap").on("click", function(){
    $.ajax({
        url: "/find",
        type:"GET"
    }).then(function(response){
        location.reload();
    });
});


$(".note").on("click", function(){
   $(".add-note").attr("data-id",$(this).data("id"));
   $(".podcast-title").text($(this).data("title"));
   $(".clear-note").attr("data-note", $(this).data("note"));
   $(".current-note").text("");
   $(".clear-note").addClass("d-none");
   $(".current-note-label").addClass("d-none");
   var noteId = $(this).data("note");
   $.ajax({
       url: "/note/"+noteId,
       type: "GET"
   }).then(function(response){
       if(response != null){;
       $(".current-note").text(response.body);
       $(".current-note-label").removeClass("d-none");
       $(".clear-note").removeClass("d-none");
       };
   });

});

$(".add-note").on("click", function(){
    var id = $(this).data("id");
    var title = $("#note-text").val();
    var note = $("#note-text").val();
    

    if (note != "" && title != "") {

        $.ajax({
            url: "/note/" + id,
            type: "POST",
            data: {
                body: note
            }
        }).then(function(response){
            console.log(response);
            location.reload();
        });
    };
});

$(".save").on("click", function(){
    var id = $(this).data("id");

    $.ajax({
        url:"/save/" + id,
        type: "POST"
    }).then(function(response){
        console.log(response);
        location.reload()
    });
});

$(".remove").on("click", function(){
    var id = $(this).data("id"); 

    $.ajax({
        url:"/remove/" + id,
        type: "POST"
    }).then(function(response){
        location.reload();
    });
});

$(".clear-note").on("click", function(){
    var noteId = $(this).data("note");
    $.ajax({
        url: "/note/"+noteId,
        type: "DELETE"
    }).then(function(response){
        console.log("note deleted");
        location.reload();
    });
});
