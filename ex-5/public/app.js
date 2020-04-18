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




app.get('/', function(req, res){
    if( !req.session.postCount){
      req.session.postCount = 0;
    }
    res.render('index.ejs', {'postCount': req.session.postCount || 0});
});

app.use('/coursedetails', courseDetails);



app.listen(port, () => console.log(`App listening on port ${port}!`));