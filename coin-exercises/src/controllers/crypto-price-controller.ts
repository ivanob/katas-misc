
import { Request } from "@hapi/hapi";
import { AxiosResponse } from "axios";
import { validateRequest, validateResponseCoingecko } from "../utils/validators";
import { getCoingeckoCryptoPrice} from "../services/coingecko-service";
import { Cache } from '../utils/cache'
import { convertResponse } from "../utils/converters";

const cache: Cache = new Cache()

type CryptoPriceResponse = {code: number, data: PriceCryptoResp}
type CryptoPriceResponseError = {code: number, error: string}

export const cryptoPriceController = async (request: Request): Promise<CryptoPriceResponse|CryptoPriceResponseError> => {
    //First step, Validation of the request
    try{
        validateRequest(request)
    }catch(e){
        return {code: 400, error: e.message}
    }
    //Second step, check if we have the answer cached
    const requestedDate = request.query.date
    const cachedPrice = cache.getCachedPrice(requestedDate)

    if(!cachedPrice){ //Response was not cached yet
        //Third step, query if we dont have the answer
        console.log('New request to the Coingecko API to get a price')
        try{
            const priceResp: AxiosResponse = await getCoingeckoCryptoPrice('bitcoin', request.query.date)
            validateResponseCoingecko(priceResp)
            const convertedPriceResp: PriceCryptoResp = convertResponse(priceResp, requestedDate?requestedDate:new Date(Date.now()))    
            cache.setCachedPrice(convertedPriceResp, request.query.date)
            return {code: 200, data: convertedPriceResp}
        }catch(e){
            return {code: 500, error: e.message}
        }
    }else{ //The response was cached already
        return {code: 200, data: cachedPrice}
    }
    
}