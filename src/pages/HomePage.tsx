import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'


export default function HomePage() {
  const { t } = useTranslation()

  return <>

    <div className="bg-blue-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-rose-800 mb-4">{t('home.title')}</h1>

      <p className="text-gray-600">{t('home.subtitle')}</p>

      <p className='mt-10 mb-5 font-bold'>You can do:</p>
      
      <Link to="/register" className="mb-3">Sign up</Link>
      <Link to="/login" className="mb-3">Login</Link>


    </div>
  </>

}
