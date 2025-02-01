import  configDotenv  from "dotenv";
import express from 'express'
import chalk from "chalk";
import connect_db from "./config/database/connect.js";
import HandleGlobalError from "./middleware/errorMidleware.js";
import AuthRoutes from "./routes/auth.routes.js";
import HTTP_Response from "./utils/HttpResponse.js";
import cloudinary from "./config/cloudinaryConfig.js";


// ✌︎︎ Dotenv Configuration ✌︎︎ // 
configDotenv.config({ path : "./config/.env"})
// ✌︎︎ Database Configuration ✌︎︎ // 
connect_db();


// ✌︎︎ Server Configuration ✌︎︎ // 
const server = express();
const port = process.env.PORT;

// ✌︎︎ Middleware ✌︎︎ // 
server.use(express.json())

// ✌︎︎ Routes ✌︎︎ // 
server.use("/api/v1/auth" , AuthRoutes)
server.use((err,req,res,next)=>{
    const erroresponse = HTTP_Response(500 , err.message || "Somenthing Went Wrong");
    res.status(erroresponse.status).json({ success : false, message : erroresponse.message})
})
server.use(HandleGlobalError);


// ✌︎︎ Server Listem ✌︎︎ // 
server.listen(port ,()=>{
    console.log(chalk.magenta(` ★☆ Server Listing On  ~ PORT:${port} ~  ★☆ `))
})