import { Redirect, Slot } from 'expo-router'
import { useAuth } from '../../utils/auth-context'

const AuthLayout: React.FC = () => {
  const { isLoggedIn } = useAuth()

  if (isLoggedIn) return <Redirect href="/(tabs)" />

  return <Slot />
}

export default AuthLayout
