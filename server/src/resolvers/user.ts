import { Resolver, InputType, ObjectType, Mutation, Query, Arg, Field, Ctx } from 'type-graphql'
import { User } from '../entities/User'
import { MyContext } from '../types';
import argon2 from 'argon2'
import { EntityManager } from '@mikro-orm/postgresql'


@InputType()
class UsernamePasswordInput {
  @Field()
  username: string
  @Field()
  password: string
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}


@ObjectType()
class UserResponse {
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[];

  @Field(() => User, {nullable: true})
  user?: User;
}


@Resolver()
export class UserResolver {
  @Query(() => User, {nullable: true})
  async notLogIn(
    @Ctx() { req, em }: MyContext
  ) : Promise<User | null>{
    // user not logged in
    if (!req.session.userid) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId })
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput, 
    @Ctx() { em, req }: MyContext 
   ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: 'username',
            message: 'must be greater than 2 characters'
           },
          ],
        };
      }

      if (options.password.length <= 4) {
        return {
          errors: [
             {
              field: 'password',
              message: 'must be greater than 5 characters'
             },
            ],
          };
        }
 
    const hashedPassword = await argon2.hash(options.password)
      let user;
      try {
        const result = await (em as EntityManager)
        .createQueryBuilder(User)
        .getKnexQuery()
        .insert({
            username: options.username,
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date()
          }).returning("*");
        user = result[0];
      } catch (err) {
        //duplicate username error
        //err.detail.includes('been taken')
        if (err.code === '23505' ) {
          return {
            errors: [{
              field: 'username',
              message: 'username has already been taken',
             },
            ],
          };
        }
      }

     //store user id session
    //set cookie on the user
    //keep them logged in
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput, 
    @Ctx() { em, req }: MyContext 
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username })
    if (!user) {
      return {
        errors: [
          {
            field:'username',
            message: `username doesn't exit`,
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password)
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }
}

/* @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
  return new Promise((resolve) =>
    req.session.destroy((err) => {
      res.clearCookie(COOKIE_NAME);
      if (err) {
        console.log(err);
        resolve(false);
        return;
      }

      resolve(true);
    })
  );
}
} */