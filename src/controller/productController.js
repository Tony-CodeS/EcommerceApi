
const cloudinary = require('../utilis/cloudinary')
const fs = require('fs')
const productRepository = require('../repository/productrepository')

exports.createProduct = async (req,res)=>{
    try {
        let payload = {
            name: req.body.name,
            price: req.body.price,
            avatar: req.file.path
        }
        let product = await productRepository.createProduct({
            ...payload
        });

        const uploader = async (path) => await cloudinary.uploads(path, 'avatars')

        let url
    
        const file = req.file
    
        const {path} = file
    
        const newPath = await uploader(path)
    
        url = newPath.url

        product.avatar = url.toString()

        await product.save()

       fs.unlinkSync(path)

        res.status(200).json({
            status: true,
            data: product,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
} 


exports.getProducts = async (req, res) => {
    try {
        let products = await productRepository.products();
        res.status(200).json({
            status: true,
            data: products,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}

exports.getProductById = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.productById(id);
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}
exports.removeProduct = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.removeProduct(id)
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}

