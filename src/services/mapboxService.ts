import polyline from '@mapbox/polyline'
import Mapbox from '@rnmapbox/maps'
import { TripType } from '@utils'

interface DirectionsMatrixResponse {
  destinations: {
    distance: number
    location: [number, number]
    name: string
  }[]
}

interface DirectionsGeometryResponse {
  routes: {
    geometry: string
  }[]
}

export const accessToken = 'pk.example'

export const createRouteToTrip = async (
  location: Mapbox.Location,
  trip: TripType,
): Promise<[number, number][] | undefined> => {
  const nearestPointToTrip = await findNearestPointToTrip(location, trip)
  const route = generateRoute(location, nearestPointToTrip)

  return route
}

const findNearestPointToTrip = async (
  location: Mapbox.Location,
  trip: TripType,
): Promise<[number, number] | undefined> => {
  const baseUrl = 'https://api.mapbox.com/directions-matrix/v1/mapbox/walking/'

  const interval = Math.ceil(trip.coordinates.length / 25)

  const filterTripCoordsMax = trip.coordinates.filter((_, index) => index % interval === 0)

  const coordinates = [
    [location.coords.longitude, location.coords.latitude],
    ...filterTripCoordsMax,
  ]

  const source = '0'
  const destinations = Array.from({ length: filterTripCoordsMax.length }, (_, index) =>
    (index + 1).toString(),
  ).join(';')

  const url = `${baseUrl}${coordinates.join(
    ';',
  )}?sources=${source}&destinations=${destinations}&access_token=${accessToken}`

  try {
    const response = await fetch(url)
    if (response.ok) {
      const data = (await response.json()) as DirectionsMatrixResponse

      const shortestDestination = data.destinations.reduce(
        (minDistanceRoute, currentDestination) =>
          currentDestination.distance < minDistanceRoute.distance
            ? currentDestination
            : minDistanceRoute,
      )

      return shortestDestination.location
    } else {
      console.error('Erreur de requête:', response.status)
      return undefined
    }
  } catch (error) {
    console.error('Erreur:', error)
    return undefined
  }
}

const generateRoute = async (
  location: Mapbox.Location,
  locationDestination: [number, number] | undefined,
): Promise<[number, number][] | undefined> => {
  const profile = 'mapbox/walking'
  const startCoordinates = `${location.coords.longitude},${location.coords.latitude}`
  const endCoordinates = locationDestination?.join(',')

  const url = `https://api.mapbox.com/directions/v5/${profile}/${startCoordinates};${endCoordinates}?access_token=${accessToken}`

  try {
    const response = await fetch(url)
    if (response.ok) {
      const data = (await response.json()) as DirectionsGeometryResponse

      const decodedGeometry = polyline.decode(data.routes[0].geometry)
      const invertedCoordinates: [number, number][] = decodedGeometry.map((coord) => [
        coord[1],
        coord[0],
      ])

      return invertedCoordinates
    } else {
      console.error('Erreur de requête:', response.status)
      return undefined
    }
  } catch (error) {
    console.error('Erreur:', error)
    return undefined
  }
}
