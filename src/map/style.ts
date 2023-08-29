import { StyleSheet } from 'react-native'

export default () =>
  StyleSheet.create({
    containerMap: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    backArrow: {
      position: 'absolute',
      top: 20,
      left: 20,
    },
    backArrowMap: {
      position: 'absolute',
      bottom: 160,
      right: 20,
    },
    lock: {
      position: 'absolute',
      bottom: 280,
      right: 20,
    },
    destination: {
      position: 'absolute',
      bottom: 220,
      right: 20,
    },
  })
