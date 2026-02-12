import Order from "../models/orderModel.js";

import Cart from "../models/cartModel.js";


export const plasceOrder= async(req,res)=>{
    try {
        const {id} = req.user;
        const {address} =req.body
        if(!address)
            return res.status(400).json({message:"Delivery address"})
        const cart  =await Cart.findOne({user:id}).populate("items.menuItem")

    if(!cart|| cart.items.length===0)
        return res.status(400).json({message:"Your cart is empty"})
    
    const totalAmount = cart.items.reduce((sum,item)=>sum+item.menuItem.price*item.quantity,0)

    const newOrder = await Order.create({
        user:id,
        items:cart.items.map((i)=>({
            menuItem:i.menuItem._id,
            quantity:i.quantity
        })),
        totalAmount,
        address
    })
cart.items =[]
await cart.save()
res.status(201).json({
    success:true,
    message:"order placed successfully",
    order:newOrder,
})





    }catch(error){

    }
}


export const getUserOrders =async(req,res)=>{
    try {
        const {id} = req.user;
        const orders =await Order.find({user:id}).sort({createdAt:-1})
        res.status(200).json(orders)
    } catch (error) {
        
    }
}


export const getAllOrders =async(req,res)=>{
    try {
        const orders =await Order.find().populate("user").sort({createdAt:-1})
        res.status(200).json(orders)
    } catch (error) {
        
    }
}

export const updateOrderStatus =async(req,res)=>{
    try {
        const{orderId} =req.params;
        const {status} = req.body
        const order = await Order.findById(orderId);
        if(!order)return res.status(404).json({message:"order not found"})

        order.status =status
        await order.save()
        res.json({message:"order status updated"})
    } catch (error) {
        
    }
}