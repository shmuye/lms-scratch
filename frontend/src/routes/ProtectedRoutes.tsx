import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/hooks'
import { isAuthenticated } from '../features/auth/auth.slice'
import type { JSX } from 'react'

const ProtectedRoutes = () => {

  const authenticated = useAppSelector(isAuthenticated)

  if(!authenticated) {
      return <Navigate to={'/login'} replace />
  }
  return <Outlet />
}

export default ProtectedRoutes