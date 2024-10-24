import { useLocation, Navigate } from 'react-router-dom'

import { useAuth } from '../hooks'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()
  const { isAuth } = useAuth()
  if (!isAuth) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }
  return children
}

export default RequireAuth
