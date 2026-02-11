import { Outlet, Link} from "react-router-dom"

const ReaderDashboard = () => {
    return (

        <>
        <nav>
            <Link to="profile">Profile</Link>
        </nav>
        <Outlet />
        </>
        

    )
}
export default ReaderDashboard
