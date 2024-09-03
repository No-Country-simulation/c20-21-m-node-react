import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY, PATH_CLOUDINARY_IMAGES } from "../config.js";

cloudinary.config({
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
  secure: true,
});

console.log(cloudinary.config());

export const uploadImages = async (imagePath) => {
  try {
    return await cloudinary.uploader.upload(imagePath, {
      folder: PATH_CLOUDINARY_IMAGES,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteImage = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId);
  };