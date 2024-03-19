import config from "../config/config.js";
import CustomError from "../services/errors/CustomError.js";
import errorsEnum from "../services/errors/errors.enum.js";
import { resetTokenService, userService } from "../services/service.js";
import createHash from "../utils/createHash.js";
import isValidPassword from "../utils/isValidPassword.js";
import nodemailer from 'nodemailer';




export const changePasswordUser = async (req, res,next) => {
    try {
        const {id} = req.params
        const {newPassword} = req.body

        const token = await resetTokenService.getResetToken(id)

        if(!token){
            CustomError.createError({
                name:"Valid Token Error",
                cause:null,
                message:"El link para reestablecimiento de contraseña no fue encontrado o ha expirado.",
                code: errorsEnum.NOT_FOUND_ERROR,
            })
        }

        if(isValidPassword(token.user,newPassword)){
            CustomError.createError({
                name:"Valid Password Error",
                cause:null,
                message:"La contraseña que está intentado colocar es igual a la anterior, pruebe con otra contraseña.",
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }


        const response = await userService.changeUserPassword(id, createHash(newPassword))

        if(response.error){
            CustomError.createError({
                name:"Update User Password Error",
                message:response.msj,
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }
        res.json({message: "Cambio de contraseña realizado con éxito."})
    } catch (error) {
        next(error)
    }
}

export const sendEmailWithLinkToResetPassword = async (req,res,next) => {
    try {
        sendEmail()
        res.json({message: "Email de para reestablecer contraseña enviado."})
    } catch (error) {
        next(error)
    }
}

export const generateTokenToResetPassword = async (req,res,next) => {
    try {
        const {id} = req.params
        const token = await resetTokenService.createResetToken(id)

        if(!token||token.errors){
            CustomError.createError({
                name:"Create Token Error",
                message:"Error al intentar crear token para reestablecimiento de contraseña.",
                code: errorsEnum.INVALID_TYPES_ERROR,
            })
        }
        res.json({msj:"Token para reestablecer la contraseña generado con éxito."})
    } catch (error) {
        next(error)
    }
}

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

const mailOptions = (email,id) => {
    return {
        from: config.emailAccount,
        to: email,
        subject: "Reestablecimiento de contraseña",
        html: `<div>
                    <h1> Esto es un test de correo con NodeMailer </h1>
                    <a href="http://localhost:8080/users/reset-password/${id}">Click aquí para reestablecer contraseña</a>
                </div>`,
        attachments: []
    }
}

export const sendEmail = (req, res) => {
    try {
        let result = transporter.sendMail(mailOptions("juanicelli@gmail.com","65b82a0766514c25d7640d65"), (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).send({ message: "Error", payload: error });
            }
            console.log('Message sent: %s', info.messageId);
            res.send({ message: "Success", payload: info })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.emailAccount });
    }
}