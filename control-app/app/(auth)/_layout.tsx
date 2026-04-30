import { useContext } from 'react'
import { Redirect, Slot } from 'expo-router'
import { AuthContext } from '../auth-context'

const AuthLayout: React.FC = () => {
    const { isLoggedIn } = useContext(AuthContext)

    if (isLoggedIn) 
        return <Redirect href='/(app)/home' />

    return <Slot />
}

export default AuthLayout