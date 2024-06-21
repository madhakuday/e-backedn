import axios from 'axios'
import { encodeQueryData } from './Common';

const BASE_URL = process.env.BASE_URL;

const callPostApi = async (url: any, token: any, obj={}) => {
    let responseData: any = {}; 
  await axios
    .post( url, obj, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    .then(async response => {
        responseData = response.data;
    })

    return responseData;
}

const callGetApi = async (url: any, token: any, params={} ) => {

    let responseData: any = {};
    await axios
    .get( url + encodeQueryData(params), 
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    .then(async response => {
        responseData = response.data;
    })

    return responseData;
}

const callPutApi = async (url: any, token: any, params={}) => {
    let responseData: any = {};

  await axios
    .put(BASE_URL + url, params,  {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then(async response => {
        responseData = response.data;
    })

    return responseData;
}
 
export default {
  callPostApi,
  callGetApi,
  callPutApi
}
