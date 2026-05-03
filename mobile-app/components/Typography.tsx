import { Colors } from '@/constants/Colors'
import { StyleSheet, Text, TextProps } from 'react-native'

type TextVariant = 'title' | 'body' | 'small' | 'link'

interface TypographyProps extends TextProps {
  variant?: TextVariant
  centered?: boolean
  children: React.ReactNode
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  centered,
  children,
  style,
  ...rest
}) => {
  return (
    <Text
      style={[styles.base, styles[variant], centered && styles.centered, style]}
      {...rest}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System',
  },
  centered: {
    textAlign: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: 'black',
  },
  link: {
    fontSize: 14,
    color: Colors.blue,
    fontWeight: '600',
  },
  small: {
    fontSize: 14,
    color: Colors.gray,
  },
})
