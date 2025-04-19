import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { StatisticsProvider } from './store/StatisticsContext.tsx'
import { WordHistoryProvider } from './store/WordHistoryContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StatisticsProvider>
      <WordHistoryProvider>
        <App />
      </WordHistoryProvider>
    </StatisticsProvider>
  </React.StrictMode>,
)
