import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './routes/Home'
import Member from './routes/Member'
import Data from './routes/Data'
import Add from './routes/Add'

import AppContext from './lib/AppContext'

function App() {

  const [state, setState] = React.useState({
    scroll: 0,
    setScroll: handleScroll,
  })

  function handleScroll(param) {

    let scrollValue = param.hasOwnProperty("scroll") ? param.scroll : state.scroll

    setState((prev) => ({
      ...prev,
      scroll: scrollValue,
    }))

  }

  return (
    <AppContext.Provider value={state}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/member/:memberId" element={<Member />} />
          <Route path="/data/add/:memberId" element={<Data />} />
          <Route path="/member/add" element={<Add />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
