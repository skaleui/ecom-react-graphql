import  React, { useEffect, useReducer } from 'react';
import { Box } from 'gestalt';
import { storeReducer } from '../../redux/reducers/storeReducer';
import { dispatchStoreMiddleware } from '../../redux/actions/storeActions';
import { API_URL } from '../../utils';
import { LIST_BRANDS } from '../../redux/actions/storeActionTypes';
import { initialStateDefaults } from '../../redux/helpers/initialStateDefaults';
import BrandListComponent  from './BrandListComponent';

const BrandsComponent = (props) => {

    const constState = {linkText: 'See Brews'};

    const [state, dispatchBase] = useReducer(storeReducer, initialStateDefaults);

    const dispatch = dispatchStoreMiddleware(dispatchBase);

    useEffect(() => {
      console.log('BrandsComponent useEffect');
      dispatch( { type: LIST_BRANDS } );      
    }, []); // Or [] if effect doesn't need props or state

  return (
  
    state.isLoading ? 
    <Box>
      ... is Loading ... 
    </Box> : 
    <BrandListComponent onChangeValue={props.onChangeValue} brands={state.data}  apiUrl={API_URL} linkText={constState.linkText} />
  );
}

export default BrandsComponent;
