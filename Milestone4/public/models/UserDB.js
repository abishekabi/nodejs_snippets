
const model = require('./index.js')

var userSchema = new model.mongoose.Schema({
    userID : {
      type: Number,
      value: null,
      required: true,
      unique: true
    },
    firstName : {
      type: String,
      value: null,
      required: true
    },
    lastName : {
      type: String,
      value: null,
      required: true
    },
    emailAddress : {
      type: String,
      value: null,
      required: true
    },
    country : {
      type: String,
      value: null,
      required: true
    }
});

var User = model.mongoose.model('User', userSchema);





function getUser(emailAddress, cb){
  User.find({emailAddress: emailAddress}).then(function(data){
            cb(data)
    //         //if (err) return handleError(err);
    //         //return data;
    });
}



module.exports = {
  User: User,
  getUser: getUser
}
