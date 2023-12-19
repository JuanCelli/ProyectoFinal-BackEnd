import { Schema, model } from "mongoose";

const productsOfCartSchema = new Schema({
    id: {type: String, required: true},
    quality: {type: Number, required: true},
})


const cartSchema = new Schema({
    products:{
        type: [productsOfCartSchema],
        default:[]
    },
    status: {type: Boolean, default: true}
});

const cartModel = model("cart", cartSchema);

export default cartModel