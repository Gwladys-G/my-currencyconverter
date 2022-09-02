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
  } = props

  return (
    <div className="converter">
      <h1>Convert</h1>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={selectedFromCurrency} onChangeCurrency={onChangeFromCurrency} amount={fromAmount} onChangeAmount={onChangeFromAmount}/>
      <div className='equals'>=</div>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={selectedToCurrency} onChangeCurrency={onChangeToCurrency} amount={toAmount} onChangeAmount={onChangeToAmount}/>
    </div>
  )
}
