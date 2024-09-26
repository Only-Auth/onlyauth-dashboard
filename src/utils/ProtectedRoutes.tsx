import { useAuth } from '@/hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  let location = useLocation()
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated()) {
    console.log('Not authenticated')
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

export default ProtectedRoutes
