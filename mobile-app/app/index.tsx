import { useAuth } from '@/utils/auth-context'
import { Redirect } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'

export default function Index() {
  const { isLoggedIn, isLoading } = useAuth()

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return isLoggedIn ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/login" />
}
