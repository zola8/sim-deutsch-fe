import logo from '../assets/logo-1-transparent.png'
import { useTranslation } from 'react-i18next'


export default function HomePage() {
  const { t } = useTranslation()

  return <>

    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-rose-800 mb-4">{t('home.title')}</h1>

      <p className="text-gray-600">{t('home.subtitle')}</p>

      <img src={logo} width="170" alt="" />

    </div>
  </>

}
