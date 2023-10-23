import React, { useMemo, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemeContext } from './context/MemeContext'
import { MemeTemplate } from './interfaces/Meme'
import Editor from './pages/Editor/Editor'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import './App.css'

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
        </Layout>
      </MemeContext.Provider>
    </QueryClientProvider>
  )
}

export default App
