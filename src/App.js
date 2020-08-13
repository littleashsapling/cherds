import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { auth } from './services/firebase';
import './styles.css';

const PrivateRoute = (Component, ...rest) => {
  return (
    <Route
      {...rest}
      render={props =>
        props.authenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
      }
    />
  );
}

const PublicRoute = (Component, rest) => {
  return (
    <Route
      {...rest}
      render={props => (
        <Component {...props} />
      )
      }
    />
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <div className='spinner-border text-success' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    ) : (
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <PrivateRoute
              path='/chat'
              authenticated={this.state.authenticated}
              component={Chat}
            />
            <PublicRoute
              path='/signup'
              authenticated={this.state.authenticated}
              component={Signup}
            />
            <PublicRoute
              path='/login'
              authenticated={this.state.authenticated}
              component={Login}
              exact
            />
          </Switch>
        </Router>
      );
  }
}

export default App;
