import mongoose from "mongoose";

//for create table into db
const productSchema = new mongoose.Schema({

    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    Stock: { type: Number, required: true }

}, {
    //for date
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);
export default Product;