import config from "../config/config.js";



export const  setRoleAdminTest = (req, res, next) => {
    if (config.environment === 'test') {
        req.user = {role:"admin"}
      return next();
    }
    next()
}

