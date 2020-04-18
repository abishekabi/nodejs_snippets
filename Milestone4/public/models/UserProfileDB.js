
const model = require('./index.js')

var userProfileSchema = new model.mongoose.Schema({
    userID: {
      type: Number,
      value: null,
      required: true,
      unique: true
    },
    userConnection: {
      type: Array,
      value: null,
      required: false
    },
    rsvp: {
      type: Boolean,
      //value: null,
      required: false,
      
    },
});


var UserProfile = model.mongoose.model('UserProfile', userProfileSchema);



function getUserProfile(userID, cb){
  UserProfile.find({userID: userID}).then(function(data){
            cb(data)
    //         //if (err) return handleError(err);
    //         //return data;
    });
}


function addRSVP(connectionID, userID, rsvp, cb){
  if(rsvp && connectionID && userID){
    UserProfile.insertOne({
      userID: userID,
      userConnection: connectionID,
      rsvp: true
    }).then(function(data){
      cb({
        "status": true
      });
    })
  }
  else{
    console.log("addrsvop error ");
    cb({
      "status": false
    });
  }

}


function updateRSVP(connectionID, userID, rsvp){


}

function addConnection(connection){



}




module.exports = {
  UserProfile: UserProfile,
  getUserProfile: getUserProfile,
  addRSVP: addRSVP,
  updateRSVP: updateRSVP,
  addConnection: addConnection
}
