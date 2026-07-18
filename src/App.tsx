import { Route, Routes } from 'react-router-dom'
import Layout from './components/menu/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFound'
import ChatPage from './pages/ChatPage'
import RegisterPage from './pages/users/Register'
import LoginPage from './pages/users/Login'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>


  )
}

export default App
