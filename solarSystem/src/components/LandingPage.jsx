import './landingPage.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'

function App() {

  return (
    <Router>
      <header>
      <Route path="/" element={<LandingPage />} />
    </header>
    </Router>

  )
}