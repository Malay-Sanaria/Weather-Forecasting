const request = require('request')


const forecast = function(lati,longi,callback){
    const url = 'http://api.weatherstack.com/current?access_key=1bc6b59e6013bf6589253ea37e9f34d2&query='+lati+','+longi
    request({url, json : true },(Error,{body})=>{
        if(Error){
            callback("Unable to connect with network!",undefined)
        }
        else if (body.error){
            callback("Unable to connect with the location service!",undefined)
        }
        else{
            callback(undefined," Welcome to "+body.location.name+" Currently it's "+body.current.weather_descriptions[0] + " and "+body.current.temperature+"c outside and "+body.current.precip+"% chances of rain here. THANK YOU!")
        }
    })
}

module.exports={
    forecast : forecast
}