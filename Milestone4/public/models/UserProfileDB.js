
const model = require('./index.js')

const userModel = require('./UserDB')

var userProfileSchema = new model.mongoose.Schema({
    userID: {
      type: Number,
      value: null,
      required: true,
      //unique: true
    },
    userConnection: {
      type: Number,
      value: null,
      required: false
    },
    rsvp: {
      type: Number,
      //value: null,
      required: false,
      
    },
});


var UserProfile = model.mongoose.model('UserProfile', userProfileSchema);

// UserProfile.create({
//   "userID": 1,
//   "userConnection": 1,
//   "rsvp": true
// }).then(function(data){
//   console.log(data)
// })



function getUserProfile(userID, cb){
  UserProfile.find({userID: userID}).then(function(data){
            cb(data)
    //         //if (err) return handleError(err);
    //         //return data;
    });
}


function addRSVP(connectionID, userID, rsvp, cb){
  //console.log("addRSVP -->" , connectionID, userID, rsvp);
  if((rsvp != null ) && (connectionID!= null ) && (userID!= null )){
    UserProfile.create({
      "userID": userID,
      "userConnection": connectionID,
      "rsvp": true
    }, function(err, data){
      if(err){
        console.log('err', err)
        updateRSVP(connectionID, userID, rsvp, function(data){
          console.log(data)
          cb({
            "status": true
          });
        });
      }
      //console.log(data)
      else{
        cb({
          "status": true
        });
      }
      
      
    });
  }
  else{
    console.log("addrsvp error ");
    cb({
      "status": false
    });
  }

}


function updateRSVP(connectionID, userID, rsvp, cb){
  UserProfile.updateOne({
    "userID": userID,
    "userConnection": connectionID,
    "rsvp": rsvp
  }, function(err, data){
    console.log("updateRSVP -->", err, data);
    if(err){
      console.log('err', err);
      cb({"status": false});
    }
    else{
      cb({"status": true});
    }
  });

}

function removeConnection(connectionID, userID, cb){
  UserProfile.deleteOne({
    "userID": userID,
    "userConnection": connectionID
  }, function(err, data){
    console.log("deleteRSVP -->", err, data);
    if(err){
      console.log('err', err);
      cb({"status": false});
    }
    else{
      cb({"status": true});
    }
  });


}




module.exports = {
  UserProfile: UserProfile,
  getUserProfile: getUserProfile,
  addRSVP: addRSVP,
  updateRSVP: updateRSVP,
  removeConnection: removeConnection
}
