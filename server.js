const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const rangerRoutes = require('./routes/rangerRoutes');
const megazordRoutes = require('./routes/megazordRoutes');
const seasonsRoutes = require('./routes/seasonsRoutes');

const cors = require('cors');
app.use(cors());


if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI not defined in .env file');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI);
process.env.MONGODB_URI

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB: ${mongoose.connection.db.databaseName}`);
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.use(express.json());


// BELOW = added by AJ (Mount route controllers) testing the new rangerRoutes
app.use('/seasons', seasonsRoutes);
app.use('/megazords', megazordRoutes);     
app.use('/rangers', rangerRoutes);

app.listen(3000, () => {
  console.log('The express app is ready!');
});

// const dotenv = require('dotenv');
// dotenv.config();
// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const rangerRoutes = require('./routes/rangerRoutes');
// const megazordRoutes = require('./routes/megazordRoutes');
// const seasonsRoutes = require('./routes/seasonsRoutes')



// mongoose.connect(process.env.MONGODB_URI);

// mongoose.connection.on('connected', () => {
//   console.log(`Connected to MongoDB ${mongoose.connection.db.databaseName}.`);
// });

// mongoose.connection.on('error', (err) => {
//   console.error(`MongoDB connection error: ${err}`);
// });

// if (!process.env.MONGODB_URI) {
//   console.error('Error: MONGODB_URI not defined in .env file');
//   process.exit(1);
// }

// app.use(express.json());

// // Routes go here
// app.use('/rangers', rangerRoutes);
// app.use('/megazords', megazordRoutes);
// app.use('/seasons', seasonsRoutes);


// app.listen(3000, () => {
//   console.log('The express app is ready!');
// });