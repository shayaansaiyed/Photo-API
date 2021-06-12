const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Get URI from environment variables
dotenv.config();
if(!process.env.MONGO_URI){
  console.error("Could not read mongodb uri from .env file.")
}
db_uri = process.env.MONGO_URI; 

mongoose.connect(db_uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected!")
});

module.exports = db