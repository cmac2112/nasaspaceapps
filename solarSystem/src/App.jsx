import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/landingPage'
import "./App.css";
import Earth from "./components/Earth/Earth";
import SpaceSimulation from "./components/Simulation/Simulation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/earth" element={<Earth />} />
        <Route path="/simulation" element={<SpaceSimulation />} />
      </Routes>
    </Router>
  )
}

export default App
