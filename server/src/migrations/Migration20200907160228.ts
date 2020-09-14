import { Migration } from '@mikro-orm/migrations';

export class Migration20200907160228 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "created_at" jsonb not null, "updated_at" jsonb not null, "title" varchar(255) not null);');
  }

}

//For later reference
/* this.addSql('alter table "post" drop constraint if exists "post_created_at_check";');
this.addSql('alter table "post" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
this.addSql('alter table "post" drop constraint if exists "post_updated_at_check";');
this.addSql('alter table "post" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));'); */