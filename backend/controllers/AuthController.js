import { validationResult } from "express-validator";
import HTTP_Response from "../utils/HttpResponse.js";
import uploadToCloudinary from "../utils/CloudinaryUploader.js";
import UserModel from "../models/UserModel.js";
import sendMail from "../services/emailService/emailServies.js";
import EmailTemplte from "../templates/emailTemplate.js";
export const SignupUser = async (req, res) => {
  try {

    const ip= req.ip;
    // ~ Validation Errors ~
    const errros = validationResult(req);
    if(!errros.isEmpty()){
      return res.status(400).json({
        error : errros.array()
    });
    }

    const {fullname , email , password} = req.body;

    // ~ If check Email already exist 
    const isEmail = await UserModel.findOne({ email : email})
    if(isEmail){
      return res.status(400).json({
        success : false,
        message : "Email already ragistered try another"
      })
    }

    // ~ Profile Uploading
    const fileDetails = await uploadToCloudinary(req.file.path , req.file.originalname)
   
    const subject = "Verification of login";
    const timestamp = new Date().toISOString();
    const htmlContent = EmailTemplte(email,ip,timestamp);

   sendMail(email , subject,htmlContent,res )
    // ~ Store Data 
    // await UserModel.create({
    //   fullname : fullname,
    //   email : email,
    //   password : password,
    //   profile : {
    //     url : fileDetails.secure_url,
    //     public_id : fileDetails.public_id
    //   }
    // })

 
    return res.status(200).json({
      success : true,
      message : "The User Ragistered Succefully"
    })
  } catch (error) {
    console.log(error);
    throw HTTP_Response(504, error.message);
  }
};
