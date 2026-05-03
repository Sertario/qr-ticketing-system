import { Redirect, Stack } from 'expo-router'
import { useAuth } from '../../utils/auth-context'

export default function AuthLayout() {
  const { isLoggedIn } = useAuth()

  if (isLoggedIn) return <Redirect href="/(tabs)" />

  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Register',
        }}
      />
    </Stack>
  )
}
