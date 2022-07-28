import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './routes/Home'
import Member from './routes/Member'
import Data from './routes/Data'
import Add from './routes/Add'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member/:memberId" element={<Member />} />
        <Route path="/data/add/:memberId" element={<Data />} />
        <Route path="/member/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
