
import { Request } from "@hapi/hapi";
import { validateRequest } from "../utils/validators";
import { getCachedPrices} from "../services/coingecko-service";

type CryptoPriceResponse = {code: number, data: PriceCryptoResp}
type CryptoPriceResponseError = {code: number, error: string}


export const cryptoPriceController = async (request: Request): Promise<CryptoPriceResponse|CryptoPriceResponseError> => {
    //First step, Validation of the request
    try{
        validateRequest(request)

        //Second step, check if we have the answer cached
        const requestedDate = request.query.date
        
        try {
            const data = await getCachedPrices('bitcoin', requestedDate);
            return {code: 200, data}
        } catch (error) {
            console.log('error')
            return {code: 500, error: error.message}
        }
    }catch(e){
        return {code: 400, error: e.message}
    }
}