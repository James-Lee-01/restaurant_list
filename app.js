//Require packages used in the project
const express = require('express');
const app = express();
const port = 3000;

//require express-handlebars
const exphbs = require('express-handlebars');
//require data json files
const restaurantList = require('./restaurant.json').results;

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//setting static files
app.use(express.static('public'));

//Routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList });
})


//Start and listen to server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
})