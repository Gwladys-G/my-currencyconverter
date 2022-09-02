import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'

export default function AddCurrency(props) {

 const closeHelper = () => {
  document.getElementById('helper').classList.add('hidden')
 }

  return (
    <div className='helper hidden' id='helper'>
      <form onSubmit={props.onSubmit}>
          <FontAwesomeIcon onClick={closeHelper} className="plus-sign"icon={faCircleXmark} id="close"></FontAwesomeIcon>
          <h4>{props.addFromFrom ? `Find a "From" Currency` : `Find a "To" Currency`}</h4>
        <input type="text" placeholder="type symbol" id="myInput" onChange={props.onChangeExtraCurrency}/>
        <button disabled={props.ButtonInputDisable} >Use this currency</button>
      </form>
      <p id="symbol-name"><span style={{fontStyle: 'italic'}}>{props.Message}</span></p>
    </div>
  )
}
