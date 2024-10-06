import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './components/landingPage'
import "./App.css";
import InfoPage from "./components/InfoPage/InfoPage";
import SpaceSimulation from "./components/Simulation/Simulation";
import NotFound from "./components/NotFound/NotFound";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/solareyes" />} />
        <Route path="/solareyes/" element={<LandingPage />} />
        <Route path="/solareyes/info" element={<InfoPage/>}/>
        <Route path="/solareyes/simulation" element={<SpaceSimulation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
