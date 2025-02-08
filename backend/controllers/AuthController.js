import { validationResult } from "express-validator";
import HTTP_Response from "../utils/HttpResponse.js";
import uploadToCloudinary from "../utils/CloudinaryUploader.js";
import UserModel from "../models/UserModel.js";
import sendMail from "../services/emailService/emailServies.js";
import EmailTemplte from "../templates/emailTemplate.js";
import { v4 as uuidv4 } from "uuid";
import { mongoose } from "mongoose";

// ⬟ Signup User Controller  ⬟ //
export const SignupUser = async (req, res) => {
  try {
    // ~ Validation Errors ~
    const errros = validationResult(req);
    if (!errros.isEmpty()) {
      return res.status(400).json({
        error: errros.array(),
      });
    }

    const { fullname, email, password } = req.body;

    // ~ If check Email already exist
    const isEmail = await UserModel.findOne({ email: email });
    if (isEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already ragistered try another",
      });
    }

    // ~ Profile Uploading
    const fileDetails = await uploadToCloudinary(
      req.file.path,
      req.file.originalname
    );
    const verificationToken = uuidv4();
    const subject = "Verification of your account..";

    const htmlContent = EmailTemplte(email, verificationToken, fullname);

    sendMail(email, subject, htmlContent, verificationToken, res);

    // ~ Store Data
    const newUser = await UserModel.create({
      fullname: fullname,
      email: email,
      password: password,
      profile: {
        url: fileDetails.secure_url,
        public_id: fileDetails.public_id,
      },
      verificationToken: verificationToken,
    });
    const token = newUser.generateAuthToken();
    return res.status(200).json({
      success: true,
      message: "The User Ragistered Succefully",
      token: token,
      user: newUser,
      u_id: newUser._id,
    });
  } catch (error) {
    console.log(error);
    throw HTTP_Response(504, error.message);
  }
};
// ~~~~~~~~~~~~~~~~~~ ❖ Signup Section End ❖ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// ⬟  User Verify Controller  ⬟ //
export const VerifyUser = async (req, res) => {
  try {
    const verificationToken = req.params.verificationToken;

    // ~ Validation
    if (!verificationToken) {
      return res.status(403).json({
        success: false,
        message: "Verification Token is required",
      });
    }
    const user = await UserModel.findOne({
      verificationToken: verificationToken,
    });

    if (!user) {
      return res.status(403).json({
        success: false,
        message:
          " Verification Issue: The provided email was not found or has already been verified.",
      });
    }

    await UserModel.findByIdAndUpdate(user._id, {
      verified: true,
      verificationToken: "",
    });

    var clientBaseURL = process.env.CLIENT_BASE_URL;

    res.render("emailVerified", { clientBaseURL: clientBaseURL });
    // res.status(200).json({
    //   success: true,
    //   message:
    //     "Email Verification Successful: Your email has been successfully verified. You can now access and enjoy our services. Thank you for confirming your email!",
    // });
  } catch (error) {
    res.status(504).json({
      succecc: false,
      message: error.message,
    });
  }
};

// ~~~~~~~~~~~~~~~~~~ ❖ Verify User Section End ❖ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// ⬟  Check Verified User Controller  ⬟ //
export const isVerifiedUser = async (req, res) => {
  try {
    const userId = req.params.u_id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }

    const user = await UserModel.findById(userId);
    if (user.verified) {
      return res.status(200).json({
        success: true,
        message: "User Verified",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User Not Verified",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(504).json({
      succecc: false,
      message: error.message,
    });
  }
};
// ~~~~~~~~~~~~~~~~~~ ❖ Check Verify User Section End ❖ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// ⬟ Delete User Controller  ⬟ //
export const deleteUser = async (req, res) => {
  try {
    const u_id = req.params.id;
    if (!u_id) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(u_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format",
      });
    }

    const isDeleteUser = await UserModel.findByIdAndDelete(u_id);
    if (isDeleteUser) {
      return res.status(200).json({
        success: true,
        message: "The User Deleted Succefully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "The Not User Deleted...",
      });
    }
  } catch (error) {
    console.loh(error);
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};
// ~~~~~~~~~~~~~~~~~~ ❖ Delete User Section End ❖ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// ⬟ Login User Controller  ⬟ //
export const LoginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({
        error: errors.array(),
      });
    }
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email are not ragistered , ragister now ",
      });
    }

    if (!user.verified) {
      return res.status(400).json({
        success: false,
        message: "User are not verified",
      });
    }

    const isPassword = await user.isPasswordValid(password);
    if (!isPassword) {
      return res.status(400).json({
        sucess: false,
        message: "Login credintials invalid",
      });
    }
    const token = user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: "User Login Succefully",
      data: {
        user: user,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};
