import userModel from "./models/user.model.js";

class UserManagerMongo{
    async getUserByEmail(email){
        try {
            const user = await userModel.findOne({email})
            if(!user){
                throw {error: true, status:404, msj: "Not found"}
            }
            return user
        } catch (error){
            return error
        }
    }
    async getUserById(id){
        try {
            const user = await userModel.findOne({_id:id})
            if(!user){
                throw {error: true, status:404, msj: "Not found"}
            }
            return user
        } catch (error){
            return error
        }
    }

    async createUser(data){
        try {
            const newUser = await userModel.create(data)
            return newUser
        } catch (error){
            return error
        }
    }
}


export const userService = new UserManagerMongo()