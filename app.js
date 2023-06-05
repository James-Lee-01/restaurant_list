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

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantId = req.params.restaurant_id;
  const restaurant = restaurantList.find(
    restaurant => restaurant.id.toString() === restaurantId
  )
  res.render('show', { restaurant });
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();
  const restaurants = restaurantList.filter(
    restaurant =>
      restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.category.includes(keyword)
  )
  const searchResult = restaurants.length === 0 ? 'notFound' : 'index'
  res.render(searchResult, { restaurant: restaurants, keyword });
})

//Start and listen to server
app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
})