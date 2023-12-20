import { Schema, model } from "mongoose";

const productsOfCartSchema = new Schema({
    id: {type: String, required: true},
    quality: {type: Number, default: 1, min:1},
})


const cartSchema = new Schema({
    products:{
        type: [productsOfCartSchema],
        required: true
    },
    status: {type: Boolean, default: true}
});

const cartModel = model("carts", cartSchema);

export default cartModel