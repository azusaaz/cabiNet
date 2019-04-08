import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BoardList from './Components/BoardList.js';
import ContentList from './Components/ContentList.js';
import AddContent from './Components/AddContent.js';



const client = new ApolloClient({
  uri:'http://localhost:3000/graphql'
})


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      //  user:{
      //    userId:"",
      //    username:"",
      //    email:""
      //  },
      user:{
        "id": "5ca7ebd5b31d4f4761869351",
        "username": "Az",
        "email": "aaa@aaa.com",
        "boards": [
          {
            "title": "Javascript"
          },
          {
            "title": "CSS"
          }
        ]
      },
       currentBoard:{
        "id": "5ca7ecb8b31d4f4761869352",
         "title": "Javascript"
       },
       currentCategory:""
    };
  }

  componentWillMount(){

  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
        <h1>cabiNet</h1>
        <div>{this.state.user.username}</div>
        <div>{this.state.user.email}</div>
        <BoardList 
        boards={this.state.user.boards}
        setBoard={(currentBoard)=>{this.setState({currentBoard})}}
        />
        <ContentList currentBoard={this.state.currentBoard} />
        <AddContent currentBoard={this.state.currentBoard}/>
        aaa{this.state.currentBoard.title}aaa
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
