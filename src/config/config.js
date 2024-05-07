import dotenv from 'dotenv';
import program from '../process.js';


dotenv.config();

export const environment = program.opts().mode;
export const authentication = program.opts().auth;

const switchEnviroment = (environment) =>{
    let env

    if(environment === "prod"){
        env = "./src/config/.env.production"
    }else if(environment ==="test"){
        env = "./src/config/.env.test"
    }else{
        env = "./src/config/.env.development"
    }

    return env
}

dotenv.config({
    path: switchEnviroment(environment)
});


export default {
    environment:environment,
    port: process.env.PORT ||8080,
    urlMongo: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    emailAccount: process.env.GMAIL_ACCOUNT,
    emailAccountPassword: process.env.GMAIL_APP_PASSWORD,
}