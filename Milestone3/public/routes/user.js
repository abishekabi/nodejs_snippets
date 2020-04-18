const express = require('express');

const User = require('../models/User');

const userProfile = require('../Utilities/UserConnectionDB');

const router = express.Router();

const isLogged = (req, res, next) => {
    if(req.session.userProfile) next();
    else res.redirect('/');
}

router.get('/login', (req, res) => {
    let pageParams = {title: 'Login'};
    res.render('login.ejs', {pageParams: pageParams, user: req.userData});
});

router.post('/login', (req, res) => {

    userProfile.user = new User("1", "Abishek", "Abishek", "a5@uncc.edu", "USA");
    
    req.session.userProfile = userProfile.user;

    res.redirect('/user/connections');
});

router.get('/logout', isLogged, (req, res) => {

    req.session.userProfile = {};
    console.log(req.session)
    res.redirect('/');
});

router.post('/rsvp', isLogged, (req, res) => { 
    
    userProfile.addConnection(req.body['connection-id'], req.body['rsvp-type']);
    req.session.userProfile = userProfile;

    res.redirect('/user/connections');

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
    //console.log("user-conn", req.session.userProfile);
    //userConnections = userProfile.getUserConnections();
    userConnections = userProfile.getUserConnections(req.session.userProfile['UserID']);

    console.log("user-conn", userConnections);
    
    
    res.render('profileConnections.ejs', {
        userConnections: userConnections,
        pageParams: pageParams,
        user: req.userData
    });
});

module.exports = router;