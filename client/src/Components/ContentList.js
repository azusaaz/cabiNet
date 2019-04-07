import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getContentQuery} from '../Queries/queries.js';
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
    if(data.loading){
      return(<div>Loading contents...</div>)
    }else{
      return data.contents.map(content=>{
        return(
        <li key={content.id} onClick={(e)=>{this.setState({selected: content.id})}}>{content.title}</li>
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

export default graphql(getContentQuery)(ContentList);