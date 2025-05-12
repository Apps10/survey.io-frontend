import { useAuth } from '@/features/auth/hooks/auth.hook'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />
  }

  return <Outlet />
}