import { Router } from "express";
import ProductModel from "../DAO/models/products.models.js"

const router = Router()

router.get('/', async (req, res) => {
    const products = await ProductModel.find().lean().exec()
    console.log({ products })

    res.render('list', { products })
})

router.post('/', async (req, res) => {
    try {
        const productsNew = req.body
        const result = await ProductModel.create(productsNew)

        console.log({ result })
        res.redirect('/products')
    } catch (error) {

        console.log(error)
        res.send('Error al cargar productos')
    }
})

router.get('/create', async (req, res) => {
    res.render('create', {})
})


router.get('/:name', async (req, res) => {
    try {
        const { name } = req.params
        const products = await ProductModel.findOne({ name }).lean().exec()

        res.render('one', { products })
    } catch (error) {
        console.log(error)
        res.send('Error to show products')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await ProductModel.deleteOne({ _id: id })

        return res.json({ status: 'success' })
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router