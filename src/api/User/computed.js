import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },

    amIFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;

      console.log("user:", user);
      console.log("parent: ", parent);
      console.log("parentId: ", parentId);

      try {

        const exists = await prisma.$exists.user({
          AND: [{ id: parentId }, { followers_some: [user.id] }]
        });

        console.log('exists: ', exists);

        if(exists) {
          return true;
          
        } else {
          return false;
        }

      } catch(e) {
        console.error(e);
        return false;
      }
      
    },

    itsMe: (parent, _, {request}) => {
      const {user} = request;
      const {id: parentId} = parent;

      console.log("user:", user);
      console.log("parent: ", parent);

      return user.id === parentId;
    }
  }
};


// fullName의 쿼리상의 부모는 User이므로 parent는 User가 반환됨
// Query me의 return { user: userProfile , posts}
// 이 부분이  user: null 이라면 parent는 null이 반환됨
// User: {
//   fullName: (parent, __, { request }) => {
//     console.log('parent of', parent);
//     return "lalalal";
//   }
// }
