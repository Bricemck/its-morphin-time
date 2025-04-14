const mongoose = require("mongoose");

const seasonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sentaiName: { type: String, required: true },
  airingYear: { type: Number, required: true },
  seasonNumber: { type: Number, required: true },
  numberOfEpisodes: { type: Number, required: true },
  firstEpisode: { type: String, required: true },
  lastEpisode: { type: String, required: true },
  theme: { type: String, required: true },
  producer: { type: String, required: true },
  comment:{type: String, required: false},
  // Update: rangers is now an array of ObjectId references to the Ranger model.
  rangers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ranger' }],
  magozord: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Megazord' }] // Added magozord field for this season
});

const Season = mongoose.model("Season", seasonSchema);

module.exports = Season;