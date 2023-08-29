import { Navigator } from '@navigation'
import { NavigationContainer } from '@react-navigation/native'
import Mapbox from '@rnmapbox/maps'
import { accessToken } from '@services'
import { darkTheme, lightTheme } from '@theme'
import { getCityFromStorage } from '@utils'
import * as SplashScreen from 'expo-splash-screen'
import React, { useCallback, useEffect, useState } from 'react'
import { View, useColorScheme } from 'react-native'
import 'react-native-gesture-handler'

SplashScreen.preventAutoHideAsync().catch(console.warn)

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false)
  const [isAlreadyCityStore, setIsAlreadyCityStore] = useState(false)

  const scheme = useColorScheme()

  useEffect(() => {
    Promise.all([
      Mapbox.setAccessToken(accessToken),
      Mapbox.setTelemetryEnabled(false),
      getCityFromStorage().then((city) => typeof city === 'string' && setIsAlreadyCityStore(true)),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ])
      .then(() => setAppIsReady(true))
      .catch(() => console.warn)
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer theme={scheme === 'dark' ? lightTheme : darkTheme}>
        <Navigator alreadyCityStore={isAlreadyCityStore} />
      </NavigationContainer>
    </View>
  )
}

export default App
