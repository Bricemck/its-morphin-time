const express = require('express');
const router = express.Router();
const Season = require('../models/season');

// Create a season
router.post('/', async (req, res) => {
  try {
    const createdSeason = await Season.create(req.body);
    res.status(201).json(createdSeason);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all seasons
router.get('/', async (req, res) => {
  try {
    const foundSeasons = await Season.find().populate('rangers')
    res.json(foundSeasons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single season by ID
router.get('/:id', async (req, res) => {
  try {
    const season = await Season.findById(req.params.id)
    .populate('rangers','name')
    .populate('magozord','name');
    if (!season) return res.status(404).json({ error: 'Season not found' });
    res.json(season);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// Update a season by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSeason = await Season.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSeason) return res.status(404).json({ error: 'Season not found' });
    res.json(updatedSeason);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a season by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSeason = await Season.findByIdAndDelete(req.params.id);
    if (!deletedSeason) return res.status(404).json({ error: 'Season not found' });
    res.json(deletedSeason);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
