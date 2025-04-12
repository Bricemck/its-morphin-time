const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const rangerRoutes = require('./routes/rangerRoutes.js');
const megazordRoutes = require('./routes/megazordRoutes');
const Season = require('./models/season.js');


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.use(express.json());

// Routes go here
app.use('/rangers', rangerRoutes);
app.use('/megazords', megazordRoutes);


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

app.listen(3000, () => {
  console.log('The express app is ready!');
});