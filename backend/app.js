//imports
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const zomatoRoutes=require('./routes/zomato')
const paymentRoutes = require('./routes/payment')
const signUpRoutes = require('./routes/SignUp')
const mongoose=require('mongoose')


const PORT =  process.env.PORT || 8080  
// const DBSTRING = 'mongodb://localhost/zomato' //-->connect to mongoDB compass 
const DBSTRING = 'mongodb+srv://sagar8421:sagar8421@zomato.upyvi.mongodb.net/zomato?retryWrites=true&w=majority' //MongoDB Atlas
//connect to mongoDB 
// mongoose.connect(,       
mongoose.connect(DBSTRING,   
     ()=>{
    console.log("mongoDB connected")},
    e=>console.log(e))


//create express server
var app=express()

//add middleware before routes
app.use(bodyParser.json())
app.use(cors())

//middleware routes 
app.use('/zomato',zomatoRoutes)
app.use('/payment',paymentRoutes)
app.use('/user',signUpRoutes)

// heroku configuration 
if(process.env.NODE_ENV == "production"){
    console.log("In production")
    app.use(express.static("./frontend/build"));
    const path = require('path')
    app.get('*',(req,res)=>{
        console.log("get method")
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
    })
}

//listen to a port 
app.listen(PORT,()=>{
    console.log(`express app is up and running on port ${PORT}`)
})