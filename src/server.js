import './env';
import { GraphQLServer } from "graphql-yoga";
// import { prisma } from "../generated/prisma-client/index";
import logger from 'morgan';
import schema from './schema';
import "./passport";
import { authenticateJwt } from './passport';
import { isAuthenticated } from './middlewares';
import { uploadMiddleware, uploadController } from "./upload";

const PORT = process.env.PORT || 4000;

// context : resolver 사이에서 정보를 공유할 때 사용
// prisma를 server.js에서 한 번만 import 한 후에 prisma를 context에 추가할 수 있다.
// prisma를 resolver에서 import하지 않고 server.js에서 import 해야한다.
// const server = new GraphQLServer({schema, context:{prisma}});

// passport에 입력되는 req 객체와 다르다 context의 req객체에 담기는 정보중 하나가 passport의 req 객체와 같다.

// resolver에서 context를 매개변수로 사용한다면 자동적으로 
// ({ request }) => ({ request, isAuthenticated }) 의
// request, isAuthenticated 가 리턴되서 resolver 매개변수로 둘 다 사용할 수 있다.
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);
server.express.post("api/upload", uploadMiddleware, uploadController);

server.start({ port: PORT }, () =>
  console.log(`✔ Server running on http://localhost:${PORT}`)
);