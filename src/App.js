import './index.css';
import { useEffect, useState } from 'react';
import ParticleBackground from './particlebackground'
import Converter from './Converter';
import AddCurrency from './AddCurrency'


const MYHEADERS = new Headers();
MYHEADERS.append("apikey", "f5yO98ehEinUmXuRIJF9RjGuIjJJ7g0k");

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

  const [allAvailableCurrencies, setAllAvailableCurrencies] = useState({
    "AED": "United Arab Emirates Dirham",
    "AFN": "Afghan Afghani",
    "ALL": "Albanian Lek",
    "AMD": "Armenian Dram"
  })
  const [Message, setMessage] = useState("Currency Symbols need to be 3 characters long")
  const [ButtonInputDisable, setButtonInputDisable] = useState(true)
  const [addFromFrom, setaddFromFrom] =useState(true)


  let toAmount,fromAmount
  if (amountInFromCurrency){
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount /exchangeRate
  }


  useEffect( () => {
    fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${fromCurrency}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        setCurrencyOptions([...Object.keys(data.rates)])
        setExchangeRate(data.rates[toCurrency])
      })
      .catch(error => console.log('error', error));
  },[fromCurrency,toCurrency])


    useEffect( () => {
      fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data.symbols)
        setAllAvailableCurrencies(data.symbols)
        console.log(allAvailableCurrencies)
      })
      .catch(error => console.log('error', error));
    },[])

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

  const onChangeExtraCurrency = (e) => {
    const input= e.target.value.toUpperCase();
    if (input.length < 3) {
      setMessage("Currency Symbol should have 3 characters");
      setButtonInputDisable(true)
    } else if (input.length > 3) {
      setMessage("Currency Symbol cannot have more than 3 characters");
      setButtonInputDisable(true)
      return
    } else {
      if (input in allAvailableCurrencies) {
        setMessage(allAvailableCurrencies[input])
        setButtonInputDisable(false)
      } else {
        setMessage("This currency symbol does not seems to exist or to be available right now");
        setButtonInputDisable(true)
      }
    }
  }

  const onSubmitExtraCurrency = (e) =>{
    e.preventDefault();
    var inputVal = document.getElementById("myInput").value;
    if (addFromFrom) {
      setFromCurrency(inputVal)

    } else {
      setToCurrency(inputVal)
    }
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
      setaddFromFrom={setaddFromFrom}
      />
      <AddCurrency onChangeExtraCurrency={onChangeExtraCurrency} Message={Message} ButtonInputDisable={ButtonInputDisable} onSubmit={onSubmitExtraCurrency} addFromFrom={addFromFrom}/>
    </>
  );
}

export default App;
