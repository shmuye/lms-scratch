import { Home } from "../pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "../components";
import {
  Books,
  LibrarianDashboard,
  Login,
  ReaderDashboard,
  Signup,
} from "../pages";
import AuthLayout from "../components/AuthLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "../components/Profile";
import AdminRoutes from "./AdminRoutes";
import AdminDashboard from "../components/AdminDashboard";
import CreateBookPage from "../pages/CreateBookPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/books"
          element={
            <>
              <NavBar />
              <Books />
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
          <Route element={<CreateBookPage />} path="/create-book" />
        </Route>

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
