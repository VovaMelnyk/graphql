import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';

class AddBook extends Component {

    state = {
        name: '',
        genre: '',
        authorId: ''
    }

    displayAuthors = () => {
        const { data }  = this.props;
        if (data.loading) {
            return <option disabled>Loading ...</option>
        } else {
            return data.authors.map(el => <option value={el.id} key={el.id}>{el.name}</option>)
        }
    }

    inputChange = ({target}) => {
        const {name, value} = target;
        this.setState({
            [name]: value
        })
    }

    onSubmit = e => {
        const {name , genre, authorId} = this.state;
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name,
                genre,
                authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }

    render() {
    // console.log(this.props);
        return (
            <form id="add-book" onSubmit={this.onSubmit}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" name='name' onChange={this.inputChange}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" name='genre' onChange={this.inputChange}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select name='authorId' onChange={this.inputChange}>
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "data"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);