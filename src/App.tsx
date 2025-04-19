import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import { useEffect } from 'react'
import Game from './pages/Game'
import Statistics from './pages/Statistics'
import HowToPlay from './pages/HowToPlay'
import WordHistory from './pages/WordHistory'
import Profile from './pages/Profile'
import { UserProvider } from './store/UserContext'
import { StatisticsProvider } from './store/StatisticsContext'
import { WordHistoryProvider } from './store/WordHistoryContext'

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <>
      <UserProvider>
        <StatisticsProvider>
          <WordHistoryProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/game' element={<Game />} />
                <Route path='/stats' element={<Statistics />} />
                <Route path='/how-to-play' element={<HowToPlay />} />
                <Route path='/word-history' element={<WordHistory />} />
                <Route path='/profile' element={<Profile />} />
              </Routes>
            </BrowserRouter>
          </WordHistoryProvider>
        </StatisticsProvider>
      </UserProvider>
    </>
  )
}

export default App
