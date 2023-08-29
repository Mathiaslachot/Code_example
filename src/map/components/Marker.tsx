import { useTheme } from '@react-navigation/native'
import Mapbox from '@rnmapbox/maps'
import { Theme } from '@theme'
import { MarkerType } from '@utils'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const uri =
  'https://cdn.sortiraparis.com/images/1001/66131/350528-le-musee-du-louvre-coeur-artistique-et-touristique-de-la-capitale.jpg'

export const Marker = ({ coordinate }: MarkerType): React.ReactElement => {
  const theme = useTheme()

  const styles = getStyle(theme)

  return (
    <Mapbox.MarkerView
      allowOverlap={true}
      key={`key_${coordinate.longitude}_${coordinate.latitude}`}
      coordinate={[coordinate.longitude, coordinate.latitude]}
    >
      <View style={styles.circleContainer}>
        <Image source={{ uri: uri }} style={styles.image} />
      </View>
    </Mapbox.MarkerView>
  )
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    circleContainer: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: theme.colors.purple,
      borderRadius: 20,
    },
    image: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
  })
