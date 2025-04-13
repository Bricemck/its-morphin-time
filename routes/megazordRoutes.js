const express = require('express');
const router = express.Router();
const Megazord = require('../models/megazord');

// GET all megazords with populated references
router.get('/', async (req, res) => {
  try {
    const megazords = await Megazord.find().populate('pilotedBy').populate('firstAppearedInSeason')
      .populate('pilotedBy')
      .populate('firstAppearedInSeason');
    res.json(megazords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single megazord by ID with populated references
router.get('/:id', async (req, res) => {
  try {
    const megazord = await Megazord.findById(req.params.id).populate('pilotedBy').populate('firstAppearedInSeason')
      .populate('pilotedBy')
      .populate('firstAppearedInSeason');
    if (!megazord) return res.status(404).json({ error: 'Megazord not found' });
    res.json(megazord);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
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


module.exports = router;
