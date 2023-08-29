import { useTheme } from '@react-navigation/native'
import Mapbox from '@rnmapbox/maps'
import { Theme } from '@theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Polygon, Svg } from 'react-native-svg'

export const UserLocationMarker = ({
  location,
  currentRotation,
}: {
  location: Mapbox.Location
  currentRotation: number
}): React.ReactElement => {
  const theme = useTheme()

  const styles = getStyle(theme)

  const size = 15
  const points = `0,${size} ${size / 2},0 ${size},${size}`

  const heading = location.coords?.heading || 0

  return (
    <Mapbox.MarkerView
      allowOverlap={true}
      coordinate={[location.coords.longitude, location.coords.latitude]}
    >
      <View style={[styles.dot, { transform: [{ rotateZ: `${heading - currentRotation}deg` }] }]}>
        <View style={styles.whiteCircle}>
          <View style={styles.purpleCircle} />
        </View>
        <Svg width={size} height={size} style={styles.triangle}>
          <Polygon points={points} fill={theme.colors.purple} />
        </Svg>
        <View style={styles.opacityCircle} />
      </View>
    </Mapbox.MarkerView>
  )
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    dot: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    opacityCircle: {
      ...StyleSheet.absoluteFillObject,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.purple,
      opacity: 0.1,
    },
    whiteCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    purpleCircle: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: theme.colors.purple,
    },
    triangle: {
      position: 'absolute',
      top: 0,
    },
  })
