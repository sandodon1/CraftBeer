import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './beer/Home';
import Brewery from './beer/Brewery';
import logo1 from './img/CraftBeerCap.png';
import logo2 from './img/CraftBeer.jpg';
import './App.css';

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo1} className="App-logo" alt="logo" />
          <h1 className="App-title">Washington Craft Beer Portal</h1>
          <img src={logo2} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
          Breweries, Taprooms, Bottle Shops and More
        </p>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/breweries" component={Home}></Route>
            <Route path="/breweries/:breweryId" component={Brewery}></Route>
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
