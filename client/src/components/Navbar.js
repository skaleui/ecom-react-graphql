import React from 'react';
import { Box, Text, Heading, Image, Button } from 'gestalt';
import { NavLink, withRouter } from 'react-router-dom';
import { getToken, clearToken, clearCart } from '../utils';

class Navbar extends React.Component {

  handleSignout = () => {
    clearToken();
    clearCart();

    this.props.history.push('/');
  }

  clearToken() {

  }

  render() {
    return getToken() != null ? 
      <AuthNav handleSignout={this.handleSignout} /> : <UnAuthNav />
  }
}

const AuthNav = ({handleSignout}) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={78}
    color="blue"
    padding={1}
    shape="roundedBottom"
  >
 
    <NavLink activeClassName="active" to="/checkout">
      <Text size="xl" color="white">Checkout </Text>
    </NavLink>

    <NavLink activeClassName="active" exact to="/">
      <Box display="flex" alignItems="center">
      <Box width={50} height={50} margin={2}>
        <Image
          alt="My Own Sop Logo"
          src="./icons/logo.svg"
          naturalHeight={1}
          naturalWidth={1}
        />
      </Box>
      {/* Title  */}
      <div className="main-title">
        <Heading size="xs" color="orange">My Shop</Heading>
      </div>
      </Box>
    </NavLink>

    <Button onClick={handleSignout} color="transparent" text="Sign Out" inline size="md" /> 


  </Box>
)

const UnAuthNav = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={78}
    color="blue"
    padding={1}
    shape="roundedBottom"
  >
 
    <NavLink activeClassName="active" to="/signin">
      <Text size="xl" color="white">Sign In</Text>
    </NavLink>

    <NavLink activeClassName="active" exact to="/">
      <Box display="flex" alignItems="center">
      <Box width={50} height={50} margin={2}>
        <Image
          alt="My Own Sop Logo"
          src="./icons/logo.svg"
          naturalHeight={1}
          naturalWidth={1}
        />
      </Box>
      {/* Title  */}
      <div className="main-title">
        <Heading size="xs" color="orange">My Shop</Heading>
      </div>
      </Box>
    </NavLink>

    <NavLink activeClassName="active" to="/signup">
      <Text size="xl" color="white">Sign Up</Text>
    </NavLink>


  </Box>
)

export default withRouter(Navbar);
