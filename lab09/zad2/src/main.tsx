import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { BrowserRouter, Router } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
      <App />
      </ BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
