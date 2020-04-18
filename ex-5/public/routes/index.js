var express = require('express');

var router = express.Router()

router.get('/*',function(req,res){
    res.send('Welcome to the course app!', {'postCount': req.session.postCount || 0});
  });
  
module.exports = router;