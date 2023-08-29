import { Screen } from '@components'
import { MapView } from '@map'
import { TripData } from '@utils'
import React from 'react'
import { StyleSheet } from 'react-native'

export const MapTrip = (): React.ReactElement => {
  const testRoute = TripData[0]

  return (
    <Screen style={styles.container}>
      <MapView activeUserLocation route={testRoute} backIcon showIcons showMapInfoBar />
    </Screen>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})