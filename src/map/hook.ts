import { useNavigation } from '@react-navigation/native'
import Mapbox from '@rnmapbox/maps'
import { createRouteToTrip } from '@services'
import { PositionTripType, TripType } from '@utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'

interface useMapViewProps {
  location: Mapbox.Location | undefined
  cameraRef: React.RefObject<Mapbox.Camera>
  currentRotation: number
  routeToTrip: PositionTripType[] | undefined
  centerUser: () => void
  handleGoBack: () => void
  setLocation: (value: React.SetStateAction<Mapbox.Location | undefined>) => void
  setCurrentRotation: React.Dispatch<React.SetStateAction<number>>
  setLockCamera: React.Dispatch<React.SetStateAction<boolean>>
}

export const useMapView = (trip: TripType | undefined): useMapViewProps => {
  const [location, setLocation] = useState<Mapbox.Location>()

  const [routeToTrip, setRouteToTrip] = useState<PositionTripType[] | undefined>()

  const [currentRotation, setCurrentRotation] = useState<number>(0)

  const [lockCamera, setLockCamera] = useState(false)

  const cameraRef = useRef<Mapbox.Camera>(null)

  const navigation = useNavigation()

  const handleGoBack = () => navigation.goBack()

  useEffect(() => {
    Platform.OS === 'android' && Mapbox.requestAndroidLocationPermissions().catch(console.warn)
  }, [])

  useEffect(() => {
    lockCamera && cameraRef.current?.setCamera({ heading: location?.coords.heading })
  }, [lockCamera, location?.coords.heading])

  const fetchRouteToTrip = useCallback(async () => {
    if (location && trip) {
      try {
        const route = await createRouteToTrip(location, trip)
        setRouteToTrip(route)
      } catch (error) {
        console.error("Erreur lors de la création de l'itinéraire", error)
      }
    }
  }, [])

  useEffect(() => {
    fetchRouteToTrip().catch(console.warn)
  }, [fetchRouteToTrip])

  const centerUser = () => {
    if (location?.coords) {
      cameraRef.current?.setCamera({
        centerCoordinate: [location?.coords.longitude, location?.coords.latitude],
        zoomLevel: 17,
        animationDuration: 1500,
        heading: location.coords.heading,
      })
    }
  }

  return {
    location,
    cameraRef,
    currentRotation,
    routeToTrip,
    centerUser,
    handleGoBack,
    setLocation,
    setCurrentRotation,
    setLockCamera,
  }
}
