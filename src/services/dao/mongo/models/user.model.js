import { Schema, model } from "mongoose";


const userSchema = new Schema({
    first_name: {type:String, required: true},
    last_name: String,
    email: {type:String, required: true,unique:true},
    age: {type:Number, required: true},
    password: {type:String, required: true},
    status:{type: Boolean,default: true},
    loggedBy:{type: String,default: "Local"},
    role:{type:String, default:"user"}
})


const userModel = model ("users",userSchema)
export default userModel
