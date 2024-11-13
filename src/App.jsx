import React from 'react'

import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Footer from './components/Footer/Footer'

function App() {

  return (
  <div className='min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-between'>
  <Navbar/>
  <Routes>
    <Route path='/'element={<Home/>} />
    <Route path='/coin/:coinId'element={<Coin/>} />
  </Routes>
  <Footer className='bg-gray-900 text-white py-4'/>
  </div>
  )
}

export default App
