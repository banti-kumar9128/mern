import Menu from "../models/menuModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

// ================= ADD MENU =================
export const addMenuItem = async (req, res) => {
  try {
    console.log("📥 Received add menu request");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category || !req.file) {
      console.warn("❌ Missing required fields", { name, description, price, category, file: !!req.file });
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("📤 Uploading to Cloudinary:", req.file.path);
    let result;
    try {
      result = await cloudinary.uploader.upload(req.file.path);
      console.log("✅ Cloudinary upload successful:", result.secure_url);
      
      // Clean up local file after successful upload
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
        console.log("🗑️  Local file deleted");
      }
    } catch (cloudinaryError) {
      console.error("❌ Cloudinary upload error:", cloudinaryError.message);
      // Clean up local file on error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: "Image upload failed: " + cloudinaryError.message,
      });
    }

    console.log("💾 Creating menu item in database");
    const newMenuItem = await Menu.create({
      name,
      description,
      price,
      category,
      image: result.secure_url,
    });
    console.log("✅ Menu item created:", newMenuItem._id);

    res.status(201).json({
      success: true,
      message: "Menu item added",
      menuItem: newMenuItem,
    });
  } catch (error) {
    console.error("❌ Add menu error:", error.message);
    console.error("Stack:", error.stack);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// ================= GET ALL MENUS =================
export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      menuItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= UPDATE MENU =================
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, isAvailable } = req.body;

    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      menuItem.image = result.secure_url;
    }

    if (name) menuItem.name = name;
    if (description) menuItem.description = description;
    if (price) menuItem.price = price;
    if (category) menuItem.category = category;
    if (isAvailable !== undefined) menuItem.isAvailable = isAvailable;

    await menuItem.save();

    res.status(200).json({
      success: true,
      message: "Menu item updated",
      menuItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= DELETE MENU =================
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await Menu.findByIdAndDelete(id);
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu item deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
