import bcryp from "bcrypt"
const createHash = (password) =>{
    return bcryp.hashSync(password, bcryp.genSaltSync(10))
}

export default createHash