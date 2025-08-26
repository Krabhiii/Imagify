
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import './index.css'
import App from './App.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <AppContextProvider>
  <App />
  </AppContextProvider>
</BrowserRouter>
)
