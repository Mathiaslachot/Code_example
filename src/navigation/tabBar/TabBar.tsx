import { Icon } from '@components'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useTheme } from '@react-navigation/native'
import { Theme } from '@theme'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const theme = useTheme()

  const styles = getStyle(theme)

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const { tabBarIcon } = options

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name, { merge: true })
          }
        }

        const tabBarIconProps = {
          focused: isFocused,
          color: theme.colors.purple,
          size: theme.fontSize.largePlus,
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={[styles.tabBarItem]}
          >
            {tabBarIcon ? (
              tabBarIcon(tabBarIconProps)
            ) : (
              <View
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                style={styles.buttonContainer}
              >
                <TouchableOpacity onPress={onPress} style={styles.button}>
                  <Icon name="map" color={theme.colors.background} />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    tabBarContainer: {
      flexDirection: 'row',
      borderTopWidth: 2,
      borderColor: theme.colors.white,
    },
    tabBarItem: {
      flex: 1,
      paddingVertical: 20,
      alignItems: 'center',
    },
    buttonContainer: {
      flex: 1,
      paddingVertical: 20,
      alignItems: 'center',
    },
    button: {
      position: 'absolute',
      width: 60,
      height: 60,
      borderRadius: 15,
      backgroundColor: theme.colors.purple,
      bottom: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
