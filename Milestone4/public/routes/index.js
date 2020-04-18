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
    
    res.render('index.ejs', {user: req.session.userProfile['firstName']});
});

module.exports = router;