/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createIntl, createIntlCache } from '@formatjs/intl'
import { I18nManager } from 'react-native'
import * as RNLocalize from 'react-native-localize'

type Messages = {
  [key: string]: string
}

const translations: { [key: string]: Messages } = {
  en: require('./en.json'),
  fr: require('./fr.json'),
} as const

type Translation = keyof typeof translations

const fallback = { languageTag: 'en', isRTL: false }

const { languageTag, isRTL } = RNLocalize.findBestLanguageTag(Object.keys(translations)) ?? fallback

// update layout direction
I18nManager.forceRTL(isRTL)

const intl = createIntl(
  {
    defaultLocale: 'en',
    locale: languageTag,
    messages: translations[languageTag as Translation],
  },
  createIntlCache(),
)

type TranslationParams = Parameters<(typeof intl)['formatMessage']>[1]

export const translate = (key: string, params?: TranslationParams) =>
  intl.formatMessage({ id: key, defaultMessage: translations['en'][key] }, params).toString()
