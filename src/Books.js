import React, { Component } from 'react';
import * as constants from './apihelpers/constants';
import Shelf from "./components/Shelf";
import { getAll, update } from "./BooksAPI";
import { Link } from 'react-router-dom';

export default class Books extends Component {

  state = {
      [constants.CURRENTLY_READING]: [],
      [constants.WANT_TO_READ]: [],
      [constants.READ]: []
  }

  componentWillMount() {
    getAll().then(books => this.updateState(books));
  }

  updateState = (books) => {
    this.setState({[constants.CURRENTLY_READING]: books.filter(book => book.shelf === constants.CURRENTLY_READING),
        [constants.WANT_TO_READ]: books.filter(book => book.shelf === constants.WANT_TO_READ),
        [constants.READ]: books.filter(book => book.shelf === constants.READ)
      });
    }

  shelfChanged = (newShelf, book) => {
    update(book, newShelf);

    this.shelfChangedUpdateState(newShelf, book);
  }

  shelfChangedUpdateState(newShelf, book) {
    let newState = {};

    if (newShelf === 'none') {
      let filteredOldShelf = this.filterOutFromCurrentShelf(book);
      newState = { [book.shelf]: filteredOldShelf };
    } else {
      let filteredOldShelf = this.filterOutFromCurrentShelf(book);
      let adjustedNewShelf = this.addToNewShelf(newShelf, book);
      newState = { [book.shelf]: filteredOldShelf, [newShelf]: adjustedNewShelf };
    }

    this.setState(newState);
  }

  filterOutFromCurrentShelf = (book) => {
    let oldShelf = book.shelf;
    let filteredOldShelf = this.state[oldShelf].filter(b => b.id !== book.id);

    return filteredOldShelf;
  }

  addToNewShelf = (newShelf, book) => {
    return [...this.state[newShelf], book];
  }

  render() {
      return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Shelf name='Currently Reading' books={this.state[constants.CURRENTLY_READING]} shelfChanged={this.shelfChanged}/>
            <Shelf name='Want to Read' books={this.state[constants.WANT_TO_READ]} shelfChanged={this.shelfChanged}/>
            <Shelf name='Read' books={this.state[constants.READ]} shelfChanged={this.shelfChanged}/>
          </div>
          <div className="open-search">
            <Link 
              to='/search'
            >
            <button>Add a book</button>
            </Link>
          </div>
        </div>
      )
  }

}