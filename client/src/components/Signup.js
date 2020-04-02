import React from 'react';
import { Container, Box, Button, Heading, Text, TextField } from 'gestalt';
import { setToken, API_URL } from '../utils';
import ToastMessage from './ToastMessage';
import Strapi from 'strapi-sdk-javascript/build/main';
const strapi = new Strapi(API_URL);

console.log(API_URL);

class Signup extends React.Component {

  state = {
    username: "",
    email: "",
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
    const { username, email, password } = this.state;


    if(this.isFormEmpty(this.state)) {
      console.log(this.state);
      this.showToast('fill in all the fields');
      return;
    }

    //Sign up the user
    try {
     //  set loading true
     this.setState({ loading: true });

      // make request to register with strapi
      const response = await strapi.register(username, email, password);

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
  isFormEmpty = ({username, email, password}) => {
    return !username || !email || !password;
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
              onSubmit={this.handleSubmit}
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
                onChange={this.handleChange}
              />              
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="email address"
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

export default Signup;