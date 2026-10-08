import controller from './user-controller';
import express from 'express';
const router = express.Router();


router.get("/", controller.getUsers)
router.get("/:id/with-articles-and-comments", controller.getUserWithArticlesandComments)
router.get("/:id", controller.getUserByID)
router.post("/", controller.createUser)
router.put("/:id", controller.updateUser)
router.delete("/:id", controller.deleteUser)

export default router;