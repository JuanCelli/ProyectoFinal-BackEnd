import userModel from "./models/user.model.js";

class UserManagerMongo{
    async getUserByEmail(email){
        try {
            const user = await userModel.findOne({email: email})
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
            const user = await userModel.findOne({_id: id})
            if(!user){
                throw {error: true, status:404, msj: "Not found"}
            }
            return user
        } catch (error){
            return error
        }
    }

    async deleteUser(id){
        try {
            const userDeleted = await userModel.deleteOne({_id:id})

            if(userDeleted===0){
                throw {error: true,status:400, msj: "Usuario no eliminado"}
            }
            return userDeleted

        } catch (error) {
            return error
        }
    }

    async getUsers(){
        try {
            const users = await userModel.find().select(["first_name","last_name","email","role","last_connection"])
            if(!users){
                throw {error: true, status:404, msj: "Not found"}
            }
            return users
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
    async changeUserRole(id,newRole){
        try {
            const response = await userModel.updateOne({_id: id}, {role:newRole})
            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "contraseña no actualizada"}
            }
            return response
        } catch (error) {
            return error
        }
    }
    async UpdateLastConnection(id){
        try {
            const response = await userModel.updateOne({_id: id}, {last_connection:new Date()})
            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "Error al actualizar ultima fecha de conexión"}
            }
            return response
        } catch (error) {
            return error
        }
    }
    async UploadFile(id,fileReference, fileName,type){
        try {
            const response = await userModel.updateOne({$and:[{_id: id},{status:true}]}, {$push: {documents:{name:fileName,reference:fileReference,type:type}}})
            if(response.acknowledged==false || response.modifiedCount==0){
                throw {error: true,status:400, msj: "Error al intentar agregar documento."}
            }
            return response
        } catch (error) {
            return error
        }
    }



}

export const userManagerMongo = new UserManagerMongo()