import CurrencyRow from './CurrencyRow';
import './index.css';
import { useEffect, useState } from 'react';


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



  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={fromCurrency} onChangeCurrency={(e) => {setFromCurrency(e.target.value)}} amount={fromAmount} onChangeAmount={handleFromAmountChange}/>
      <div className='equals'>=</div>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={toCurrency} onChangeCurrency={(e) => {setToCurrency(e.target.value)}} amount={toAmount} onChangeAmount={handleToAmountChange}/>
    </>
  );
}

export default App;
