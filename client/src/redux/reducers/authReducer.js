import { SIGN_IN, SIGNED_IN, SIGN_OUT, SIGN_UP, ERROR } from '../actions/storeActionTypes';
import {initialStateDefaults} from '../helpers/initialStateDefaults';
import { setUser, getUser } from '../../utils';

const initialState = {
  ...initialStateDefaults.signedIn,
  ...initialStateDefaults.user,
  ...initialStateDefaults.isLoading,
  ...initialStateDefaults.isError
};

export const authReducer = (state=initialState, action) => {
   console.log('authReducer action', action);
   console.log('authReducer state', state);

   const userInfo = getUser();
   state.user = userInfo ? userInfo : {};

  switch(action.type){
    
    case SIGN_UP: 
    console.log('SIGN_UP', action);
    return {
      ...state,
      isLoading: true,
      isError: false,
    };

    case SIGN_IN: 
      console.log('SIGN_IN', action);
      return  {
        ...state,
        isLoading: true,
        isError: false
      };

    case SIGNED_IN: 
      console.log('SIGNED_IN', action);
      setUser({
        'username': action.user.username,
        'email': action.user.email,
        'id': action.user.id
      });
      return Object.assign({}, state, {
        ...state,
        isLoading: false,
        isError: false,
        signedIn: true,
        user: action.user
      });      

    case SIGN_OUT: 
      console.log('SIGN_OUT', action);
      return {
        ...state,
        isLoading: false,
        isError: false,
        signedIn: true,
        user: {}
      };

    default: 
      return state;
  }
}