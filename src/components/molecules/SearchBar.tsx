import Ionicons from '@expo/vector-icons/Ionicons'
import { useTheme } from '@react-navigation/native'
import { Theme } from '@theme'
import React, { useRef } from 'react'
import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native'
import { Icon } from '../atoms'
import getTextStyle from './../atoms/text/style'

interface SearchBarProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>
  iconLeft?: keyof typeof Ionicons.glyphMap
  onPressIconLeft?: () => void
}

export const SearchBar = ({
  containerStyle,
  iconLeft,
  onPressIconLeft,
  ...props
}: SearchBarProps): React.ReactElement => {
  const theme = useTheme()

  const textInputRef = useRef<TextInput>(null)

  const styles = getStyle(theme)
  const stylesText = getTextStyle(theme)

  const onClear = () => {
    textInputRef.current?.clear()
    props.onChangeText?.('')
  }

  const onPressLeft = () => {
    onPressIconLeft?.()
    textInputRef.current?.blur()
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Icon name={iconLeft || 'search-circle'} onPress={onPressLeft} />
      <TextInput
        {...props}
        ref={textInputRef}
        autoFocus={props.autoFocus}
        returnKeyType="search"
        placeholderTextColor={theme.colors.placeholder}
        autoCorrect={false}
        style={[stylesText.titleWhite, styles.input, props.style]}
      />
      <Icon name="close-circle" onPress={onClear} />
    </View>
  )
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 12,
      paddingHorizontal: theme.spacing.sm,
    },
    input: {
      flex: 1,
      paddingLeft: theme.spacing.lg,
      paddingRight: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      fontSize: theme.fontSize.medium,
      color: theme.colors.purple,
      textAlign: 'left',
    },
  })
