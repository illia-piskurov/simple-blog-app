import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CommentsModule } from './comments/comments.module';
import { PostComment } from './comments/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'posts.db',
      entities: [Post, User, PostComment],
      synchronize: true,
    }),
    PostsModule,
    UsersModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
