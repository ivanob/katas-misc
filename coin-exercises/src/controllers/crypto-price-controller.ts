
import { Request } from "@hapi/hapi";
import { AxiosResponse } from "axios";
import { validateRequest, validateResponseCoingecko } from "../utils/validators";
import { getCoingeckoCryptoPrice} from "../services/coingecko-service";
import { Cache } from '../utils/cache'
import { convertResponse } from "../utils/converters";

const cache: Cache = new Cache()

export const cryptoPriceController = async (request: Request) => {
    //First step, Validation of the request
    try{
        validateRequest(request)
    }catch(e){
        return {code: 400, error: e.message}
    }
    //Second step, check if we have the answer cached
    const date = request.query.date ? request.query.date : Date.now()
    const cachedPrice = cache.getCachedPrice(request.query.date)

    if(!cachedPrice){ //Response was not cached yet
        //Third step, query if we dont have the answer
        console.log('New request to the Coingecko API to get a price')
        const priceResp: AxiosResponse = await getCoingeckoCryptoPrice('bitcoin', undefined)
        const convertedPriceResp: PriceCryptoResp = convertResponse(priceResp, date)
        try{
            validateResponseCoingecko(priceResp)
        }catch(e){
            return {code: 503, error: e.message}
        }
        cache.setCachedPrice(convertedPriceResp, request.query.date)
        return {code: 200, data: convertedPriceResp}
    }else{ //The response was cached already
        return {code: 200, data: cachedPrice}
    }
    
}