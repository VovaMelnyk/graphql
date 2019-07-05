import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component {

  state = {
    selected: null
  }

  bookClick = (el) => {
    const id = el.id;
    this.setState({
      selected: id
    })
  }

  displayBooks = () => {
    const {data} = this.props;
    if (data.loading) {
      return (
        <div>Loading books ...</div>
      )
    } else {
      return data
        .books
        .map(el => <li key={el.id} onClick={() => this.bookClick(el)}>{el.name}</li>)
    }
  }
  render() {
    // console.log(this.props);
    return (
      <div>
        <ul className="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);