import { AxiosResponse } from "axios"
import { Request } from "@hapi/hapi";

export const validateResponseCoingecko = (resp: AxiosResponse, expectedCryptoId: string = "bitcoin"): boolean | Error => {
    if(resp.data && resp.data && resp.data.id === expectedCryptoId &&
         resp.data?.market_data?.current_price){
        return true
    }else{
        throw new Error(
            "Bad response received from Coingecko. Price not available for this date"
        )
    }
}

export const validateRequest = (request: Request): boolean | Error => {
    if(request.query && request.query.date && !Date.parse(request.query.date)){
        throw new Error(
            "Bad request: The date parameter should be provided in the following format mm-dd-yyyy"
        )
    }else{
        return true
    }
}