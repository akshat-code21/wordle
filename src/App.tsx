import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import { useEffect } from 'react'
import Game from './pages/Game'
import Statistics from './pages/Statistics'
import HowToPlay from './pages/HowToPlay'

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/game' element={<Game />} />
          <Route path='/stats' element={<Statistics />} />
          <Route path='/how-to-play' element={<HowToPlay />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
