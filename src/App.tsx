import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import { AmountInput } from './components/AmountInput'
import { ConversionResult } from './components/ConversionResult'
import { CurrencySelect } from './components/CurrencySelect'

function App() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Currency Conversion Tool</h1>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        {/* left hand side */}
        <div id="docs">
          <AmountInput value={amount} onChange={setAmount} />
          <CurrencySelect
            label="From"
            value={fromCurrency}
            onChange={setFromCurrency}
          />
        </div>
        {/* right hand side */}
        <div id="social">
          <CurrencySelect
            label="To"
            value={toCurrency}
            onChange={setToCurrency}
          />
          <ConversionResult
            from={fromCurrency}
            to={toCurrency}
            amount={Number(amount)}
          />
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
