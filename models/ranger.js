const mongoose = require('mongoose');


const rangerSchema = new mongoose.Schema({
  rangerID: { type: Number, required: true },
  name: { type: String, required: true },
  fullName: { type: String },
  zord: { type: [String], required: true },
  gender: { type: String, required: true },
  // Reference to the Season model
  season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season', required: false},
  color: { type: String, required: true },
  homeworld: { type: String, required: true },
  firstAp: { type: String, required: true },
  lastAp: { type: String, required: true },
  numberOfAp: { type: Number, required: true },
  actor: { type: String, required: true },
  img: { type: String, required: false },
  // Reference to the Megazord model that this ranger pilots
  megazordPiloted: { type: mongoose.Schema.Types.ObjectId, ref: 'Megazord',required:false}
});

const Ranger = mongoose.model("Ranger", rangerSchema);

module.exports = Ranger;
