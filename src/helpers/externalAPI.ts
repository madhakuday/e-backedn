import axios from 'axios'
import { encodeQueryData } from './Common';

const BASE_URL = process.env.MASTER_BACKED_URL;

const callPostApi = async (url: any, token: any, obj={}) => {
    let responseData: any = {}; 
  await axios
    .post(BASE_URL + url, obj, {
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
    .get(BASE_URL + url + encodeQueryData(params), 
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
