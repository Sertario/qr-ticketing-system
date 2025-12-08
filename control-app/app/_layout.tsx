import { Slot } from 'expo-router'
import { AuthContext } from './auth-context'
import { useState } from 'react'

const RootLayout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Slot />
    </AuthContext.Provider>
  )
}

export default RootLayout
