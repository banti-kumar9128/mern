import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContex";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

const Categories = () => {
  const { categories, fetchCategories, axios } = useContext(AppContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/category/delete/${id}`,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-5">All Categories</h1>

      <div className="border border-gray-400 max-w-5xl mx-auto p-3">
        <div className="grid grid-cols-3 font-semibold">
          <div>Image</div>
          <div>Name</div>
          <div>Action</div>
        </div>

        <hr className="my-4" />

        <ul>
          {categories?.length === 0 && (
            <p className="text-center text-gray-400">
              No categories found
            </p>
          )}

          {categories?.map((item) => (
            <li
              key={item._id}
              className="grid grid-cols-3 items-center mb-4"
            >
              <img
                src={item.image}
                className="w-20 h-20 rounded"
                alt={item.name}
              />
              <p>{item.name}</p>
              <button onClick={() => handleDelete(item._id)}>
                <CircleX className="text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
