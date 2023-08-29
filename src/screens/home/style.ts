import { Theme } from '@theme'
import { StyleSheet } from 'react-native'

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    searchBar: {
      marginVertical: theme.spacing.xl,
    },
    mapViewContainer: {
      paddingTop: theme.spacing.lg,
    },
  })
