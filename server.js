const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Ranger = require('./models/ranger.js');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

// Routes go here

// CREATE - POST - /pets
app.post('/rangers', async (req, res) => {
  try {
    const createaRanger = await Ranger.create(req.body);
    res.status(201).json(createaRanger);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('The express app is ready!');
});