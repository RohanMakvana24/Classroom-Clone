import path from 'path'
import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary'
const uploadToCloudinary = async (filepath ,originalName)=>{
    const extName = path.extname(originalName);
    const fileName = path.basename(originalName , extName)

    try {
        const result = await cloudinary.uploader.upload(filepath ,{
            public_id : `uploads/${fileName}`,
            folder : 'uploads',
            resource_type: "auto",
        })
        fs.unlinkSync(filepath)
        return result;

    } catch (error) {
        fs.unlinkSync(filepath)
       throw error
    }
}


export default uploadToCloudinary;