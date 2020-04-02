import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
      // async 없어도 동작된다.
    editUser: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, email, firstName, lastName, bio, avatar } = args;
      const {user} = request;

      // 여기서 리턴할 때 await를 붙이지 않아도 되는 이유는
      // return이 마지막 statement이기 때문에
      // 자동으로 이 promise가 resolve되서 브라우저에게 결과를 전달하길 기다려줘서
      // await를 사용해서 return 할 필요가 없다.
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstName, lastName, bio, avatar }
      });
    }
  }
};
