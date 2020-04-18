const express = require('express');
const path= require('path')
const app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


const port = 8084;

app.use(express.urlencoded())


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'))


app.get('/', function(request, response){
    response.send('Welcome to the course app!')
});


app.post('/profile', function(req, res){
    console.log("Req body", req.body);
    res.send('profile param, ' + req.body);
});


app.get('/profile', function(req, res){
    res.render('profile');
});



app.listen(port, () => console.log(`App listening on port ${port}!`));