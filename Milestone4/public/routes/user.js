const express = require('express');

const User = require('../models/UserDB');

const userProfile = require('../models/UserProfileDB');

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
        res.redirect('/user/connections')
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

    console.log(req)
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


router.delete('/rsvp', isLogged, (req, res) => { 
    
    userProfile.removeConnection(req.body['connection-id']);
    req.session.userProfile = userProfile;

    res.redirect('/user/connections');

});

router.put('/rsvp', isLogged, (req, res) => { 
    
    userProfile.updateRSVP(req.body['connection-id'], req.body['rsvp-type']);
    req.session.userProfile = userProfile;

    res.redirect('/user/connections');

});

router.get('/connections', isLogged, (req, res) => {

    let pageParams = {title: 'My Connections'};
    console.log("user connections", req.session.userProfile);
    //userConnections = userProfile.getUserConnections();
    userProfile.getUserProfile(req.session.userProfile[0]['userID'], function(data){
        //console.log("user-conn", data);
        res.render('profileConnections.ejs', {
            userConnections: data,
            pageParams: pageParams,
            user: req.userData
        });
    });

    
});

module.exports = router;