import express from "express"

 import { adminLogin, getProfile, loginUser, logOut, registerUser } from "../controller/authController.js"
import { protect } from "../middlewares/authMiddleware.js"


const authRoutes = express.Router()


authRoutes.post("/register",registerUser)
authRoutes.post("/login",loginUser)
authRoutes.post("/login/admin",adminLogin)
authRoutes.post("/logout",logOut)
authRoutes.get("/profile",protect,getProfile)


export default authRoutes