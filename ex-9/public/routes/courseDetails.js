/*

  "author": "Abishek",

*/

var express = require('express');

var router = express.Router()
var courseModel = require('../models/Course');

router.use(function postCount(req, res, next){
    if(req.method == "POST"){
        console.log("Middleware Counter-->", req.session.postCount);
        req.session.postCount = req.session.postCount + 1;
    }
    next();
});


router.post('/', function (req, res) {
    if(req.body){
        //console.log("POST", req.body);
        var course = new courseModel(req.body.courseID, req.body.title,
            req.body.term, req.body.instructor, req.body.instructor-email, 
            req.body.start-time, req.body.end-time);
        //console.log(Object.keys(course));
        req.session.courseDetails = course

        console.log(req.session);
        res.render('details.ejs', { 'course': course});
    }
    else{
        res.render('index.ejs', {'postCount': req.session.postCount || 0});    
    }
    
  });


  
router.get('/', function (req, res) {
    console.log(courseModel.getCourses())

    // //console.log("REQ ses", req.session);
    // if(req.session.courseDetails){
    //     //console.log(req.session.course)
    //     // var course = new courseModel(req.query.courseID, req.query.title,
    //     //     req.query.term, req.query.instructor);
    //     //console.log(Object.keys(req.session.course));
    //     res.render('details.ejs', { 'course': req.session.courseDetails, 'postCount': req.session.postCount || 0});
    // }
    // else{
    //     res.render('details.ejs', { 'course': '', 'postCount': req.session.postCount || 0});    
    // }
    
  });
  

module.exports = router;