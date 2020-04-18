const express = require('express');
const path= require('path')
const app = express();
const port = 8084;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'))

var courseDetails = require('./routes/courseDetails')




app.get('/', function(request, response){
    response.send('Welcome to the course app!')
});

app.use('/coursedetails', courseDetails);



app.listen(port, () => console.log(`App listening on port ${port}!`));