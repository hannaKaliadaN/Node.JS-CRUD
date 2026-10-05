const controller = require('./product-controller')
const express = require('express');
const router = express.Router();


router.get("/", controller.getProduct)
router.get("/:id", controller.getProductByID)
router.post("/", controller.createProduct)
router.put("/:id", controller.updateProduct)
router.delete("/:id", controller.deleteProduct)

module.exports = router;