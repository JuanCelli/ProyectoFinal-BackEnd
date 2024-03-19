import dotenv from 'dotenv';
import program from '../process.js';


dotenv.config();

export const environment = program.opts().mode;

dotenv.config({
    path: environment === "prod" ? "./src/config/.env.production" : "./src/config/.env.development"
});


export default {
    port: process.env.PORT,
    urlMongo: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    emailAccount: process.env.GMAIL_ACCOUNT,
    emailAccountPassword: process.env.GMAIL_APP_PASSWORD,
}