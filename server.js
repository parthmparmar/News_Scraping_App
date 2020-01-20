
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/homework18Podcast", { useNewUrlParser: true });

// Routes

// Home
app.get("/", function(req, res) {
  res.send("Hello world");
});

// Scrap Route
app.get("/find", function(req, res){

  db.Podcast.remove({}, function(data){
    console.log(data);
  });
  axios.get("https://www.npr.org/sections/money/").then(function(response) {
  var $ = cheerio.load(response.data);
  var result = {};

  $("article.item").each(function(i, element) {

    var title = $(element).find(".title").text();
    var description = $(element).find(".teaser").text();
    var link = $(element).find(".title").children("a").attr("href");
    var imageLink = $(element).find("img").attr("src");

    result = {
      title: title,
      description: description,
      link: link,
      imageLink: imageLink
    };
  
    db.Podcast.create(result)
    .then(function(dbPodcast){
      console.log(dbPodcast);
    }).catch(function(err){
      console.log(err);
    });

  });
  res.send("Podcast Found!")
  });
});

// All Podcast Route
app.get("/podcasts", function(req, res){
  db.Podcast.find({}).then(function(dbPodcasts){
    res.json(dbPodcasts);
  }).catch(function(err){
    console.log(err);
  });
});

// add Note 

app.post("/note/:id", function(req, res){
  var id = req.params.id;

  db.Notes.create(req.body).then(function(dbNote){
    return db.Podcast.findByIdAndUpdate({_id:id}, {note : dbNote._id}, {new: true});
  }).then(function(dbPodcast){
    res.json(dbPodcast);
  }).catch(function(err){
    console.log(err);
  });

});

app.get("/notes", function(req, res){
  db.Notes.find({}).then(function(dbNotes){
    res.json(dbNotes);
  }).catch(function(err){
    console.log(err);
  });
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
