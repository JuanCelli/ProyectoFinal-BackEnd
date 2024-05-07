import { Schema, model } from "mongoose";



const productsOfCartSchema = new Schema({
    _id:false,
    product: {type: Schema.Types.ObjectId, required: true,ref:"products"},
    quality: {type: Number, default: 1, min:1},
})


const cartSchema = new Schema({
    productsCart:[
        productsOfCartSchema
    ],
    owner:{type: String, require: true},
    status: {type: Boolean, default: true}
});

const cartModel = model("carts", cartSchema);

export default cartModel