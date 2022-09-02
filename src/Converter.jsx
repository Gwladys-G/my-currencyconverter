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
    console.log('clicked From')
    setaddFromFrom(true)
  }

  const maketo = () => {
    console.log('clicked to')
    setaddFromFrom(false)
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
