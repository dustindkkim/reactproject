import React, { Component } from 'react';
import Book from './container/Book/Book'
import Home from './container/Home/Home'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Route path="/" exact Component={Book} />
          <Route path="/book" Component={Book} />
        </Router>
      </div>
    );
  }
}

export default App;