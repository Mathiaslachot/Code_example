import { Screen, SearchBar, Text } from '@components'
import { ScreenProps } from '@navigation'
import { useTheme } from '@react-navigation/native'
import { Theme } from '@theme'
import { storeCityToStorage } from '@utils'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

export const Onboarding: React.FC<ScreenProps<'Onboarding'>> = ({
  navigation,
}): React.ReactElement => {
  const [search, setSearch] = useState('')

  const theme = useTheme()

  const styles = getStyle(theme)

  const goNext = async () => {
    const city = search.trim()
    if (city !== '') {
      await storeCityToStorage(city)
      navigation.navigate('Main')
    }
  }

  return (
    <Screen
      paddingHorizontal
      disableTopArea
      lightStatusBar
      style={styles.container}
      imageBackground={{
        uri: 'https://i.pinimg.com/originals/66/65/36/666536bca78ac9df88441afef4b1d483.jpg',
      }}
    >
      <SearchBar
        {...{ search, onChangeText: setSearch, placeholder: 'ex: Paris', onSubmitEditing: goNext }}
      />

      <Text type="titleWhite" style={styles.title}>
        Explorer votre ville
      </Text>
    </Screen>
  )
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    title: {
      marginTop: theme.spacing.xxxl,
    },
  })
