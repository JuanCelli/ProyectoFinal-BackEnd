import { Schema, model } from "mongoose";


const userSchema = new Schema({
    first_name: {type:String, required: true},
    last_name: String,
    email: String,
    age: {type:Number, required: true},
    password: String,
    status:{type: Boolean,default: true},
    loggedBy:{type: String,default: "Local"},
})


const userModel = model ("users",userSchema)
export default userModel
