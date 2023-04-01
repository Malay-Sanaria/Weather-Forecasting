const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//define paths for express config
const pathdirectory = path.join(__dirname,'../public')
const pathdirectory1 = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup static directory to server 
app.use(express.static(pathdirectory))

//Setup handlebars and views location 
app.set('view engine','hbs')
app.set('views', pathdirectory1)
hbs.registerPartials(partialsPath)


app.get('',(req,res)=>{
    res.render('index',{
        title : "Weather",
        nname  : "Malay Sanaria"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        nname : "Malay Sanaria"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : "Help",
        nname : "Malay Sanaria"
    })
})


const geocoding = require('./utils/geocode.js')
const forecasting = require('./utils/forecast.js');

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "You must provide an address!!"
        })
    }
//destructuring the object in first row({{latitude,longitude,Location}={}})
    geocoding.geocode(req.query.address,(error,{latitude,longitude,Location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecasting.forecast(latitude,longitude,(error1,data1)=>{
            if(error1){
                return res.send({error1})
            }

            res.send({
                forcasting : data1,
                location : Location,
                address : req.query.address
            })
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('e1',{
        title : "Document is not found!!",
        nname : "Malay Sanaria"
    })
})

app.get('*',(req,res)=>{
    res.render('e2',{
        title: "404 Page",
        nname : "Malay Sanaria"
    })
})

app.listen(1200,()=>{
    console.log("Server is up on port 1200....")
})