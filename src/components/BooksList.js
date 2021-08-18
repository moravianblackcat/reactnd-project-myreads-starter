import React, { Component } from 'react';
import Book from "./Book";

export default class BooksList extends Component {

    shelfChanged = (newShelf, bookId) => {
		this.props.shelfChanged(newShelf, bookId)
    }

    render() {
        return (
            <ol className="books-grid">
                {this.props.books.map(book => {
                    return <li key={book.id}>
                        <Book title={book.title}
                            shelf={book.shelf}
                            id={book.id}
                            authors={book.authors ? book.authors : []}
                            smallThumbnail={book.imageLinks ? book.imageLinks.smallThumbnail : ''}
                            shelfChanged={this.shelfChanged}
                        />
                    </li>;
                })}
            </ol>
        );
    }

}