import { getCityFromStorage } from '@utils'
import { useEffect, useState } from 'react'

type CityStorageHook = {
  city: string | null | undefined
}

export const useCityStorage = (): CityStorageHook => {
  const [city, setCity] = useState<string | null | undefined>(null)

  useEffect(() => {
    async function getCity() {
      await getCityFromStorage().then((city) => setCity(city))
    }
    getCity().catch(console.warn)
  }, [])

  return {
    city,
  }
}
