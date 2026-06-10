import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Typography } from '@/components/Typography'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native'
import { useAuth } from '../../utils/auth-context'
import { api } from '@/utils/api'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const router = useRouter()

  const handleLogin = async () => {
    console.log('Login button pressed')
    if (!email || !password) return

    try {
      const response = await api.post('/auth/login', { email, password })
      const token = response.data

      await login(token)
      router.replace('/(tabs)')
    } catch (error: any) {
      const message = error.response?.data || 'Login failed'
      Alert.alert('Error', message)
    }
  }

  const handleRegister = () => {
    router.push('/register')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Typography variant="title">
          Welcome! Please, sign in or create an account
        </Typography>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button onPress={handleLogin} text="Sign in" />
        <View style={styles.footer}>
          <Typography variant="small">Do not have an account?</Typography>
          <Pressable onPress={handleRegister}>
            <Typography variant="link">Register</Typography>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 30,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
})
