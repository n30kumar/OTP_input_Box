import React from 'react'
import { useRef } from 'react'
import './App.css'
const App = () => {
  const emptyArr=[,'','','','', '']
  const refs=[useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
  const [input, setInput] = React.useState(['', '', '', '', '', ''])
  const [missing, setMissing] = React.useState([])
  const CODE='1234';


const handleinputChange=(e, i)=>{
  const val=e.target.value;
  if(!/^[0-9]$/.test(val) && val!==''){
    return;
  }
  const newInput=[...input];
  newInput[i]=val;
  setInput(newInput);
  if(val!=='' && i<5){
    refs[i+1].current.focus();
  }
}

const handleonKeyDown=(e, i)=>{
  if(e.key==='Backspace' && input[i]==='' && i>0){
    refs[i-1].current.focus();
  }
}

const handlePaste=(e, i)=>{
  e.preventDefault();
  const pasteData=e.clipboardData.getData('Text').slice(0, 6 - i);
  const newInput=[...input];
  for(let j=0; j<pasteData.length; j++){
    if(/^[0-9]$/.test(pasteData[j])){
      newInput[i+j]=pasteData[j];
      if(i+j<5){
        refs[i+j+1].current.focus();
      }
    }
  }
  setInput(newInput);
}

const handleSubmit=()=>{
  const enteredCode=input.join('');
  const missingIndices=[];
  for(let i=0; i<6; i++){
    if(input[i]===''){
      missingIndices.push(i);
    }
  }
  if(missingIndices.length>0){
    setMissing(missingIndices);
    return;
  }
  if(enteredCode===CODE){
    alert('Code verified successfully!');
    setMissing([]);
  }else{
    alert('Incorrect code. Please try again.');
  }
}   
  return (
    <div className='app'>
      <div className="card">
        <h1>Two-factor code input</h1>
        <p className="help">Enter the 6-digit code we sent to your phone or email.</p>
        <div className="otp-row" role="group" aria-label="Two factor authentication code">
          {emptyArr.map((item, i) => (
            <input
              placeholder="•"
              inputMode="numeric"
              pattern="[0-9]*"
              value={input[i]}
              key={i}
              ref={refs[i]}
              maxLength="1"
              onPaste={(e) => handlePaste(e, i)}
              onChange={(e) => handleinputChange(e, i)}
              onKeyDown={(e) => handleonKeyDown(e, i)}
              onFocus={(e) => e.target.select()}
              type="text"
              className={missing.includes(i) ? 'error' : ''}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        <div className="actions">
          <button onClick={handleSubmit}>Submit</button>
          <button
            className="secondary"
            onClick={() => { setInput(['', '', '', '', '', '']); setMissing([]); refs[0].current.focus(); }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
