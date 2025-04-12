const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Season = require('./models/season.js');
const cors = require('cors');
app.use(cors());


mongoose.connect(process.env.MONGODB_URI);
process.env.MONGODB_URI

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

// Routes go here

app.post('/seasons', async (req, res) => {
  const createdSeason = await Season.create(req.body);
  res.json(createdSeason)
});

app.get('/seasons', async (req, res) => {
  const foundSeason = await Season.find();
  res.json(foundSeason);
})

app.delete('/seasons/:seasonId', async (req, res) => {
  const deletedSeason = await Season.findByIdAndDelete(req.params.seasonId);
  res.json(deletedSeason);
})

app.put('/seasons/:seasonId', async (req, res) => {
  const updatedSeason = await Season.findByIdAndUpdate(
    req.params.seasonId,
    req.body,
  {new:true});
  res.json(updatedSeason);
})

app.listen(3000, () => {
  console.log('The express app is ready!');
});