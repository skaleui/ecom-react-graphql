import React from 'react';
import { Container, Box, Button, Heading, TextField } from 'gestalt';
import { setToken } from '../utils';
import ToastMessage from './ToastMessage';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);



class Signin extends React.Component {

  state = {
    username: "",
    password: "",
    toast: false,
    toastMessage: '',
    loading: false
  };

  handleChange = ({event, value}) => {
    event.persist();
    this.setState({[event.target.name]: value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;


    if(this.isFormEmpty(this.state)) {
      console.log(this.state);
      this.showToast('fill in all the fields');
      return;
    }

    //Sign up the user
    try {
     //  set loading true
     this.setState({ loading: true });

      // make request to login with strapi
      const response = await strapi.login(username, password);

      // set loading false
      this.setState({ loading: false });

      //put token in local storage
      setToken(response.jwt);
      console.log(response);

      // redirect to home page
      this.redirectUser('/');
    } catch(err) {
      this.setState({ loading: false });

      this.showToast(err.message);

    }

    console.log("submitted");
  }

  redirectUser = path => this.props.history.push(path);

  // Check for empty fields 
  isFormEmpty = ({username, password}) => {
    return !username || !password;
  }

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({toast: false, toastMessage: ''}), 5000);
  }

  render() {

    const { toastMessage, toast, loading } = this.state;

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
              onSubmit={this.handleSubmit}
            >
              <Box
                marginBottom={2}
                display="flex"
                direction="column"
                alignItems="center"
              >
                <Heading color="midnight">
                    Welcome Back !
                </Heading>
              </Box>
             { /* user inputs */}
              <TextField
                id="username"
                type="text"
                name="username"
                placeholder="username"
                onChange={this.handleChange}
              />              
              <TextField
                id="password"
                type="password"
                name="password"
                placeholder="password"
                onChange={this.handleChange}
              />
              <Button
                inline
                disabled={loading}
                color="blue"
                text="Submit"
                type="submit"
              />            
            </form>
        </Box>
        <ToastMessage show={toast} message={toastMessage} />
      </Container>
    )
  }
}

export default Signin;