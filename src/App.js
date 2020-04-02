import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeObject from './util/theme';
//Component
import NavBar from './components/layout/Navbar';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/type';
import {logoutUser,getUserData} from './redux/actions/userAction'


//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';

import jwtDecode from 'jwt-decode';
//Util
import AuthRoute from './util/AuthRoute';
import axios from 'axios';

const theme = createMuiTheme(themeObject);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
              <NavBar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <AuthRoute exact path="/login" component={Login}/>
                  <AuthRoute exact path="/signup" component={Signup}/>
                  <Route exact path = "/users/:handle" component = {User}/>
                  <Route 
                    exact
                    path= "/users/:handle/scream/:screamId"
                    component = {User}
                  />
                </Switch>
              </div>
            </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
