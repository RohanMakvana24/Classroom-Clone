import UserModel from "../models/UserModel";
import uploadToCloudinary from "../utils/CloudinaryUploader";

export const ChangeProfile = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not exist",
      });
    }

    // ~ Profile Uploading
    const fileDetails = await uploadToCloudinary(
      req.file.path,
      req.file.originalname
    );

    // ~ Update Profile
    const isChanged = await UserModel.findByIdAndUpdate(id, {
      profile: {
        url: fileDetails.secure_url,
        public_id: fileDetails.public_id,
      },
    });

    if (isChanged) {
      return res.status(200).json({
        success: true,
        message: "Profile Updated Succefully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Error in Profile Update API",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};
