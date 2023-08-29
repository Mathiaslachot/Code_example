import { SearchBar } from '@components'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSearchWithModal } from './hook'
import getStyle from './style'

export const SearchWithModal = ({
  children,
  addPaddingHorizontal,
  styleContainer,
  onResultSearch,
}: {
  children: React.ReactNode
  addPaddingHorizontal?: boolean
  styleContainer?: ViewStyle
  onResultSearch: (result: string) => void
}): React.ReactElement => {
  const theme = useTheme()

  const styles = getStyle(theme)

  const { isOpen, animatedStyles, openModal, closeModal } = useSearchWithModal()

  return (
    <View style={[styleContainer, styles.container]}>
      <SearchBar
        {...{
          containerStyle: [addPaddingHorizontal && styles.paddingSearchBar],
          placeholder: 'Search for anything',
          iconLeft: isOpen ? 'arrow-back-circle' : undefined,
          onPressIconLeft: closeModal,
          onFocus: isOpen ? undefined : openModal,
          onBlur: isOpen ? closeModal : undefined,
          onSubmitEditing: ({ nativeEvent }) => {
            onResultSearch(nativeEvent.text)
            closeModal()
          },
        }}
      />
      <View style={styles.animatedContainer}>
        {children}
        <Animated.View style={[styles.animatedView, animatedStyles]}>
          {/* complete modal */}
        </Animated.View>
      </View>
    </View>
  )
}
