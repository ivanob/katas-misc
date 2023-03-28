import axios from "axios"
import { cachable } from "../utils/cache";
import { convertResponse } from "../utils/converters";

const MAX_DELAY_ALLOWED_MS = 10 * 60 * 1000 //10 Minutes in Miliseconds

const cachedValues = {}

const roundDate = date => {
    const parsed = Date.parse(date);

    return new Date(
        Math.round(parsed / MAX_DELAY_ALLOWED_MS) * MAX_DELAY_ALLOWED_MS
    )
}

/**
 * 
 * @param cryptoID Id of the crypto to query, in this case 'bitcoin'
 * @param date price of the crypto on this Date. If not provided, it will return the current price
 * @returns Promise with the response
 * The URLs used are:
 *  - https://api.coingecko.com/api/v3/coins/bitcoin
 *  - https://api.coingecko.com/api/v3/coins/bitcoin/history?date=10-10-2015
 */
export const getCoingeckoCryptoPrice = async (cryptoID: string = "bitcoin", date?: Date) => {
    var baseUrl = `https://api.coingecko.com/api/v3/coins/${cryptoID}`
    if(date){
        baseUrl += `/history?date=${date}`
    }

    const response = await axios.get(baseUrl)

    return convertResponse(response, date);
}

const keyGetter = (...args) => roundDate(args[1] || new Date());

export const getCachedPrices = cachable(cachedValues)(getCoingeckoCryptoPrice, keyGetter);