const request = require('request');

var getWeather = (lat , lng ,callback) => {
    request({
    url:`https://api.darksky.net/forecast/e898aed759ae2082ed42d403be4f4e16/${lat},${lng}`,
    json:true
  },(error,response,body) => {
    if(!error && response.statusCode === 200) {
    callback(undefined , {
    temperature:  body.currently.temperature,
    apparentTemperature:  body.currently.apparentTemperature
  })
  }
  else {
    callback('unable to fetch weather');
  }

})
}
module.exports.getWeather = getWeather;
