import React, { useContext, useState } from "react"
import { AppContext } from "../../context/AppContex"
import {
  BookAIcon,
  Grid3x3,
  LayoutDashboard,
  Menu,
  Package,
  Plus,
  ShoppingCart,
  X,
} from "lucide-react"
import { useLocation, Link, Outlet } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

const AdminLayout = () => {
  const { setAdmin } = useContext(AppContext)
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { path: "/admin", name: "Dashboard", Icon: LayoutDashboard },
    { path: "/admin/add-category", name: "Add Category", Icon: Plus },
     { path: "/admin/categories", name: "All Category", Icon: Grid3x3 },
    { path: "/admin/add-menu", name: "Add Menu", Icon: Package },
    { path: "/admin/menus", name: " All Menu", Icon: ShoppingCart },
   
    
    { path: "/admin/orders", name: "Orders", Icon: ShoppingCart },
    { path: "/admin/bookings", name: "Bookings", Icon: BookAIcon },
  ]

  // ✅ active route match (nested routes support)
  const isActive = (path) => location.pathname.startsWith(path)

  const logout = async () => {
    try {
      const { data } = await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      )
      if (data.success) {
        toast.success("Logged out successfully")
        setAdmin(false)
        localStorage.removeItem("admin")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md shadow-lg bg-white hover:bg-gray-100"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-secondary text-white">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>

          {/* NAVBAR */}
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.Icon
              const active = isActive(item.path)

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) setSidebarOpen(false)
                  }}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all
                  ${
                    active
                      ? "bg-blue-50 text-primary border-r-4 border-primary"
                      : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={logout}
            className="m-4 px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ✅ YAHAN CHILD ROUTES RENDER HONGE */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
