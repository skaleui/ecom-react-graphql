import  React, { useEffect, useReducer } from 'react';
import { Box } from 'gestalt';
import { storeReducer } from '../../redux/reducers/storeReducer';
import { dispatchStoreMiddleware } from '../../redux/actions/storeActions';
import { API_URL } from '../../utils';
import { LIST_BREWS } from '../../redux/actions/storeActionTypes';
import { initialStateDefaults } from '../../redux/helpers/initialStateDefaults';
import BrewsListComponent  from './BrewsListComponent';

const BrewsComponent = (props) => {

    const constState = {linkText: 'See Brews'};

    console.log('brews list props', props);

    const [state, dispatchBase] = useReducer(storeReducer, initialStateDefaults);

    const dispatch = dispatchStoreMiddleware(dispatchBase);

    useEffect(() => {
      console.log('BrewsComponent useEffect');
      dispatch( { type: LIST_BREWS } );      
    }, []); // Or [] if effect doesn't need props or state

  return (
    state.isLoading ? 
    <Box>
      ... is Loading ... 
    </Box> : 
    <BrewsListComponent brews={state.data}  apiUrl={API_URL} linkText={constState.linkText} />
  );
}

export default BrewsComponent;
