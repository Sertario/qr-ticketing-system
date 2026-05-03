import { Colors } from '@/constants/Colors'
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native'

type ButtonProps = {
  onPress: () => void
  text: string
  style?: ViewStyle
}

export const Button: React.FC<ButtonProps> = ({ onPress, text, style }) => (
  <Pressable
    style={({ pressed }) => [styles.button, style, pressed && styles.buttonPressed]}
    onPress={onPress}
  >
    <Text style={styles.text}>{text}</Text>
  </Pressable>
)

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    borderRadius: 26,
  },
  buttonPressed: {
    backgroundColor: Colors.sky,
  },
  text: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: '600',
  },
})
