import mongoose from "mongoose";

export const validationId = (req, res, next) => {
    try {
        const { id,pid } = req.params
        if(id){
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw { status: 400, msj: "Id not valid" }
            }
        }
        if(pid){
            if (!mongoose.Types.ObjectId.isValid(pid)) {
                throw { status: 400, msj: "Id not valid" }
            }
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(error.status).json({ message: error.msj})
    }
}