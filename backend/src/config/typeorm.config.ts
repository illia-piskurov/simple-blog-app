import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { PostComment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';

export async function getTypeOrmConfig(
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> {
  return {
    type: 'sqlite',
    database: configService.getOrThrow<string>('SQLITE_DATABASE'),
    entities: [Post, User, PostComment],
    synchronize: true,
  };
}
