import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './routes/Home'
import Member from './routes/Member'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member/:memberId" element={<Member />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
