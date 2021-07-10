
import { Request } from "@hapi/hapi";
import { AxiosResponse } from "axios";
import { validateRequest, validateResponseCoingecko } from "../utils/validators";
import { getCoingeckoCryptoPrice} from "../services/coingecko-service";
import { cachable } from '../utils/cache'
import { convertResponse } from "../utils/converters";

type CryptoPriceResponse = {code: number, data: PriceCryptoResp}
type CryptoPriceResponseError = {code: number, error: string}

const withCache = cachable();

const priceFetcher = requestedDate => async () => {
    const priceResp: AxiosResponse = await getCoingeckoCryptoPrice('bitcoin', requestedDate)
    validateResponseCoingecko(priceResp)

    return convertResponse(priceResp, requestedDate?requestedDate:new Date(Date.now()))
}

export const cryptoPriceController = async (request: Request): Promise<CryptoPriceResponse|CryptoPriceResponseError> => {
    //First step, Validation of the request
    try{
        validateRequest(request)

        //Second step, check if we have the answer cached
        const requestedDate = request.query.date
        
        try {
            const data = await withCache(priceFetcher(requestedDate));
            return {code: 200, data}
        } catch (error) {
            return {code: 500, error: error.message}
        }
    }catch(e){
        return {code: 400, error: e.message}
    }
}