import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HeroUIProvider} from "@heroui/react";
import { ToastContainer } from 'react-toastify';

import './index.css'
import App from './App.jsx'
// import CounterContexProvider from './Context/CounterContex.jsx';
import AuthContextProvider from './Context/AuthContext.jsx';
import UserContextProvider from './Context/UserContext.jsx';
import { QueryClient,QueryClientProvider,} from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <HeroUIProvider>
          <App />
          <ToastContainer/>
        </HeroUIProvider>
      </UserContextProvider>
    </QueryClientProvider> 
  </AuthContextProvider>
  
  // {/* </StrictMode>, */}
)
