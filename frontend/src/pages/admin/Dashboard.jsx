import React, { useContext, useEffect } from "react"
import { AppContext } from "../../context/AppContex"
import {
  Grid3x3,
  Package,
  ShoppingCart,
  BookOpen,
} from "lucide-react"

const Dashboard = () => {
  const {
    categories,
    // menus,
    orders,
    bookings,
    fetchCategories,
    fetchMenus,
    fetchOrders,
    fetchBookings,
  } = useContext(AppContext)

  useEffect(() => {
    fetchCategories()
    // fetchMenus()
    fetchOrders()
    fetchBookings()
  }, [])

  const stats = [
    {
      title: "Categories",
      count: categories.length,
      icon: <Grid3x3 className="w-8 h-8 text-blue-500" />,
    },
    // {
    //   title: "Menus",
    //   count: menus.length,
    //   icon: <Package className="w-8 h-8 text-green-500" />,
    // },
    {
      title: "Orders",
      count: orders.length,
      icon: <ShoppingCart className="w-8 h-8 text-orange-500" />,
    },
    {
      title: "Bookings",
      count: bookings.length,
      icon: <BookOpen className="w-8 h-8 text-purple-500" />,
    },
  ]

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-3xl font-bold">{item.count}</h2>
            </div>
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
