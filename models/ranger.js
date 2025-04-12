// models/ranger.js
const mongoose = require('mongoose');

const rangerSchema = mongoose.Schema({
    rangerID: { type: Number, required: true},
    name: { type: String, required: true },
    fullName: { type: String, required: false },
    zord: { type: [String], required: true },
    gender: { type: String, required: true },
    // Reference to the Season model
    season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season', required: true },
    color: { type: String, required: true },
    homeworld: { type: String, required: true },
    firstAp: { type: String, required: true },
    lastAp: { type: String, required: true },
    numberOfAp: { type: Number, required: true },
    actor: { type: String, required: true }
});

const Ranger = mongoose.model("Ranger", rangerSchema);

module.exports = Ranger;