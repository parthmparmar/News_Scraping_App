
$(document).ready(function(){
    $.ajax({
        url: "/podcasts",
        type: "GET"
    }).then(function(response){
        console.log(response);
        makeCards(response);

    });
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
        newCard.appendTo(".podcasts");
    });
};

$(".note").on("click", function(){
   $(".add-note").attr("data-id",$(this).data("id"));
   $(".podcast-title").text($(this).data("title"));
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
                title: title,
                body: note
            }
        }).then(function(data){
            console.log(data);
        })
    };
})