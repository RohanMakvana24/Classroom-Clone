import  configDotenv  from "dotenv";
import express from 'express'
import chalk from "chalk";
import connect_db from "./config/database/connect.js";
import HandleGlobalError from "./middleware/errorMidleware.js";
import AuthRoutes from "./routes/auth.routes.js";
import HTTP_Response from "./utils/HttpResponse.js";
import cloudinary from "./config/cloudinaryConfig.js";
import cors from 'cors'

// ✌︎︎ Dotenv Configuration ✌︎︎ // 
configDotenv.config({ path : "./config/.env"})
// ✌︎︎ Database Configuration ✌︎︎ // 
connect_db();


// ✌︎︎ Server Configuration ✌︎︎ // 
const server = express();
const port = process.env.PORT;

// ✌︎︎ Middleware ✌︎︎ // 
const corsOptions = {
    origin: "http://localhost:5173", // Replace with your React frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Allow cookies or authentication headers
  };
  
server.use(express.json())
server.use(cors(corsOptions))
// ✌︎︎ Routes ✌︎︎ // 
server.use("/api/v1/auth" , AuthRoutes)
server.use((err,req,res,next)=>{
    const erroresponse = HTTP_Response(500 , err.message || "Somenthing Went Wrong");
    res.status(erroresponse.status).json({ success : false, message : erroresponse.message})
})
server.use(HandleGlobalError);


// ✌︎︎ View Engine Setup ✌︎︎ // 
server.set('view engine' , 'ejs');

// ✌︎︎ Server Listem ✌︎︎ // 
server.listen(port ,()=>{
    console.log(chalk.magenta(` ★☆ Server Listing On  ~ PORT:${port} ~  ★☆ `))
})