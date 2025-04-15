const mongoose = require('mongoose'); //Imports Mongoose so you can define schemas and 
//interact with MongoDB.

//new schema object to define the structure of the Megazord document
const megazordSchema = new mongoose.Schema({ 
  name: { type: String, required: true }, //name required string eg. "Dino Megazord"
  pictureLink: { type: String, required: true }, //required string, a URL to an image
  pilotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ranger', required: true }],
// array of object ids that reference documents in the Ranger model.
// Multiple rangers can pilot a megazord, so this collects an array of rangers found by their id.
// the 'ref: 'Ranger'' allows Mongoose to populate ranger info when you use .populate().
  firstAppearedInSeason: { type: mongoose.Schema.Types.ObjectId, ref: 'Season', required: true },
  //Stores the id of the season where the megazord first appeared.
  combinedMegazord: { type: String, required: true } //A string field for what the Megazord combines into eg "Omega Megazord"
});

const Megazord = mongoose.model("Megazord", megazordSchema); //creates the Megazord model based on the schema tying it to the megazord collection
//in MongoDB

module.exports = Megazord; // Exports the model so you can use it in the routes.