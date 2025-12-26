import { Redirect, Slot } from 'expo-router'
import { useContext } from 'react'
import { AuthContext } from '../utils/auth-context'

const AppLayout: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext)

  if (!isLoggedIn) return <Redirect href="/(auth)/login" />

  return <Slot />
}

export default AppLayout
