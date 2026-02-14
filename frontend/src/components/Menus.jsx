import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContex";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

const Menus = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const { axios, user, navigate, fetchCart } = useContext(AppContext);

  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 🔹 fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  // 🔹 fetch menus
  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");
      if (data.success) {
        setMenus(data.menuItems);
      }
    } catch (error) {
      toast.error("Failed to load menus");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchMenus();
  }, []);

  // 🔹 handle add to cart
  const handleAddToCart = async (menuId) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.post("/api/cart/add", {
        menuItemId: menuId,
        quantity: 1,
      });
      if (data.success) {
        toast.success("Item added to cart");
        fetchCart();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  // 🔹 filter menus by category
  const filteredMenus =
    selectedCategory === "all"
      ? menus
      : menus.filter((item) => item.category?._id === selectedCategory);

  return (
    <div className="min-h-screen bg-linear-to-r from-[#843fbc] to-indigo-600 p-2 rounded-md  py-12">
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
            alt=""
          />
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Menu</h1>
          <p className="text-white font-bold">
            Choose a category to explore delicious items
          </p>
        </div>

        {/* 🔥 Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 rounded-full border 
              ${
                selectedCategory === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700"
              }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`px-5 py-2 rounded-full border 
                ${
                  selectedCategory === cat._id
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 🔥 Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMenus.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No items found for this category
            </p>
          ) : (
            filteredMenus.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewImage(item.image);
                  }}
                  className="w-full h-48 object-cover cursor-pointer"
                />

                <div className="p-4">
                  <h2 className="text-xl font-semibold">{item.name}</h2>

                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-bold text-indigo-600">
                      ₹{item.price}
                    </p>
                    <button
                      onClick={() => handleAddToCart(item._id)}
                      className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Menus;
