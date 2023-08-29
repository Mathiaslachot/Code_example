import AsyncStorage from '@react-native-async-storage/async-storage'

export const getCityFromStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('city')
    return value
  } catch (e) {
    console.log(e)
  }
}

export const storeCityToStorage = async (newCity: string) => {
  try {
    await AsyncStorage.setItem('city', newCity)
  } catch (e) {
    console.log(e)
  }
}
