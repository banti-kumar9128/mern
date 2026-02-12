import Cart from "../models/cartModel.js";
import Menu from "../models/menuModel.js";

export const addToCart = async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body
        const { id } = req.user;
        const menuItem = await Menu.findById(menuItemId)

        if (!menuItem)
            return res.status(404).json({ message: "menu item not found", success: false })

        let cart = await Cart.findOne({ user: id })
        if (!cart) {
            cart = new Cart({ user: id, items: [] })
        }

        const existingItem = cart.items.find((item) => item.menuItem.toString() === menuItemId.toString())

        if (existingItem) {
            existingItem.quantity += quantity
        }
        else {
            cart.items.push({ menuItem: menuItemId, quantity })
        }
        
        await cart.save()
        res.status(200).json({ message: "Item added to cart", success: true, cart })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error", success: false })
    }
}


export const getCard = async (req, res) => {
    try {
        const { id } = req.user;
        const cart = await Cart.findOne({ user: id }).populate("items.menuItem")

        if (!cart) return res.status(200).json({ items: [], success: true })
        res.status(200).json({ success: true, cart })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error ", success: false })
    }
}


export const removeFromCart = async (req, res) => {
    try {
        const { id } = req.user
        const { menuItemId } = req.body
        const cart = await Cart.findOne({ user: id })
        if (!cart) return res.status(404).json({ message: "cart not found", success: false })
        
        cart.items = cart.items.filter((item) => item.menuItem.toString() !== menuItemId.toString())
        await cart.save()
        res.status(200).json({ message: "item removed from cart", success: true, cart })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error ", success: false })
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const { id } = req.user
        const { menuItemId, quantity } = req.body
        const cart = await Cart.findOne({ user: id })
        if (!cart) return res.status(404).json({ message: "cart not found", success: false })
        
        const item = cart.items.find((item) => item.menuItem.toString() === menuItemId.toString())
        if (!item) return res.status(404).json({ message: "item not found in cart", success: false })
        
        if (quantity <= 0) {
            cart.items = cart.items.filter((item) => item.menuItem.toString() !== menuItemId.toString())
        } else {
            item.quantity = quantity
        }
        
        await cart.save()
        res.status(200).json({ message: "quantity updated", success: true, cart })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error ", success: false })
    }
}