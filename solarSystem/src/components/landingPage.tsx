import React from 'react'
import './landingPage.css'
import Layout from './Layout/Layout'

const landingPage = () => {
  return (
    <Layout>
      <div className="landingPage">
        <h1>Welcome to the Solar System</h1>
        <p>Learn about the planets in our solar system</p>
      </div>
    </Layout>
  )
}

export default landingPage