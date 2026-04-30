import { useContext, createContext } from 'react'

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
})

export const useAuth = () => useContext(AuthContext)
