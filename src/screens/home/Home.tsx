import { Screen } from '@components'
import { MapView } from '@map'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import { useHome } from './hook'
import getStyle from './style'

export const Home = (): React.ReactElement => {
  const { visibleMarkers, cameraRef, handleZoomLevelChange, onResultSearch } = useHome()

  const theme = useTheme()

  const styles = getStyle(theme)

  return (
    <Screen style={styles.container} searchBar onResultSearch={onResultSearch}>
      <MapView
        {...{
          visibleMarkers,
          cameraRef,
          handleZoomLevelChange,
          styleContainer: styles.mapViewContainer,
        }}
        activeUserLocation
      />
    </Screen>
  )
}
