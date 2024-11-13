import React,{useContext} from 'react'
import logo1 from '../../assets/logo1.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
const Navbar=()=> {

const {setCurrency}=useContext(CoinContext)

const currencyHandler=(event)=>{
  switch (event.target.value){
    case "usd":{
      setCurrency({name:"usd",symbol:"$"})
      break;
    }
    case "euro":{
      setCurrency({name:"eur",symbol:"€"})
      break;
    }
    case "inr":{
      setCurrency({name:"inr",symbol:"₹"})
      break;
    }
   default:{
      setCurrency({name:"usd",symbol:"$"})
      break;
    }
  }

}

  return (
    <div className='flex items-center justify-between px-4 py-  border-b-2 border-[#3c3c3c] sm:px-6 '>
      <Link to={'/'}>
      <img src={logo1} alt='' className='max-w-40 sm:w-28 md:w-32 lg:w-40'/>
      </Link>
      <ul className='hidden sm:flex gap-6 md:gap-8 lg:gap-10 list-none'>
      <Link to={'/'}> <li className='cursor-pointer'>Home</li></Link>
        <li className='cursor-pointer'>Features</li>
        <li className='cursor-pointer'>Pricing</li>
        <li className='cursor-pointer'>Blog</li>
      </ul>
      <div className='flex items-center gap-10 m:gap-8 md:gap-10'>
        <select  className='px-0 py-0 rounded-md border-2 border-solid border-white bg-transparent text-white text-xs sm:text-sm md:text-base' onChange={currencyHandler}>
            <option className=' bg-[#00295c]'  value="usd">USD</option>
            <option className=' bg-[#003a5c]' value="euro">EURO</option>
            <option className=' bg-[#00345c]' value="inr">INR</option>
        </select>
        <button className='flex items-center gap-2 sm:gap-3 px-2 py-1 rounded-xl text-xs sm:text-base font-medium text-black bg-white border-none cursor-pointer'>Sign Up
            <img className='w-3 sm:w-4' src={arrow_icon} alt="" />
        </button>
      </div>
    </div>
  )
}

export default Navbar
