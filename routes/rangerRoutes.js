const express = require('express');
const router = express.Router();
const Ranger = require('../models/ranger');

// GET all rangers (with populated season)
router.get('/', async (req, res) => {
  try {
    const allRangers = await Ranger.find()
    res.json(allRangers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// CREATE a ranger
router.post('/', async (req, res) => {
  try {
    const createdRanger = await Ranger.create(req.body);
    res.status(201).json(createdRanger);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ranger = await Ranger.findById(req.params.id).populate('season','name')
    if (!ranger) return res.status(404).json({ error: 'Ranger not found' });
    res.json(ranger);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});


// UPDATE a ranger
router.put('/:id', async (req, res) => {
  try {
    const updatedRanger = await Ranger.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedRanger) return res.status(404).json({ error: 'Ranger not found' });
    res.json(updatedRanger);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a ranger
router.delete('/:id', async (req, res) => {
  try {
    const deletedRanger = await Ranger.findByIdAndDelete(req.params.id);
    if (!deletedRanger) return res.status(404).json({ error: 'Ranger not found' });
    res.json({ message: 'Ranger deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

module.exports = router;
