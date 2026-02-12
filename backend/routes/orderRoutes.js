import express from "express"
import { adminOnly,protect } from "../middlewares/authMiddleware.js"
import { getAllOrders, getUserOrders, plasceOrder, updateOrderStatus } from "../controller/orderController.js"



const OrderRoutes = express.Router()

OrderRoutes.post("/place",protect,plasceOrder)
OrderRoutes.get("/my-order",protect,getUserOrders)
OrderRoutes.get("/orders",adminOnly,getAllOrders)
OrderRoutes.put("/update-status/:orderId",adminOnly,updateOrderStatus)




export default OrderRoutes;