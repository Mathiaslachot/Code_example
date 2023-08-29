import { Theme } from '@theme'
import { StyleSheet } from 'react-native'

export default ({ colors, fontSize }: Theme) =>
  StyleSheet.create({
    title: {
      fontSize: fontSize.big,
      fontWeight: 'bold',
      color: colors.black,
      textAlign: 'center',
    },
    titleWhite: {
      fontSize: fontSize.big,
      fontWeight: 'bold',
      color: colors.white,
      textAlign: 'center',
    },
    text: {
      fontSize: 16,
      color: colors.black,
    },
    textWhite: {
      fontSize: 16,
      color: colors.white,
    },
    buttonTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.white,
      backgroundColor: 'blue',
      padding: 10,
    },
  })
