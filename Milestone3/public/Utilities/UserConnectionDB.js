const UserConnection = require('../models/UserConnection');
const UserProfile = require('../models/UserProfile');
const dbConnection = require('./connectionDB');

user = null;
userConnections = [];

// var getConnectionById = function(connectionId){
//     return 
// }

var getIndexOfConnectionById = function (connectionId) {
    console.log("user conn index", userConnections);
    return userConnections.findIndex(i => i.connection.connectionId == connectionId);
}

var userHasConnectionWithId = function(connectionId) {
    return getIndexOfConnectionById(connectionId) != -1 ? true : false;
}



var addConnection = function (connectionId, rsvp) {

    console.log("--->", connectionId, rsvp);
    
    let index = getIndexOfConnectionById(connectionId);

    if(index == -1) {

        userConnections.push(new UserConnection(dbConnection.getConnectionById(connectionId), rsvp));
        return "saved";

    } 
    else 
    {

        userConnections[index].rsvp = rsvp;
        return "updated";
    }
}

var removeConnection = function (connectionId){
    let index = getIndexOfConnectionById(connectionId);
    if(index == -1) {
        return false;
    } else {

        userConnections.splice(index, 1);
        return true;
    }

}

var updateRSVP = function(connectionId, rsvp){
    let index = getIndexOfConnectionById(connectionId);
    if(index == -1) {
        return false;
    } else {
        
        userConnections[index].rsvp = rsvp;
        return true;
    }

}

var getUserConnections = function(connectionId){
    console.log("===", connectionId);
    return userHasConnectionWithId(connectionId);

}


module.exports ={
    addConnection: addConnection,
    removeConnection: removeConnection,
    updateRSVP: updateRSVP,
    getUserConnections: getUserConnections
} ;