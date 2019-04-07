import {gql} from 'apollo-boost';
const getUsersQuery = gql`
  {
    users{
      id
      username
      email
    }
  }
`

const getBoardsQuery = gql`
  {
    boards{
      id
      title
    }
  }
`

const getContentsQuery = gql`
 query($boardId: ID){
    contents(boardId: $boardId){
      id
      title
      desc
      url
      user{
        id
        username
        email
      }
    }
  }
`




const getCategoriesQuery = gql`
  {
    categories{
      id
      title
    }
  }
`

const addContentMutation = gql`
 mutation($title: String, $desc: String, $url: String!,$imageUrl: String, $userId: ID!, $boardId: ID!, $categoryId: ID!){
    addContent(title:$title, desc:$desc,url:$url, imageUrl:$imageUrl, userId:$userId, boardId:$boardId, categoryId:$categoryId){
      title
      desc
      url
      imageUrl
      user
    }
 }
`
const getReviewsQuery = gql`
  query($contentId: ID){
    reviews(contentId: $contentId){
      id
      rate
      comment

    }
  }
`

export {getUsersQuery, getBoardsQuery, getContentsQuery, getCategoriesQuery, addContentMutation, getReviewsQuery};


