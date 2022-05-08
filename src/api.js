import axios from 'axios'

export const BASE_URL = 'http://webapi/';

export const ENDPOINTS = {
    offers: 'Offers/GetOffers',
    
}

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + endpoint;
    return {
        fetch: () => axios.get(url),
        post: () => axios.post(url)
    }
}