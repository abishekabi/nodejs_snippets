const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    if ( ! req.session.userProfile ){
        req.session.userProfile = {};
        req.session.userProfile['FirstName'] = null
    }
    
    res.render('index.ejs', {user: req.session.userProfile['FirstName']});
});

module.exports = router;