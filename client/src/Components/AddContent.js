import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo';
import {getUsersQuery, addContentMutation, getContentQuery} from '../Queries/queries.js'



class AddContent extends Component {

  constructor(props){
    super(props);
    this.state={
       title:'',
       desc:'',
       url:'',
       userId:'',
       boardId:"5ca7ecb8b31d4f4761869352",
       categoryId:"5ca803f54d559c51ed009b23"
    };
  }

  displayUsers(){
    var data = this.props.getUsersQuery;
   
    if(data.loading){
      return <option disabled>Loading Users...</option>
    }else{
      return data.users.map(user =>{
        return <option key={user.id} value={user.id} >{user.username}</option>
      })
    }
  }

  submitForm(e){
    e.preventDefault();
    this.props.addContentMutation({
      variables:{
        title: this.state.title,
        desc: this.state.desc,
        url: this.state.url,
        userId: this.state.userId,
        boardId: this.state.boardId,
        categoryId: this.state.categoryId,
      },
      refetchQueries: [{query: getContentQuery}]
    });
  }

  render() {

    return (
      <form id="content-add-content" onSubmit={this.submitForm.bind(this)}>
   
        <div className="field">
          <label>Content title:</label>
          <input type="text" onChange={(e)=>this.setState({title: e.target.value})}/>
          
        </div>

        <div className="field">
          <label>Content desc:</label>
          <input type="text"onChange={(e)=>this.setState({desc: e.target.value})}/>
        </div>

        <div className="field">
          <label>Content url:</label>
          <input type="text"onChange={(e)=>this.setState({desc: e.target.value})}/>
        </div>

        <div className="field">
          <label>Username:</label>
           <select onChange={(e)=>this.setState({userId: e.target.value})}>
             <option>Select user</option>
             {this.displayUsers()}
           </select>
        </div>

        <button>+</button>

      </form>
    );
  }
}

export default compose(
  graphql(getUsersQuery,{name:"getUsersQuery"}),
  graphql(addContentMutation,{name:"addContentMutation"}),
)(AddContent);
