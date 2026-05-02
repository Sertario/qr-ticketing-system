import { useAuth } from '@/utils/auth-context'
import { Redirect, Tabs } from 'expo-router'

const AppLayout: React.FC = () => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) return <Redirect href="/(auth)/login" />

  return <Tabs />
}

export default AppLayout
