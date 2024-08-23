import { useState, useId } from "react";
import React from 'react';
import countryList from "./countrycodes";

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currrencyDisable = false,
    className = {},
}){
    const amountInputId = useId()
    return(
        <div className={`bg-white p-3 rounded-lg text-m flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/75 mb-2 inline-block font-semibold">{label}</label>
                <input className="outline-none w-full bg-transparent py-2"
                       id={amountInputId}
                    //    type="number"
                       placeholder="Amount"
                       disabled={amountDisable}
                       value={amount}
                       onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                       min={0}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/75 mb-2 w-full font-serif">Currency Type</p>
                <div className="flex flex-row items-center justify-center">
                    <img src={`https://flagsapi.com/${countryList[selectCurrency]}/shiny/64.png`} alt={selectCurrency} style={{ width: '30px', margin: 2 , verticalAlign: 'middle' }} />
                    <select className="bg-gray-200 cursor-pointer outline-none" 
                            value={selectCurrency} 
                            disabled= {currrencyDisable}
                            onChange={(e)=> onCurrencyChange && onCurrencyChange(e.target.value)}
                    >
                        {/* {currencyOptions.map((currency) => {
                            if(countryList.currency.toUpperCase()=== undefined){
                            return <option key={currency} value={currency}>{currency.toUpperCase()}</option>;
                            }
                            /* To use if here i had to change the '(' after the => to '{' and its pair also and add return keyword because syntax of jsx do not allow direct use of if */
                        // })} */}
                        }

                        {/* {currencyOptions.map((currency) => {
                            const countryname = currency.toUpperCase();
                            if(countryList[country] !== undefined) {
                                return <option key={currency} value={currency}>{currency.toUpperCase()}</option>;
                            }
                        })} */}
                        {
                            Object.keys(countryList).map((currency)=>(
                                // console.log(currency);
                                // const src=;
                            <option key={currency} value={currency}>{currency}</option> 
                            ))
                        }
                    </select>  
                </div>
            </div>
        </div>
    )
}

export default InputBox;