const express = require("express")
const app = express();

const mysql = require("mysql2")
const connectDB = require('./connectionDB/connectionDB')

const cors=require('cors');
app.use(cors());


const {router}=require('./router/router.js')

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//requiring routers
app.use('/',router);
// app.get('/',(req,res)=>{
//     res.send('hello')
// })




app.listen(5000, () => {
    console.log("the server is listening at 5000")
})


