import passport from "passport";

import {environment} from '../config/config.js'

export const passportCall = (strategy, options = {}, allowedRoles) => {
    return async (req, res, next) => {
            passport.authenticate(strategy, function (err, user, info) {
                if(environment!=="test"){
                    if (err) return next(err);
                    if (!user) {
                        if(options.failureRedirect){
                            return res.redirect(options.failureRedirect)
                        }
                        return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
                    }
                    req.user = user
                    if(allowedRoles && strategy==="current"){
                        if(!allowedRoles.includes(user.role)){
                            return res.status(403).send({error: "Forbidden (403)"})
                        }
                    }
                    next();

                }else{
                    req.user= user
                    next();
                }
            })(req, res, next)
        }
}