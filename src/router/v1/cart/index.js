const express = require('express')
const cartController = require('../../../controller/cartController')
const router = express.Router()


router.post('/addTocart', cartController.addItemToCart)
router.get('/cart', cartController.getCart)
router.delete('/emptycart', cartController.emptyCart)
router.delete('/removeitem/:productId/:sessionId', cartController.removeItemFromCart)

module.exports = router