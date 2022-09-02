import './index.css';
import { useEffect, useState } from 'react';
import ParticleBackground from './particlebackground'
import Converter from './Converter';


const MYHEADERS = new Headers();
MYHEADERS.append("apikey", "pyUStTLtFF0BmM09n7CRyeZRkdS9xkY8");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: MYHEADERS
};


function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState("EUR")
  const [toCurrency, setToCurrency ] = useState("CAD")
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount ] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  console.log(exchangeRate)

  let toAmount,fromAmount
  if (amountInFromCurrency){
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount /exchangeRate
  }

  useEffect( () => {
    fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${fromCurrency}&symbols=CAD,AUD,EUR,JPY,USD`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCurrencyOptions([...Object.keys(data.rates)])
        console.log(toCurrency)
        setExchangeRate(data.rates[toCurrency])
      })
      .catch(error => console.log('error', error));
  },[fromCurrency,toCurrency])

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  const handleToAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  const handleFromCurrencyChange = (e) =>{
    setFromCurrency(e.target.value)
  }
  const handleToCurrencyChange = (e) =>{
    setToCurrency(e.target.value)
  }


  return (
    <>
      <ParticleBackground/>
      <Converter
      currencyOptions={currencyOptions}
      selectedFromCurrency={fromCurrency}
      selectedToCurrency={toCurrency}
      onChangeFromCurrency={handleFromCurrencyChange}
      onChangeToCurrency={handleToCurrencyChange}
      fromAmount={fromAmount}
      toAmount={toAmount}
      onChangeFromAmount={handleFromAmountChange}
      onChangeToAmount={handleToAmountChange}
      />
    </>
  );
}

export default App;
