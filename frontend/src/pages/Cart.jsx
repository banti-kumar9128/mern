import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContex";
import { Trash2, Plus, Minus } from "lucide-react";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, setCart, menus, axios, navigate, fetchCart, user } =
    useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [user]);

  useEffect(() => {
    setCartItems(cart);
    calculateTotal();
  }, [cart]);

  const calculateTotal = () => {
    let sum = 0;
    cart.forEach((item) => {
      const menuItem = menus.find(
        (m) => m._id === item.menuItem?._id || m._id === item.menuItem,
      );
      if (menuItem) {
        sum += menuItem.price * item.quantity;
      }
    });
    setTotal(sum);
  };

  const handleIncreaseQuantity = async (menuItemId) => {
    try {
      const currentItem = cart.find(
        (item) =>
          item.menuItem?._id === menuItemId || item.menuItem === menuItemId,
      );
      const newQuantity = (currentItem?.quantity || 0) + 1;

      const { data } = await axios.put("/api/cart/update", {
        menuItemId,
        quantity: newQuantity,
      });

      if (data.success) {
        setCart(data.cart.items);
        toast.success("Quantity increased");
      }
    } catch (error) {
      toast.error("Failed to update quantity");
      console.log(error);
    }
  };

  const handleDecreaseQuantity = async (menuItemId) => {
    try {
      const currentItem = cart.find(
        (item) =>
          item.menuItem?._id === menuItemId || item.menuItem === menuItemId,
      );
      const newQuantity = (currentItem?.quantity || 1) - 1;

      if (newQuantity <= 0) {
        handleRemoveItem(menuItemId);
        return;
      }

      const { data } = await axios.put("/api/cart/update", {
        menuItemId,
        quantity: newQuantity,
      });

      if (data.success) {
        setCart(data.cart.items);
        toast.success("Quantity decreased");
      }
    } catch (error) {
      toast.error("Failed to update quantity");
      console.log(error);
    }
  };

  const handleRemoveItem = async (menuItemId) => {
    try {
      const { data } = await axios.delete("/api/cart/remove", {
        data: { menuItemId },
      });

      if (data.success) {
        setCart(data.cart.items);
        toast.success("Item removed from cart");
      }
    } catch (error) {
      toast.error("Failed to remove item");
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please login to view your cart</p>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
    <div className="container mx-auto px-3 sm:px-4">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 sm:p-8 text-center">
          <p className="text-gray-600 text-base sm:text-lg mb-4">
            Your cart is empty
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* CART ITEMS */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => {
              const menuItem = menus.find(
                (m) =>
                  m._id === item.menuItem?._id || m._id === item.menuItem
              );

              if (!menuItem) return null;

              return (
                <div
                  key={item.menuItem}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 sm:p-5"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    
                    {/* IMAGE */}
                    <div className="w-full sm:w-24 h-40 sm:h-24 flex-shrink-0">
                      <img
                        src={menuItem.image}
                        alt={menuItem.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {menuItem.name}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {menuItem.description.substring(0, 60)}...
                      </p>

                      <p className="text-indigo-600 font-bold text-lg mt-2">
                        ₹{menuItem.price}
                      </p>

                      {/* CONTROLS */}
                      <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                        <button
                          onClick={() =>
                            handleDecreaseQuantity(item.menuItem)
                          }
                          className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg"
                        >
                          <Minus size={18} />
                        </button>

                        <span className="w-8 text-center font-semibold text-lg">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            handleIncreaseQuantity(item.menuItem)
                          }
                          className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3">
                      <p className="font-semibold text-gray-800">
                        ₹{(menuItem.price * item.quantity).toFixed(2)}
                      </p>

                      <button
                        onClick={() => handleRemoveItem(item.menuItem)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:sticky lg:top-20 h-fit">
            <div className="bg-white rounded-xl shadow-md p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 mb-5 text-sm sm:text-base">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹0.00</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>₹{(total * 0.05).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    ₹{(total * 1.05).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/menu")}
                className="w-full mt-3 bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  </div>
);

};

export default Cart;
