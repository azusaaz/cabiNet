const graphql = require('graphql');
const lodash = require('lodash');

const User = require('../models/user');
const Board = require('../models/board');
const Category = require('../models/category');
const Content = require('../models/content');
const Review = require('../models/review');
const Like = require('../models/like');
const Member = require('../models/member');


const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull
 } = graphql;

const UserType = new GraphQLObjectType({
  name:"User",
  fields:()=>({
    id: {type: GraphQLID},
    username: {type: GraphQLString},
    email: {type: GraphQLString},
    boards: {
      type: new GraphQLList(BoardType),
      resolve(parent,args){
        // return lodash.filter(boards,{ userId: parent.id})
        return Board.find({userId: parent.id})
      }
    }
  })
});

const BoardType = new GraphQLObjectType({
  name:"Board",
  fields:()=>({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    desc: {type: GraphQLString},
    user: {
       type: UserType,
       resolve(parent,args){
        //  return lodash.find(users,{id: parent.userId});
        return User.findById(parent.userId);
       }
    }
  })
});

const CategoryType = new GraphQLObjectType({
  name:"Category",
  fields:()=>({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    board: {
       type: BoardType,
       resolve(parent,args){
        return Board.findById(parent.boardId);
       }
    }
  })
});


const ContentType = new GraphQLObjectType({
  name:"Content",
  fields:()=>({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    desc: {type: GraphQLString},
    url: {type: GraphQLString},
    imageUrl: {type: GraphQLString},
    user: {
       type: UserType,
       resolve(parent,args){
        //  return lodash.find(users,{id: parent.userId});
        return User.findById(parent.userId);
       }
    }
  })
});

const ReviewType = new GraphQLObjectType({
  name:"Review",
  fields:()=>({
    id: {type: GraphQLID},
    rate: {type: GraphQLInt},
    comment: {type: GraphQLString},
    user: {
       type: UserType,
       resolve(parent,args){
        return User.findById(parent.userId);
       }
    },
    content: {
      type: ContentType,
      resolve(parent,args){
       return User.findById(parent.contentId);
      }
   }
  })
});

const LikeType = new GraphQLObjectType({
  name:"Like",
  fields:()=>({
    id: {type: GraphQLID},
    liked: {type: GraphQLBoolean},
    user: {
      type: UserType,
      resolve(parent,args){
       return User.findById(parent.userId);
      }
   },
   content: {
     type: ContentType,
     resolve(parent,args){
      return Content.findById(parent.contentId);
     }
   }
  })
})

const MemberType = new GraphQLObjectType({
  name:"Member",
  fields:()=>({
    id: {type: GraphQLID},
    accepted: {type: GraphQLBoolean},
    user: {
      type: UserType,
      resolve(parent,args){
       return User.findById(parent.userId);
      }
   },
   board: {
    type: BoardType,
    resolve(parent,args){
     return Board.findById(parent.boardId);
    }
   }
  })
})







const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    user: {
      type: UserType,
      args:{id:{type: GraphQLID}},
      resolve(parent, args){
     //   return lodash.find(users,{id: args.id});
     return User.findById(args.id);
      }
     },
     board: {
       type: BoardType,
       args:{id:{type: GraphQLID}},
       resolve(parent, args){
       //  return lodash.find(boards,{id: args.id})
        return Board.findById(args.id);
       }
     },
     category: {
      type: CategoryType,
      args:{id:{type: GraphQLID}},
      resolve(parent, args){
       return Category.findById(args.id);
      }
    },
     content: {
      type: ContentType,
      args:{id:{type: GraphQLID}},
      resolve(parent, args){
      //  return lodash.find(boards,{id: args.id})
       return Content.findById(args.id);
      }
    },
    review: {
      type: ReviewType,
      args:{id:{type: GraphQLID}},
      resolve(parent, args){
      //  return lodash.find(boards,{id: args.id})
       return Review.findById(args.id);
      }
    },
    like: {
      type: LikeType,
      args:{id:{type: GraphQLID}},
      resolve(parent, args){
      //  return lodash.find(boards,{id: args.id})
       return Review.findById(like.id);
      }
    },
    member: {
      type: MemberType,
      args:{id:{type: GraphQLID}},
      resolve(parent, args){
      //  return lodash.find(boards,{id: args.id})
       return Member.findById(Member.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent,args){
      //  return users;
      return User.find({});
      }
    },
    boards: {
      type: new GraphQLList(BoardType),
      resolve(parent,args){
    return Board.find({});
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent,args){
    return Category.find({});
      }
    },
    contents: {
      type: new GraphQLList(ContentType),
      resolve(parent,args){
      return Content.find({});
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent,args){
      return Review.find({});
      }
    },
    likes: {
      type: new GraphQLList(LikeType),
      resolve(parent,args){
      return Like.find({});
      }
    },
    members: {
      type: new GraphQLList(MemberType),
      resolve(parent,args){
      return Member.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name:'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: {type: new GraphQLNonNull(GraphQLString)},
        email:  {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent,args){
        let user = new User({
          username: args.username,
          email: args.email
        });
        return user.save();
      }
    },
    addBoard: {
      type: BoardType,
      args: {
        title: {type: new GraphQLNonNull(GraphQLString)},
        desc: {type: new GraphQLNonNull(GraphQLString)},
        userId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let board = new Board({
          title: args.title,
          desc: args.desc,
          userId: args.userId
        });
        return board.save();
      }
    },
    addCategory: {
      type: CategoryType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        boardId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let category = new Category({
          name: args.name,
          boardId: args.boardId
        });
        return category.save();
      }
    },
    addContent: {
      type: ContentType,
      args: {
        title:{type: GraphQLString},
        desc: {type: GraphQLString},
        url: {type: new GraphQLNonNull(GraphQLString)},
        imageUrl: {type: GraphQLString},
        userId: {type: new GraphQLNonNull(GraphQLID)},
        boardId: {type: new GraphQLNonNull(GraphQLID)},
        categoryId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let content = new Content({
          title: args.title,
          desc: args.desc,
          url: args.url,
          imageUrl: args.imageUrl,
          userId: args.userId,
          boardId: args.boardId,
          categoryId: args.categoryId
        });
        return content.save();
      }
    },
    addReview: {
      type: ReviewType,
      args: {
        rate:{type: GraphQLInt},
        comment: {type: new GraphQLNonNull(GraphQLString)},
        userId: {type: new GraphQLNonNull(GraphQLID)},
        contentId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let review = new Review({
          rate: args.rate,
          comment: args.comment,
          userId: args.userId,
          contentId: args.contentId
        });
        return review.save();
      }
    },
    addLike: {
      type: LikeType,
      args:{
        liked: {type: GraphQLBoolean},
        userId: {type: new GraphQLNonNull(GraphQLID)},
        contentId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let like = new Like({
          liked: args.liked,
          userId: args.userId,
          contentId: args.contentId
        });
        return like.save();
      }
    },
    addMember: {
      type: MemberType,
      args:{
        accepted: {type: new GraphQLNonNull(GraphQLBoolean)},
        userId: {type: new GraphQLNonNull(GraphQLID)},
        boardId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let member = new Member({
          accepted: args.accepted,
          userId: args.userId,
          boardId: args.contentId
        });
        return member.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});