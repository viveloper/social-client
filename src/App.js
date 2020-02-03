import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import themeFile from './utils/theme';
// redux
import { Provider } from 'react-redux';
import store from './redux/store';
// pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
// components
import Navbar from './components/Navbar';
// auth route
import AuthRoute from './utils/AuthRoute';

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.getItem('FBIdToken');
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
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
              <AuthRoute
                exact
                path="/login"
                component={login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
