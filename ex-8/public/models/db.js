/*

  "author": "Abishek",

*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Courses', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


module.exports = { db: db }