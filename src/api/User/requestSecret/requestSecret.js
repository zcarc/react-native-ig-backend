import { prisma } from "../../../../generated/prisma-client";
import { generateSecret } from "../../../utils";

export default {

  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();

      try {
        await prisma.updateUser({
          data: { loginSecret },
          where: { email }
        });
        return true;

      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }
};