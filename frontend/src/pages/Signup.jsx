import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContex";

const Signup = () => {
  const { axios, loading, setLoading, navigate } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    setLoading(true);

    try {
      const { data } = await axios.post("/api/auth/register", formData);
        console.log(data)
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Network Error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center py-5 justify-center">
      <form
        onSubmit={handleSubmit}
        className="sm:w-87.5 w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8"
      >
        <h1 className="text-white text-3xl mt-10 font-medium">Register</h1>
        <p className="text-gray-400 text-sm mt-2">
          Please signup to continue
        </p>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="mt-6 w-full h-12 rounded-full pl-6 bg-gray-800 text-white outline-none"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mt-4 w-full h-12 rounded-full pl-6 bg-gray-800 text-white outline-none"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mt-4 w-full h-12 rounded-full pl-6 bg-gray-800 text-white outline-none"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="p-2 text-white">
          Already have an account?
          <Link to="/login">
            <span className="text-indigo-400 hover:underline ml-1">
              Sign In
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
