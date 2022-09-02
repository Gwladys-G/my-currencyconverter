import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import CurrencyRow from './CurrencyRow';


export default function Converter(props) {

  const {
    currencyOptions,
    selectedFromCurrency,
    selectedToCurrency,
    onChangeFromCurrency,
    onChangeToCurrency,
    fromAmount,
    toAmount,
    onChangeFromAmount,
    onChangeToAmount,
    setaddFromFrom
  } = props

  const makeFrom = () => {
    setaddFromFrom(true)
    document.getElementById('helper').classList.remove('hidden')
  }

  const maketo = () => {
    setaddFromFrom(false)
    document.getElementById('helper').classList.remove('hidden')
  }

  return (
    <div className="converter">
      <h1>Convert</h1>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={selectedFromCurrency} onChangeCurrency={onChangeFromCurrency} amount={fromAmount} onChangeAmount={onChangeFromAmount} toAddDestination={makeFrom}/>
      <div className='equals'>=</div>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={selectedToCurrency} onChangeCurrency={onChangeToCurrency} amount={toAmount} onChangeAmount={onChangeToAmount} toAddDestination={maketo}/>
    </div>
  )
}
