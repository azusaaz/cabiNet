import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import ContentList from './Components/ContentList.js';

const client = new ApolloClient({
  uri:'http://localhost:8080/graphql'
})


class App extends Component {
  render() {
    return (

      <ApolloProvider client={client}>
        <div className="App">
        <h1>cabiNet</h1>
        <ContentList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
