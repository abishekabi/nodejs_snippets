/*

  "author": "Abishek",

*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Courses', {useNewUrlParser: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


var courseSchema = new mongoose.Schema({
    CourseID: Number,
    Title: String,
    Term: String,
    Instructor: String
});
  
var Course = mongoose.model('Course', courseSchema);

// courseSchema.save(function(err){
//     if (err) return handleError(err);
//   // saved!
// });


var four_course = [
    {
        CourseID: 1234,
        Title: "NBAD",
        Term: "f2019",
        Instructor: "Nadia"
    },
    {
        CourseID: 1234,
        Title: "NBAD",
        Term: "s2019",
        Instructor: "Nadia"
    },
    {
        CourseID: 1111,
        Title: "Cloud",
        Term: "f2019",
        Instructor: "Noah"
    },
    {
        CourseID: 1111,
        Title: "Cloud",
        Term: "s2019",
        Instructor: "Noah"
    }
]



function createCourse(){
    Course.create(four_course, function (err, awesome_instance) {
        if (err) return handleError(err);
        // saved!
      });
    
}


// var getCourses = function(cb){
//     Course.find({}).then(function(data){
//         cb(data)
//         //if (err) return handleError(err);
//         //return data;
//     });
// }


module.exports = {
    createCourse: createCourse,
    Course: Course
    //getCourses: getCourses,

}












// module.exports = function(course, title, term, instructor){
//     this.CourseID = course;
//     this.Title = title;
//     this.Term = title;
//     this.Instructor = instructor;
// }


// var Course = function(course, title, term, instructor){
//     var courseModel = { 'CourseID': course,
//         'Title': title,
//         'Term': title,
//         'Instructor': instructor
//     };
//     return courseModel;
//     };



// export class Course {
//     constructor(course, title, term, instructor) {
        
//         this.CourseID = course;
//         this.Title = title;
//         this.Term = title;
//         this.Instructor = instructor;
//     }

// }

// var cobj = function(){

//     return courseModel
// }
// mycar = new Car("Ford");


// module.exports = Course;
