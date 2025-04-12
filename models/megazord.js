const mongoose = require('mongoose');

const megazordSchema = mongoose.Schema({
  name: { type: String, required: true },
  pictureLink: { type: String, required: true },  // Link to a picture of the Megazord
  pilotedBy: { type: [String], required: true },  // Rangers
  firstAppearedInSeason: { type: String, required: true },  // The season it first appeared
  combinedMegazord: { type: String, required: true }  // The name of the Megazord it combines into
});

const Megazord = mongoose.model("Megazord", megazordSchema);

module.exports = Megazord;