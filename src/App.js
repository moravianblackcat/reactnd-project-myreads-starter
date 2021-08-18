import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import Books from "./Books";
import Search from './Search';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
         <Route exact path='/' component={Books} />
         <Route path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp
