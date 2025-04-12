const mongoose = require("mongoose");



const seasonSchema = mongoose.Schema({
    name: { type: String, required: true },
    sentaiName: { type: String, required: true },
    airingYear: { type: Number, required: true },
    seasonNumber: { type: Number, required: true },
    numberOfEpisodes: { type: Number, required: true },
    firstEpisode: { type: String, required: true },
    lastEpisode: { type: String, required: true },
    theme: { type: String, required: true },
    producer: { type: String, required: true },
    rangers: { type: Array, required: true }
});

const Season = mongoose.model("Season", seasonSchema);

module.exports = Season;