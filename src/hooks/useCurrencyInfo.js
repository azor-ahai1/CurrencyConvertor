import {useEffect, useState} from "react";

function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    useEffect(() => {
        let cur = currency.toLowerCase();
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${cur}.json`)
        .then((res) => res.json())
        .then((res) => setData(res[cur]))
    }, [currency])
    return data
}

export default useCurrencyInfo;
