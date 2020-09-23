import 'reflect-metadata';
import { COOKIE_NAME, __prod__ } from './constants';
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from './resolvers/post'
import { UserResolver } from './resolvers/user'
import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from 'cors' 
import { createConnection } from 'typeorm'
import { User } from './entities/User';
import { Post } from './entities/Post';
import { Updoot } from './entities/Updoot';
import path from 'path'


const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    database: 'amadi2',
    username: 'postgres',
    password: 'BRAINiac98',
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User, Updoot],
  });
  await conn.runMigrations();
 //rerun
  const app = express();

  let RedisStore = connectRedis(session);
  let redis = new Redis();
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true
    })
  )
  
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ 
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: 'lax', //csrf
        secure: __prod__ //cokie only works in https
      },
      saveUninitialized: false,
      secret: 'cookie7163he76uyd637',
      resave: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false
    }),
    context: ({req, res}) => {
      return ({ req, res, redis })
    },
  });

  apolloServer.applyMiddleware({ 
    app, 
    cors: false,
  });

  app.listen(4000, () => {
    console.log('server started on localhost: 4000')
  })
};

main().catch((err) => {
  console.error(err);
});