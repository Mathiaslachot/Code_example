import { ImageData } from '@components'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack'
import {  Map, Onboarding } from '@screens'
import React from 'react'
import { TabNavigator } from './tabBar'

export type ScreenProps<RouteName extends keyof RootStackParamList> = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, RouteName>,
    StackNavigationProp<RootStackParamList, keyof RootStackParamList>
  >
  route: RouteProp<RootStackParamList, RouteName>
}

export type RootStackParamList = {
  Onboarding: undefined
  Main: undefined
  ModalDetail: { image: ImageData }
  MapNavigation: undefined
}

const RootStack = createStackNavigator<RootStackParamList>()

export const Navigator = ({ alreadyCityStore }: { alreadyCityStore?: boolean }) => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={alreadyCityStore ? 'Main' : 'Onboarding'}
    >
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Onboarding" component={Onboarding} />
      </RootStack.Group>

      <RootStack.Screen name="Main" component={TabNavigator} />
    </RootStack.Navigator>
  )
}
