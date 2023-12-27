import mongoose, { Schema, model } from "mongoose";



const productsOfCartSchema = new Schema({
    id: {type: String, required: true},
    quality: {type: Number, default: 1, min:1},
    _id: false,
})


const cartSchema = new Schema({
    products:{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        required: true,
        ref:"products",
    },
    status: {type: Boolean, default: true}
});

const cartModel = model("carts", cartSchema);

export default cartModel