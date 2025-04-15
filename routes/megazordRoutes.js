const express = require('express'); //Imports the Express framework so we can use it's router features.
const router = express.Router(); //Creates a new router object to define the routes
const Megazord = require('../models/megazord');//Imports megazord model so we can interact with the megazords collection in MongoDB

// GET all megazords with populated references
router.get('/', async (req, res) => { //async required to await user input.
  try { // attempts to fetch megazord objects from MongoDB
    const megazords = await Megazord.find() //Fetches megazord documents from the database
    res.json(megazords); //sends the list of megazords as a JSON response
  } catch (err) { // if error occurs, responds with a status of 500 and error message
    res.status(500).json({ error: err.message });
  }
});


// CREATE a megazord
router.post('/', async (req, res) => {
  try {
    const newMegazord = await Megazord.create(req.body);
    res.status(201).json(newMegazord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Defines a route for PUT..
//Put updates a specific megazord.  Note a specific id is needed for the PUT route.
router.put('/:id', async (req, res) => {
  try {
    const updatedMegazord = await Megazord.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    //new: true returns the updated document.
    //runValidators: true ensures validation rules defined in the schema are applied.
    //e.g. looking for strings, valid ranger id, etc.
    //Mongoose doesn't do this by default.
    if (!updatedMegazord) return res.status(404).json({ error: 'Megazord not found' });
    res.json(updatedMegazord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Delete route
router.delete('/:id', async (req, res) => {
  try {
    console.log("Attempting to delete Megazord with ID:", req.params.id);
    const deletedMegazord = await Megazord.findByIdAndDelete(req.params.id);
    if (!deletedMegazord) return res.status(404).json({ error: 'Ranger not found' });
    res.json({ message: 'Ranger deleted successfully' });
  } catch (err) {
    console.error("Error during deletion:", err);
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// GET a single megazord by ID with populated references
router.get('/:id', async (req, res) => {
  try {
    const megazord = await Megazord.findById(req.params.id)
    .populate('pilotedBy', 'name')
      .populate('firstAppearedInSeason','name');
    if (!megazord) return res.status(404).json({ error: 'Megazord not found' });
    res.json(megazord);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

//exports the router to be used in the main Express app.
module.exports = router;