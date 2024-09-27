import { useLocation, Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoutes = () => {
  const location = useLocation()
  const allKeys = Object.keys(localStorage)

  // Find the key that contains 'accessToken'
  const idTokenKey = allKeys.find((key) => key.endsWith('.idToken'))

  return idTokenKey ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
}
