import { Schema, model } from "mongoose";

const resetTokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required:true, ref: 'users'},
    createdAt: { type: Date, default: Date.now, expires: 120 }
})


const ResetToken = model('resetToken', resetTokenSchema)

export default ResetToken
