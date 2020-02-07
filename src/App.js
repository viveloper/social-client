import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import themeFile from './utils/theme';
import axios from 'axios';
// redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { logoutUser, getUserData } from './redux/actions/userAction';
// pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
// components
import Navbar from './components/layout/Navbar';
// auth route
import AuthRoute from './utils/AuthRoute';

const theme = createMuiTheme(themeFile);

const token = localStorage.getItem('FBIdToken');
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/users/:handle" component={user} />
              <Route
                exact
                path="/users/:handle/scream/:screamId"
                component={user}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
