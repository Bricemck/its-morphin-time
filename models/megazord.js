const mongoose = require('mongoose');


const megazordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pictureLink: { type: String, required: true },
  // Reference to the Ranger model(s)
  pilotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ranger', required: true }],
  // Reference to the Season model
  firstAppearedInSeason: { type: mongoose.Schema.Types.ObjectId, ref: 'Season', required: true },
  combinedMegazord: { type: String, required: true }
});

const Megazord = mongoose.model("Megazord", megazordSchema);

module.exports = Megazord;