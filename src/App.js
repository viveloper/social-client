import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/login" component={login} />
          <Route exact path="/signup" component={signup} />
          <Route
            path=""
            component={() => (
              <div>
                <h1>Page Not Found</h1>
              </div>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
