import { useAuth } from '@/utils/auth-context'
import { Tabs, useRouter } from 'expo-router'
import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const AppLayout: React.FC = () => {
  const { logout, isLoggedIn } = useAuth()
  const router = useRouter()

  if (!isLoggedIn) return null

  const handleLogout = async () => {
    await logout()
    router.replace('/(auth)/login')
  }

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <Pressable onPress={handleLogout} style={{ marginRight: 15 }}>
            <Ionicons name="log-out-outline" size={24} color="red" />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Scanner',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="qr-code-outline" size={size} color={color} />
          ),
          headerTitle: 'Ticket Scanner',
        }}
      />
    </Tabs>
  )
}

export default AppLayout
