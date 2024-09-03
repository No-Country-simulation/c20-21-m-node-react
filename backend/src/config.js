import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables desde el archivo .env

export const config = {
    port: process.env.PORT || 3000,
    api_user: process.env.API_USER || 'mongodb://localhost/chatdb',
    api_password: process.env.API_PASSWORD || 'defaultsecretkey',
    email: process.env.EMAIL,
    email_password: process.env.MAIL_APP_PASSWORD
};