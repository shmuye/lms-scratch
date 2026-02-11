import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/index.js";
import { Login, Signup,Home, LibrarianDashboard, ReaderDashboard } from "./pages/index.js";
import Profile from "./components/Profile.js";
import ProtectedRoutes from "./components/ProtectedRoutes.js";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <>
                        <NavBar/>
                        <Home />
                    </>
                } />
                <Route path="/Login" element={
                    <>
                        <NavBar/>
                        <Login/>
                    </>
                } />
                <Route path="/signup" element={
                    <>
                        <NavBar/>
                        <Signup/>
                    </>
                } />
                <Route path="/dashboard" element={<LibrarianDashboard />} />
                  
               <Route element={<ProtectedRoutes />}>
                <Route path="/user-dashboard" element={<ReaderDashboard />}>
                    <Route path="profile" element={<Profile /> } />
                </Route>
                </Route>
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </Router>
    )
}
export default App
