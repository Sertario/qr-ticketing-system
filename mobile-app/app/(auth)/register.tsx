import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Typography } from '@/components/Typography'
import { api } from '@/utils/api'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    if (router.canGoBack()) {
      router.back()
    } else router.replace('/login')
  }

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!')
      return
    }

    try {
      await api.post('/auth/register', { email, password, fullName })
      Alert.alert('Success', 'Registered successfully! Please sign in.')
      router.replace('/login')
    } catch (error: any) {
      Alert.alert('Error', error.response?.data || 'Registration failed')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Typography variant="title">Create Account</Typography>
        <Input
          placeholder="Full Name"
          autoCapitalize="none"
          value={fullName}
          onChangeText={setFullName}
        />
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
        <Input
          placeholder="Confirm password"
          autoCapitalize="none"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button onPress={handleRegister} text="Register" />
        <View style={styles.footer}>
          <Typography variant="small">Already have an account?</Typography>
          <Pressable onPress={handleLogin}>
            <Typography variant="link">Sign in</Typography>
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
