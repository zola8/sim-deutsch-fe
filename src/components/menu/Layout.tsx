import { Link, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import LanguageSwitcher from './LanguageSwitcher'
import logo from '../../assets/logo-1-transparent.png'


interface NavItem {
  path: string
  labelKey: string
}

const navConfig: NavItem[] = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/chat', labelKey: 'nav.chat' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/register', labelKey: 'nav.sign_up' },
]



export default function Layout() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col bg-olive-50">

      <Disclosure as="nav" className="bg-olive-200 shadow-sm border-b border-olive-300 sticky top-0 z-20">
        {({ open }) => (
          <>
            <div className="max-w-8/10 mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">

                {/* Logo */}
                <Link
                  to="/"
                  className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-olive-600 hover:text-olive-800 transition-colors"
                >
                  <img src={logo} width="40" height="40" alt="" className="shrink-0" />
                  Sim-Deutsch
                </Link>

                {/* Desktop Menu (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-1">
                  {navConfig.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="px-4 py-2 rounded-lg text-gray-600 hover:text-olive-600 hover:bg-olive-50 font-medium transition-all duration-200"
                    >
                      {t(item.labelKey)}
                    </Link>
                  ))}
                  <div className="ml-2 pl-2 border-l border-olive-300">
                    <LanguageSwitcher />
                  </div>
                </div>

                {/* Mobile Hamburger Button (Visible only on mobile) */}
                <div className="md:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-olive-600 hover:bg-olive-50 focus:outline-none focus:ring-2 focus:ring-olive-500 transition-colors">
                    <span className="sr-only">Open main menu</span>

                    {/* Toggle Icon based on Headless UI 'open' state */}
                    {open ? (
                      // Close (X) Icon
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      // Hamburger Icon
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>

            {/* Mobile Menu Dropdown Panel */}
            <DisclosurePanel className="md:hidden border-t border-gray-100 bg-white">
              <div className="px-4 pt-2 pb-4 space-y-1">
                {navConfig.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-3 rounded-lg text-gray-600 hover:text-olive-600 hover:bg-olive-50 font-medium transition-colors"
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
                <div className="pt-3 mt-2 border-t border-olive-300">
                  <LanguageSwitcher />
                </div>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      {/* Main Content */}
      <main className="flex-grow max-w-8/10 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-olive-200 border-t border-olive-300 py-6 text-center text-gray-500 text-sm">
        © 2026 Akármi App
      </footer>
    </div>
  )
}
