import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { CableProvider } from '../contexts/CableContext'
import { MessagingProvider } from '../contexts/MessagingContext'
import LoadingSpinner from '../components/LoadingSpinner'

const ProtectedRoute = () => {
  const location = useLocation()
  const { isAuthenticating, isAuthenticated } = useAuth()

  if (isAuthenticating) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/z/sign_in" state={{ from: location }} replace />
  }

  return (
		<CableProvider>
			<MessagingProvider>
				<Outlet />
			</MessagingProvider>
		</CableProvider>
  )
}

export default ProtectedRoute
