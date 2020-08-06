import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignIn from "./screens/sign-in/index.jsx"
import Register from "./screens/register/index.jsx"
import Profile from "./screens/profile/index.jsx"

export default function App() {

  return (
    <Router>
      <div>
        <Switch>
        <Route path="/register">
            <Register />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/">
            <SignIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
