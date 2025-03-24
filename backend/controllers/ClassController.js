import { validationResult } from "express-validator";
import ClassModel from "./../models/ClassModel.js";
import StaticImageModel from "../models/TempImage.js";
import mongoose from "mongoose";
import { error } from 'console';
// ~ Create Class Controller Section Start ~ //
export const createClass = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }
    const { className, section, subject, room, userId } = req.body;

    // ~ Unique Class Code Generates ~
    function generateRandomCode(length = 7) {
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    }

    // ~ Store Data ~
    const Class = await ClassModel.create({
      className: className,
      code: generateRandomCode(),
      section: section,
      subject: subject,
      room: room,
      teacher: userId,
    });

    res.status(200).json({
      success: true,
      message: "Class Added Succefully",
      Class: Class,
    });
  } catch (error) {
    console.log(error);
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};
// ~ Create Class Controller Section End ~ //

// ~ Get All Class Controller Section Start ~ //
export const getAllClasses = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id is required",
      });
    }

    const Classes = await ClassModel.find({
      teacher: userId,
    });

    return res.status(200).json({
      success: true,
      data: Classes,
    });
  } catch (error) {
    console.log(error);
    return res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};
// ~ Get All Class Controller Section End ~ //

// ~~ Image Uploading Controller Section Start ~~ //
export const classStaticImageUpload = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }
    const { url } = req.body;
    await StaticImageModel.create({
      url: url,
    });
    return res.status(200).json({
      success: true,
      message: "Image Added Succefully",
    });
  } catch (error) {
    console.log(error);
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};
// ~~ Image Uploading Controller Section End ~~ //
export const getAllStaticImages = async (req, res) => {
  try {
    const images = await StaticImageModel.find({});
    if (images) {
      return res.status(200).json({
        success: true,
        images: images,
      });
    } else {
      return res.status(400).json({
        success: true,
        images: [{}],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(504).json({
      success: false,
      messge: error.message,
    });
  }
};

// ~~ Delete Class Controller ~~ //
export const deleteClass = async (req,res)=>{
  try{
   const classId = req.params.classId;

   // ~ Validation ~
  //  const error = validationResult(req);
  //  if(!error.isEmpty()){
  //     return res.status(400).json({
  //       success :false,
  //       message : error.array()
  //     })
  //  }
   if(!mongoose.Types.ObjectId.isValid(classId)){
    return res.status(400).json({
      sucess : false,
      message : "Required valid classId"
    })
   }

   const result = await ClassModel.findByIdAndDelete(classId);
   if(!result){
     return res.status(400).json({
      success : false,
      message : "Class is not found..."
     })
   }else{
    return res.status(200).json({
      success : true,
      message : "Class Deleted Succefull"
     })
   }
  }catch(error){
    console.log(error);
    return res.status(504).json({
      success : false,
      message :error.message
    })
  }
}
