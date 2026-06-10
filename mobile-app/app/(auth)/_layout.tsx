import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Register',
          headerBackTitle: 'Login',
        }}
      />
    </Stack>
  )
}
