const express = require("express");
const upload = require('../../../utilis/upload')
const router = express.Router()
const productController = require('../../../controller/productController')


router.post('/newProduct',
   upload.single('avatar'),
productController.createProduct)

router.get('/allProduct', productController.getProducts)

router.get('/product/:id', productController.getProductById)

router.delete('/deleteProduct/:id', productController.removeProduct)

module.exports = router