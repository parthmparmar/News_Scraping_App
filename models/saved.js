var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var savedSchema = new Schema({

  podcastId: {
    type: Schema.Types.ObjectId,
    ref: "Podcast",
    unique: true
  }
});

var Saved = mongoose.model("Saved", savedSchema);

module.exports = Saved;