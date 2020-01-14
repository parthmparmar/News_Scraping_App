
var express = require("express");
// var mongojs = require("mongojs");

var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

// Database configuration
// var databaseUrl = "scraper";
// var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

app.get("/", function(req, res) {
  res.send("Hello world");
});

// app.get("/all", function(req, res){
//   db.scrapedData.find({}, function(err, data){
//     if (err){
//       console.log(err);
//     }
//     else{
//     res.json(data);
//     }
//   });
  
// });

app.get("/find", function(req, res){
//   db.scrapedData.remove({});

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
    console.log(result)
    // db.scrapedData.insert(result)
  });
  res.redirect("/all");
  });
  
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
