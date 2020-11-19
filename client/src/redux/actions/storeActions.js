import { LIST_BRANDS, LIST_BREWS, RECEIVE_BRANDS, RECEIVE_BREWS, ERROR} from './storeActionTypes';

import { API_URL, brandsQuery, brewsQuery } from '../../utils';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = API_URL;
const strapi = new Strapi(apiUrl);

export const listBrands = async payload => {
 
  return {
    type: LIST_BRANDS,
    brands: payload
  }
}

export const receiveBrands = payload => {
  console.log('ACTION RECEIVE_BRANDS', payload);

  console.log('payload', payload);

  return {
    type: RECEIVE_BRANDS,
    payload, 
    brands: payload
  }
}

export const listBrews = payload => {
  return {
    type: LIST_BREWS,
    brews: payload
  }
}


export const dispatchStoreMiddleware = (dispatch) => {
  return async action => {
    switch (action.type) {
      case LIST_BRANDS: 
        try {
          const result = await strapi.request('POST', '/graphql', {
            data: {
              query: brandsQuery
            }
          });
          dispatch({ type: RECEIVE_BRANDS, data: result.data.brands});
        } catch (err) {
          dispatch({ type: ERROR });
        }
        break;

        case LIST_BREWS: 
        try {
          const result = await strapi.request('POST', '/graphql', {
            data: {
              query: brewsQuery,
              id: action.brandid
            }
          });
          console.log('brews result', result.data);
          dispatch({ type: RECEIVE_BREWS, data: result.data.brews});
        } catch (err) {
          dispatch({ type: ERROR });
        }
        break;

        default:
          return dispatch(action);
    }
  }
}

