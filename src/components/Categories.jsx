import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContex";
import toast from "react-hot-toast";
import video from "../assets/videoss.mp4"


const Categories = () => {
     const { axios } = useContext(AppContext);

  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [previewImage, setPreviewImage] = useState(null);


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

  // 🔹 filter menus by category
  const filteredMenus =
    selectedCategory === ""
      ? menus
      : menus.filter(
          (item) => item.category?._id === selectedCategory
        );
  return (
<section className="relative min-h-screen sm:m-5 md:m-10 rounded-md overflow-hidden">

  {/* ✅ BACKGROUND VIDEO */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 -z-10 w-full h-full object-cover opacity-90"
    src={video}
  />

  {/* ✅ PREVIEW MODAL */}
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



      
      <div className="container mx-auto px-4 text-center  ">

        <h2 className="text-3xl font-bold mb-2 pt-10 ">
           <span className="bg-linear-to-r from-[#52cdd4] to-indigo-600 p-2 rounded-md "><span className="bg-linear-to-r from-[#CB52D4] to-indigo-600"> Explore Our</span> <span className=" bg-linear-to-r from-[#CB52D4] to-indigo-600 rounded-md  text-orange-600">Categories</span></span>
        </h2>

        <div className=" w-full flex flex-wrap justify-center gap-4  sm:mb-0 md:mb-10  sm:overflow-x-auto p-2 ">
          {categories.map((cat) => (
  <button
    key={cat._id}
    onClick={() => setSelectedCategory(cat._id)}
    className={`sm:m-2 md:m-10 flex flex-col items-center border p-2 rounded-lg
      ${
        selectedCategory === cat._id
          ? "bg-indigo-600 text-white"
          : "bg-white text-gray-700"
      }`}
  >
    <div className="rounded-full overflow-hidden w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32">
      <img
        src={cat.image}
        alt={cat.name}
        onClick={(e) => {
          e.stopPropagation();
          setPreviewImage(cat.image);
        }}
        className="w-full h-full object-cover cursor-pointer"
      />
    </div>

    {/* ⭐ Name outside circle */}
    <h2 className="text-sm md:text-base font-semibold mt-2">
      {cat.name}
    </h2>
  </button>
))}


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
                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>

                  <p className="text-lg font-bold text-indigo-600 mt-3">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>


        </div>

      </div>
    </section>
  )
}

export default Categories
