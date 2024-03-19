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
    
    async changeUserPassword(id,newPassword){
        try {
            const response = await userModel.updateOne({_id: id}, {password:newPassword})
            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "contraseña no actualizada"}
            }
            return response
        } catch (error) {
            return error
        }
    }
}

export const userManagerMongo = new UserManagerMongo()