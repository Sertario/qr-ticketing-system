import { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { useAuth } from '../utils/auth-context'

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setIsLoggedIn } = useAuth()

  const handleLogin = () => {
    // API request for login
    // checking response
  }

  const handleRegister = () => {
    // router push
  }

  return (
    <View>
      <Text>Welcome! Please, sign in or create an account</Text>
      <TextInput style={''} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        style={''}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign in" onPress={handleLogin} />

      <View>
        <Text>Do not have an account?</Text>
        <Button title="Create" onPress={handleRegister} />
      </View>
    </View>
  )
}
