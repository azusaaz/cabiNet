import {gql} from 'apollo-boost';
const getUsersQuery = gql`
  {
    users{
      id
      username
      email
      boards{
        title
        categories
        {
          title
          contents
          {
            title
            reviews{
              rate
              comment
            }
          }
        }
      }
    }
  }
`

const getUserQuery = gql`

query($userId: ID){
  user(userId: $userId){
      id
      username
      email
      boards{
        title
        categories
        {
          title
          contents
          {
            title
            reviews{
              rate
              comment
            }
          }
        }
      }
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
query($boardId: ID){
  categories(boardId: $boardId){
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

export {getUsersQuery,getUserQuery, getBoardsQuery, getContentsQuery, getCategoriesQuery, addContentMutation, getReviewsQuery};


