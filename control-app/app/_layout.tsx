import { Slot } from 'expo-router'
import { useState } from 'react'
import { AuthContext } from './utils/auth-context'

const RootLayout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Slot />
    </AuthContext.Provider>
  )
}

export default RootLayout
