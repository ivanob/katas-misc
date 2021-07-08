import axios, { AxiosResponse } from "axios"

/**
 * 
 * @param cryptoID Id of the crypto to query, in this case 'bitcoin'
 * @param date price of the crypto on this Date. If not provided, it will return the current price
 * @returns Promise with the response
 * The URLs used are:
 *  - https://api.coingecko.com/api/v3/coins/bitcoin
 *  - https://api.coingecko.com/api/v3/coins/bitcoin/history?date=10-10-2015
 */
export const getCoingeckoCryptoPrice = (cryptoID: string = "bitcoin", date?: Date): Promise<AxiosResponse> => {
    var baseUrl = `https://api.coingecko.com/api/v3/coins/${cryptoID}`
    if(date){
        baseUrl += `/history?date=${date}`
    }
    return axios.get(baseUrl)
}