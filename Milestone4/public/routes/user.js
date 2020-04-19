const express = require('express');

const User = require('../models/UserDB');

const userProfile = require('../models/UserProfileDB');

const connectionModel = require('../models/ConnectionDB');

const router = express.Router();

const isLogged = (req, res, next) => {
    if(req.session.userProfile){
        next();
    }
    else{
        next()
        //res.redirect('/');
    }
    
}

router.get('/login', (req, res) => {
    let pageParams = {title: 'Login'};
    res.render('login.ejs', {pageParams: pageParams, user: req.userData});
});

router.post('/login', (req, res) => {

    User.getUser(req.body['name'], function(data){
        console.log("Login details: ", data);
        req.session.userProfile = data;
        res.redirect('/user/connections');
    })
    //userProfile.user = new User("1", "Abishek", "Abishek", "a5@uncc.edu", "USA");
    
    //req.session.userProfile = userProfile.user;

    
});

router.get('/logout', isLogged, (req, res) => {

    req.session.userProfile = {};
    console.log(req.session)
    res.redirect('/');
});

router.post('/rsvp/:connectionID', isLogged, (req, res) => { 
    var rsvp = null;
    if(req.body['rsvp'] == "Yes"){
        rsvp = 1;
    }
    else if(req.body['rsvp'] == "No"){
        rsvp = 0;
    }
    else{
        rsvp = 2;
    }
    //console.log("---> ", rsvp)
    //console.log(userProfile);
    //userProfile.addRSVP(connectionID, userID, rsvp, cb)
    userProfile.addRSVP(req.params.connectionID, 
                    req.session.userProfile[0]['userID'], 
                    rsvp, function(data){
                        if(data.status == true){
                            res.redirect('/user/connections');                        
                        }
                        else{
                            console.log("RSVP ERROR");
                        }
                    })

    // userProfile.addConnection(req.body['connection-id'], req.body['rsvp-type']);
    // req.session.userProfile = userProfile;

});


router.post('/rsvp/delete/:connectionID', isLogged, (req, res) => { 
    console.log("delete ->", req.params);
    userProfile.removeConnection(req.params.connectionID, 
        req.session.userProfile[0]['userID'], 
        function(data){
            if(data.status == true){
                res.redirect('/user/connections');                        
            }
            else{
                console.log("RSVP DELETE ERROR");
            }
        });

});

// router.put('/rsvp', isLogged, (req, res) => { 
    
//     userProfile.updateRSVP(req.body['connection-id'], req.body['rsvp-type']);
//     req.session.userProfile = userProfile;

//     res.redirect('/user/connections');

// });
// userProfile.UserProfile.find().populate('users').exec(function(err, users) {
//     console.log(err, users);
// });

var events = require('events');
var eventEmitter = new events.EventEmitter(); 
var totalConn = []


eventEmitter.on('connections_event', function (data) {
    totalConn.push(data);
});

eventEmitter.on('connections_event_final', function (req, res, pageParams) {
    // console.log("Totalconn", totalConn);
    res.render('profileConnections.ejs', {
            userConnections: totalConn,
            //rsvpData: rsvpData[0],
            pageParams: pageParams,
            user: req.session.userProfile[0]['firstName']
        });
});


router.get('/connections', isLogged, (req, res) => {
    totalConn = []
    let pageParams = {title: 'My Connections'};
    console.log("user connections", req.session.userProfile, );
    //userConnections = userProfile.getUserConnections();
    if(req.session.userProfile && Object.keys(req.session.userProfile).length > 0){
    
        userProfile.getUserProfile(req.session.userProfile[0]['userID'], function(rsvpData){
            console.log("getUserProfile", rsvpData);
            if(rsvpData.length > 0){
                
                //rsvpData.forEach(element => {
                for(const element of rsvpData){
                    var forTotal = 0;
                    connectionModel.getConnection(element.userConnection, function(data){
                        //var a= JSON.stringify(data);
                        var a = { 
                            "rsvp": element.rsvp,
                            "data": data[0]
                        };
                        forTotal = forTotal + 1;
                        //totalConn.push(a) 
                        eventEmitter.emit('connections_event', a);
                        //console.log("++++++++", element.rsvp, data[0]);
                        
                        if (forTotal == rsvpData.length){
                            eventEmitter.emit('connections_event_final', req, res, pageParams);
                        };

                        //totalConn.push(data);
                        
                    });    
                };
            }
            else{
                res.render('profileConnections.ejs', {
                    userConnections: null,
                    rsvpData: null,
                    pageParams: pageParams,
                    user: req.session.userProfile[0]['firstName']
                });
            }
        });
    }
    else{
        res.render('profileConnections.ejs', {
            userConnections: null,
            rsvpData: null,
            pageParams: pageParams,
            user: null
        });
    }
        
    });


module.exports = router;