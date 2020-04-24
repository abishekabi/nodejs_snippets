/*

  "author": "Abishek",

*/

const express = require('express');
const path= require('path')
const app = express();

const port = 8084;

var session = require('express-session')
const bodyParser = require('body-parser');






app.use(session({
    secret: 'keyboard',
    cookie: { }
  }))
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'))

var courseDetails = require('./routes/courseDetails')

var courseModel = require('./models/Course');

courseModel.createCourse();

app.get('/', function(req, res){  
  
  courseModel.Course.find({}).then(function(data){
        //console.log(data);
        res.render('index.ejs', {'course': data});
        //if (err) return handleError(err);
        //return data;
    });

    // if( !req.session.postCount){
    //   req.session.postCount = 0;
    // }
    // res.render('index.ejs', {'postCount': req.session.postCount || 0});
});



app.use('/courseSearch', function(req, res){

    if(req.body){

      //var course = req.body.courseID

      courseModel.Course.find({'CourseID': req.body.courseID}).then(function(data){
        //console.log(data);
        res.render('courseSearch.ejs', {'course': data});
        //if (err) return handleError(err);
        //return data;
    });

    }

});




app.use('/courseUpdate', function(req, res){

  if(req.body){
    var new_course = {
        CourseID: req.body.courseID,
        Title: req.body.title,
        Term: req.body.term,
        Instructor: req.body.instructor,
        InstructorEmail: req.body.instructorEmail, 
        StartTime: req.body.startTime, 
        EndTime: req.body.endTime
      };
    
    var filter = { 
      CourseID: req.body.courseID,
      Term: req.body.term,
      Instructor: req.body.instructor
    };

    courseModel.Course.findOneAndUpdate(filter, new_course).then(function(data){
      if(data){
        courseModel.Course.find({}).then(function(data){
            //console.log(data);
            res.render('index.ejs', {'course': data});
            //if (err) return handleError(err);
            //return data;
        });

      }
      else{
        courseModel.Course.create(new_course, function (err, awesome_instance) {
          if (err) return handleError(err);
          courseModel.Course.find({}).then(function(data){
              //console.log(data);
              res.render('index.ejs', {'course': data});
              //if (err) return handleError(err);
              //return data;
          });
        });
      }
      
      
      //if (err) return handleError(err);
      //return data;
  });

  }

});

//app.use('/coursedetails', courseDetails);



app.listen(port, () => console.log(`App listening on port ${port}!`));