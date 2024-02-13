import { generateToken } from "../utils/generateToken.js"

export const register = (req, res) => {
    try {
        res.status(201).json({msj: "Usuario registrado con éxito."})
    } catch (error) {
        res.status(error.status).json({error: error.msj})
    }
}
export const login = (req, res) => {
    try {
        const userToken = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        }
        const access_token = generateToken(userToken);
        res.cookie('jwtCookieToken', access_token,
        {
            maxAge: 600000,
            httpOnly: true
        }
        )

        res.status(200).json({msj: "Bienvenido, has ingreseado correctamente."})
    } catch (error) {
        res.json({error: error})
    }
}
export const logout = (req, res) => {
    try {
        res.clearCookie('jwtCookieToken');
        res.json({ msj: "Has cerrado sesión correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const githubCallback = async (req, res) => {
    try {
        const userToken = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        }
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
