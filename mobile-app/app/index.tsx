import { useAuth } from '@/utils/auth-context'
import { Redirect } from 'expo-router'

export default function Index() {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/login" />
}
