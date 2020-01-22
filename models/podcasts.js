var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PodcastSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  link: {
    type: String,
    required: true
  },

  description: {
      type: String,
      required: true
  },

  imageLink: {
      type: String,
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Notes"
  }
});

var Podcast = mongoose.model("Podcast", PodcastSchema);

// Export the Article model
module.exports = Podcast;