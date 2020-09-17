import { MyContext } from '../types';
import { Resolver, Query, Mutation, Arg, Int, Ctx, InputType, Field } from 'type-graphql'
import { Post } from '../entities/Post'


@InputType()
class PostInput {
  @Field()
  titte: string
  @Field()
  text: string
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post)
  post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
   async createPost(
     @Arg("input") input: PostInput,
     @Ctx() { req }: MyContext
     ): Promise<Post> {
       if (!req.session.id) {
         throw new Error('not authenticated')
       }

    //2 sql queries
    return Post.create({ 
      ...input,
      creatorId: req.session.userId,
     }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number, 
    @Arg("title", () => String, { nullable: true }) title: string, 
    ): Promise<Post | null> {
   const post =  await Post.findOne(id)
   if (!post) {
      return null;
   }
   if (typeof title != undefined) {
     await Post.update({ id }, { title })
   }
   return post
 }

 @Mutation(() => Boolean)
 async deletePost(@Arg("id") id: number, ): Promise<boolean> {
    await Post.delete(id)
    return true;
  } 
}