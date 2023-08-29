import Mapbox from '@rnmapbox/maps'
import { PositionTripType } from '@utils'
import React from 'react'

export const RouteMap = ({
  name,
  coordinates,
}: {
  name: string
  coordinates: PositionTripType[]
}): React.ReactElement => {
  return (
    <Mapbox.ShapeSource
      id={`${name}Source`}
      shape={{ ...{ type: 'LineString', coordinates: coordinates } }}
    >
      <Mapbox.LineLayer id={`${name}Layer`} style={{ lineColor: '#425FF4', lineWidth: 5 }} />
    </Mapbox.ShapeSource>
  )
}
