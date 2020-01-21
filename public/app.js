
$(document).ready(function(){

    if(window.location.pathname == "/"){

        $.ajax({
            url: "/podcasts",
            type: "GET"
        }).then(function(response){
            console.log(response);
            makeCards(response);

        });
    }
    else if (window.location.pathname == "/saved.html"){
        $.ajax({
            url: "/saved",
            type: "GET"
        }).then(function(response){
            console.log(response);
            if (response.length == 0){
                console.log("No Articles Saved");
                $(".no-podcast").removeClass("d-none");
            }
            else{
                makeCardsSaved(response);
            };
        });
    }
});


function makeCards(data){
    data.forEach(element => {
        var newCard = $(".master").clone(true);
        newCard.removeClass("master d-none");
        newCard.find(".card-header").text(element.title);
        newCard.find(".description").text(element.description);
        newCard.find(".link").attr("href", element.link);
        newCard.find(".note").attr("data-id", element._id);
        newCard.find(".note").attr("data-title", element.title);
        newCard.find(".note").attr("data-note", element.note)
        newCard.find(".save").attr("data-id", element._id);
        newCard.appendTo(".podcasts");
    });
};

function makeCardsSaved(data){
    data.forEach(element => {
        var newCard = $(".master").clone(true);
        newCard.removeClass("master d-none");
        newCard.find(".card-header").text(element.podcastId.title);
        newCard.find(".description").text(element.podcastId.description);
        newCard.find(".link").attr("href", element.podcastId.link);
        newCard.find(".note").attr("data-id", element.podcastId._id);
        newCard.find(".note").attr("data-title", element.podcastId.title);
        newCard.find(".note").attr("data-note", element.podcastId.note);
        newCard.find(".remove").attr("data-id", element._id);
        newCard.appendTo(".podcasts");
    });
};

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
        console.log(response);
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
