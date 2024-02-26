import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: {type: String, unique: true},
    purchase_datetime:{type: Date, default: Date.now},
    amount: {type: Number,required: true,min:0},
    purchaser: {type: String,required: true},
});

ticketSchema.pre('save', function(next) {
    if (!this.code) {
      this.code = this._id.toString();
    }
    next();
})

const ticketModel = model("tickets", ticketSchema);

export default ticketModel