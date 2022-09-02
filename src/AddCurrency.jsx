import React from 'react'

export default function AddCurrency(props) {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <p>{props.addFromFrom ? "for From" : "For To"}</p>
        <input type="text" placeholder="type symbol" id="myInput" onChange={props.onChangeExtraCurrency}/>
        <button disabled={props.ButtonInputDisable} >Use this currency</button>
      </form>
      <p>{props.Message}</p>
    </div>
  )
}
