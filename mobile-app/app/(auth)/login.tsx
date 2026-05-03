import { useState } from 'react'
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useAuth } from '../../utils/auth-context'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setIsLoggedIn } = useAuth()

  const router = useRouter()

  const handleLogin = () => {
    // API request for login
    // checking response
  }

  const handleRegister = () => {
    router.push('/register')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome! Please, sign in or create an account</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Do not have an account?</Text>
          <Pressable onPress={handleRegister}>
            <Text style={styles.linkText}>Register</Text>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 15,
  },
  button: {
    width: '60%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    borderRadius: 26,
  },
  buttonPressed: {
    backgroundColor: Colors.sky,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    fontSize: 14,
    color: Colors.gray,
  },
  linkText: {
    fontSize: 14,
    color: Colors.blue,
    fontWeight: '600',
  },
})
