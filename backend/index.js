import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import { connectCloudinary } from "./config/cloudinary.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import OrderRoutes from "./routes/orderRoutes.js";
import BookingRoutes from "./routes/BookingRoutes.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order",OrderRoutes);
app.use("/booking",BookingRoutes);

// test route
app.get("/", (req, res) => {
  res.status(200).send("hello kya ho rha hai");
});

const PORT = process.env.PORT || 4000;

// start server
const startServer = async () => {
  try {
    await connectDB();          // ✅ wait for MongoDB
    connectCloudinary();        // ✅ configure Cloudinary

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
