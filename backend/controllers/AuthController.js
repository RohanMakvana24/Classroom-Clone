import { validationResult } from "express-validator";
import HTTP_Response from "../utils/HttpResponse.js";
import uploadToCloudinary from "../utils/CloudinaryUploader.js";
import UserModel from "../models/UserModel.js";
import sendMail from "../services/emailService/emailServies.js";
import EmailTemplte from "../templates/emailTemplate.js";
import {v4 as uuidv4 } from 'uuid'
import { error } from 'console';


export const SignupUser = async (req, res) => {
  try {

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
    const verificationToken = uuidv4();
    const subject = "Verification of your account..";

    const htmlContent = EmailTemplte(email,verificationToken,fullname);

   sendMail(email , subject, htmlContent , verificationToken ,res )

    // ~ Store Data 
   const newUser=  await UserModel.create({
      fullname : fullname,
      email : email,
      password : password,
      profile : {
        url : fileDetails.secure_url,
        public_id : fileDetails.public_id
      },
      verificationToken : verificationToken
    })
    const token = newUser.generateAuthToken();
    return res.status(200).json({
      success : true,
      message : "The User Ragistered Succefully",
      token : token,
      user :newUser,
      u_id : newUser._id
    })
  } catch (error) {
    console.log(error);
    throw HTTP_Response(504, error.message);
  }
};

export const VerifyUser = async (req,res)=>{
  try {
    const verificationToken = req.params.verificationToken;
    
    // ~ Validation
    if(!verificationToken){
      return res.status(403).json({
        success :false,
        message : "Verification Token is required"
      })
    }
    const user = await UserModel.findOne({
      verificationToken : verificationToken
    })

    if(!user){
      return res.status(403).json({
        success :false,
        message : " Verification Issue: The provided email was not found or has already been verified."
      })
    }

    await UserModel.findByIdAndUpdate(user._id , {
      verified : true,
      verificationToken : ''
    })

    res.status(200).json({
      success: true,
      message:
        "Email Verification Successful: Your email has been successfully verified. You can now access and enjoy our services. Thank you for confirming your email!",
    });

  } catch (error) {
    res.status(504).json({
      succecc: false,
      message: error.message,
    });
  }
}

export const isVerifiedUser = async (req,res)=>{
  try {
    const userId = req.params.u_id;
    if(!userId){
      return res.status(400).json({
        success :false,
        message : "User id is required"
      })
    }

    const user = await UserModel.findById(userId);
    if(user.verified){
      return res.status(200).json({
        success : true,
        message : "User Verified"
      })
    }
    else{
      return res.status(400).json({
        success : false,
        message : "User Not Verified"
      })
    }
  } catch (error) {
    console.log(error)
    res.status(504).json({
      succecc :false,
      message : error.message
    })
  }
}