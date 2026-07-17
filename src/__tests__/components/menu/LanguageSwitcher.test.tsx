import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import LanguageSwitcher from '../../../components/menu/LanguageSwitcher'


const mockChangeLanguage = vi.fn(() => Promise.resolve())

const mockSetItem = vi.spyOn(Storage.prototype, 'setItem')


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'hu',
      changeLanguage: mockChangeLanguage,
    },
  }),
}))


describe('LanguageSwitcher', () => {

  beforeEach(() => {
    mockChangeLanguage.mockClear()
    mockSetItem.mockClear()
  })

  it('opens the dropdown and shows language options when clicked', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    await user.click(screen.getByRole('button', { name: /^Magyar$/i }))

    const items = screen.getAllByRole('menuitem')
    expect(items).toHaveLength(2)

    await user.click(items[1])
    expect(mockChangeLanguage).toHaveBeenCalledWith('en')
  })


  it('stores the selected language in localStorage', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    await user.click(screen.getByRole('button', { name: /^Magyar$/i }))
    await user.click(screen.getAllByRole('menuitem')[1])

    expect(mockSetItem).toHaveBeenCalledWith('sim_deutsch_lang', 'en')
  })

})
