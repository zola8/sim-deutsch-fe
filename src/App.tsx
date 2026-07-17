import { Route, Routes } from 'react-router-dom'
import Layout from './components/menu/Layout'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFound'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>


  )
}

export default App
