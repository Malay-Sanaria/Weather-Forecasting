const request = require('request')

const geocode = function(address , callback){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibWFsYXlzYW5hcmlhIiwiYSI6ImNrcGdxdWdwODAwMmgzMnFsb2dqeHplNm4ifQ.CDcLWZG2uWn5QTwja1FqpQ&limit=1'
    request({url, json : true},(Error,{body})=>{
       if(Error){
           callback('Unable to connect with network!',undefined)
       }
       else if(body.features.length==0){
           callback('Unable to connect with location service!',undefined)
       }
       else{
           callback(undefined,{
               latitude : body.features[0].center[1],
               longitude : body.features[0].center[0],
               Location : body.features[0].place_name
           })
       }
    })
}

module.exports={
    geocode : geocode
}