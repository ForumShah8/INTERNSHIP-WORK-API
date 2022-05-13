const express = require('express');
const {graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://fshah8:abcd123@cluster0.frb6h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connection.once('open',()=> {
    console.log('connected to database');
});

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql : true
}));

app.listen(8000,()=> {
    console.log('listening requests on port 8000');
});