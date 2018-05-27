 const request = require('request');
 const yargs = require('yargs');
 const axios = require('axios');
 const argv = yargs
   .options({
     a: {
       alias: 'address',
       describe: 'address to fetch for  weather app',
       string: true
     }
   })
   .help()
   .alias('help', 'h')
   .argv;
 if (yargs.argv.address === undefined) {
   var encodedAddress = encodeURIComponent('southend homes jagatpura jaipur');
   var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

 } else if (yargs.argv.address) {
   var encodedAddress = encodeURIComponent(argv.address);
   var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
 }
 axios.get(geocodeUrl).then((response) => {
   if (response.data.status === 'ZERO_RESULTS') {
     throw new Error('unable to find that address.');
   }
   var lat = response.data.results[0].geometry.location.lat;
   var lng = response.data.results[0].geometry.location.lng;
   var weatherUrl = `https://api.darksky.net/forecast/e898aed759ae2082ed42d403be4f4e16/${lat},${lng}`;
   console.log(response.data.results[0].formatted_address);
   return axios.get(weatherUrl);
 }).then((response) => {
   var temperature = response.data.currently.temperature;
   var apparentTemperature = response.data.currently.apparentTemperature;
   console.log(`it's currently ${temperature}. it feels like ${apparentTemperature}.`);
 }).catch((e) => {
   if (e.code === 'ENOTFOUND') {
     console.log('unable to connect to api servers.');
   } else {
     console.log(e.message);
   }
 });
