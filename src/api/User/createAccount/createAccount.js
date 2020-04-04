import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    // prisma를 3번째 인자인 context에서 가져온다.
    // createAccount: async (_, args, {prisma}) => {
    createAccount: async (_, args) => {
      
      const { username, email, firstName = "", lastName = "", bio = "" } = args;

      const exists = await prisma.$exists.user({username});
      if(exists) {
        throw Error("This username is already taken");
      }

      const user = await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio
      });

      return true;

    }
  }
};