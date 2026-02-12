import React, { useContext, useState } from "react"
import { AppContext } from "../../context/AppContex"
import { Upload } from "lucide-react"
import toast from "react-hot-toast"

const AddCategory = () => {
  const { axios, navigate, loading, setLoading } = useContext(AppContext)

  const [name, setName] = useState("")
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  // text input
  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  // file input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !file) {
      toast.error("All fields are required")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("name", name)
      formData.append("image", file)

      const { data } = await axios.post(
        "/api/category/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      if (data.success) {
        toast.success(data.message)
        navigate("/admin/categories")
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
    <div className="py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full flex flex-col gap-5"
      >
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-1/2 rounded-md"
          />
        )}

        {/* Category name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="Enter category name"
          />
        </div>

        {/* Category image */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Category Image
          </label>

          <input
            type="file"
            id="fileUpload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition"
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-gray-400 text-sm">
              {file ? file.name : "Click to upload image"}
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white py-2 px-3 rounded-md hover:bg-orange-600"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  )
}

export default AddCategory
