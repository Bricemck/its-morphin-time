const express = require('express');
const router = express.Router();
const Megazord = require('../models/megazord');  // Import the Megazord model

// GET all megazords
router.get('/', async (req, res) => {
  try {
    const allMegazords = await Megazord.find();
    res.json(allMegazords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one megazord by ID
router.get('/:id', async (req, res) => {
  try {
    const megazord = await Megazord.findById(req.params.id);
    if (!megazord) return res.status(404).json({ error: 'Megazord not found' });
    res.json(megazord);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// CREATE a megazord
router.post('/', async (req, res) => {
  try {
    const createdMegazord = await Megazord.create(req.body);
    res.status(201).json(createdMegazord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE a megazord
router.put('/:id', async (req, res) => {
  try {
    const updatedMegazord = await Megazord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMegazord) return res.status(404).json({ error: 'Megazord not found' });
    res.json(updatedMegazord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a megazord
router.delete('/:id', async (req, res) => {
  try {
    const deletedMegazord = await Megazord.findByIdAndDelete(req.params.id);
    if (!deletedMegazord) return res.status(404).json({ error: 'Megazord not found' });
    res.json({ message: 'Megazord deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

module.exports = router;
