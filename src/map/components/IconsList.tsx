import { Icon } from '@components'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface IconsMapProps {
  showIcons?: boolean
  showMapInfoBar?: boolean
  centerUser: () => void
  setLockCamera: (value: React.SetStateAction<boolean>) => void
}
export const IconsList = ({
  showIcons,
  showMapInfoBar,
  centerUser,
  setLockCamera,
}: IconsMapProps): React.ReactElement => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, showMapInfoBar && styles.paddingInfoBar]}>
      {showIcons && (
        <Icon
          onPress={() => setLockCamera((prevValue) => !prevValue)}
          name="lock-closed-outline"
          size={40}
          color={colors.purple}
        />
      )}
      <Icon
        onPress={centerUser}
        name="eye-outline"
        size={40}
        color={colors.purple}
        style={styles.icon}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    bottom: 50,
    justifyContent: 'center',
  },
  paddingInfoBar: {
    bottom: 150,
  },
  icon: {
    paddingTop: 20,
  },
})
