import React, { Component } from 'react';
import Book from "./Book";

export default class BooksList extends Component {

    render() {
        return (
            <ol className="books-grid">
                {this.props.books.map(book => {
                    return <li key={book.id}><Book title={book.title} authors={book.authors ? book.authors : []} smallThumbnail={book.imageLinks ? book.imageLinks.smallThumbnail : ''} /></li>;
                })}
            </ol>
        );
    }

}