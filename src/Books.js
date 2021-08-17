import React, { Component } from 'react';
import * as constants from './apihelpers/constants';
import Shelf from "./components/Shelf";
import { getAll } from "./BooksAPI";

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

    render() {
        return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  <Shelf name='Currently Reading' books={this.state[constants.CURRENTLY_READING]} />
                  <Shelf name='Want to Read' books={this.state[constants.WANT_TO_READ]} />
                  <Shelf name='Read' books={this.state[constants.READ]} />
                </div>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
          )
    }

}