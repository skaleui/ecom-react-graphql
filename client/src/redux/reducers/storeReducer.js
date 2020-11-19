import { LIST_BRANDS, LIST_BREWS, RECEIVE_BRANDS, RECEIVE_BREWS, ERROR } from '../actions/storeActionTypes';
import {initialStateDefaults} from '../helpers/initialStateDefaults';

const initialState = {
  ...initialStateDefaults.cart,
  ...initialStateDefaults.data,
  ...initialStateDefaults.isError,
  ...initialStateDefaults.isLoading,
  ...initialStateDefaults.selectedBrand,
  ...initialStateDefaults.selectedBrew
};


export const storeReducer = (state=initialState, action) => {
  console.log('storeReducer action', action);
  console.log('storeReducer state', state);

  switch(action.type){
    
    case LIST_BRANDS: 
      console.log('LIST_BRANDS', action);
      //Initialize the request
      return { 
        ...state,
        isLoading: true,
        isError: false
      };

    case RECEIVE_BRANDS:
      console.log('RECEIVE_BRANDS', action);
      //Success - got response to the request
      return Object.assign({}, state, { 
        ...state,
        isLoading: false,
        isError: false,
        data: action.data
      });

    case LIST_BREWS: 
      console.log('LIST_BREWS', action);
      break;  

      case RECEIVE_BREWS:
        console.log('RECEIVE_BREWS', action.data);
        //Success - got response to the request
        return Object.assign({}, state, { 
          ...state,
          isLoading: false,
          isError: false,
          data: action.data
        });

    case ERROR: 
      return {
        ...state,
        isLoading: false,
        isError: true
      }
  
    default: 
      return state;

  }

}