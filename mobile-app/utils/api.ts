import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use(async config => {
  const token = await SecureStore.getItemAsync('userToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
