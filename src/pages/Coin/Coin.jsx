import React ,{useContext, useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/LineChart/LineChart'

const Coin = () => {
  const {coinId} =useParams()
  const [coinData,setCoinData]=useState()
  const [historicalData,setHistoricalData]=useState()
  const {currency}=useContext(CoinContext)

  const fetchCoinData=async()=>{
    const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
  .then(response => response.json())
  .then(response => setCoinData(response))
  .catch(err => console.error(err));
  }

  const fetchHistoricalData=async()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-ZLPzUUyNSREYeFCkN3nwtTwB   '
      }
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricalData(response))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchCoinData();
    fetchHistoricalData();
  },[coinId,currency])
  if(coinData && historicalData){
  return (
    <div className='py-0 px-5'>
      <div className='flex flex-col items-center gap-5 m-4 m mb-12'>
        <img className='max-w-24' src={coinData.image.large} alt="" />
        <p ><b className='text-4xl font-medium'>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className='max-w-xl h-60 m-auto'>
        <LineChart historicalData={historicalData}/>
      </div>
      <div className='max-w-xl  my-12 mx-auto  flex flex-col'>
            <ul className='flex justify-between  py-2.5 px-0 border-b border-solid border-[#5f5d5f]'>
              <li >Crypto Market Rank</li>
              <li>{coinData.market_cap_rank}</li>
            </ul>
            <ul className='flex justify-between  py-2.5 px-0 border-b border-solid border-[#5f5d5f]'>
              <li>Current Price</li>
              <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
            </ul>
            <ul className='flex justify-between  py-2.5 px-0 border-b border-solid border-[#5f5d5f]'>
              <li>Market Cap Price</li>
              <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
            </ul>
            <ul className='flex justify-between  py-2.5 px-0 border-b border-solid border-[#5f5d5f]'>
              <li>24 Hour high </li>
              <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
            </ul>
            <ul className='flex justify-between  py-2.5 px-0 border-b border-solid border-[#5f5d5f]'>
              <li>24 Hour low</li>
              <li >{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
            </ul>
      </div>
    </div>
  )
}else{
    return(
      <div className='grid place-self-center min-h-screen'>
        <div className='w-11 h-11 place-self-center border-solid rounded-md animate-rotate'>
        </div>
      </div>
    )
}
}

export default Coin

