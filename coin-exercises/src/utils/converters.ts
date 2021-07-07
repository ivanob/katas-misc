import axios, { AxiosResponse } from "axios"

export const convertResponse = (axiosResp: AxiosResponse, date: Date): PriceCryptoResp => {
    return {
        cryptoID:axiosResp.data.id, 
        priceEUR:axiosResp.data.market_data.current_price.eur, 
        priceUSD:axiosResp.data.market_data.current_price.usd, 
        timestamp: date
    }
}