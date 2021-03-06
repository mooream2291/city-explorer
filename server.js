'use strict';

const express = require('express');
const CORS = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(CORS());

app.get('/location', (request, response) => {
    try { 
        const getLocation = require('./data/location.json');
        const searchQuery = request.query.city;
        const newLocation = new Location(getLocation[0], searchQuery);
        response.send(newLocation);
    } catch {
        response.status(500).send('sorry, something went wrong');
    }
});

function Location (city, search) {
  this.search_query = search;
  this.formatted_query = city.display_name;
  this.latitude = city.lat;
  this.longitude = city.lon;
}

app.get('/weather', (request, response) => {
  const getWeather = require('./data/weather.json');
  const getWeatherArr = [];
  getWeather.data.forEach(weather => {
    const currentWeath = new Weather(weather);
    getWeatherArr.push(currentWeath);
  });
  response.send(getWeatherArr);
});


function Weather (data) {
  this.forecast = data.weather.description;
  this.time = data.datetime
}

app.get('*', (request, response) => {
    response.status(500).send('sorry, something went wrong');
});

app.listen(PORT, () => {
  console.log(`${PORT}`);
});



