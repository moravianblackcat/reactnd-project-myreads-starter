import React, { Component } from 'react';

export default class ShelfChanger extends Component {

    state = {
        shelf: this.props.shelf
    }

    shelfChanged = (newShelf) => {
        this.setState({shelf: newShelf});
        this.props.shelfChanged(newShelf);
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.state.shelf} onChange={(event) => this.shelfChanged(event.target.value)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }

}