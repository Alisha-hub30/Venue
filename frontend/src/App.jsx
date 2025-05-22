import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Layouts
import AdminLayout from './Layouts/AdminLayout';
import PublicLayouts from './Layouts/PublicLayout';
import UserLayout from './Layouts/UserLayout';

// Components
import NavBar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import About from './pages/About';
import Admin from './pages/Admin';
import Bookings from './pages/Booking';
import CategoryServices from './pages/CategoryServices';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import LandingPage from './pages/Landingpage';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ServiceDetails from './pages/ServiceDetails';
import Services from './pages/Services';
import Unauthorized from './pages/Unauthorized';
import VendorDashboard from './pages/VendorDashboard';
import RegisterVendor from './pages/VendorRegister';

// Redux
import Footer from './components/Footer';
import ContactUs from './pages/Contact';
import { updateUser } from './redux/AuthSlice';

export default function App() {
  const dispatch = useDispatch();
  console.log(window.location.pathname)

  useEffect(() => {
    if(window.location.pathname !== '/login'){
      dispatch(updateUser());
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* Protected User Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Admin />} />
          </Route>

          {/* Protected Vendor Route */}
          <Route
            path="/vendor"
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/" element={<PublicLayouts />}>
            <Route index element={<LandingPage />} />
            <Route path="/navbar" element={<NavBar />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="registerVendor" element={<RegisterVendor />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="servicedetails" element={<ServiceDetails />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="/footer" element={<Footer/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<ContactUs/>}/>
          </Route>

          {/* Public or Shared Routes */}
          <Route path="/services" element={<Services />} />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute allowedRoles={['user', 'vendor']}>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route path="/category-services" element={<CategoryServices />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}