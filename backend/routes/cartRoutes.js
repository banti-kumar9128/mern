import express from "express"
import { adminOnly,protect } from "../middlewares/authMiddleware.js"
import upload from "../middlewares/multer.js"
import { addToCart, getCard, removeFromCart, updateQuantity } from "../controller/cartController.js"


const cartRoutes = express.Router()

cartRoutes.post("/add",protect,addToCart)
cartRoutes.get("/get",protect,getCard)
cartRoutes.delete("/remove",protect,removeFromCart)
cartRoutes.put("/update",protect,updateQuantity)



export default cartRoutes;