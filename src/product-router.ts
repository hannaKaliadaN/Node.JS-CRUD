import controller from './product-controller';
import express from 'express';
const router = express.Router();


router.get("/", controller.getProducts)
router.get("/:id", controller.getProductByID)
router.post("/", controller.createProduct)
router.put("/:id", controller.updateProduct)
router.delete("/:id", controller.deleteProduct)

export default router;