import { Icon } from '@components'
import { useTheme } from '@react-navigation/native'
import Mapbox from '@rnmapbox/maps'
import { MarkerType, TripType } from '@utils'
import React, { useMemo } from 'react'
import { View, ViewStyle } from 'react-native'
import { IconsList, MapInfoBar, Marker, RouteMap, UserLocationMarker } from './components'
import { useMapView } from './hook'
import getStyle from './style'

interface MapViewProps {
  visibleMarkers?: MarkerType[]
  route?: TripType
  activeUserLocation?: boolean
  backIcon?: boolean
  showIcons?: boolean
  showMapInfoBar?: boolean
  styleContainer?: ViewStyle
  handleZoomLevelChange?: (zoom: number) => void
}

export const MapView = ({
  visibleMarkers,
  route,
  activeUserLocation,
  backIcon,
  showIcons,
  showMapInfoBar,
  styleContainer,
  handleZoomLevelChange,
}: MapViewProps): React.ReactElement => {
  const {
    location,
    cameraRef,
    currentRotation,
    routeToTrip,
    centerUser,
    handleGoBack,
    setLocation,
    setCurrentRotation,
    setLockCamera,
  } = useMapView(route)

  const styles = getStyle()

  const { colors } = useTheme()

  const renderMarkers = useMemo(() => {
    return visibleMarkers?.map((marker) => (
      <Marker
        key={`key_${marker?.coordinate?.longitude}_${marker?.coordinate?.latitude}`}
        {...marker}
      />
    ))
  }, [visibleMarkers])

  return (
    <View style={[styles.containerMap, styleContainer]}>
      <Mapbox.MapView
        styleURL="mapbox://styles/mathiaslachot/cljp9d9s100ix01qve35id9f7"
        style={styles.map}
        onDidFinishLoadingMap={centerUser}
        onMapIdle={(e) => {
          handleZoomLevelChange?.(e.properties.zoom)
        }}
        onCameraChanged={({ properties }) => {
          location && setCurrentRotation(properties.heading)
        }}
        scaleBarEnabled={false}
      >
        <Mapbox.Camera ref={cameraRef} />

        {routeToTrip && <RouteMap name="RouteToTrip" coordinates={routeToTrip} />}

        {activeUserLocation && (
          <Mapbox.UserLocation onUpdate={setLocation} minDisplacement={2} requestsAlwaysUse>
            {location && <UserLocationMarker {...{ location, currentRotation }} />}
          </Mapbox.UserLocation>
        )}

        {route && <RouteMap name="Route" coordinates={route.coordinates} />}

        {renderMarkers}
      </Mapbox.MapView>

      {showMapInfoBar && <MapInfoBar />}

      {backIcon && (
        <Icon
          onPress={handleGoBack}
          name="arrow-back-circle"
          size={40}
          color={colors.purple}
          style={styles.backArrow}
        />
      )}

      <IconsList
        {...{
          showIcons,
          showMapInfoBar,
          centerUser,
          setLockCamera,
        }}
      />
    </View>
  )
}
