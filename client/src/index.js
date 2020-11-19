import 'gestalt/dist/gestalt.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import MainContainer from './containers/MainContainer';
import {SignIn} from './components/Authentication';
import {SignUp} from './components/Authentication';
import client from '../src/utils/apolloClient';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initializeStore } from './redux/initializeStore';

const store = initializeStore();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Switch>
          <Route component={MainContainer} exact path="/" />
          <Route component={SignIn} path="/signin" />
          <Route component={SignUp} path="/signup" />
        </Switch>
      </ApolloProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
);





// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render = { (props) => (
//     getToken() !== null ? 
//     <Component {...props} /> : <Redirect to={{
//       pathname: '/signin',
//       state: { from: props.location }
//     }}/>
//   )} />
// );

// const Root = () => (
//   <Router>
//     <React.Fragment>
//       <Navbar />
//       <Switch>
//         <Route component={App} exact path="/" />
//         <Route component={Signin} path="/signin" />
//         <Route component={Signup} path="/signup" />
//         <PrivateRoute component={Checkout} path="/checkout" />
//         <Route component={Brews} path="/:id" />
//       </Switch>
//       </React.Fragment>
//   </Router>
// )

// import registerServiceWorker from './registerServiceWorker';
// ReactDOM.render(<Root />, document.getElementById('root'));
// registerServiceWorker();
