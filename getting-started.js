
// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


var kittySchema = new mongoose.Schema({
  name: String
});


//var Kitten = mongoose.model('Kitten', kittySchema);


// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);


var fluffy = new Kitten({ name: 'fluffy' });

//fluffy.speak(); // "Meow name is fluffy"


fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });



Kitten.find({ name: /^fluff/ }, function(err ,data){
	  if (err) return console.error(err);
	console.log("Kitten.find --->", data);
});



