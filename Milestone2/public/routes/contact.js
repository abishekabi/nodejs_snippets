const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

    res.render('contact.ejs', {user: null});
});

module.exports = router;