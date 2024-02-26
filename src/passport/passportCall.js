import passport from "passport";


export const passportCall = (strategy, options = {}, allowedRole) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                if(options.failureRedirect){
                    return res.redirect(options.failureRedirect)
                }
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }
            req.user = user

            if(allowedRole && strategy==="current"){
                if(allowedRole!==user.role){
                    return res.status(403).send({error: "Forbidden (403)"})
                }
            }

            next();
        })(req, res, next)
    }
}