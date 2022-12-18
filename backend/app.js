//imports
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const zomatoRoutes=require('./routes/zomato')
const paymentRoutes = require('./routes/payment')
const signUpRoutes = require('./routes/SignUp')
const mongoose=require('mongoose')


const PORT = "https://sagar-zomato-clone-app.render.com" || 8080  
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



//listen to a port 
app.listen(PORT,()=>{
    console.log(`express app is up and running on port ${PORT}`)
})