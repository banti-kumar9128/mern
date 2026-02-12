import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContex";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  Calendar,
  LogOut,
  Package,
  ShoppingCart,
  UserCircle,
  X,
  Menu,
 
} from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { navigate, user, setUser, axios, cart, fetchCart, menus } =
    useContext(AppContext);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [IsProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const logout = async () => {
    try {
      const { data } = await axios.post("api/auth/logout");
      if (data.success) {
        setUser(null);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="bg-cyan-50 shadow-md sticky top-0 z-50 py-3">
        <div className="max-w-7xl max-auto px- sm:px-6 lg:px8">
          <div className="flex items-center justify-between h-16">
            {/* left logo  */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-blue-200">
                <img src={logo} alt="" className="w-20" />
              </Link>
            </div>
            {/* center menu item */}
            <div className="hidden md:flex item-center space-x-7">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </Link>

              <Link
                to="/menu"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Menus
              </Link>

              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Contact
              </Link>
            </div>
            {/* right cart  */}
            <div className=" flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  onMouseEnter={() => setIsCartOpen(true)}
                  onMouseLeave={() => setIsCartOpen(false)}
                  className="relative p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <ShoppingCart />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-medium text-xs">
                      {cart.length}
                    </span>
                  )}
                </button>

                {isCartOpen && user && (
                  <div
                    onMouseEnter={() => setIsCartOpen(true)}
                    onMouseLeave={() => setIsCartOpen(false)}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                  >
                    <div className="p-4 max-h-96 overflow-y-auto">
                      {cart.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">
                          Your cart is empty
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {cart.map((item) => {
                            const menuItem = menus.find(
                              (m) =>
                                m._id === item.menuItem?._id ||
                                m._id === item.menuItem,
                            );
                            return (
                              <div
                                key={item.menuItem}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                              >
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-800">
                                    {menuItem?.name || "Item"}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                                <p className="text-sm font-semibold text-indigo-600">
                                  ₹{(menuItem?.price || 0) * item.quantity}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    {cart.length > 0 && (
                      <button
                        onClick={() => navigate("/cart")}
                        className="w-full p-3 bg-indigo-600 text-white font-medium rounded-b-lg hover:bg-indigo-700 transition-colors"
                      >
                        View Cart
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* MOBILE MENU BUTTON */}

            <div>
<button
  onClick={() => setMenuOpen(!isMenuOpen)}
  className="md:hidden p-2 hover:bg-gray-300 rounded-lg"
>
  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>
</div>


              <div className=" hidden  md:block  ">
                {user ? (
                  <div className="relative ">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => setIsProfileOpen(false)}
                    >
                      <UserCircle size={30} className="text-gray-700" />
                    </button>

                    {IsProfileOpen && (
                      <div
                        onMouseEnter={() => setIsProfileOpen(true)}
                        onMouseLeave={() => setIsProfileOpen(false)}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border-gray-100"
                      >
                        {" "}
                        <Link
                          to="/my-bookings"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-400 transition-colors"
                        >
                          <Calendar size={18} className="mr-3" />
                          my Bookings{" "}
                        </Link>
                        <Link
                          to="/my-orders"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-400 transition-colors"
                        >
                          <Package size={18} className="mr-3" />
                          my Orders{" "}
                        </Link>
                        <button
                          onClick={logout}
                          className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-red-100 transition-colors"
                        >
                          {" "}
                          <LogOut size={18} className="mr-8" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium cursor-pointer"
                  >
                    login
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* mobile menu */}


          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 pr-10 ">

              <div className="flex flex-col space-y-3 items-end-safe ">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={(()=>setMenuOpen(false))}
                >
                  Home
                </Link>

                <Link
                  to="/menu"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={(()=>setMenuOpen(false))}
                >
                  Menus
                </Link>

                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={(()=>setMenuOpen(false))}
                >
                  Contact
                </Link>

                {user ? (
                  <div className="relative " >
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => setIsProfileOpen(false)}
                    >
                      <UserCircle size={30} className="text-gray-700" />
                    </button>

                    {IsProfileOpen && (
                      <div
                        onMouseEnter={() => setIsProfileOpen(true)}
                       
                        onMouseLeave={() => setIsProfileOpen(false)}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border-gray-100"
                      >
                        {" "}
                        <Link
                          to="/my-bookings"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-400 transition-colors"
                        >
                          <Calendar size={18} className="mr-3" />
                          my Bookings{" "}
                        </Link>
                        <Link
                          to="/my-orders"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-400 transition-colors"
                        >
                          <Package size={18} className="mr-3" />
                          my Orders{" "}
                        </Link>
                        <button
  onClick={() => {
    logout();
    setMenuOpen(false);
  }}
  className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-red-100 transition-colors"
>
  <LogOut size={18} className="mr-8" />
  Logout
</button>

                      </div>
                    )}
                  </div>
                ) : (
                  <button
  onClick={() => {
    navigate("/login");
    setMenuOpen(false);
  }}
  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium cursor-pointer"
>
  login
</button>

                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
