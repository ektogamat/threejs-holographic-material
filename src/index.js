import { createRoot } from 'react-dom/client'
import './styles.css'
import { App } from './App'
import { Leva } from 'leva'
import Overlay from './Overlay'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Overlay />
    <Leva collapsed />
  </>
)
