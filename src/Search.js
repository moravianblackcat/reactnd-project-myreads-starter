import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search } from "./BooksAPI";
import BooksList from './components/BooksList';

export default class Search extends Component {

    state = {
        query: '',
        books: []
    }

    queryChanged = (newQuery) => {
        this.setState({query: newQuery});
        if (newQuery === '') {
            this.setState({'books': []});
        } else {
            this.filterBooks(newQuery.trim());
        }
    }

    filterBooks = (newQuery) => {
        search(newQuery)
            .then(books => this.setState(
                {'books': books.error ? [] : books}
            ));
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        to='/'>
                            <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.queryChanged(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
{                    <BooksList books={this.state.books} />}
                </div>
            </div>
        )
    }

}