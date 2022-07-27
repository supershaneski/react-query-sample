import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
