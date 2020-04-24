/*

  "author": "Abishek",

*/

var express = require('express');

var router = express.Router()


// var courseModel = require('../models/Course');


router.get('/*',function(req,res){
  //var courseModel = require('./models/Course');
  courseModel.createCourse();

  courseModel.Course.find({}).then(function(data){
        console.log(data);
        //if (err) return handleError(err);
        //return data;
    });

    
    res.send('Welcome to the course app!', {'postCount': req.session.postCount || 0});
  });
  
module.exports = router;