const express = require('express');

const model = require('./../Utilities/connectionDB');

const router = express.Router();

router.get('/', (req, res) => {
    
    result = model.getConnectionsGroupedByCategory();

    res.render('connections.ejs', { 
        connections: result.connections,
        connectionsSize: result.length,
        user: null
    });
});

router.get('/savedConnections', (req, res) => {
    
    res.render('savedConnections.ejs', {user: null});
});


router.get('/new', (req, res) => {

    res.render('newConnection.ejs', {user: null});
});

router.post('/new', (req, res) => {
    
    res.redirect('/connections');
});



router.get('/:connectionID', (req, res) => {

    var connection = null;

    if(req.params && ! isNaN(req.params.connectionID) ) {
        //console.log("conn", model.getConnectionByID(Number(req.params.connectionID)))
        connection = model.getConnectionByID(Number(req.params.connectionID));    
        
        if(connection) {
            
            res.render('connection.ejs', { connection: connection, user: null });

        }
        else {
        
            res.redirect('/connections/')
        }    
    }
    
    

});

module.exports = router;