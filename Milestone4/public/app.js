const express = require('express');
const path= require('path')
const app = express();
const port = 8080;

var session = require('express-session')
const bodyParser = require('body-parser');

app.use(session({
    secret: 'keyboard',
    cookie: { }
  }))
app.use(bodyParser.urlencoded({ extended: true }));





const index = require('./routes/index');
const connection = require('./routes/connection');

const about = require('./routes/about');
const contact = require('./routes/contact');

const user = require('./routes/user');

const error_page = require('./routes/error_page');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.use('/', index);
app.use('/connections/', connection);
app.use('/about', about);
app.use('/contact', contact);

app.use('/user', user);

app.use('*', error_page);

app.listen(port, () => console.log(`App listening on port ${port}!`));