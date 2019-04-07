import React, { Component } from 'react';


class BoardList extends Component {

  constructor(props){
     super(props);
     this.state={
       selected: null
     }
  }
  
  displayBoards(){
    var data = this.props.boards;
    if(data.loading){
      return(<div>Loading boards...</div>)
    }else{
      return data.map(board=>{
        console.table(board)
        return(
          <div>
            <button onClick={(e)=>{this.props.setBoard(board)}}>{board.title}</button>
          </div>
        )
      })
    }
  }

  render() {

    return (
      <div>
        <ul id="board-list">
        {this.displayBoards()}
        </ul>
      </div>
    );
  }
}

export default BoardList;