import ResetToken from "./models/resetToken.model.js";


class ResetTokenManagerMongo{
    getResetTokenById = async (idToken) =>{
        try {
            const response = await ResetToken.findOne({_id: idToken})
                .populate('user',"email password")
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
