const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require("./schema/schema");
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://azusaaz:cabinet777@ds047325.mlab.com:47325/cabinet");
mongoose.connection.once('open', ()=>{
  console.log("connected to database");
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(3000,()=>{
  console.log("listening for requests on port 3000");
});