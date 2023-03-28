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

export const validateRequest = (request: Request, expectedCryptoId: string = "bitcoin"): boolean | Error => {
    if(request.query && request.query.date && !Date.parse(request.query.date)){
        throw new Error(
            "Bad request: The date parameter should be provided in the following format mm-dd-yyyy"
        )
    }else{
        const requestedDate = new Date(request.query.date)
        const requestedYear = requestedDate.getUTCFullYear()
        if(requestedYear<2009 && expectedCryptoId === "bitcoin"){
            throw new Error(
                "Bad request: Bitcoin was created 09 Jan 2009"
            )
        }
        const currentDate = new Date(Date.now())
        if(requestedDate>currentDate && expectedCryptoId === "bitcoin"){
            throw new Error(
                "Bad request: Good try, but can not guess the future price yet. It will moon soon though"
            )
        }
        return true
    }
}