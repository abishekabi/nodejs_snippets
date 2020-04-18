var express = require('express');

var router = express.Router()
var courseModel = require('../models/Course');


// router.get('/', function (req, res) {
//     res.render('details.ejs', { 'course': ''});    
//   })

  
router.get('/', function (req, res) {
    if(req.query){
        console.log(req.query)
        var course = new courseModel(req.query.courseID, req.query.title,
            req.query.term, req.query.instructor);
        console.log(Object.keys(course));
        res.render('details.ejs', { 'course': course});
    }
    else{
        res.render('details.ejs', { 'course': ''});    
    }
    
  });
  

module.exports = router;