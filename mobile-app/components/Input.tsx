import { Colors } from '@/constants/Colors'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

export const Input: React.FC<TextInputProps> = ({ style, ...rest }) => {
  return <TextInput style={[styles.input, style]} {...rest} />
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 24,
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 15,
  },
})
