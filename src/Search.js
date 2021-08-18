import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search } from "./BooksAPI";
import BooksList from './components/BooksList';
import { getAll, update } from "./BooksAPI";

export default class Search extends Component {

    state = {
        query: '',
        books: [],
        shelfBooks: {}
    }

    shelfChanged = (newShelf, bookId) => {
        let newShelfBooks = {[bookId]: newShelf};
        let book = this.state.books.filter(book => book.id === bookId)[0];

        update(book, newShelf);
        this.setState((previousState) => ({
            'books': [book, ...previousState.books.filter(b => b.id !== book.id)],
            'shelfBooks': {...previousState.shelfBooks, newShelfBooks}
        }));
    }

    componentWillMount() {
        getAll().then(books => { this.setShelfBooks(books) });
    }

    setShelfBooks = (books) => {
        let shelfBooks = this.getShelfBooksIdsMapping(books);
        this.setState({'shelfBooks': shelfBooks});
    }

    getShelfBooksIdsMapping = (books) => {
        let result = {};
        books.forEach(book => {
            result[book.id] = book.shelf
        });

        return result;
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
                {'books': this.setBooks(books)}
            ));
    }

    addShelves = (books) => {
        return books.map(book => {
            let shelf = this.state.shelfBooks[book.id];

            return {...book, 'shelf': shelf};
        });
    }

    setBooks = (books) => {
        if (books.error) {
            return [];
        }

        return this.addShelves(books);
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
                    <BooksList books={this.state.books} shelfChanged={this.shelfChanged} />
                </div>
            </div>
        )
    }

}