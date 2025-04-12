const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const rangerRoutes = require('./routes/rangerRoutes.js');
const megazordRoutes = require('./routes/megazordRoutes');
const cors = require('cors');
app.use(cors());


mongoose.connect(process.env.MONGODB_URI);
process.env.MONGODB_URI

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.use(express.json());

// Routes go here

app.listen(3000, () => {
  console.log('The express app is ready!');
});