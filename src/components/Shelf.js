import React, { Component } from 'react';
import BooksList from './BooksList';

export default class Shelf extends Component {

    shelfChanged = (newShelf, bookId) => {
        let book = this.props.books.filter(book => book.id === bookId)[0];
		this.props.shelfChanged(newShelf, book);
    }

	render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                <BooksList books={this.props.books} shelfChanged={this.shelfChanged} />
                </div>
            </div>
        );
	}

}