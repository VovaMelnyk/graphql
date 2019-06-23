const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');


const app = express();

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect('mongodb+srv://Melnyk:Test123456789-@gqldb-o6rzf.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, ()=> {
    console.log('listening requests on port 4000');
})