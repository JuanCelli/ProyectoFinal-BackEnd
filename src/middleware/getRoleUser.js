export const getRoleUser = (req,res,next) =>{
    const adminMail = "adminCoder@coder.com"
    const adminPassword = "adminCod3r123"
    console.log(req.user)
    if(req.user.email===adminMail && req.user.password === adminPassword){
        req.user.role = "admin"
    }
    next()
}