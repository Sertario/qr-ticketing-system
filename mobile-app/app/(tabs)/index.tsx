import { Colors } from '@/constants/Colors'
import { api } from '@/utils/api'
import { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import * as Haptics from 'expo-haptics'
import { Typography } from '@/components/Typography'

const HomeScreen: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState(false)
  const [action, setAction] = useState<'ENTRY' | 'EXIT'>('ENTRY')
  const [isReady, setIsReady] = useState(false)

  const isProcessing = useRef(false)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

  useEffect(() => {
    if (!permission) {
      requestPermission()
    }

    const timer = setTimeout(() => setIsReady(true), 1500)
    return () => clearTimeout(timer)
  }, [permission])

  if (!permission) return <View />
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Typography variant="body" centered>
          We need camera permission
        </Typography>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (!isReady || isProcessing.current) return

    if (!uuidRegex.test(data)) {
      return
    }

    isProcessing.current = true
    setScanned(true)

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

    try {
      const response = await api.post('/tickets/scan', null, {
        params: { ticketId: data, action: action },
      })

      Alert.alert('Ticket verified', response.data, [
        {
          text: 'OK',
          onPress: () => {
            isProcessing.current = false
            setScanned(false)
          },
        },
      ])
    } catch (error: any) {
      const errorMsg = error.response?.data || 'Scan failed'

      Alert.alert('Error', errorMsg, [
        {
          text: 'Try Again',
          onPress: () => {
            isProcessing.current = false
            setScanned(false)
          },
        },
      ])
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, action === 'ENTRY' && styles.activeAction]}
          onPress={() => setAction('ENTRY')}
        >
          <Text style={[styles.actionText, action === 'ENTRY' && { color: Colors.white }]}>
            ENTRY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, action === 'EXIT' && styles.activeAction]}
          onPress={() => setAction('EXIT')}
        >
          <Text style={[styles.actionText, action === 'EXIT' && { color: Colors.white }]}>
            EXIT
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cameraWrapper}>
        <CameraView
          style={styles.camera}
          zoom={0.35}
          onBarcodeScanned={scanned || !isReady ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        >
          <View style={styles.overlay}>
            <View
              style={[
                styles.scanFrame,
                scanned && { borderColor: Colors.success },
                !isReady && { borderColor: Colors.gray, opacity: 0.5 },
              ]}
            >
              {!isReady && <Text style={styles.loadingText}>Initializing...</Text>}
            </View>
          </View>
        </CameraView>
      </View>

      <View style={styles.footer}>
        <Typography variant="small">Position QR code inside the frame</Typography>
        <Typography variant="body" style={{ fontWeight: 'bold', color: Colors.blue }}>
          Mode: {action}
        </Typography>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  cameraWrapper: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: Colors.dark,
  },
  camera: { flex: 1 },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: Colors.white,
  },
  actionButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.blue,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  activeAction: { backgroundColor: Colors.blue },
  actionText: { fontWeight: 'bold', color: Colors.blue },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: { color: Colors.white, fontSize: 12 },
  footer: { padding: 25, backgroundColor: Colors.white, alignItems: 'center', gap: 5 },
  button: { backgroundColor: Colors.blue, padding: 15, borderRadius: 10 },
  buttonText: { color: Colors.white, fontWeight: 'bold' },
})

export default HomeScreen
