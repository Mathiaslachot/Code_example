import { Theme } from '@theme'
import { StyleSheet } from 'react-native'

export default (theme: Theme) =>
  StyleSheet.create({
    next: {
      position: 'absolute',
      bottom: 200,
      zIndex: 100,
      backgroundColor: theme.colors.purple,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      padding: theme.spacing.sm,
      borderRadius: theme.border.thick,
    },
  })
