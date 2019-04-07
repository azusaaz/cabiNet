import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getContentsQuery} from '../Queries/queries.js';
import ReviewList from './ReviewList.js'

class ContentList extends Component {

  constructor(props){
     super(props);
     this.state={
       selected: null
     }
  }
  
  displayContents(){
    var data = this.props.data;
    if(!data.contents||data.contents.length<1){
      return(
      <div>No board yet</div>
      )
    }else if(data.loading){
      return(<div>Loading contents...</div>)
    }else{
      return data.contents.map(content=>{
        console.table(content)
        return(
          <div>
            <p>Posted by{content.user.username}</p>
            <p>{content.user.userid}</p>
            <li key={content.id} onClick={(e)=>{this.setState({selected: content.id})}} style={content.id===this.state.selected?{backgroundColor: "grey"}:null}>{content.title}</li>
            <div>{content.desc}</div>
            <div><a href={content.url}>{content.url}</a></div>
          </div>
        )
      })
    }
  }

  render() {

    return (
      <div>
        <ul id="content-list">
        {this.displayContents()}
        </ul>
        <ReviewList contentId={this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getContentsQuery,{
  options: (props)=>{
    console.log("dddmmm",props);
    return{
      variables: {
        boardId: props.currentBoard.id
      }
    }
  }
})(ContentList);