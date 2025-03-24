import express from "express";
import { body, param } from "express-validator";
import mongoose from "mongoose";
import upload from "../services/multer.js";
import {
  classStaticImageUpload,
  createClass,
  deleteClass,
  getAllClasses,
  getAllStaticImages,
} from "../controllers/ClassController.js";
const ClassRoutes = express.Router();

// ~  Create Class Routes 🚦💨 ~ //
ClassRoutes.post(
  "/create-class",
  upload.none(),
  [
    body("className")
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("Class name must be between 3 and 20 characters.")
      .notEmpty()
      .withMessage("Classname is required "),
    body("section")
      .optional()
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Section must be between 3 to 30 characters"),
    body("subject")
      .optional()
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("The Subject must be between 3 to 20 charcaters"),
    body("room")
      .optional()
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("The room must be between 3 to 20 charcaters"),
    body("userId")
      .notEmpty()
      .withMessage("User ID is required")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("Invalid user ID format"),
  ],
  createClass
);

// ~~ Get Classes Routes 🚦💨 ~~ //
ClassRoutes.get(
  "/get-all-classes/:userId",
  [
    param("userId")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("The User id "),
  ],
  getAllClasses
);

// ~~ Images Uploading API For Classe  🚦💨 ~~ //
ClassRoutes.post(
  "/image-add",
  [body("url").isString().withMessage("Url is required")],
  classStaticImageUpload
);

// ~~ Images Uploading API For Classe  🚦💨 ~~ //
ClassRoutes.get("/get-all-staticimages", getAllStaticImages);

// ~~ Delete Classs API  🚦💨 ~~ //
ClassRoutes.delete("/delete-class/:classId" , deleteClass)
export default ClassRoutes;
