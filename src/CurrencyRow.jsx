import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons'

export default function CurrencyRow(props) {

  const {
    // currencyOptions,
    // selectedCurrency,
    // onChangeCurrency,
    // amount,
    // onChangeAmount,
    toAddDestination
  } = props

  return (
    <div>
      <input type="number" className="input" min="0" value={props.amount} onChange={props.onChangeAmount}/>
      <select value={props.selectedCurrency} onChange={props.onChangeCurrency}>
        {props.currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <FontAwesomeIcon onClick={toAddDestination} className="plus-sign"icon={faCircleInfo} id="info"></FontAwesomeIcon>
    </div>
  )
}
