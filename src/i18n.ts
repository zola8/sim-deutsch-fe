import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import hu from './locales/hu.json'

const savedLanguage = localStorage.getItem('sim_deutsch_lang') || 'hu'


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hu: { translation: hu }
    },
    lng: savedLanguage, // initial language
    fallbackLng: 'hu',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n

// TODO: React Native does not have localStorage!
