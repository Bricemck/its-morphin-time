const express = require('express');
const router = express.Router();
const Ranger = require('../models/ranger');

// Middleware to trim whitespace/newlines from the URL
router.use((req, res, next) => {
  req.url = req.url.trim();
  next();
});

// BULK route (must come before dynamic routes)
// Ensure that the URL you use in Postman is exactly '/rangers/bulk' with no extra characters.
router.post('/bulk', async (req, res) => {
  // Validate that the request body is an array.
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Request body must be an array of Ranger objects.' });
  }
  if (req.body.length === 0) {
    return res.status(400).json({ error: 'Request body array cannot be empty.' });
  }

  try {
    // Bulk insert using insertMany.
    const createdRangers = await Ranger.insertMany(req.body);
    res.status(201).json(createdRangers);
  } catch (err) {
    console.error("Bulk Ranger insert error:", err);

    // Handle validation errors.
    if (err.name === 'ValidationError') {
      const errors = {};
      if (err.errors) {
        for (let field in err.errors) {
          errors[field] = err.errors[field].message;
        }
      }
      return res.status(400).json({ error: "Validation failed", details: errors });
    }
    // Handle duplicate key errors.
    if (err.code === 11000) {
      const field = err.message.split("index: ")[1]?.split(" dup key")[0] || "unique field";
      return res.status(409).json({
        error: "Duplicate key error",
        message: `A ranger with that ${field} already exists.`,
        details: err.keyValue
      });
    }
    // Generic error.
    res.status(500).json({ error: 'Failed to create Rangers', details: err.message });
  }
});

// GET all rangers
router.get('/', async (req, res) => {
  try {
    const allRangers = await Ranger.find();
    res.json(allRangers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one ranger by ID
router.get('/:id', async (req, res) => {
  try {
    const ranger = await Ranger.findById(req.params.id);
    if (!ranger) return res.status(404).json({ error: 'Ranger not found' });
    res.json(ranger);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
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

// UPDATE a ranger
router.put('/:id', async (req, res) => {
  try {
    const updatedRanger = await Ranger.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
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
