import { SearchWithModal } from '@components'
import { useTheme } from '@react-navigation/native'
import { Theme } from '@theme'
import { StatusBar } from 'expo-status-bar'
import React, { ReactNode } from 'react'
import {
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import { Edges, SafeAreaView } from 'react-native-safe-area-context'

export const Screen = ({
  children,
  searchBar,
  imageBackground,
  style,
  paddingHorizontal,
  lightStatusBar,
  disableTopArea = false,
  onResultSearch,
}: {
  children: ReactNode
  searchBar?: boolean
  imageBackground?: ImageSourcePropType
  style?: ViewStyle
  disableTopArea?: boolean
  paddingHorizontal?: boolean
  lightStatusBar?: boolean
  onResultSearch?: (result: string) => void
}): React.ReactElement => {
  const theme = useTheme()

  const styles = getStyle(theme)

  const edges: Edges = !disableTopArea ? ['right', 'left', 'top'] : ['right', 'left']

  return (
    <SafeAreaView style={styles.container} edges={edges}>
      <StatusBar style={lightStatusBar ? 'light' : 'dark'} />
      {imageBackground ? (
        <ImageBackground
          source={imageBackground}
          style={[styles.imageBackground, paddingHorizontal && styles.padding, style]}
        >
          {children}
        </ImageBackground>
      ) : (
        <ScrollView
          contentContainerStyle={[paddingHorizontal && styles.padding, style]}
          bounces={false}
        >
          {searchBar && onResultSearch ? (
            <SearchWithModal
              onResultSearch={onResultSearch}
              addPaddingHorizontal={!paddingHorizontal}
            >
              {children}
            </SearchWithModal>
          ) : (
            children
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    imageBackground: {
      flex: 1,
    },
    padding: {
      paddingHorizontal: theme.spacing.lg,
    },
  })
