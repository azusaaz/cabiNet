import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getReviewsQuery} from '../Queries/queries.js';

class ReviewList extends Component {

  displayReviews(){
    
    const{reviews} = this.props.data;
    if(!reviews){
      return(
        <div> No content selected</div>
      )
    }else if(reviews.length<1){
      return(
        <div> No reviews</div>
      )
    }else{
      return(
        <div>
          
         {reviews.map(item=>{
           return(
            <div>
              {item.rate}
              <li key={item.id}>{item.comment}</li>
            </div>
           )
         })}
         
        </div>
      )
    }
 }

  render() {

    return (
      <div id="review-list">
        <p>Reviewlist</p>
        {this.displayReviews()}
      </div>
    );
  }
}

export default graphql(getReviewsQuery,{
  options: (props)=>{
    return{
      variables: {
        contentId: props.contentId
      }
    }
  }
})(ReviewList);