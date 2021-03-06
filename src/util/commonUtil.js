import moment from "moment";

export const convertObjectToQueryParam = (param) =>
{
    let tempArray=[];
    for (const key in param) {
        if (Object.hasOwnProperty.call(param, key)) {
            const element = param[key];
            tempArray.push(`${key}=${element}`);
        }
    }
    return tempArray.length ? `?${ tempArray.join('&') }` : '';
}

export const formatDateTime = (datetime) =>
{
    return moment(datetime).format("DD-MM-yyyy HH:mm:ss");
}