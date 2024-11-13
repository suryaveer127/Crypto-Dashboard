import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../../context/CoinContext'

import { Link } from 'react-router-dom'

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext)
  const [displayCoin, setDisplayCoin] = useState([])
  const [input, setInput] = useState('')

  const inputHandler = (event) => {
    setInput(event.target.value)
    if (event.target.value === "") {
      setDisplayCoin(allCoin)
    }
  }

  const searchHandler = async (event) => {
    event.preventDefault()
    if (!allCoin || allCoin.length === 0) return
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins)
  }

  useEffect(() => {
    setDisplayCoin(allCoin)
  }, [allCoin, currency])

  return (
    <div className='px-4 py-6 pb-28'>
    <div className='max-w-2xl my-12 mx-auto flex flex-col items-center text-center gap-6'>
      <h1 className='text-[max(8vw,36px)] sm:text-[max(6vw,32px)] md:text-[max(5vw,40px)] lg:text-[max(4vw,48px)] text-gray-900'>
        Largest <br /> Crypto Marketplace
      </h1>
    
      <form onSubmit={searchHandler} className='px-4 py-2 w-full bg-white shadow-md rounded-md text-base flex flex-col sm:flex-row justify-between items-center gap-4'>
        <input 
          onChange={inputHandler} 
          list='coinlist' 
          value={input} 
          className='flex-1 text-sm sm:text-base outline-none border-none pl-2.5 text-gray-700 w-full' 
          type="text" 
          placeholder='Search crypto...' 
          required 
        />
        <datalist id='coinlist'>
          {allCoin.map((item, index) => (
            <option key={index} value={item.name} />
          ))}
        </datalist>
        <button className='w-full sm:w-auto border-none bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-all' type='submit'>
          Search
        </button>
      </form>
    </div>
    
    <div className='max-w-4xl mx-auto bg-gradient-to-r from-white to-gray-100 rounded-2xl shadow-lg'>
      <div className='grid grid-cols-3 sm:grid-cols-5 px-5 py-4 items-center border-b border-gray-300 text-sm sm:text-base'>
        <p className='text-gray-700'>#</p>
        <p className='text-left text-gray-700'>Coins</p>
        <p className='text-center text-gray-700'>Price</p>
        <p className='hidden sm:block text-center text-gray-700'>24H Change</p>
        <p className='hidden sm:block text-right text-gray-700'>Market Cap</p>
      </div>
      {displayCoin.slice(0, 10).map((item, index) => (
        <Link to={`/coin/${item.id}`} className='grid grid-cols-3 sm:grid-cols-5 px-5 py-3 items-center hover:bg-gray-200 transition-all text-sm sm:text-base' key={index}>
          <p className='text-gray-700'>{item.market_cap_rank}</p>
          <div className='flex items-center gap-3'>
            <img className='w-6 h-6 sm:w-8 sm:h-8' src={item.image} alt={item.name} />
            <p className='text-left text-gray-700'>{item.name} - {item.symbol.toUpperCase()}</p>
          </div>
          <p className='text-center text-gray-700'>{currency.symbol}{item.current_price.toLocaleString()}</p>
          <p className={`hidden sm:block text-center ${item.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
            {Math.floor(item.price_change_percentage_24h * 100) / 100}%
          </p>
          <p className='hidden sm:block text-right text-gray-700'>{item.market_cap.toLocaleString()}</p>
        </Link>
      ))}
    </div>
  </div>
  
  )
}

export default Home