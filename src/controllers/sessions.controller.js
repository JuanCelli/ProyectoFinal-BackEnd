import { loggers } from "winston"
import userTokenDto from "../services/dto/userToken.dto.js"
import { userService } from "../services/service.js"
import { generateToken } from "../utils/generateToken.js"

export const register = (req, res) => {
    try {
        res.status(201).json({msj: "Usuario registrado con éxito."})
    } catch (error) {
        res.status(error.status).json({error: error.msj})
    }
}


export const login = async (req, res) => {
    try {
        const userToken = new userTokenDto(req.user)
        const access_token = generateToken(userToken);
        res.cookie('jwtCookieToken', access_token,
        {
            maxAge: 600000,
            httpOnly: true
        }
        )
        const response = await userService.UpdateLastConnection(req.user._id)
        res.status(200).json({msj: "Bienvenido, has ingreseado correctamente."})
    } catch (error) {
        res.json({error: error})
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie('jwtCookieToken');
        const response = await userService.UpdateLastConnection(req.user._id)
        res.status(200).json({ msj: "Has cerrado sesión correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const githubCallback = async (req, res) => {
    try {
        const userToken = new userTokenDto(req.user)
        const access_token = generateToken(userToken);
        res.cookie('jwtCookieToken', access_token,
        {
            maxAge: 600000,
            httpOnly: true
        }
        )
        res.redirect("/products")
    } catch (error) {
        console.log(error)
    }
}