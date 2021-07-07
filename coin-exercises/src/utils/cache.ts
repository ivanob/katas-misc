
/**
 * This is the only stateful component of the project. It simulates
 * a cache (just in memory) to mesmerize (store) requests from the
 * clients so we can serve them in case of being repeated in the
 * future.
 */

const MAX_DELAY_ALLOWED_MS = 10 * 60 * 1000 //10 Minutes in Miliseconds

export class Cache {
    private historicDatesPrices: object
    private lastPriceRead: CurrentPriceReading

    constructor(){
        this.historicDatesPrices = {}
        this.lastPriceRead = {
            price: undefined,
            timestampLastReading: 0
        }
    }

    public getCachedPrice(date?: Date): PriceCryptoResp|undefined{
        if(!date){ //Client is looking for a current date
            const currentTime = Date.now()
            if(currentTime < this.lastPriceRead?.timestampLastReading + MAX_DELAY_ALLOWED_MS){
                //We are still below the maximum time of delay, so we can serve the cached response
                console.log(`Found in cache the current price with date ${currentTime}`)
                return this.lastPriceRead.price
            }
            return undefined
        }else{ //Client is looking for an historical date
            console.log(`Found in cached the historical price with date ${date.toString()}`)
            return this.historicDatesPrices[date.toString()]
        }
    }

    public setCachedPrice(price: PriceCryptoResp, date?: Date){
        if(!date){ //Client is looking for the current price
            const currentTime = Date.now()
            if(currentTime > this.lastPriceRead?.timestampLastReading + MAX_DELAY_ALLOWED_MS){
                //The Maximum time of delay has expired
                console.log(`Stored in cached the current price with date ${currentTime}`)
                this.lastPriceRead.price = price
                this.lastPriceRead.timestampLastReading = currentTime
            }
        }else{ //Client is looking for an historical date
            console.log(`Stored in cached a historical price with date ${date}`)
            this.historicDatesPrices[date.toString()] = price
        }
    }

}