// src/context/CoinContext.js

import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$"
  });
  const [news, setNews] = useState([]); // State for news articles

  const fetchAllCoin = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-ZLPzUUyNSREYeFCkN3nwtTwB'
      }
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
      .then(response => response.json())
      .then(response => setAllCoin(response))
      .catch(err => console.error(err));
  };

  const fetchCryptoNews = async () => {
    try {
      const response = await axios.get('https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=b612dcb79d0c40bda000415fa024fb24'); // Replace with your NewsAPI key
      setNews(response.data.articles); // Set news articles to state
    } catch (error) {
      console.error('Error fetching crypto news:', error);
    }
  };

  useEffect(() => {
    fetchAllCoin();
    fetchCryptoNews(); // Fetch news on component mount
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
    news // Expose news to the context
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
