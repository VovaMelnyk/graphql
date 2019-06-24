import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getBooksQuery = gql `
 {
     books {
         name
         id
     }
 }
`

class BookList extends Component {

  displayBooks = () => {
    const {data} = this.props;
    if (data.loading) {
      return (
        <div>Loading books ...</div>
      )
    } else {
      return data
        .books
        .map(el => <li key={el.id}>{el.name}</li>)
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <ul className="book-list">
          {this.displayBooks()}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);