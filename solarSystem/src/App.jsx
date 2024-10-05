import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import landingPage from './components/landingPage'

function App() {
  

  return (
    <Router>
      <Route path="*" component={NotFound} />
      <Route path="/" component={landingPage} />
    </Router>
  )
}

export default App
