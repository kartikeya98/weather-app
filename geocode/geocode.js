const request = require('request');

var geocodeAddress = (address,callback) => {

  var encodedAddress = encodeURIComponent(address);
  request({
    url:`http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json:true
  },(error,response,body) => {
    if(error) {
      callback('unable to connect to the google server');
    } else if(body.status === "ZERO_RESULTS") {
      callback('unable to find the address');
    }else if(body.status === "OK") {
      callback(undefined,{
        address: body.results[0].formatted_address,
  latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
  }
  else {
    console.log('wtf happend' );
  }
  });


}
module.exports = {
  geocodeAddress
}
