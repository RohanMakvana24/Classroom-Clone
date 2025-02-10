import express from 'express'
import upload from '../services/multer.js';
import { ChangeProfile } from '../controllers/UserController.js';

const userRoutes = express.Router();

// ~  Profile Update Routes 🚦💨 ~ //
userRoutes.put("/change-profile" , upload.single("profile") , ChangeProfile )
export default userRoutes;