import mongoose, { Schema, model } from "mongoose";



const productsOfCartSchema = new Schema({
    _id:false,
    id: {type: Schema.Types.ObjectId, required: true,ref:"products"},
    quality: {type: Number, default: 1, min:1},
})


const cartSchema = new Schema({
    productsCart:[
        productsOfCartSchema
    ],
    status: {type: Boolean, default: true}
});

const cartModel = model("carts", cartSchema);

export default cartModel