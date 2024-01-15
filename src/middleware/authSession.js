export const authSession = (req, res,next) =>{
    if(!req.session?.user){
        res.status(403).redirect("/users/login")
        return
    }
    next()
}