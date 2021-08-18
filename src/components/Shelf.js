import React, { Component } from 'react';
import BooksList from './BooksList';

export default class Shelf extends Component {

	render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                <BooksList books={this.props.books} />
                </div>
            </div>
        );
	}

}