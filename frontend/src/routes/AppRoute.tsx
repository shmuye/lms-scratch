import { Home } from "../pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Books,
  LibrarianDashboard,
  Login,
  ReaderDashboard,
  Signup,
  AdminDashboard,
} from "../pages";
import { Profile } from "../components";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";
import CreateBookPage from "../pages/CreateBookPage";
import PublicLayout from "../layouts/PublicLayout";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import Notfound from "../components/Notfound";
import BorrowedBooks from "../components/UserBorrows";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<AppLayout />}>
            <Route path="/reader" element={<ReaderDashboard />}>
              <Route path="profile" element={<Profile />} />
              <Route path="borrowed" element={<BorrowedBooks />} />
            </Route>

            <Route path="/librarian" element={<LibrarianDashboard />} />

            <Route element={<AdminRoutes />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            <Route path="/create-book" element={<CreateBookPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
