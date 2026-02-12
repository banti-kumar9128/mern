import React, { useContext, useEffect } from "react"
import { AppContext } from "../../context/AppContex"
import toast from "react-hot-toast"

const Bookings = () => {
  const { bookings, fetchBookings, axios } = useContext(AppContext)

  useEffect(() => {
    fetchBookings()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `/api/booking/update/${id}`,
        { status },
        { withCredentials: true }
      )

      if (data.success) {
        toast.success("Booking updated")
        fetchBookings()
      }
    } catch (error) {
      toast.error("Update failed")
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Guests</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="p-2 border">
                  {booking.user?.name}
                </td>
                <td className="p-2 border">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="p-2 border">{booking.guests}</td>
                <td className="p-2 border">{booking.status}</td>
                <td className="p-2 border">
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      updateStatus(booking._id, e.target.value)
                    }
                    className="border p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            No bookings found
          </p>
        )}
      </div>
    </div>
  )
}

export default Bookings
