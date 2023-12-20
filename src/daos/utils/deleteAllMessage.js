import messageModel from "../models/message.model.js";


export const deleteAllMesagges = async () => {
    try {
        await messageModel.deleteMany({});
    } catch (error) {
        console.log(error);
    }
}