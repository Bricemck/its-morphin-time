const express = require('express');
const router = express.Router();
const Seasons = require('../models/season');  

// Create a season
router.post('/', async (req, res) => {
  try {
    const createdSeason = await Seasons.create(req.body);
    res.json(createdSeason);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all seasons
router.get('/', async (req, res) => {
  try {
    const foundSeasons = await Seasons.find();
    res.json(foundSeasons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a season
router.delete('/:seasonId', async (req, res) => {
  try {
    const deletedSeason = await Seasons.findByIdAndDelete(req.params.seasonId);
    if (!deletedSeason) {
      return res.status(404).json({ error: 'Season not found' });
    }
    res.json(deletedSeason);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a season
router.put('/:seasonId', async (req, res) => {
  try {
    const updatedSeason = await Seasons.findByIdAndUpdate(
      req.params.seasonId,
      req.body,
      { new: true }
    );
    if (!updatedSeason) {
      return res.status(404).json({ error: 'Season not found' });
    }
    res.json(updatedSeason);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;