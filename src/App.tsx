import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import { useEffect } from 'react'
import Game from './pages/Game'

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
          <Route path='/how-to-play' element={<div className="h-screen flex items-center justify-center"><h1 className="text-2xl">How To Play Coming Soon</h1></div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
