const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const {readdirSync} = require('fs')
const dotenv = require('dotenv')

dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((r) => app.use("/", require("./routes/" + r)))

//database
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true
}).then(()=> console.log("Database is Connected"))
  .catch((err)=> console.log("Error in Database Connection",err))

//server
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`Server is Running on Port: ${port}`);
})
