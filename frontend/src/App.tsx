import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/index.js";
import { Login, Signup,Home, LibrarianDashboard, ReaderDashboard } from "./pages/index.js";
import Profile from "./components/Profile.js";
import ProtectedRoutes from "./routes/ProtectedRoutes.js";
import AuthLayout from "./components/AuthLayout.js";

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
                <Route element={<AuthLayout />}>
                     <Route path="/Login" element={ <Login/>} />
                     <Route path="/signup" element={<Signup/>} />
                </Route>
                
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
