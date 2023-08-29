export type MarkerType = {
  coordinate: {
    latitude: number
    longitude: number
  }
  markerColor: string
  minimumZoom: number
}

export type CityType = {
  coordinate: {
    latitude: number
    longitude: number
  }
  name: string
}

export type PositionTripType = number[]

export type TripType = {
  name: string
  coordinates: PositionTripType[]
}
