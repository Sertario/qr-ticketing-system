import { Redirect, Slot } from 'expo-router'
import { useContext } from 'react'
import { AuthContext } from '../utils/auth-context'

const AuthLayout: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn) return <Redirect href="/(app)/home" />

  return <Slot />
}

export default AuthLayout
