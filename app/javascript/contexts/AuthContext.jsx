import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

function isTokenExpired(token) {
  const tokenData = JSON.parse(atob(token.split('.')[1]))
  const currentTime = Date.now() / 1000
  return currentTime > tokenData.exp
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken")
    const storedUser = localStorage.getItem("currentUser")

    if (storedToken && storedUser) {
      try {
        if (!isTokenExpired(storedToken)) {
          setAccessToken(storedToken)
          setCurrentUser(JSON.parse(storedUser))
        } else {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('currentUser')
        }
      } catch (error) { // Token invalid
        localStorage.removeItem('accessToken')
        localStorage.removeItem('currentUser')
      }
    }
    setIsAuthenticating(false)
  }, [])

  const login = useCallback((user, authToken) => {
    setCurrentUser(user)
    setAccessToken(authToken)
    localStorage.setItem("accessToken", authToken)
    localStorage.setItem("currentUser", JSON.stringify(user))
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
    setAccessToken(null)
    localStorage.removeItem("accessToken")
    localStorage.removeItem("currentUser")
  }, [])

  const updateUser = useCallback((user) => {
    setCurrentUser(user)
    localStorage.setItem("currentUser", JSON.stringify(user))
  }, [])

  const value = useMemo(() => ({
    currentUser,
    accessToken,
    isAuthenticating: isAuthenticating,
    login,
    logout,
    updateUser,
    isAuthenticated: !!currentUser && !!accessToken
  }), [currentUser, accessToken, isAuthenticating, login, logout, updateUser])

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}
