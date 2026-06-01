import { BrowserRouter, Routes, Route } from "react-router-dom";

/* 🌍 PUBLIC */
import LandingPage from "./pages/LandingPage";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";

/* 🆕 SERVICE PAGES */
import B2B from "./pages/B2B";
import PopularAllPage from "./pages/PopularAllPage";
import B2BList from "./pages/B2BList";
import Repairs from "./pages/Repairs";
import RealEstate from "./pages/RealEstate";
import Solar from "./pages/Solar";
import CarWashingRepair from "./pages/CarWashingRepair";
import ServicesData from "./pages/ServicesData";

/* 👤 USER */
import UserProfile from "./pages/UserProfile";
import UserDashboard from "./pages/UserDashboard";

/* 🛠️ ADMIN */
import AdminDashboard from "./pages/AdminDashboard";
import AddProperty from "./pages/AddProperty";
import AdminProfile from "./pages/AdminProfile";

/* 📦 PROPERTY */
import AddListing from "./pages/AddListing";
import AddSolarListing from "./pages/AddSolarListing";
import AddCarWashing from "./pages/AddCarWashing";
import AddPopularProduct from "./pages/AddPopularProduct";
import AddListingDetails from "./pages/AddListingDetails";
import PropertyDetails from "./pages/PropertyDetails";

/* 🔐 ROUTES */
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* 💳 PAYMENT */}
        <Route path="/checkout" element={<Checkout />} />
        {/* 🧭 SERVICES (MAIN PART) */}
        <Route path="/all" element={<PopularAllPage />} />
        <Route path="/b2b" element={<B2B />} />
        <Route path="/b2b/:category" element={<B2BList />} />
        <Route path="/repairs-services" element={<Repairs />} />
        <Route path="/real-estate" element={<RealEstate />} />
        <Route path="/solar" element={<Solar />} />
        <Route path="/carWashingRepair" element={<CarWashingRepair />} />
        <Route path="/servicesData" element={<ServicesData />} />

        {/* 📦 PROPERTY */}
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/add-solar" element={<AddSolarListing />} />
        <Route path="/Add-CarWashing" element={<AddCarWashing />} />
        <Route path="/add-popularProduct" element={<AddPopularProduct />} />
        <Route path="/add-listing-details" element={<AddListingDetails />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        {/* 👤 USER */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        {/* 🛠️ ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          }
        />
        <Route
          path="/add-property"
          element={
            <AdminRoute>
              <AddProperty />
            </AdminRoute>
          }
        />
        {/* ❌ 404 */}
        <Route
          path="*"
          element={
            <div className="h-screen flex items-center justify-center text-xl font-bold">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
