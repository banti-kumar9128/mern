import React from 'react'
import {Routes,Route, useLocation} from "react-router-dom"
import Home from './pages/Home.jsx'
import Menu from './pages/Menu'
import MenuDetails from './pages/MenuDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import MyBookings from './pages/MyBookings'
import MyOrders from './pages/MyOrders'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Contact from './pages/Contact'
import BookTable from './pages/BookTable.jsx'
import Navbar from './components/Navbar.jsx'
import{ Toaster }from "react-hot-toast"
import Footer from './components/Footer.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import { useContext } from 'react'
import { AppContext } from './context/AppContex.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AddCategory from './pages/admin/AddCategory.jsx'
import AddMenu from './pages/admin/AddMenu.jsx'
import Menus from './pages/admin/Menus.jsx'
import Categories from './pages/admin/Categories.jsx'
import Orders from './pages/admin/Orders.jsx'
import Bookings from './pages/admin/Bookings.jsx'
// import FilterData from './components/FilterData.jsx'

const App = () => {


  const adminPath = useLocation().pathname.includes("admin")
  const {admin} = useContext(AppContext)
  return (
   <>
       <Toaster/>
   {!adminPath && <Navbar/>}

   <Routes>

  {/* USER ROUTES */}
  <Route path="/" element={<Home />} />
  <Route path="/menu" element={<Menu />} />
  <Route path="/menu-details/:id" element={<MenuDetails />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/my-bookings" element={<MyBookings />} />
  <Route path="/book-table" element={<BookTable />} />
  <Route path="/my-order" element={<MyOrders />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/contact" element={<Contact />} />
  {/* <Route path="/category/:id" element={<FilterData />} /> */}


  {/* ADMIN ROUTES (✅ NESTED) */}
  <Route
    path="/admin"
    element={admin ? <AdminLayout /> : <AdminLogin />}
  >
    <Route index element={<Dashboard />} />
    <Route path="add-category" element={<AddCategory />} />
    <Route path="add-menu" element={<AddMenu />} />
    <Route path="menus" element={<Menus />} />
    <Route path="categories" element={<Categories />} />
    <Route path="orders" element={<Orders />} />
    <Route path="bookings" element={<Bookings />} />
  </Route>

</Routes>

    {!adminPath && <Footer/>}
   
   </>
  )
}

export default App