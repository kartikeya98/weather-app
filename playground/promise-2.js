const request = require('request');
var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var encodedAddress = encodeURIComponent(address);
      request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
      }, (error, response, body) => {
        if (error) {
          reject('unable to connect to the google server');
        } else if (body.status === "ZERO_RESULTS") {
          reject('unable to find the address');
        } else if (body.status === "OK") {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        } else {
          console.log('wtf happend');
        };
      });
    }, 1500);
  });
};
geocodeAddress('302025').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
