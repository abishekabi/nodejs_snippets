
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/milestone4', {useNewUrlParser: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});



exports.mongoose = mongoose;
exports.db = db;