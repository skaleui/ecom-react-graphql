import {SIGN_IN, SIGNED_IN, SIGN_UP, ERROR} from './storeActionTypes';
import { setToken, API_URL } from '../../utils';
import axios from 'axios';

const apiUrl = API_URL + '/auth/local';

export const dispatchAuthMiddleware = (dispatch, authData) => {

  console.log('dispatchAuthMiddleware', authData);
  return async action => {
    switch (action.type) {
      case SIGN_IN: 
        console.log('dispatchAuthMiddleware -> SIGN IN');
        try {
        
          // console.log('strapi url', apiUrl )

          axios
          .post(apiUrl, {
            identifier: authData.username,
            password: authData.password
          }).then (response => {
            console.log('response', response);
            setToken(response.data.jwt);
            dispatch({ type: SIGNED_IN, user: response.data.user});
          }).catch(error => {
            console.log('Login error', error);
          });
 

        } catch (err) {
          dispatch({ type: ERROR, payload: err });
        }
        break;

      case SIGN_UP: 
        console.log('dispatchAuthMiddleware -> SIGN UP');
        try {
        
          
          console.log('strapi url', apiUrl );

          axios.post(apiUrl+'/register', {
            username: authData.username,
            email: authData.email,
            password: authData.password
          }).then(response => {
            console.log('sign up response', response);
            setToken(response.data.jwt);
            dispatch({ type: SIGNED_IN, user: response.data.user});
          }).catch(error => {
            console.log('Registration error', error);
          });
        } catch (err) {
          dispatch({ type: ERROR, payload: err });
        }

        break;



        default:
          return dispatch(action);
    }
  }
}
