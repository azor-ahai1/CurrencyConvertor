import { useState, useEffect } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'

function App() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const currencyInfo = useCurrencyInfo(from.toLowerCase());
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(amount*currencyInfo[to.toLowerCase()]);
  const [lastUpdated, setLastUpdated] = useState('amount');
  const [isClicked, setIsClicked] = useState(false);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 20);
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  const convertFromToTo = () => {
    // const x=
    setConvertedAmount(amount*currencyInfo[to.toLowerCase()]);
  }

  const convertToToFrom = () => {
    // const x=
    setAmount(convertedAmount/currencyInfo[to.toLowerCase()]);
  }
  
  // the use effect converts the currency at any of the following change. But we can also add the Submit button with commenting the useEffect and uncommenting the Button tag down below. 
  useEffect(() => {
    if (lastUpdated==='amount') {
      convertFromToTo();
    }
  }, [amount, from, currencyInfo]);

  useEffect(() => {
    if (lastUpdated==='convertedAmount') {
      convertToToFrom();
    }
  }, [convertedAmount, to, currencyInfo]);

  

  return (
    <>
      <div className="fixed w-full h-screen bg-black flex flex-col " style={{backgroundImage: 'url(https://wallpapercave.com/wp/wp2300383.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <h2 className=' text-5xl px-3 py-3 pb-3 mt-1 text-black bg-white p-5 text-center font-bold font-serif'>Currency Converter</h2>
        <div className='w-full h-screen flex flex-wrap items-center justify-center '>
          <div className='w-full max-w-md mx-auto border border-gray-100 rounded-lg p-5 backdrop-blur-sm bg-white/20'>
            <form onSubmit={(e) => {
              e.preventDefault();
              convertFromToTo();
            }}>
              <div className='w-full mb-1'>
                <InputBox label="From" amount={amount} onAmountChange={(amount) => {setAmount(amount); setLastUpdated('amount');}} currencyOptions={options} onCurrencyChange={(currency) => setFrom(currency)} selectCurrency={from} />
              </div>
              <div className='relative w-full h-0.5'>
                <button type='button' className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-black rounded-md px-2 py-0.5 transition-transform duration-300 ${isClicked ? 'bg-red-600' : 'bg-blue-600'} hover:scale-110 text-white`} onClick={swap}>Swap</button>
              </div>
              <div className='w-full mb-1'>
                <InputBox label="To" amount={convertedAmount} onAmountChange={(amount) => {setConvertedAmount(amount); ; setLastUpdated('convertedAmount');}} currencyOptions={options} onCurrencyChange={(currency) => setTo(currency)} selectCurrency={to} />
              </div>
              {/* <button type='sumbit' className='w-full bg-blue-700 text-white px-4 py-3 rounded-lg'>Convert {from} to {to}</button>  */}
            </form>
            <div className='w-full flex flex-col ustify-center items-center mt-2'>
              <h3 className='w-full flex flex-row justify-center items-center text-xl bg-black text-white pb-1 rounded-t-lg'>Exchange Rate</h3>
              <div className='w-full flex flex-row justify-center items-center text-lg font-semibold bg-white rounded-b-lg'>1 {from} = {currencyInfo[to.toLowerCase()]} {to}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
