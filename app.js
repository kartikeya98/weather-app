 const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode.js')
const weather = require('./weather/weather.js')
const argv = yargs
.options({
  a:{
    demand:true,
    alias:'address',
    describe:'address to fetch for  weather app',
    string:true
  }
})
.help()
.alias('help','h')
.argv;

geocode.geocodeAddress(argv.address,(errorMessage,results) => {
  if(errorMessage) {
    console.log(errorMessage);
  }
  else {
    var lat = results.latitude;
    var lng = results.longitude;
weather.getWeather(lat,lng,(errorMessage,weatherResults) => {
if(errorMessage) {
  console.log(errorMessage);
} else {
  console.log(JSON.stringify(weatherResults,undefined,2));
}
})
 }
});
