import { BookIcon, LogIn } from 'lucide-react'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'

const navLinks = [
  {icon: BookIcon , label: "Browse Books", href: "/"},
  {icon: LogIn, label: "Sign In", href: "/login"},
]

const NavBar = () => {
  return (
    <header className='flex justify-between items-center h-16 p-4 border-b border-slate-500 mb-4'>
        <h1 className='text-xl font-bold text-gradient-to-r from-blue-500 to-yellow-500'>ReadSphere</h1>
         <nav>
          
          <ul className='flex justify-between  gap-4'>
                {
                  navLinks.map((link) => (
                    <li className='flex items-center gap-2'>
                       <button>
                         <link.icon />
                       </button>
                       <Link to={link.href}>
                         {link.label}
                       </Link>
                       
                    </li>
                  ))
                }
              </ul>
      </nav>
      <SearchBar />
    </header>
  )
}

export default NavBar