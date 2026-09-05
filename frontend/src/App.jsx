import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Toaster } from "@/components/ui/sonner"
import Profile from "./pages/Profile"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import VerifyOtp from "./pages/VerifyOtp"

const DashboardLayout = lazy(() => import("./layout/DashboardLayout"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Products = lazy(() => import("./components/products/Products"))
const ProductList = lazy(() => import("./components/products/ProductList"))
const AddProductForm = lazy(() => import("./components/products/AddProductForm"))
const Contact = lazy(() => import("./pages/Contact"))
const Forms = lazy(() => import("./pages/Login"))
const ProductsDetails = lazy(() => import("./components/products/ProductsDetails"))
const Signup = lazy(() => import("./pages/Signup"))
const Logout = lazy(() => import("./pages/Logout"))
const NotFound = lazy(() => import("./pages/NotFound"))

function App() {
  return (
    <>
      <Toaster />

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Forms />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Forms />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/ProductsList" element={<ProductList />} />
            <Route path="/add-product" element={<AddProductForm />} />
            <Route path="/edit-product/:id" element={<AddProductForm />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/products-detail/:id"
              element={<ProductsDetails />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App