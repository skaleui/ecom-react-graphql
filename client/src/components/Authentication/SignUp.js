import  React, { useEffect, useReducer } from 'react';
import { Container, Box, Button, Heading, Text, TextField } from 'gestalt';
import { authReducer } from '../../redux/reducers/authReducer';
import { dispatchAuthMiddleware } from '../../redux/actions/authActions';
import { SIGN_UP } from '../../redux/actions/storeActionTypes';
import ToastMessage from '../ToastMessage';
import { Redirect } from 'react-router-dom';

export const SignUp = () => {

  const [{username, password, email}, setUserInfo ] = useReducer(
    (state, newState) => ({...state, ...newState}), 
    {
      username: '',
      password: '',
      email: ''
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

  const handleSubmit = async (e) => {

    e.preventDefault();
  
    if(isFormEmpty({username, password, email})) {
      showToast('Error .. Empty fields for signing up');
      return;
    } else  {
        console.log('ready to submit');
        const dispatch = dispatchAuthMiddleware(dispatchBase, {username, password, email});
        dispatch( { type: SIGN_UP } );
    }
  }

  const handleChange = ({event, value}) => {
    event.persist();
    setUserInfo({[event.target.name]: value});
  }

   // Check for empty fields 
   const isFormEmpty = ({username, password, email}) => {
    return !username || !password || !email;
  }

  const showToast = (toastMessage='') => {
    setToast({ toast: toastMessage ? true : false, toastMessage:toastMessage });
  }

  if(state && state.user && state.user.username){
    return <Redirect to="/" />
  }

  return (
    <Container>
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: '#ebe2da'
          }
        }}
        margin={4}
        padding={4}
        shape="rounded"
        display="flex"
        justifyContent="center"
        >
          { /*Sign Up form */ }
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
                  Let's get started
              </Heading>
              <Text italic color="orchid">Sign up to order some brews</Text>

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
              id="email"
              type="email"
              name="email"
              placeholder="email address"
              onChange={handleChange}
            />
            <TextField
              id="password"
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
            />
            <Box marginTop={10}>
              <Button
                inline
                disabled={state.isLoading}
                color="blue"
                text="Submit"
                type="submit"
              />
            </Box>            
          </form>
      </Box>
      <ToastMessage show={toast} message={state.user && state.user.username ? state.user.username : 'Loading ...'} />
    </Container>
  )
};