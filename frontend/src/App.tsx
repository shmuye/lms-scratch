import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/index.js";
import {
  Login,
  Signup,
  Home,
  LibrarianDashboard,
  ReaderDashboard,
} from "./pages/index.js";
import Profile from "./components/Profile.js";
import ProtectedRoutes from "./routes/ProtectedRoutes.js";
import AuthLayout from "./components/AuthLayout.js";
import AdminDashboard from "./components/AdminDashboard.js";
import AdminRoutes from "./routes/AdminRoutes.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home />
            </>
          }
        />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/reader" element={<ReaderDashboard />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/librarian" element={<LibrarianDashboard />} />
          <Route element={<AdminRoutes />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};
export default App;
