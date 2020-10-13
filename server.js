'use strict';

const express = require('express');
const CORS = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(CORS());

app.get('/location', (request, response) => {
  const getLocation = require('./data/location.json');
  const searchQuery = request.query.city;
  const newLocation = new Location(getLocation[0], searchQuery);
  response.send(newLocation);

});

function Location (city, search) {
  this.search_query = search;
  this.formatted_query = city.display_name;
  this.latitude = city.lat;
  this.longitude = city.lon;
}

app.listen(PORT, () => {
  console.log(`{PORT}`);
});



