import { Theme } from '@theme'
import { StyleSheet } from 'react-native'

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: theme.spacing.md,
    },
    animatedContainer: {
      flex: 1,
    },
    animatedView: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.background,
    },
    paddingSearchBar: {
      marginHorizontal: theme.spacing.lg,
    },
    disableSearchBar: {
      pointerEvents: 'none',
    },
  })
