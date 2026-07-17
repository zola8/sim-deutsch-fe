import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import huFlag from '../../assets/flags/hu.png'
import enFlag from '../../assets/flags/uk.png'
import translation from '../../assets/langs-transparent.png'


export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('sim_deutsch_lang', lang)
  }

  const languages = [
    { code: 'hu', name: 'Magyar', flag: huFlag },
    { code: 'en', name: 'English', flag: enFlag },
  ]

  const currentLang = languages.find((lang) => lang.code === i18n.language) || languages[0]

  return (
    <div className="flex items-center space-x-2 space-x-reverse">
      <img src={translation} className="w-10 h-10" alt='language chooser' />

      <Menu as="div" className="relative inline-block text-left">

        <MenuButton className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-olive-200 text-olive-700 hover:bg-olive-300 transition shadow-sm">
          <span>{currentLang.name}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </MenuButton>


        <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                <button
                  onClick={() => changeLanguage(lang.code)}
                  className={`group flex items-center w-full px-4 py-2 text-sm gap-3 text-olive-700 data-[focus]:bg-olive-100 data-[focus]:text-olive-900 transition-colors ${i18n.language === lang.code ? 'font-semibold bg-olive-50' : ''
                    }`}
                >
                  <span className="text-xl leading-none">
                    <img src={lang.flag} className="w-5 h-4 rounded-sm object-cover" alt={`${lang.name} flag`} />
                  </span>
                  <span>{lang.name}</span>

                  {/* Show a checkmark for the currently active language */}
                  {i18n.language === lang.code && (
                    <svg className="ml-auto h-4 w-4 text-rose-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </MenuItem>
            ))}
          </div>
        </MenuItems>

      </Menu>

    </div>
  )
}
