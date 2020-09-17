import { 
  BaseEntity, 
  Column, 
  CreateDateColumn, 
  Entity, 
  ManyToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Post } from "./Post";


@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;
  
  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
  
  @ManyToOne(() => Post, post => post.creator)
  posts: Post[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt:  Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}