var _ = require('lodash');
var rootUrl = "http://api.openweathermap.org/data/2.5/weather?appid=f26aa4d5949dae027d7ccee88734b3b1";

var kelvinToC =  (kelvin) => Math.round(kelvin - 273.15) + '°C';

module.exports = function(latitude, longitude) {
    let url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
    return fetch(url)
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
          return {
            city: _.capitalize(json.name),
            temperature: kelvinToC(json.main.temp),
            description: _.capitalize(json.weather[0].description)
          }
        });

};
