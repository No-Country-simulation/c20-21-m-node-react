import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables desde el archivo .env

export const config = {
    port: process.env.PORT || 3000,
    api_user: process.env.API_USER || 'mongodb://localhost/chatdb',
    api_password: process.env.API_PASSWORD || 'defaultsecretkey',
    email: process.env.EMAIL,
    email_password: process.env.MAIL_APP_PASSWORD
};

export const CLOUDINARY = {
    CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY : process.env.CLOUDINARY_API_KEY,
    API_SECRET : process.env.CLOUDINARY_API_SECRET,
}

export const PATH_TEMP_IMAGES = process.env.PATH_TEMP_IMAGES || 'temp_images';


export const PATH_CLOUDINARY_IMAGES =
  process.env.PATH_CLOUDINARY_PRODUCT_IMAGES || "images";