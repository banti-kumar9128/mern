import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContex"
import toast from "react-hot-toast"
import { Upload } from "lucide-react"


const AddMenu = () => {
  const { axios, navigate, loading, setLoading, categories, fetchCategories } =
    useContext(AppContext)

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  // fetch categories for dropdown
  useEffect(() => {
    fetchCategories()
  }, [])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !description || !price || !category || !file) {
      toast.error("All fields are required")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("name", name)
     
      formData.append("description", description)
       formData.append("price", price)
      formData.append("category", category)
      formData.append("image", file)

      const token = localStorage.getItem("token")
      const { data } = await axios.post("/api/menu/add", formData, {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      if (data.success) {
        toast.success(data.message)
        navigate("/admin/menus")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Add Menu</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl bg-white p-6 rounded-lg shadow space-y-4"
      >
        {preview && (
          <img src={preview} alt="preview" className="w-40 rounded" />
        )}

        {/* Name */}
        <input
          type="text"
          placeholder="Menu name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        
        
        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        {/* Price */}
          <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Category</option>
          {categories?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Image */}
        <input
          type="file"
          id="image"
          hidden
          onChange={handleFileChange}
        />
        <label
          htmlFor="image"
          className="flex items-center gap-2 cursor-pointer text-gray-600"
        >
          <Upload /> Upload Image
        </label>

        <button
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded"
        >
          {loading ? "Adding..." : "Add Menu"}
        </button>
      </form>
    </div>
  )
}

export default AddMenu
