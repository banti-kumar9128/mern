import express from "express"


import { adminOnly, protect } from "../middlewares/authMiddleware.js"
import { createBooking, getAllBookings, getUserBookings, updateBookingStatus } from "../controller/bookingController.js"


const BookingRoutes = express.Router()


BookingRoutes.post("/create",protect,createBooking)
BookingRoutes.get("/my-booking",protect,getUserBookings)
BookingRoutes.get("/booking",adminOnly,getAllBookings)
BookingRoutes.put("/update-status/:bookingId",adminOnly,updateBookingStatus)


export default BookingRoutes