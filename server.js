const dotenv = require('dotenv'); //loads dotenv package so you can read environment variables.
dotenv.config(); // actually loads the file and makes variables like MongoDB_URI possible.

const express = require('express'); //Loads Express framework to create a web server
const mongoose = require('mongoose'); // imports Mongoose, to interact with MongoDB using models.
const app = express(); // Initializes the express application.
//Express allows for server side communication through our routes.
app.use(express.static('public')) //Serves static files like images from a folder named public.

//Imports route models
const rangerRoutes = require('./routes/rangerRoutes'); // Ranger routes
const megazordRoutes = require('./routes/megazordRoutes'); // Megazord routes
const seasonsRoutes = require('./routes/seasonsRoutes'); //Season routes

const cors = require('cors'); // Imports cors package to allow cross-origin requests.
// Cross-origin usually means the frontend and backend are on different ports.
app.use(cors()); //Applies CORS middleware to allow requests from different origins.


if (!process.env.MONGODB_URI) { // Safety check. Checks for missing MONGODB_URI
  console.error('Error: MONGODB_URI not defined in .env file'); //Logs the error
  process.exit(1); //Exits the server
}

mongoose.connect(process.env.MONGODB_URI); // Connects to MongoDB using connection string.
process.env.MONGODB_URI //I think this is just reading the variable and not using it,
//but like it's working so I don't want to mess with it.

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB: ${mongoose.connection.db.databaseName}`);
}); //Logs a success message when MongoDB connection is established.

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
}); //Logs errors that happen while trying to connect to MongoDB

app.use(express.json()); // Middleware that parses incoming JSON requests making req.body
//available in route handlers.


// Mounts the routes to the paths. Example get /seasons
app.use('/seasons', seasonsRoutes); 
app.use('/megazords', megazordRoutes);     
app.use('/rangers', rangerRoutes);

app.listen(3000, () => {
  console.log('The express app is ready!');
}); //Starts the server port on 3000 and logs that it's ready.



//Old Code pre controllers

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