const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

    res.render('about.ejs', {user: null});
});

module.exports = router;