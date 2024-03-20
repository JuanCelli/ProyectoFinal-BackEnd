import mongoosePaginate from "mongoose-paginate-v2"
import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: {type: String,required: true},
    description: {type: String,required: true},
    code: {type: String,required: true, unique: true},
    price: {type: Number,required: true,min:0},
    status:{type: Boolean, default: true},
    stock: {type: Number,required: true,min:0},
    category: {type: String,required: true},
    thumbnails: {type: String},
    owner:{ type: String, ref: 'users',default:"admin"},
});

productSchema.plugin(mongoosePaginate)

const productModel = model("products", productSchema);

export default productModel