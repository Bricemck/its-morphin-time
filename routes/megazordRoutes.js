const express = require('express');
const router = express.Router();
const Megazord = require('../models/megazord');

// GET all megazords with populated references
router.get('/', async (req, res) => {
  try {
    const megazords = await Megazord.find()
    res.json(megazords);
  } catch (err) {
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



router.put('/:id', async (req, res) => {
  try {
    const updatedMagazord = await Magazord.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedMagazord) return res.status(404).json({ error: 'Ranger not found' });
    res.json(updatedMagazord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    console.log("Attempting to delete Megazord with ID:", req.params.id);
    const deletedMagazord = await Megazord.findByIdAndDelete(req.params.id);
    if (!deletedMagazord) return res.status(404).json({ error: 'Ranger not found' });
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


module.exports = router;
