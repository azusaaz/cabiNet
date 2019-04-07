const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require("./schema/schema");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
require('dotenv').config()

app.use(cors());

mongoose.connect(process.env.DB_HOST);
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