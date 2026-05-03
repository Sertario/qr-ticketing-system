import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
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

export default function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    if (router.canGoBack()) {
      router.back()
    } else router.replace('/login')
  }

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
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
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          autoCapitalize="none"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={handleLogin}>
            <Text style={styles.linkText}>Sign in</Text>
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
