import { Schema, model } from "mongoose";


const userDocument = new Schema({
    status: {type: Boolean, default:true},
    name:{type:String,required:true},
    reference:{type:String,required:true}
})

const userSchema = new Schema({
    first_name: {type:String, required: true},
    last_name: String,
    email: {type:String, required: true,unique:true},
    age: {type:Number, required: true},
    password: {type:String, required: true},
    status:{type: Boolean,default: true},
    loggedBy:{type: String,default: "Local"},
    role:{type:String, default:"user"},
    documents:[userDocument],
    last_connection: {type:Date, default: Date.now}
})



const userModel = model ("users",userSchema)
export default userModel
