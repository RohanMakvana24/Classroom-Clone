import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { error } from "console";
const uploadToCloudinary = async (filepath, originalName) => {
  const extName = path.extname(originalName);
  const fileName = path.basename(originalName, extName);

  try {
    const result = await cloudinary.uploader.upload(filepath, {
      public_id: `uploads/${fileName}`,
      folder: "uploads",
      resource_type: "auto",
    });
    fs.unlinkSync(filepath, (err) => {
      if (err) {
        console.log(error);
      }
    });
    return result;
  } catch (error) {
    fs.unlinkSync(filepath, (err) => {
      if (err) {
        console.log(error);
      }
    });
    throw error;
  }
};

export default uploadToCloudinary;
