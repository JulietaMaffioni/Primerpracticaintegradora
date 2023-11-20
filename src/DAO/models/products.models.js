import mongoose from 'mongoose'

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    type: String,
    photo: String
})

const ProductModel = mongoose.model(productCollection, productSchema)

export default ProductModel