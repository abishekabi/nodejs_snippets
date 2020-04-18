const express = require('express');
const app = express();
const port = 8080;

const routes = require('./public/routes');
app.set('views', __dirname + '/public/views');
app.set('view engine', 'html');

app.use(express.static('public/views'));

app.get('/', routes.home);
app.get('/about', routes.about);
app.get('/contact', routes.contact);


app.listen(port, () => console.log(`App listening on port ${port}!`));