import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Text as TextBase, TextProps as TextBaseProps, TextStyle } from 'react-native'
import getStyle from './style'

type TextTypes = 'title' | 'titleWhite' | 'buttonTitle' | 'text'

export interface TextProps extends TextBaseProps {
  type: TextTypes
  style?: TextStyle
}

export const Text = ({ type, style, ...props }: TextProps): React.ReactElement => {
  const theme = useTheme()

  const typeStyles: { [key in TextProps['type']]: TextStyle } = getStyle(theme)

  const mergedStyles: TextStyle = { ...typeStyles[type], ...style }

  return <TextBase style={mergedStyles} {...props} />
}
