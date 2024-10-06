import React from 'react'
import './landingPage.css'
import Layout from './Layout/Layout'
import Earth from './Earth/Earth'
import { useNavigate } from "react-router-dom"
const landingPage = () => {

  const Navigate = useNavigate()
  return (
    <Layout>
      <div className='container'>
      <div className="bg">
      <h1 className="title">Discover Near-Earth Objects</h1>
      <h1 className="title">Explore the Solar System</h1>
      <div className="earth-container">
        <Earth />
        <button onClick={() => Navigate('/solareyes/simulation')} className="begin-button">Begin</button>
        </div>
      </div>
      </div>
    </Layout>
  )

}

export default landingPage