const express = require('express');

const model = require('../models/ConnectionDB');

const router = express.Router();

router.get('/', (req, res) => {
    
    //result = 
    model.getConnections(function(data){
        //console.log("connections--->", data);
        res.render('connections.ejs', { 
            connections: data,
            //connectionCategory: data[1],
            //connectionsSize: data.length,
            user: "Abishek"
        });
    });
    
    

    
});

router.get('/savedConnections', (req, res) => {
    
    res.render('savedConnections.ejs', {user: req.session.userProfile['FirstName']});
});


router.get('/new', (req, res) => {

    res.render('newConnection.ejs', {user: req.session.userProfile['firstName']});
});

router.post('/new', (req, res) => {
    
    res.redirect('/connections');
});



router.get('/:connectionID', (req, res) => {

    var connection = null;

    if(req.params && ! isNaN(req.params.connectionID) ) {

        model.getConnection(Number(req.params.connectionID), function(data){
            console.log("model.getConnection --> ", data)
            if(data) {
            
                res.render('connection.ejs', { 
                    connection: data[0], 
                    user: "Abishek" //req.session.userProfile['FirstName'] 
                });
    
            }
            else {
            
                res.redirect('/connections/')
            }   

        });
        
         
    }
    
    

});

module.exports = router;