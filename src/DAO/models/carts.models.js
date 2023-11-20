import mongoose from "mongoose";
const collection="carts"
const cartSchema = mongoose.Schema({
    products: {
        type:[{
            product:{
                type:mongoose.Schema.Types.ObjectId,
                quantity: Number
            }
        }],
        default: []
    }
})

const cartModel = mongoose.model(collection, cartSchema)

export default cartModel