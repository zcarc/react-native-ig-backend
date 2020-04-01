import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },

    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;

      // console.log("user:", user);
      // console.log("parent: ", parent);
      // console.log("parentId: ", parentId);

      try {
        // true or false
        return prisma.$exists.user({
          AND: [
            {
              id: user.id
            },
            {
              following_some: {
                id: parentId
              }
            }
          ]
        });
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;

      // console.log("user:", user);
      // console.log("parent: ", parent);

      return user.id === parentId;
    }
  },

  Post: {
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      });
    }
  }
};
