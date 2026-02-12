import React, { useContext, useEffect } from "react"
import { AppContext } from "../../context/AppContex"
import toast from "react-hot-toast"

const Orders = () => {
  const { orders, fetchOrders, axios } = useContext(AppContext)

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `/api/order/update/${id}`,
        { status },
        { withCredentials: true }
      )

      if (data.success) {
        toast.success("Order updated")
        fetchOrders()
      }
    } catch (error) {
      toast.error("Update failed")
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="p-2 border">
                  {order.user?.name}
                </td>
                <td className="p-2 border">₹{order.totalAmount}</td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 border">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            No orders found
          </p>
        )}
      </div>
    </div>
  )
}

export default Orders
