import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(null);
import axios from "axios";

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [admin, setAdmin] = useState(localStorage.getItem("admin") === "true");
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [cart, setCart] = useState([]);

  // const [categories, setCategories] = useState([])
  const [menus, setMenus] = useState([]);
  // const [orders, setOrders] = useState([])
  // const [bookings, setBookings] = useState([])

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success) {
        setCategories(data.categories);
      } else {
        console.log("failed to fatch categories");
      }
    } catch (error) {
      console.log("error fatching categoriess:", error);
    }
  };
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/all", {
        withCredentials: true,
      });
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");

      if (data.success) {
        setMenus(data.menuItems);
      } else {
        console.log("Failed to fetch menus");
      }
    } catch (error) {
      console.log("Error fetching menus:", error);
    }
  };
  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/all", {
        withCredentials: true,
      });
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCart = async () => {
    try {
      const { data } = await axios.get("/api/cart/get", {
        withCredentials: true,
      });
      if (data.success) {
        setCart(data.cart?.items || []);
      }
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  axios.defaults.withCredentials = true;

  // Set authorization header if token exists
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  useEffect(() => {
    fetchMenus();
    if (user) {
      fetchCart();
    }
  }, [user]);
  const value = {
    navigate,
    loading,
    setLoading,
    user,
    setUser,
    axios,
    admin,
    setAdmin,
    categories,
    fetchCategories,
    orders,
    fetchOrders,
    bookings,
    fetchBookings,
    menus,
    setMenus,
    fetchMenus,
    token,
    setToken,
    cart,
    setCart,
    fetchCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
