import passport from "passport";


export const passportCall = (strategy, options = {}) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                if(options.failureRedirect){
                    console.log(options.failureRedirect)
                    return res.redirect(options.failureRedirect)
                }
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }
            req.user = user
            next();
        })(req, res, next)
    }
}