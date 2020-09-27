import 'reflect-metadata';
import 'dotenv-safe/config';
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
import { createUserLoader } from "./utils/createUserLoader";
import { createUpdootLoader } from "./utils/createUpdootLoader";
import path from 'path'


const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: false,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User, Updoot],
  });
  await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  app.set("trust proxy", 1);
  const redis = new Redis(process.env.REDIS_URL);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
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
        secure: __prod__, //cokie only works in https
        //domain: __prod__ ? '.amadi.vercel.com' : undefined
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false
    }),
    context: ({req, res}) => {
      return ({ req, res, redis, 
        userLoader: createUserLoader(),
        updootLoader: createUpdootLoader(),
       });
    },
  });

  apolloServer.applyMiddleware({ 
    app, 
    cors: false,
    path: '/graphql'
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log('server started on localhost: 4000')
  })
};

main().catch((err) => {
  console.error(err);
});