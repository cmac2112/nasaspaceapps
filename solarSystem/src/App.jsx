import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/landingPage'
import "./App.css";

import InfoPage from "./components/InfoPage/InfoPage";
import Earth from "./components/Earth/Earth";
import SpaceSimulation from "./components/Simulation/Simulation";
import AboutUs from "./components/AboutUs/AboutUs";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/info" element={<InfoPage/>}/>

        <Route path="/earth" element={<Earth />} />
        <Route path="/simulation" element={<SpaceSimulation />} />
        <Route path="/aboutus" element={<AboutUs />} />

      </Routes>
    </Router>
  )
}

export default App
