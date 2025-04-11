const mongoose = require('mongoose');


const rangerSchema = mongoose.Schema({
    rangerID: { type: Number, required: true},
    name: { type: String, required: true },
    fullName: { type: String, required: false },
    zord: { type: Array, required: true },
    gender: { type: String, required: true },
    season: { type: String, required: true },
    color: { type: String, required: true },
    homeworld: { type: String, required: true },
    firstAp: { type: String, required: true },
    lastAp: { type: String, required: true },
    numberOfAp: { type: Number, required: true },
    actor: { type: String, required: true }
})

const Ranger = mongoose.model("Ranger", rangerSchema);

module.exports = Ranger;