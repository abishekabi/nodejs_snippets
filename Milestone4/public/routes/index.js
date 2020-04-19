const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    if ( ! req.session.userProfile ){
        req.session.userProfile = [
            {
                userID: 1,
                firstName: 'Abishek',
                lastName: 'a',
                emailAddress: 'a5@uncc.edu',
                country: 'USA'
            }];
        
        //req.session.userProfile['FirstName'] = null
    }
    try{
        var usr = req.session.userProfile[0].firstName;

    }
    catch(err) {
        var usr= null;
    }
    finally{
        res.render('index.ejs', {user:  usr});
    }
    
});

module.exports = router;