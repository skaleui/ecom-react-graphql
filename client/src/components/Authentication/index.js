import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getToken, clearToken, clearCart } from '../../utils/';

import AuthComponent from './AuthComponent';


class Authentication extends React.Component {


  handleSignout = () => {

    console.log('handleSignout called');

    clearToken();
    clearCart();

    this.props.signOut();
    this.props.history.go('/');
  }

  render() {
    
    let propsObject = getToken() == null ? 
    {
      leftLink : '/signin',
      leftLinkText: 'Sign In',
      shopTitle: 'My Shop : Guest',
      rightLink: '/signup',
      rightLinkText: 'Sign Up' 
    } : 
    {
      leftLink : '/checkout',
      leftLinkText: 'Checkout',
      shopTitle: 'My Shop ',
      rightLink: '/signout',
      rightLinkText: 'Sign Out',
      rightLinkHandler: this.handleSignout,
      username: this.props.username
    }
  
    return (
      <AuthComponent {...propsObject} />
    );
  }
}

const mapStateToProps = appState => {
  console.log('appState', appState);
  return {
    username : appState.authReducer.user.username
  }
};



const mapDispatchToProps = dispatch => {
  return {
    signOut: ()=> dispatch({type: 'SIGN_OUT'})
  }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(withRouter(Authentication));
export {SignIn} from './SignIn';
export {SignUp} from './SignUp';