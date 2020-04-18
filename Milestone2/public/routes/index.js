const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

    res.render('index.ejs', {user: null});
});

module.exports = router;