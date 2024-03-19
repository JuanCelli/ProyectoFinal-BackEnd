import ResetToken from "./models/resetToken.model.js";


class ResetTokenManagerMongo{
    getResetToken = async (idUser) =>{
        try {
            const response = await ResetToken.findOne({user: idUser})
                .populate('user',"email")
                .populate('user',"password")
            return response
        } catch (error) {
            return error
        }
    }

    createResetToken = async (idUser)=>{
        try {
            const response = await ResetToken.create({user: idUser})
            return response
        } catch (error) {
            return error
        }
    }

}


export const resetTokenManagerMongo = new ResetTokenManagerMongo()
