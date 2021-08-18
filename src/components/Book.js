import React, { Component } from 'react';
import ShelfChanger from './ShelfChanger';

export default class Book extends Component {

	render() {
		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={this.props.smallThumbnail ? { backgroundImage: `url(${this.props.smallThumbnail})` } : { backgroundColor: 'grey'}}></div>
					<ShelfChanger />
				</div>
				<div className="book-title">{this.props.title}</div>
				<div className="book-authors">{this.props.authors ? this.props.authors.join(', ') : ''}</div>
			</div>
		)
	}

}