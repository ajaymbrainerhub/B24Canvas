import React from 'react'
import HomeView from './Home'
import NavBar from './NavBar'

export default function Index() {
  return (
    <div style={{ minWidth: '100vw' }}>
      <NavBar />
      <HomeView />
    </div>
  )
}
