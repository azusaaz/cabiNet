import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo';
import {getContentsQuery, getCategoriesQuery} from '../Queries/queries.js';
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
    console.log("concon",data);
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

  displayCategories(){
    var data = this.props.data;
    console.log("what",data);
    if(!data.categories||data.categories.length<1){
      return(
      <div>No category yet</div>
      )
    }else if(data.loading){
      return(<div>Loading categories...</div>)
    }else{
      return data.categories.map(category=>{
        console.table(category)
        return(
          <div>
            <p>aaaaaa{category.title}</p>
            
          </div>
        )
      })
    }
  }

  render() {

    return (
      <div>
        <ul id="content-list">
        {this.displayCategories()}
        {this.displayContents()}
        </ul>
        <ReviewList contentId={this.state.selected}/>
      </div>
    );
  }
}

export default //compose(
graphql(getCategoriesQuery,{
  options: (props)=>{
    console.log("dddmmm",props.currentBoard.id);
    return{
      variables: {
        boardId: props.currentBoard.id
      }
    }
  }
})(ContentList);


// ,
// graphql(getContentsQuery,{
//   options: (props)=>{
//     return{
//       variables: {
//         boardId: props.currentBoard.id
//       }
//     }
//   }
// }))