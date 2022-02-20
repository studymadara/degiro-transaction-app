import { API_LINK } from "../config";
import { convertObjectToQueryParam } from "../util/commonUtil";

//1. get list of transaction
//2. get list of portfolio data
//3. update transaction details [cancel transaction]
//4. submit transaction details


export const getTransactionDetails = (params) => {
    return fetch(API_LINK+'/getTransactionDetails'+convertObjectToQueryParam(params),{method:'GET'});
}

export const getPortfolioDetails = (params) => {
    return fetch(API_LINK+'/getPortFolioDetails'+convertObjectToQueryParam(params),{method:'GET'});
}

export const updateTransactionDetails = (transactionId) => {
    const data=new FormData();
    data.append('transactionId',transactionId);
    return fetch(API_LINK+'/updateTransactionStatus',{method:'PATCH',body:data});
}

export const submitTransactionDetails = (userId,price) => {
    const data=new FormData();
    data.append('userId',userId);
    data.append('price',price);
    return fetch(API_LINK+'/submitTransaction',{method:'POST',body:data});
}