import Ionicons from '@expo/vector-icons/Ionicons'
import { useTheme } from '@react-navigation/native'
import React from 'react'

export const Icon = (props: React.ComponentProps<typeof Ionicons>): React.ReactElement => {
  const { colors, fontSize } = useTheme()
  return <Ionicons size={fontSize.big} color={colors.purple} suppressHighlighting {...props} />
}
