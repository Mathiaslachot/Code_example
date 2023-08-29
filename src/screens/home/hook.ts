import { Camera } from '@rnmapbox/maps'
import { MarkerData, MarkerType } from '@utils'
import { useEffect, useRef, useState } from 'react'

interface useHomeProps {
  visibleMarkers: MarkerType[]
  cameraRef: React.RefObject<Camera>
  handleZoomLevelChange: (zoom: number) => void
  onResultSearch: (result: string) => void
}

export const useHome = (): useHomeProps => {
  const [zoomLevel, setZoomLevel] = useState(10)
  const [visibleMarkers, setVisibleMarkers] = useState<MarkerType[]>([])

  const cameraRef = useRef<Camera>(null)

  const handleZoomLevelChange = (zoom: number) => {
    const newZoomLevel = Math.round(zoom)
    if (zoomLevel !== zoom) {
      const markers = MarkerData.filter(({ minimumZoom }) => minimumZoom <= newZoomLevel)

      setVisibleMarkers(markers)
      setZoomLevel(newZoomLevel)
    }
  }

  const onResultSearch = (result: string) => {
    console.log(result)
  }

  useEffect(() => {
    cameraRef.current?.moveTo([-73.563166, 45.517487])
  }, [])

  return {
    visibleMarkers,
    cameraRef,
    handleZoomLevelChange,
    onResultSearch,
  }
}
