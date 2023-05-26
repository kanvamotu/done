require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authroutes = require("./routes/auth");
const userroutes = require("./routes/user"); 
const categoryRoutes = require("./routes/category")

//DB Connection
mongoose.connect(process.env.DATABASE, {
 
    useUnifiedTopology: true,
  
})
 .then(() =>{
    console.log("DB CONNECTED")
});



//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



//myRoutes
app.use("/api",authroutes);
app.use("/api",userroutes);
app.use("api",categoryRoutes);


//PORT
const port = process.env.PORT || 9000;
//Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`)
}); 