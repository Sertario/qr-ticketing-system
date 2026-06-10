import { useContext, createContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

export const AuthContext = createContext({
  isLoggedIn: false,
  isLoading: true,
  login: (token: string) => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    SecureStore.getItemAsync('userToken').then(token => {
      if (token) setIsLoggedIn(true)
      setIsLoading(false)
    })
  }, [])

  const login = async (token: string) => {
    await SecureStore.setItemAsync('userToken', token)
    setIsLoggedIn(true)
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
