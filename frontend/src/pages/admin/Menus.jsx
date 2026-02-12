import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContex";
import toast from "react-hot-toast";

const Menus = () => {
  const { axios } = useContext(AppContext);
  const [menus, setMenus] = React.useState([]);

  // 🔹 fetch all menus
  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");
      if (data.success) {
        setMenus(data.menuItems);
      } else {
        toast.error("Failed to load menus");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">
        All Menu Items
      </h1>

      {menus.length === 0 ? (
        <p className="text-center text-gray-500">
          No menu items found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menus.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold">
                  {item.name}
                </h2>

                <p className="text-gray-600 text-sm mt-1">
                  {item.description}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Category:{" "}
                  <span className="font-medium">
                    {item.category?.name}
                  </span>
                </p>

                <p className="mt-3 text-lg font-bold text-indigo-600">
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menus;
