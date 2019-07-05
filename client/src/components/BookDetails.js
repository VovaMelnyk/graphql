import React from 'react';
import { graphql } from 'react-apollo';
import {getBookQuery} from '../queries/queries'

const BookDetails = (props) => {
    const { book } = props.data;
    return (
        <div id="book-details">
            {book 
                ? <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {book.author.books.map(el => <li key={el.id}>{el.name}</li>)}
                    </ul>
                </div> 
                : <p>"No Book selected"</p>}
        </div>
    );
};

export default graphql(getBookQuery, {
    options: (props)=> ({
             variables: {
                 id: props.bookId
             }
         }),
         name: 'data'
})(BookDetails);