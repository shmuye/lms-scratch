import React from 'react'

const NavBar = () => {
    return (
        <header>
            <nav className="flex items-center justify-between px-4 py-3">
                <h1 className="font-bold">ReadSphere</h1>
                <ul className="flex items-center gap-2">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/">About</a>
                    </li>
                    <li>
                        <a href="/signup">Signup</a>
                    </li>
                    <li>
                        <a href="/user-dashboard">Dashboard</a>
                    </li>
                </ul>
                <div>
                    profile
                </div>
            </nav>
        </header>
    )
}
export default NavBar
