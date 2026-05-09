import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllInvoices from "./pages/Invoices/AllInvoices";
import CreateInVoices from "./pages/Invoices/CreateInVoices";
import InvoiceDetail from "./pages/Invoices/InvoiceDetail";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>

          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoute/>}>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="invoices" element={<AllInvoices/>}/>
          <Route path="invoices/new" element={<CreateInVoices/>}/>
          <Route path="invoices:id" element={<InvoiceDetail/>}/>
          <Route path="profile" element={<ProfilePage/>}/>
          </Route>

          {/* catch all routes */}
          <Route path="*" element={ <Navigate to="/" replace/>}/>
        </Routes>
      </Router>

      <Toaster
      toastOptions={{
        className : "",
        style :{
          fontSize : "13px"
        },
      }}
      
      />
    </div>
  )
}

export default App
