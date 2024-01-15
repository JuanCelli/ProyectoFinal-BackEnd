export const getRoleUser = (req,res,next) =>{
    const adminMail = "adminCoder@coder.com"
    const adminPassword = "adminCod3r123"
    if(req.user.email===adminMail && req.user.password === adminPassword){
        req.session.role = "admin"

    }else{
        req.session.role = "user"
    }
    next()
}