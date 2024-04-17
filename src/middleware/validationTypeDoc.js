

export const validationTypeDoc = async (req, res,next) =>{
    try {
        const {typeDoc} = req.params
        const typesDocs = ["identification", "proofAddress", "proofAccount"]

        if(!typesDocs.includes(typeDoc)){
            CustomError.createError({
                name:"Tipo de documentación invalida",
                code: errorsEnum.PRE_CONDITION_ERROR,
                cause:null,
                message:"El tipo de documentación que está intentando ingresar no es válida.",
            })
        }
        next()
    } catch (error) {
        next(error)
    }
}