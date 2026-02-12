import mongoose from "mongoose";

const catergorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true,
      trim: true,
    },
   image:{
    type:String,
    required:true
   }
  },
  { timestamps: true }
);

const Category  = mongoose.model("Category", catergorySchema);
export default Category;