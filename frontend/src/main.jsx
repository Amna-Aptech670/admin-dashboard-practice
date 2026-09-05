import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TooltipProvider } from './components/ui/tooltip'
import { ThemeProvider } from './components/context/ThemeContext'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
      <BrowserRouter>
      <TooltipProvider>
        <App />
      </TooltipProvider>
      </BrowserRouter>
    </ThemeProvider>
)
