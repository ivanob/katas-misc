
import { Request } from "@hapi/hapi";
import { AxiosResponse } from "axios";
import { validateRequest, validateResponseCoingecko } from "../handlers/validators";
import { getCoingeckoCryptoPrice} from "../services/coingecko-service";

export const cryptoPriceController = async (request: Request) => {
    //First step, Validation of the request
    try{
        validateRequest(request)
    }catch(e){
        return {code: 400, error: e.message}
    }
    console.log('LOG1', request.query.date)
    
    //Second step, check if we have the answer cached

    //Third step, query if we dont have the answer

    const priceResp: AxiosResponse = await getCoingeckoCryptoPrice('bitcoin', undefined)
    try{
        validateResponseCoingecko(priceResp)
    }catch(e){
        return {code: 503, error: e.message}
    }
    return {code: 200, data: priceResp.data}
}