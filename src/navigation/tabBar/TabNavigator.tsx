import { Icon } from '@components'
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Home, MapTrip } from '@screens'
import React from 'react'
import { RootStackParamList } from '../Navigator'
import { TabBar } from './TabBar'

export type TabScreenProps<RouteName extends keyof RootTabParamList> = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, RouteName>,
    StackNavigationProp<RootStackParamList>
  >
}

type RootTabParamList = {
  Home: undefined
  MapTrip: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()

export const TabNavigator = () => {
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name={focused ? 'home-sharp' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="MapTrip"
        component={MapTrip}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name={focused ? 'book-sharp' : 'book-outline'} size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen name="Map" component={Map} />

      <Tab.Screen
        name="MapTrip"
        component={MapTrip}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'settings-sharp' : 'settings-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MapTrip"
        component={MapTrip}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'settings-sharp' : 'settings-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
