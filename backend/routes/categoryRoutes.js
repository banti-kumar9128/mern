import express from "express";
import { adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controller/categoryController.js";

const categoryRoutes = express.Router();

// CREATE category
// categoryRoutes.post("/add", adminOnly, upload.single("image"), addCategory);
categoryRoutes.post("/add", upload.single("image"), addCategory);


// UPDATE category
categoryRoutes.put(
  "/update/:id",
  adminOnly,
  upload.single("image"),
  updateCategory
);

// DELETE category
categoryRoutes.delete(
  "/delete/:id",
  adminOnly,
  deleteCategory
);

// GET all categories
categoryRoutes.get("/all", getAllCategories);

export default categoryRoutes;
