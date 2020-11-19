import  React, { useEffect, useReducer } from 'react';
import { Container, Box, Button, Heading, TextField } from 'gestalt';
import { authReducer } from '../../redux/reducers/authReducer';
import { dispatchAuthMiddleware } from '../../redux/actions/authActions';
import { SIGN_IN } from '../../redux/actions/storeActionTypes';
import ToastMessage from '../ToastMessage';
import { Redirect } from 'react-router-dom';

export const SignIn = () => {

  const [{username, password}, setUserPass ] = useReducer(
    (state, newState) => ({...state, ...newState}), 
    {
      username: '',
      password: ''
    }
  );

  const [{toast, toastMessage}, setToast ] = useReducer(
    (state, newState) => ({...state, ...newState}), 
    {
      toast: false,
      toastMessage: ''
    }
  );

  const [state, dispatchBase] = useReducer(authReducer, {});  


  useEffect(() => {

    showToast('Loading..');

  }, []); // O

  const handleSubmit = async (e) => {

    e.preventDefault();
  
    if(isFormEmpty({username, password})) {
      showToast('Error .. something went wrong');
      return;
    } else  {
        const dispatch = dispatchAuthMiddleware(dispatchBase, {username, password});
        dispatch( { type: SIGN_IN } );
    }
  }

  const handleChange = ({event, value}) => {
    event.persist();
    setUserPass({[event.target.name]: value});
  }

  // Check for empty fields 
  const isFormEmpty = ({username, password}) => {
    return !username || !password;
  }

  const showToast = (show=true, toastMessage='') => {
    setToast({ toast: show, toastMessage:toastMessage });
  }

  if(state && state.user && state.user.username){
    return <Redirect to="/" />
  }

  return (
    <Container>
    <Box
      dangerouslySetInlineStyle={{
        __style: {
          backgroundColor: '#d6a3b1'
        }
      }}
      margin={4}
      padding={4}
      shape="rounded"
      display="flex"
      justifyContent="center"
      >
        { /*Sign In form */ }
        <form 
          style={{
            display: 'inlineBlock',
            textAlign: 'center',
            maxWidth: 450,
          }}
          onSubmit={handleSubmit}
        >
          <Box
            marginBottom={2}
            display="flex"
            direction="column"
            alignItems="center"
          >
            <Heading color="midnight">
                { state.user && state.user.username ? 'Welcome back ' + state.user.username : 'Sign In'
                } 
            </Heading>
          </Box>
         { /* user inputs */}
          <TextField
            id="username"
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />              
          <TextField
            id="password"
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <Button
            inline
            disabled={false}
            color="blue"
            text="Submit"
            type="submit"
          />            
        </form>
    </Box>

    <ToastMessage show={toast} message={state.user && state.user.username ? state.user.username : 'Loading ...'} />
  </Container>
  )

}
