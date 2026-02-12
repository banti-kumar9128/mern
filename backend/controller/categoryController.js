import Category from "../models/catergoryModel.js";

import { v2 as cloudinary } from "cloudinary";


export const addCategory =async (req,res)=>{
   
    try {
       
        const {name} = req.body;
        if(!name||!req.file)
            return res.status(400).json({message:"name and image are required", success:false})

        const alreadyExists = await Category.findOne({name})

        if(alreadyExists)
            return res.status(400).json({message:"category already exists",success:false})
             const result =await cloudinary.uploader.upload(req.file.path)
             const newCategory =await Category.create({
            name,
            image:result.secure_url
        })

        res.status(201).json({
            message:"Category added",
            success:true,
            category:newCategory,
        })
    } catch (error) {
        return res.json({message:"internal sever error ",success:false})
    }
} 


export const  getAllCategories =async(req,res)=>{
    try {
        const categories =await Category.find().sort({createdAt:-1})
        res.status(200).json({success:true,categories})
    } catch (error) {
        return res.json({message:"internal sever error ",success:false})
    }
}

export const updateCategory =async(req,res)=>{
    try {
        const {id} =req.params;
        const {name} = req.body;
        

        const category =await Category.findById(id)
        if(!category){
            return res.status(404).json({message:"category not found",success:false})
        }
        if(res.file){
            const result =await cloudinary.uploader.upload(req.file.path)
            category.image =result.secure_url;

        }

        if(name)category.name= name;
        await Category.save()
        res.status(200).json({message:"internal server error",success:true,category})
    } catch (error) {
         return res.json({message:"internal sever error ",success:false})
    }
}


export const deleteCategory =async(req,res)=>{
    try {
        const {id} =req.params
        const category =await Category.findByIdAndDelete(id)
    if(!category)
        return res.status(404).json({message:"category not found"})

    res.status(200).json({success:true,message:"category deleted"})

    } catch (error) {
  console.error(error)
  return res.status(500).json({
    success: false,
    message: "Internal server error"
  })
}

}