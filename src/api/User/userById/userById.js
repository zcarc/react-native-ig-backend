import {prisma} from "../../../../generated/prisma-client";

// $fragment(): prisma가 무한반복 되는 쿼리를 방지하기 위해서 사용

export default {
    Query: {
        userById: async(_, args) => {
            const {id} = args;
            return await prisma.user({ id: id }).$fragment();
        }
    }
}