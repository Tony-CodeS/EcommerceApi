
const Cart = require("../model/cartSchema");
const Product = require("../model/productSchema");

exports.addItemToCart = async (req, res) => {
  const { productId } = req.body;
  const sessionId = req.body.sessionId;
  const quantity = Number.parseInt(req.body.quantity);

  try {
    // Find the cart by session id or create a new one if it doesn't exist
    let cart = await Cart.findOneAndUpdate(
      { sessionId:sessionId },
      {},
      { upsert: true, new: true }
    );
    console.log(cart)
    // Get the product details by product id
    const productDetails = await Product.findById(productId);

    if (!productDetails) {
      return res.status(404).json({
        type: "Not Found",
        msg: "Product not found",
      });
    }
    console.log(productDetails)
    // Check if the item already exists in the cart
    const indexFound = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // If the item exists, update the quantity and total
    if (indexFound !== -1) {
      if (quantity <= 0) {
        // If the quantity is zero or negative, remove the item from the cart
        cart.items.splice(indexFound, 1);
      } else {
        // Otherwise, update the quantity and total
        cart.items[indexFound].quantity += quantity;
        cart.items[indexFound].total =
          cart.items[indexFound].quantity * productDetails.price;
      }
    } else if (quantity > 0) {
      // If the item doesn't exist and the quantity is positive, add it to the cart
      cart.items.push({
        productId: productId,
        quantity: quantity,
        price: productDetails.price,
        total: parseInt(productDetails.price * quantity),
      });
    } else {
      // If the item doesn't exist and the quantity is zero or negative, return an error
      return res.status(400).json({
        type: "Bad Request",
        msg: "Invalid quantity",
      });
    }

    // Update the subTotal and save the cart
    cart.subTotal = cart.items.reduce((acc, item) => acc + item.total, 0);
    const savedCart = await cart.save();

    // Return the saved cart
    res.status(200).json({
      type: "Success",
      msg: "Item added to cart",
      cart: savedCart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      type: "Server Error",
      msg: "Something went wrong",
    });
  }
};


exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ sessionId: req.body.sessionId })
        if (!cart) {
            return res.status(400).json({
                type: "Invalid",
                msg: "Cart Not Found",
            })
        }
        res.status(200).json({
            status: true,
            data: cart
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        })
    }
}



exports.removeItemFromCart = async (req, res) => {
    
  const { sessionId } = req.params;
  const { productId } = req.params;

  try {
    
    // Find the cart by session id
    let cart = await Cart.findOne({ sessionId });
    console.log({cart})

    if (!cart) {
      return res.status(404).json({
        type: "Not Found",
        msg: "Cart not found",
      });
    }

    // Check if the item exists in the cart
    const indexFound = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (indexFound === -1) {
      return res.status(404).json({
        type: "Not Found",
        msg: "Item not found in cart",
      });
    }

    // Remove the item from the cart
    cart.items.splice(indexFound, 1);

    // Update the subTotal and save the cart
    cart.subTotal = cart.items.reduce((acc, item) => acc + item.total, 0);
    const savedCart = await cart.save();

    // Return the saved cart
    res.status(200).json({
      type: "Success",
      msg: "Item removed from cart",
      cart: savedCart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      type: "Server Error",
      msg: "Something went wrong",
    });
  }
};

exports.emptyCart = async (req, res) => {
    const {sessionId} = req.body 
    try {
        let cart = await Cart.findOne({sessionId}); // Use findOne() instead of find()
        console.log(cart)
        cart.items = [];
        cart.subTotal = 0
        let data = await cart.save(); // Call save() on the document, not the array
        res.status(200).json({
            type: "success",
            mgs: "Cart Has been emptied",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        })
    }
}

