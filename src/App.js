import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navigation from './Navigation';
import Home from './Pages/Home';
import About from './Pages/About';
import VideoCall from './Pages/VideoCall';
import './styles/tailwind.css';

function App() {
  return (
    <Router>
    <div className="App" >
      <Navigation></Navigation>
      <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/start">
            <VideoCall />
          </Route>
          <Route path="/">
            <Home />
          </Route>
      </Switch>
  </div>
  </Router>
  );
}

export default App;
