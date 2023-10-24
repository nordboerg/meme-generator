import React, { useMemo, useState, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CircularProgress from '@mui/material/CircularProgress'
import { MemeContext } from './context/MemeContext'
import { MemeTemplate } from './interfaces/Meme'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import './App.css'

const Editor = lazy(() => import('./pages/Editor/Editor'))
const queryClient = new QueryClient()

function App() {
  const [selectedMemeTemplate, setSelectedMeme] = useState<MemeTemplate | null>(null)

  const memoizedValue = useMemo(
    () => ({ selectedMemeTemplate, setSelectedMeme }),
    [selectedMemeTemplate],
  )

  return (
    <QueryClientProvider client={queryClient}>
      <MemeContext.Provider value={memoizedValue}>
        <Layout>
          <Suspense fallback={<CircularProgress />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/editor" element={<Editor />} />
            </Routes>
          </Suspense>
        </Layout>
      </MemeContext.Provider>
    </QueryClientProvider>
  )
}

export default App
