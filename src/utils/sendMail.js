import config from "../config/config.js";
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.emailAccount,
        pass: config.emailAccountPassword
    }
})

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
})

const mailOptions = (email,idToken) => {
    return {
        from: config.emailAccount,
        to: email,
        subject: "Reestablecimiento de contraseña",
        html: `<div>
                    <h1> Reestablecer contraseña</h1>
                    <a href="http://localhost:8080/users/reset-password/${idToken}">Click aquí para reestablecer contraseña</a>
                </div>`,
        attachments: []
    }
}

export const sendEmail = (idToken,email) => {
    try {
        let result = transporter.sendMail(mailOptions(email,idToken), (error, info) => {
            if (error) {
                console.log(error);
                return error
            }
            console.log('Message sent: %s', info.messageId);
            return { message: "Success", payload: info }
        })
        console.log(result)
        return result

    } catch (error) {
        console.error(error);
        return error
    }
}