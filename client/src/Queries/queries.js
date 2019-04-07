import {gql} from 'apollo-boost';


const getContentQuery = gql`
  {
    contents{
      id
      title
      desc
      url
    }
  }
`


const getUsersQuery = gql`
  {
    users{
      id
      username
      email
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

export {getContentQuery, getUsersQuery,addContentMutation, getReviewsQuery};


