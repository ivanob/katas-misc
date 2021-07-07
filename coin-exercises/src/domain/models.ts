
//Just to simplify... I will declare all the domain in the same file

type PriceCryptoResp = {
    cryptoID: string,
    priceEUR: number,
    priceUSD: number,
    timestamp: Date
}

type CurrentPriceReading = {
    price: PriceCryptoResp,
    timestampLastReading: number
}