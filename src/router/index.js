const express = require('express')

const router = express.Router()


router.get('/', (req, res)=>{
    res.status(200).json({
        message: "Server is running",
      });
})

router.use("/v1", require("./v1/cart"));
router.use("/v1", require("./v1/product"));
// router.use("/v1", require("./v1/shoes"));

module.exports = router