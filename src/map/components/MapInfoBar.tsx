import { Icon } from '@components'
import { useTheme } from '@react-navigation/native'
import { Theme } from '@theme'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const MapInfoBar = (): React.ReactElement => {
  const theme = useTheme()

  const styles = getStyle(theme)

  return (
    <View style={styles.bottomBar}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon name="walk-outline" size={30} color={theme.colors.purple} />
        </View>
        <View>
          <Text style={styles.value}>12.04 km</Text>
          <Text style={styles.type}>Distance</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon name="time-outline" size={30} color={theme.colors.purple} />
        </View>
        <View>
          <Text style={styles.value}>30:12min</Text>
          <Text style={styles.type}>Temps</Text>
        </View>
      </View>
    </View>
  )
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.colors.white,
      width: '100%',
      height: 140,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      flexDirection: 'row',
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      backgroundColor: theme.colors.background,
      borderRadius: 15,
      padding: 12,
      marginRight: 10,
    },
    value: {
      fontWeight: 'bold',
      marginBottom: 4,
    },
    type: {
      fontWeight: '600',
      color: 'grey',
    },
  })
