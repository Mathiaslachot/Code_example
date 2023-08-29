import { PositionTripType } from './mapTypes'

export const getDistanceOfPoints = (pointA: PositionTripType, pointB: PositionTripType) => {
  const R = 6371000 // Rayon de la Terre en mètres
  const dLat = toRadians(pointB[0] - pointA[0])
  const dLon = toRadians(pointB[1] - pointA[1])
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(pointB[0])) *
      Math.cos(toRadians(pointB[0])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

const toRadians = (degrees: number) => {
  return degrees * (Math.PI / 180)
}
