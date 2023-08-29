import { useState } from 'react'
import { ViewStyle } from 'react-native'
import {
  AnimatedStyleProp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface useSearchWithModal {
  isOpen: boolean
  animatedStyles: AnimatedStyleProp<ViewStyle>
  openModal: () => void
  closeModal: () => void
}

export const useSearchWithModal = (): useSearchWithModal => {
  const [isOpen, setIsOpen] = useState(false)

  const opacity = useSharedValue(0)
  const zIndex = useSharedValue(-1)

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    zIndex: zIndex.value,
  }))

  const openModal = () => {
    setIsOpen(true)

    zIndex.value = 0
    opacity.value = withTiming(1, { duration: 150 })
  }

  const closeModal = () => {
    setIsOpen(false)

    opacity.value = withTiming(0, { duration: 150 }, () => {
      zIndex.value = -1
    })
  }

  return {
    isOpen,
    animatedStyles,
    openModal,
    closeModal,
  }
}
