import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)

    localStorage.setItem('akarmi_app_language', lang)
  }

  return (
    <div className="flex items-center space-x-2 space-x-reverse">
      <span className="text-sm text-olive-600">{t('ui.language')}:</span>
      <button
        onClick={() => changeLanguage('hu')}
        className={`px-2 py-1 text-sm rounded transition ${i18n.language === 'hu' ? 'bg-rose-600 text-white' : 'bg-olive-200 text-olive-700 hover:bg-olive-300'}`}
      >
        HU
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 text-sm rounded transition ${i18n.language === 'en' ? 'bg-rose-600 text-white' : 'bg-olive-200 text-olive-700 hover:bg-olive-300'}`}
      >
        EN
      </button>
    </div>
  )
}
